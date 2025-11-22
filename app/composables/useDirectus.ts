import type { Translatable } from '~/types/translations'

export const useDirectus = () => {
  function getTranslation<T extends Translatable>(
    translations: T[] | null = [],
    locale: string,
    key: keyof T = 'languages_code' as keyof T,
  ) {
    if (!translations || translations.length === 0) {
      return ''
    }
    const translation = translations.find(t => t.languages_code === locale)
    if (!translation) {
      return (
        translations.find(t => t.languages_code === 'en-US')
        || translations[0]
      )
    }
    return translation[key]
  }

  return {
    getTranslation,
  }
}
