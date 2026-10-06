import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { UpdateColumnDto } from './update-column.dto';
import { UpdateRowDto } from './update-row.dto';

/** Same options as the global pipe in main.ts */
const pipe = new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
});

type DtoClass = typeof UpdateColumnDto | typeof UpdateRowDto;

function validate(metatype: DtoClass, body: object): Promise<unknown> {
  return pipe.transform(body, { type: 'body', metatype });
}

describe.each<[string, DtoClass, number]>([
  ['UpdateColumnDto', UpdateColumnDto, 200],
  ['UpdateRowDto', UpdateRowDto, 300],
])('%s validation', (_name, metatype, maxLabelLength) => {
  it('accepts each property on its own', async () => {
    await expect(validate(metatype, { labelEn: 'Total' })).resolves.toEqual({
      labelEn: 'Total',
    });
    await expect(validate(metatype, { labelAr: 'المجموع' })).resolves.toEqual({
      labelAr: 'المجموع',
    });
    await expect(validate(metatype, { isRequired: true })).resolves.toEqual({
      isRequired: true,
    });
  });

  it('trims labels', async () => {
    await expect(
      validate(metatype, { labelEn: '  Total  ', labelAr: ' المجموع ' }),
    ).resolves.toEqual({ labelEn: 'Total', labelAr: 'المجموع' });
  });

  it('rejects empty and whitespace-only labels', async () => {
    await expect(validate(metatype, { labelEn: '' })).rejects.toBeInstanceOf(
      BadRequestException,
    );
    await expect(validate(metatype, { labelAr: '   ' })).rejects.toBeInstanceOf(
      BadRequestException,
    );
  });

  it('rejects labels longer than the add-endpoint limit', async () => {
    await expect(
      validate(metatype, { labelEn: 'a'.repeat(maxLabelLength) }),
    ).resolves.toBeDefined();
    await expect(
      validate(metatype, { labelEn: 'a'.repeat(maxLabelLength + 1) }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('rejects non-string labels and non-boolean isRequired', async () => {
    await expect(validate(metatype, { labelEn: 123 })).rejects.toBeInstanceOf(
      BadRequestException,
    );
    await expect(
      validate(metatype, { isRequired: 'yes' }),
    ).rejects.toBeInstanceOf(BadRequestException);
    await expect(
      validate(metatype, { isRequired: null }),
    ).rejects.toBeInstanceOf(BadRequestException);
    await expect(validate(metatype, { labelEn: null })).rejects.toBeInstanceOf(
      BadRequestException,
    );
  });

  it('rejects forbidden structural properties', async () => {
    const forbidden = [
      { columnKey: 'NEW_KEY' },
      { rowKey: 'NEW_KEY' },
      { dataTypeId: 2 },
      { controlTypeId: 2 },
      { lookupTypeId: 3 },
      { displayOrder: 5 },
    ];

    for (const body of forbidden) {
      await expect(
        validate(metatype, { labelEn: 'Total', ...body }),
      ).rejects.toBeInstanceOf(BadRequestException);
    }
  });
});
