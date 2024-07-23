export function validateTable(num: number, min: number, max: number){
  const isValid: boolean = num >= min && num <= max;

  if (!isValid) throw new Error("Invalid table.")
  return isValid;
} 

