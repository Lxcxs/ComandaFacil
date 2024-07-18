type FieldValue = string | number | boolean | undefined;

export function validateFields(fields: Record<string, FieldValue>, requiredFields: string[]) {
  requiredFields.forEach(field => {
    const value = fields[field];
    if (value === undefined || value === null || value === '') {
      throw new Error(`Please fill in the ${field}.`);
    }
  });
}
