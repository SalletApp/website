import { useEffect, useState } from 'react'

/**
 * @function useParam
 * @description Obtiene el valor del parametro **theme** en la URL.
 * @returns {string | undefined} El valor de la variable **theme** en la URL.
 */
export function useParam (): { theme: string | undefined } {
  const [theme, setTheme] = useState<string | undefined>(undefined)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const theme =
        params.get('theme') !== null &&
        params.get('theme') !== undefined &&
        params.get('theme') !== ''
          ? decodeURIComponent(params.get('theme') as string)
          : undefined
          setTheme(theme)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { theme }
}