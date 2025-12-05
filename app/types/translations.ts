const { locales } = useI18n()

// Type that is an enum for only the locale codes available
export type LocaleCodes = (typeof locales.value)[number]['code']

export interface Translatable {
  languages_code?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}
