export type Dict<T = any> = Record<string, T>;

export interface ReturnUseTheme {
  sallet: Dict
  hulabaluza: Dict
  ultraMusic: Dict
}

export type AllThemes = Record<string, {
  name: string
  logo: string
  background: string | undefined
  theme: Dict<any>
}> 