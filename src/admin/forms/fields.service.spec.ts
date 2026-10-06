/// <reference types="jest" />
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FieldsService } from './fields.service';
import { FormFields } from '../../entities/FormFields';
import { FieldOptions } from '../../entities/FieldOptions';
import { FieldDependencies } from '../../entities/FieldDependencies';
import { FormFieldColumns } from '../../entities/FormFieldColumns';
import { FormFieldRows } from '../../entities/FormFieldRows';
import { FormFieldCalculations } from '../../entities/FormFieldCalculations';
import { FormFieldCalculationInputs } from '../../entities/FormFieldCalculationInputs';
import { Forms } from '../../entities/Forms';
import { KpiDefinitions } from '../../entities/KpiDefinitions';
import { Frequencies } from '../../entities/Frequencies';
import { KpiSubmissionPeriods } from '../../entities/KpiSubmissionPeriods';

const FORM_ID = 29;
const FIELD_ID = 412;
const OTHER_FIELD_ID = 999;
const COLUMN_ID = 10;
const ROW_ID = 20;

interface FieldStub {
  fieldId: number;
  formId: number;
}

interface ColumnStub {
  columnId: number;
  fieldId: number;
  columnKey: string;
  labelEn: string;
  labelAr: string;
  displayOrder: number;
  dataTypeId: number;
  controlTypeId: number;
  lookupTypeId: number | null;
  isRequired: boolean | null;
}

interface RowStub {
  rowId: number;
  fieldId: number;
  rowKey: string;
  labelEn: string;
  labelAr: string | null;
  displayOrder: number;
  isRequired: boolean | null;
  isReadOnly: boolean | null;
  isVisible: boolean | null;
}

interface MockRepository {
  findOne: jest.Mock;
  save: jest.Mock;
}

/** Matches a stored record against a TypeORM-style flat `where` object */
function matchesWhere(record: object, where: Record<string, unknown>): boolean {
  const entries = Object.entries(record) as Array<[string, unknown]>;
  const lookup = new Map<string, unknown>(entries);
  return Object.entries(where).every(
    ([key, value]) => lookup.get(key) === value,
  );
}

/** In-memory repository that supports findOne({ where }) and save() */
function createRepository<T extends object>(records: T[]): MockRepository {
  return {
    findOne: jest.fn((options: { where: Record<string, unknown> }) => {
      const found = records.find((record) =>
        matchesWhere(record, options.where),
      );
      return Promise.resolve(found ? { ...found } : null);
    }),
    save: jest.fn((entity: T) => Promise.resolve({ ...entity })),
  };
}

function createUnusedRepository(): MockRepository {
  return { findOne: jest.fn(), save: jest.fn() };
}

describe('FieldsService — column and row updates', () => {
  let service: FieldsService;
  let columnsRepo: MockRepository;
  let rowsRepo: MockRepository;

  const baseColumn: ColumnStub = {
    columnId: COLUMN_ID,
    fieldId: FIELD_ID,
    columnKey: 'QUANTITY',
    labelEn: 'Quantity',
    labelAr: 'الكمية',
    displayOrder: 1,
    dataTypeId: 2,
    controlTypeId: 2,
    lookupTypeId: null,
    isRequired: null,
  };

  const baseRow: RowStub = {
    rowId: ROW_ID,
    fieldId: FIELD_ID,
    rowKey: 'ROW_TOTAL',
    labelEn: 'Total',
    labelAr: 'المجموع',
    displayOrder: 1,
    isRequired: false,
    isReadOnly: null,
    isVisible: true,
  };

  beforeEach(async () => {
    const fields: FieldStub[] = [{ fieldId: FIELD_ID, formId: FORM_ID }];
    columnsRepo = createRepository<ColumnStub>([{ ...baseColumn }]);
    rowsRepo = createRepository<RowStub>([{ ...baseRow }]);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FieldsService,
        {
          provide: getRepositoryToken(FormFields),
          useValue: createRepository(fields),
        },
        {
          provide: getRepositoryToken(FormFieldColumns),
          useValue: columnsRepo,
        },
        { provide: getRepositoryToken(FormFieldRows), useValue: rowsRepo },
        {
          provide: getRepositoryToken(FieldOptions),
          useValue: createUnusedRepository(),
        },
        {
          provide: getRepositoryToken(FieldDependencies),
          useValue: createUnusedRepository(),
        },
        {
          provide: getRepositoryToken(FormFieldCalculations),
          useValue: createUnusedRepository(),
        },
        {
          provide: getRepositoryToken(FormFieldCalculationInputs),
          useValue: createUnusedRepository(),
        },
        {
          provide: getRepositoryToken(Forms),
          useValue: createUnusedRepository(),
        },
        {
          provide: getRepositoryToken(KpiDefinitions),
          useValue: createUnusedRepository(),
        },
        {
          provide: getRepositoryToken(Frequencies),
          useValue: createUnusedRepository(),
        },
        {
          provide: getRepositoryToken(KpiSubmissionPeriods),
          useValue: createUnusedRepository(),
        },
      ],
    }).compile();

    service = module.get<FieldsService>(FieldsService);
  });

  describe('updateColumn', () => {
    it('updates only labelEn and preserves every other property', async () => {
      const result = await service.updateColumn(FORM_ID, FIELD_ID, COLUMN_ID, {
        labelEn: 'Qty',
      });

      expect(result).toEqual({ ...baseColumn, labelEn: 'Qty' });
    });

    it('updates only labelAr', async () => {
      const result = await service.updateColumn(FORM_ID, FIELD_ID, COLUMN_ID, {
        labelAr: 'العدد',
      });

      expect(result).toEqual({ ...baseColumn, labelAr: 'العدد' });
    });

    it('updates only isRequired', async () => {
      const result = await service.updateColumn(FORM_ID, FIELD_ID, COLUMN_ID, {
        isRequired: true,
      });

      expect(result).toEqual({ ...baseColumn, isRequired: true });
    });

    it('updates several properties at once', async () => {
      const result = await service.updateColumn(FORM_ID, FIELD_ID, COLUMN_ID, {
        labelEn: 'Qty',
        labelAr: 'العدد',
        isRequired: false,
      });

      expect(result).toEqual({
        ...baseColumn,
        labelEn: 'Qty',
        labelAr: 'العدد',
        isRequired: false,
      });
    });

    it('rejects an empty body with 400 and does not save', async () => {
      await expect(
        service.updateColumn(FORM_ID, FIELD_ID, COLUMN_ID, {}),
      ).rejects.toBeInstanceOf(BadRequestException);
      expect(columnsRepo.save).not.toHaveBeenCalled();
    });

    it('returns 404 when the field does not belong to the form', async () => {
      await expect(
        service.updateColumn(FORM_ID + 1, FIELD_ID, COLUMN_ID, {
          labelEn: 'Qty',
        }),
      ).rejects.toBeInstanceOf(NotFoundException);
      expect(columnsRepo.save).not.toHaveBeenCalled();
    });

    it('returns 404 when the column belongs to a different field', async () => {
      await expect(
        service.updateColumn(FORM_ID, OTHER_FIELD_ID, COLUMN_ID, {
          labelEn: 'Qty',
        }),
      ).rejects.toBeInstanceOf(NotFoundException);
      expect(columnsRepo.save).not.toHaveBeenCalled();
    });

    it('returns 404 when the column does not exist', async () => {
      await expect(
        service.updateColumn(FORM_ID, FIELD_ID, COLUMN_ID + 1, {
          labelEn: 'Qty',
        }),
      ).rejects.toBeInstanceOf(NotFoundException);
      expect(columnsRepo.save).not.toHaveBeenCalled();
    });
  });

  describe('updateRow', () => {
    it('updates only labelEn and preserves every other property', async () => {
      const result = await service.updateRow(FORM_ID, FIELD_ID, ROW_ID, {
        labelEn: 'Grand total',
      });

      expect(result).toEqual({ ...baseRow, labelEn: 'Grand total' });
    });

    it('updates only labelAr', async () => {
      const result = await service.updateRow(FORM_ID, FIELD_ID, ROW_ID, {
        labelAr: 'الإجمالي',
      });

      expect(result).toEqual({ ...baseRow, labelAr: 'الإجمالي' });
    });

    it('updates only isRequired', async () => {
      const result = await service.updateRow(FORM_ID, FIELD_ID, ROW_ID, {
        isRequired: true,
      });

      expect(result).toEqual({ ...baseRow, isRequired: true });
    });

    it('rejects an empty body with 400 and does not save', async () => {
      await expect(
        service.updateRow(FORM_ID, FIELD_ID, ROW_ID, {}),
      ).rejects.toBeInstanceOf(BadRequestException);
      expect(rowsRepo.save).not.toHaveBeenCalled();
    });

    it('returns 404 when the field does not belong to the form', async () => {
      await expect(
        service.updateRow(FORM_ID + 1, FIELD_ID, ROW_ID, { labelEn: 'Total' }),
      ).rejects.toBeInstanceOf(NotFoundException);
      expect(rowsRepo.save).not.toHaveBeenCalled();
    });

    it('returns 404 when the row belongs to a different field', async () => {
      await expect(
        service.updateRow(FORM_ID, OTHER_FIELD_ID, ROW_ID, {
          labelEn: 'Total',
        }),
      ).rejects.toBeInstanceOf(NotFoundException);
      expect(rowsRepo.save).not.toHaveBeenCalled();
    });

    it('returns 404 when the row does not exist', async () => {
      await expect(
        service.updateRow(FORM_ID, FIELD_ID, ROW_ID + 1, { labelEn: 'Total' }),
      ).rejects.toBeInstanceOf(NotFoundException);
      expect(rowsRepo.save).not.toHaveBeenCalled();
    });
  });
});
