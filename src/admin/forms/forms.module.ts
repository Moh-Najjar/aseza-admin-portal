import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormsController } from './forms.controller';
import { FieldsController } from './fields.controller';
import { FormsService } from './forms.service';
import { FieldsService } from './fields.service';
import { Forms } from '../../entities/Forms';
import { FormFields } from '../../entities/FormFields';
import { FieldOptions } from '../../entities/FieldOptions';
import { FieldDependencies } from '../../entities/FieldDependencies';
import { FormFieldColumns } from '../../entities/FormFieldColumns';
import { FormFieldRows } from '../../entities/FormFieldRows';
import { FormFieldCalculations } from '../../entities/FormFieldCalculations';
import { FormFieldCalculationInputs } from '../../entities/FormFieldCalculationInputs';
import { KpiDefinitions } from '../../entities/KpiDefinitions';
import { Frequencies } from '../../entities/Frequencies';
import { KpiSubmissionPeriods } from '../../entities/KpiSubmissionPeriods';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Forms,
      FormFields,
      FieldOptions,
      FieldDependencies,
      FormFieldColumns,
      FormFieldRows,
      FormFieldCalculations,
      FormFieldCalculationInputs,
      KpiDefinitions,
      Frequencies,
      KpiSubmissionPeriods,
    ]),
  ],
  controllers: [FormsController, FieldsController],
  providers: [FormsService, FieldsService],
})
export class FormsManagementModule {}
