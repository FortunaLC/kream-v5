import type { NuxtError } from '#app'

const categories = ref([])
const categoriesError: Ref<NuxtError | null> = ref(null)
const categoriesPending = ref(true)

export const useContent = () => {
  const fetchCategories = async () => {
    const { data, error, pending } = await useAsyncData(
      'kream-categories',
      () => $fetch('/api/categories', { method: 'GET' }),
    )

    categoriesPending.value = pending.value

    if (error.value) {
      categoriesError.value = error.value
      return
    }

    categories.value = data.value || []
  }

  return {
    fetchCategories,
    categories,
    categoriesError,
    categoriesPending,
  }
}
