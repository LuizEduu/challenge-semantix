export function validatePageParameter (page: string): boolean {
  return /^\d*$/.test(page) // valida se container apenas digito de 1-9 no parametro
}
