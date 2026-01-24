const SALT = 'zatway-sadasdas-sfsdfsd-2423'; // меняй на что-то своё, но фиксированное

export function hashPassword(password: string): Promise<string> {
  let h = 0;
  const str = password + SALT;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(31, h) + str.charCodeAt(i) | 0;
  }
  return Promise.resolve('s$' + Math.abs(h).toString(36));
}

export function verifyPassword(
  password: string,
  hash: string,
): Promise<boolean> {
  return hashPassword(password).then(h => h === hash);
}
