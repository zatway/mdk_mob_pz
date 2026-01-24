export function calculateAge(yearOfBirth: string): number {
  const today = new Date();
  const birthDate = new Date(yearOfBirth); // month is 0-based

  let age = today.getFullYear() - birthDate.getFullYear();

  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
}
