import { useState, useEffect, useCallback } from 'react'

/**
 * @function useLocalStorage
 * @description Custom hook de React para almacenar datos en el localStorage
 * @param {string} key 
 * @returns {Array} [storedValue, setValue]
 */
export function useLocalStorage<T> (
  key: string
): [T | undefined, (value: T | ((prevValue: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T | undefined>(undefined)

  const value = useCallback((): undefined => {
    if (typeof window !== 'undefined') {
      try {
        const item = window.localStorage.getItem(key)
        return item !== null ? JSON.parse(item) : undefined
      } catch (e) {
        console.error(e)
        return undefined
      }
    }
  }, [key])

  useEffect(() => {
    setStoredValue(value)
  }, [value])

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent): void => {
      if (e.key === key && e.newValue !== null) {
        setStoredValue(JSON.parse(e.newValue))
      }
    }
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', handleStorageChange)
    }
    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [key])

  const setValue = (value: T | ((prevValue: T) => T)): void => {
    if (typeof window !== 'undefined') {
      try {
        const valueToStore =
          value instanceof Function
            ? storedValue !== undefined
              ? value(storedValue)
              : undefined
            : value
        setStoredValue(valueToStore)
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      } catch (e) {
        console.error(e)
      }
    }
  }

  return [storedValue, setValue]
}