export function validatePlayerInput(data: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.ime || typeof data.ime !== 'string' || data.ime.trim() === '') {
    errors.push('ime is required and must be a non-empty string');
  }

  if (!data.prezime || typeof data.prezime !== 'string' || data.prezime.trim() === '') {
    errors.push('prezime is required and must be a non-empty string');
  }

  if (data.broj_dresa !== undefined && data.broj_dresa !== null) {
    const num = Number(data.broj_dresa);
    if (isNaN(num) || num < 0 || num > 99) {
      errors.push('broj_dresa must be a number between 0 and 99');
    }
  }

  if (data.vrijednost_eur !== undefined && data.vrijednost_eur !== null) {
    const num = Number(data.vrijednost_eur);
    if (isNaN(num) || num < 0) {
      errors.push('vrijednost_eur must be a positive number');
    }
  }

  if (data.klub_id !== undefined && data.klub_id !== null) {
    const num = Number(data.klub_id);
    if (isNaN(num) || num < 1) {
      errors.push('klub_id must be a valid positive integer');
    }
  }

  return { valid: errors.length === 0, errors };
}
