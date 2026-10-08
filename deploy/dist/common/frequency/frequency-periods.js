"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasDiscretePeriods = hasDiscretePeriods;
exports.supportsCustomPeriodStart = supportsCustomPeriodStart;
exports.formatDateOnly = formatDateOnly;
exports.parsePeriodStartDate = parsePeriodStartDate;
exports.periodAnchorFromDate = periodAnchorFromDate;
exports.generateExpectedPeriods = generateExpectedPeriods;
const DISCRETE_PERIOD_CODES = new Set([
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
const CUSTOM_START_CODES = new Set([
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
];
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
];
const QUARTER_LABELS_AR = [
    'الربع الأول',
    'الربع الثاني',
    'الربع الثالث',
    'الربع الرابع',
];
const ISO_DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;
function hasDiscretePeriods(code) {
    return DISCRETE_PERIOD_CODES.has(code.toUpperCase());
}
function supportsCustomPeriodStart(code) {
    return CUSTOM_START_CODES.has(code.toUpperCase());
}
function formatDateOnly(value) {
    if (typeof value === 'string') {
        return value.slice(0, 10);
    }
    const year = String(value.getUTCFullYear());
    const month = String(value.getUTCMonth() + 1).padStart(2, '0');
    const day = String(value.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
function parsePeriodStartDate(value) {
    const match = ISO_DATE_PATTERN.exec(value.trim());
    if (!match) {
        return null;
    }
    const year = Number(match[1]);
    const month = Number(match[2]);
    const day = Number(match[3]);
    const date = utcDate(year, month - 1, day);
    if (date.getUTCFullYear() !== year ||
        date.getUTCMonth() !== month - 1 ||
        date.getUTCDate() !== day) {
        return null;
    }
    return { month, day };
}
function periodAnchorFromDate(value) {
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
function utcDate(year, monthIndex, day) {
    return new Date(Date.UTC(year, monthIndex, day));
}
function lastDayOfMonth(year, monthIndex) {
    return utcDate(year, monthIndex + 1, 0);
}
function startOfIsoWeek(date) {
    const day = date.getUTCDay();
    const offsetToMonday = day === 0 ? -6 : 1 - day;
    return utcDate(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + offsetToMonday);
}
function addDays(date, days) {
    return utcDate(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + days);
}
function addCalendarMonths(date, months) {
    const totalMonths = date.getUTCFullYear() * 12 + date.getUTCMonth() + months;
    const year = Math.floor(totalMonths / 12);
    const monthIndex = ((totalMonths % 12) + 12) % 12;
    const lastDay = lastDayOfMonth(year, monthIndex).getUTCDate();
    const day = Math.min(date.getUTCDate(), lastDay);
    return utcDate(year, monthIndex, day);
}
function clampDay(year, month, day) {
    const lastDay = lastDayOfMonth(year, month - 1).getUTCDate();
    return Math.min(day, lastDay);
}
function isDefaultAnchor(anchor) {
    return anchor.month === 1 && anchor.day === 1;
}
function monthName(monthIndex, locale) {
    const names = locale === 'ar' ? MONTH_NAMES_AR : MONTH_NAMES_EN;
    const name = names[monthIndex];
    return name ?? String(monthIndex + 1);
}
function formatLongDate(date, locale) {
    const monthIndex = date.getUTCMonth();
    return `${String(date.getUTCDate())} ${monthName(monthIndex, locale)} ${String(date.getUTCFullYear())}`;
}
function generateExpectedPeriods(code, options) {
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
function buildSpanningPeriods(year, count, spanMonths, anchor, monthFilter) {
    const startDay = clampDay(year, anchor.month, anchor.day);
    const cycleStart = utcDate(year, anchor.month - 1, startDay);
    const useClassicLabels = isDefaultAnchor(anchor);
    const periods = [];
    for (let index = 0; index < count; index += 1) {
        const start = addCalendarMonths(cycleStart, index * spanMonths);
        const end = addDays(addCalendarMonths(start, spanMonths), -1);
        if (monthFilter !== undefined && start.getUTCMonth() !== monthFilter - 1) {
            continue;
        }
        periods.push({
            periodStartDate: formatDateOnly(start),
            periodEndDate: formatDateOnly(end),
            labelEn: spanningLabel(start, end, index, spanMonths, count, 'en', useClassicLabels),
            labelAr: spanningLabel(start, end, index, spanMonths, count, 'ar', useClassicLabels),
        });
    }
    return periods;
}
function spanningLabel(start, end, index, spanMonths, count, locale, useClassicLabels) {
    if (useClassicLabels && spanMonths === 1) {
        const monthIndex = start.getUTCMonth();
        const year = start.getUTCFullYear();
        return `${monthName(monthIndex, locale)} ${String(year)}`;
    }
    if (useClassicLabels && spanMonths === 3 && count === 4) {
        const quarterNumber = index + 1;
        const year = start.getUTCFullYear();
        if (locale === 'ar') {
            const quarterLabel = QUARTER_LABELS_AR[index] ?? `Q${String(quarterNumber)}`;
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
    if (useClassicLabels &&
        (spanMonths === 36 || spanMonths === 60) &&
        count === 1) {
        return `${String(start.getUTCFullYear())}–${String(end.getUTCFullYear())}`;
    }
    return `${formatLongDate(start, locale)} – ${formatLongDate(end, locale)}`;
}
function buildDailyPeriods(year, month) {
    const startMonth = month === undefined ? 0 : month - 1;
    const endMonth = month === undefined ? 11 : month - 1;
    const periods = [];
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
function buildWeeklyPeriods(year, month) {
    const yearStart = utcDate(year, 0, 1);
    const yearEnd = utcDate(year, 11, 31);
    let cursor = startOfIsoWeek(yearStart);
    const periods = [];
    while (cursor <= yearEnd) {
        const weekEnd = addDays(cursor, 6);
        const startIso = formatDateOnly(cursor);
        const startsInYear = cursor.getUTCFullYear() === year;
        const startsInMonth = month === undefined || cursor.getUTCMonth() === month - 1;
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
//# sourceMappingURL=frequency-periods.js.map