"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FIELD_RESPONSE_RELATIONS = void 0;
exports.mapFormFieldToResponse = mapFormFieldToResponse;
const frequency_periods_1 = require("../../../common/frequency/frequency-periods");
exports.FIELD_RESPONSE_RELATIONS = {
    kpi: { frequency: true },
    fieldOptions: true,
    fieldDependencies: true,
    formFieldColumns: true,
    formFieldRows: true,
    formFieldCalculations: { formFieldCalculationInputs: true },
};
function mapFormFieldToResponse(field) {
    return {
        fieldId: field.fieldId,
        formId: field.formId,
        fieldKey: field.fieldKey,
        labelEn: field.labelEn,
        labelAr: field.labelAr,
        isRequired: field.isRequired,
        minValue: field.minValue,
        maxValue: field.maxValue,
        minLength: field.minLength,
        maxLength: field.maxLength,
        regexPattern: field.regexPattern,
        placeholderEn: field.placeholderEn,
        placeholderAr: field.placeholderAr,
        defaultValue: field.defaultValue,
        displayOrder: field.displayOrder,
        helpTextEn: field.helpTextEn,
        helpTextAr: field.helpTextAr,
        isReadOnly: field.isReadOnly,
        isVisible: field.isVisible,
        validationMessageEn: field.validationMessageEn,
        validationMessageAr: field.validationMessageAr,
        createdAt: field.createdAt,
        dataTypeId: field.dataTypeId,
        controlTypeId: field.controlTypeId,
        lookupTypeId: field.lookupTypeId,
        kpiId: field.kpiId,
        isActive: field.kpi?.isActive ?? null,
        frequencyId: field.kpi?.frequencyId ?? null,
        frequency: mapFrequencySummary(field),
        periodStartDate: mapPeriodStartDate(field),
        fieldOptions: field.fieldOptions ?? [],
        fieldDependencies: field.fieldDependencies ?? [],
        formFieldColumns: field.formFieldColumns ?? [],
        formFieldRows: field.formFieldRows ?? [],
        formFieldCalculations: field.formFieldCalculations ?? null,
    };
}
function mapFrequencySummary(field) {
    const frequency = field.kpi?.frequency;
    if (!frequency) {
        return null;
    }
    return {
        frequencyId: frequency.frequencyId,
        code: frequency.code,
        nameEn: frequency.nameEn,
        nameAr: frequency.nameAr,
        description: frequency.description,
        hasDiscretePeriods: (0, frequency_periods_1.hasDiscretePeriods)(frequency.code),
        supportsCustomPeriodStart: (0, frequency_periods_1.supportsCustomPeriodStart)(frequency.code),
    };
}
function mapPeriodStartDate(field) {
    const referenceDate = field.kpi?.referenceDate;
    if (!referenceDate) {
        return null;
    }
    return (0, frequency_periods_1.formatDateOnly)(referenceDate);
}
//# sourceMappingURL=form-field.mapper.js.map