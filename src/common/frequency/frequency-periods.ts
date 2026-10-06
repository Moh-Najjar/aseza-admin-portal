/** Frequency codes that map to a calendar of discrete start/end windows. */
const DISCRETE_PERIOD_CODES = new Set<string>([
  'DAILY',
  'WEEKLY',
  'MONTHLY',
  'QUARTERLY',
  'EVERY_3_MONTHS',
  'SEMI_ANNUAL',
  'ANNUALLY',
  'EVERY_3_YEARS',
  'EVERY_5_YEARS',
]);

/** Codes that accept a custom recurring start (month + day), e.g. 1 February. */
const CUSTOM_START_CODES = new Set<string>([
  'MONTHLY',
  'QUARTERLY',
  'EVERY_3_MONTHS',
  'SEMI_ANNUAL',
  'ANNUALLY',
  'EVERY_3_YEARS',
  'EVERY_5_YEARS',
]);

const MONTH_NAMES_EN = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;

const MONTH_NAMES_AR = [
  'يناير',
  'فبراير',
  'مارس',
  'أبريل',
  'مايو',
  'يونيو',
  'يوليو',
  'أغسطس',
  'سبتمبر',
  'أكتوبر',
  'نوفمبر',
  'ديسمبر',
] as const;

const QUARTER_LABELS_AR = [
  'الربع الأول',
  'الربع الثاني',
  'الربع الثالث',
  'الربع الرابع',
] as const;

/** Recurring start inside a year — year itself is supplied by the query. */
export interface PeriodAnchor {
  month: number;
  day: number;
}

/** One expected reporting window derived from a Frequencies.Code value. */
export interface ExpectedPeriod {
  periodStartDate: string;
  periodEndDate: string;
  labelEn: string;
  labelAr: string;
}

export interface FrequencySummary {
  frequencyId: number;
  code: string;
  nameEn: string;
  nameAr: string;
  description: string | null;
  hasDiscretePeriods: boolean;
  /** True when the UI can send periodStartDate (e.g. 1 Feb for ANNUALLY). */
  supportsCustomPeriodStart: boolean;
}

export interface GeneratePeriodsOptions {
  /** Calendar year (UTC) used as the first period's year. */
  year: number;
  /** Optional 1–12 month filter — useful for DAILY / WEEKLY / MONTHLY. */
  month?: number;
  /** Recurring start month+day. Defaults to 1 January. */
  anchor?: PeriodAnchor;
}

const ISO_DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;

/** True when this frequency code has calendar windows (not ONGOING / ON_DEMAND). */
export function hasDiscretePeriods(code: string): boolean {
  return DISCRETE_PERIOD_CODES.has(code.toUpperCase());
}

/** True when periodStartDate (e.g. 2026-02-01) is applied to generated windows. */
export function supportsCustomPeriodStart(code: string): boolean {
  return CUSTOM_START_CODES.has(code.toUpperCase());
}

/** Formats a UTC date as YYYY-MM-DD. */
export function formatDateOnly(value: Date | string): string {
  if (typeof value === 'string') {
    return value.slice(0, 10);
  }

  const year = String(value.getUTCFullYear());
  const month = String(value.getUTCMonth() + 1).padStart(2, '0');
  const day = String(value.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Parses YYYY-MM-DD into a recurring month/day.
 * Returns null when the string is not a real calendar date.
 */
export function parsePeriodStartDate(value: string): PeriodAnchor | null {
  const match = ISO_DATE_PATTERN.exec(value.trim());
  if (!match) {
    return null;
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = utcDate(year, month - 1, day);

  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return null;
  }

  return { month, day };
}

/** Reads month+day from a stored SQL date (KpiDefinitions.ReferenceDate). */
export function periodAnchorFromDate(value: Date | string): PeriodAnchor {
  if (typeof value === 'string') {
    const parsed = parsePeriodStartDate(value.slice(0, 10));
    if (parsed) {
      return parsed;
    }
    return { month: 1, day: 1 };
  }

  return {
    month: value.getUTCMonth() + 1,
    day: value.getUTCDate(),
  };
}

/** Builds UTC midnight for a calendar day (monthIndex is 0-based). */
function utcDate(year: number, monthIndex: number, day: number): Date {
  return new Date(Date.UTC(year, monthIndex, day));
}

/** Last calendar day of the given month (monthIndex is 0-based). */
function lastDayOfMonth(year: number, monthIndex: number): Date {
  return utcDate(year, monthIndex + 1, 0);
}

/** Monday of the ISO week that contains `date`. */
function startOfIsoWeek(date: Date): Date {
  const day = date.getUTCDay();
  const offsetToMonday = day === 0 ? -6 : 1 - day;
  return utcDate(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate() + offsetToMonday,
  );
}

function addDays(date: Date, days: number): Date {
  return utcDate(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate() + days,
  );
}

/** Adds calendar months and clamps the day (31 Jan + 1 month → 28/29 Feb). */
function addCalendarMonths(date: Date, months: number): Date {
  const totalMonths = date.getUTCFullYear() * 12 + date.getUTCMonth() + months;
  const year = Math.floor(totalMonths / 12);
  const monthIndex = ((totalMonths % 12) + 12) % 12;
  const lastDay = lastDayOfMonth(year, monthIndex).getUTCDate();
  const day = Math.min(date.getUTCDate(), lastDay);
  return utcDate(year, monthIndex, day);
}

function clampDay(year: number, month: number, day: number): number {
  const lastDay = lastDayOfMonth(year, month - 1).getUTCDate();
  return Math.min(day, lastDay);
}

function isDefaultAnchor(anchor: PeriodAnchor): boolean {
  return anchor.month === 1 && anchor.day === 1;
}

function monthName(monthIndex: number, locale: 'en' | 'ar'): string {
  const names = locale === 'ar' ? MONTH_NAMES_AR : MONTH_NAMES_EN;
  const name = names[monthIndex];
  return name ?? String(monthIndex + 1);
}

function formatLongDate(date: Date, locale: 'en' | 'ar'): string {
  const monthIndex = date.getUTCMonth();
  return `${String(date.getUTCDate())} ${monthName(monthIndex, locale)} ${String(date.getUTCFullYear())}`;
}

/**
 * Builds expected period windows for a Frequencies.Code and year.
 * ONGOING / ON_DEMAND return an empty list — those have no calendar grid.
 * `anchor` shifts the cycle, e.g. { month: 2, day: 1 } = first of February.
 */
export function generateExpectedPeriods(
  code: string,
  options: GeneratePeriodsOptions,
): ExpectedPeriod[] {
  const normalized = code.toUpperCase();
  const { year, month } = options;
  const anchor = options.anchor ?? { month: 1, day: 1 };

  switch (normalized) {
    case 'DAILY':
      return buildDailyPeriods(year, month);
    case 'WEEKLY':
      return buildWeeklyPeriods(year, month);
    case 'MONTHLY':
      return buildSpanningPeriods(year, 12, 1, anchor, month);
    case 'QUARTERLY':
    case 'EVERY_3_MONTHS':
      return buildSpanningPeriods(year, 4, 3, anchor, month);
    case 'SEMI_ANNUAL':
      return buildSpanningPeriods(year, 2, 6, anchor, month);
    case 'ANNUALLY':
      return buildSpanningPeriods(year, 1, 12, anchor, month);
    case 'EVERY_3_YEARS':
      return buildSpanningPeriods(year, 1, 36, anchor, month);
    case 'EVERY_5_YEARS':
      return buildSpanningPeriods(year, 1, 60, anchor, month);
    default:
      return [];
  }
}

function buildSpanningPeriods(
  year: number,
  count: number,
  spanMonths: number,
  anchor: PeriodAnchor,
  monthFilter?: number,
): ExpectedPeriod[] {
  const startDay = clampDay(year, anchor.month, anchor.day);
  const cycleStart = utcDate(year, anchor.month - 1, startDay);
  const useClassicLabels = isDefaultAnchor(anchor);
  const periods: ExpectedPeriod[] = [];

  for (let index = 0; index < count; index += 1) {
    const start = addCalendarMonths(cycleStart, index * spanMonths);
    const end = addDays(addCalendarMonths(start, spanMonths), -1);

    if (monthFilter !== undefined && start.getUTCMonth() !== monthFilter - 1) {
      continue;
    }

    periods.push({
      periodStartDate: formatDateOnly(start),
      periodEndDate: formatDateOnly(end),
      labelEn: spanningLabel(
        start,
        end,
        index,
        spanMonths,
        count,
        'en',
        useClassicLabels,
      ),
      labelAr: spanningLabel(
        start,
        end,
        index,
        spanMonths,
        count,
        'ar',
        useClassicLabels,
      ),
    });
  }

  return periods;
}

function spanningLabel(
  start: Date,
  end: Date,
  index: number,
  spanMonths: number,
  count: number,
  locale: 'en' | 'ar',
  useClassicLabels: boolean,
): string {
  if (useClassicLabels && spanMonths === 1) {
    const monthIndex = start.getUTCMonth();
    const year = start.getUTCFullYear();
    return `${monthName(monthIndex, locale)} ${String(year)}`;
  }

  if (useClassicLabels && spanMonths === 3 && count === 4) {
    const quarterNumber = index + 1;
    const year = start.getUTCFullYear();
    if (locale === 'ar') {
      const quarterLabel =
        QUARTER_LABELS_AR[index] ?? `Q${String(quarterNumber)}`;
      return `${quarterLabel} ${String(year)}`;
    }
    return `Q${String(quarterNumber)} ${String(year)}`;
  }

  if (useClassicLabels && spanMonths === 6 && count === 2) {
    const year = start.getUTCFullYear();
    if (locale === 'ar') {
      return index === 0
        ? `النصف الأول ${String(year)}`
        : `النصف الثاني ${String(year)}`;
    }
    return index === 0 ? `H1 ${String(year)}` : `H2 ${String(year)}`;
  }

  if (useClassicLabels && spanMonths === 12 && count === 1) {
    return String(start.getUTCFullYear());
  }

  if (
    useClassicLabels &&
    (spanMonths === 36 || spanMonths === 60) &&
    count === 1
  ) {
    return `${String(start.getUTCFullYear())}–${String(end.getUTCFullYear())}`;
  }

  return `${formatLongDate(start, locale)} – ${formatLongDate(end, locale)}`;
}

function buildDailyPeriods(year: number, month?: number): ExpectedPeriod[] {
  const startMonth = month === undefined ? 0 : month - 1;
  const endMonth = month === undefined ? 11 : month - 1;
  const periods: ExpectedPeriod[] = [];

  for (let monthIndex = startMonth; monthIndex <= endMonth; monthIndex += 1) {
    const lastDay = lastDayOfMonth(year, monthIndex).getUTCDate();
    for (let day = 1; day <= lastDay; day += 1) {
      const date = utcDate(year, monthIndex, day);
      const iso = formatDateOnly(date);
      periods.push({
        periodStartDate: iso,
        periodEndDate: iso,
        labelEn: iso,
        labelAr: iso,
      });
    }
  }

  return periods;
}

function buildWeeklyPeriods(year: number, month?: number): ExpectedPeriod[] {
  const yearStart = utcDate(year, 0, 1);
  const yearEnd = utcDate(year, 11, 31);
  let cursor = startOfIsoWeek(yearStart);
  const periods: ExpectedPeriod[] = [];

  while (cursor <= yearEnd) {
    const weekEnd = addDays(cursor, 6);
    const startIso = formatDateOnly(cursor);
    const startsInYear = cursor.getUTCFullYear() === year;
    const startsInMonth =
      month === undefined || cursor.getUTCMonth() === month - 1;

    if (startsInYear && startsInMonth) {
      periods.push({
        periodStartDate: startIso,
        periodEndDate: formatDateOnly(weekEnd),
        labelEn: `Week of ${startIso}`,
        labelAr: `أسبوع ${startIso}`,
      });
    }

    cursor = addDays(cursor, 7);
  }

  return periods;
}
