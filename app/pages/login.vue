<template>
  <div class="w-full max-w-full relative">
    <!-- TODO: Maybe remove the "snow" -->
    <UiMeteors :number="30" class="-mt-10" />
    <div class="flex items-center justify-center my-10 relative z-19">
      <div class="w-full max-w-[330px] px-5">
        <h1 class="text-2xl font-bold tracking-tight lg:text-3xl">Log in</h1>
        <p class="mt-1 text-muted-foreground">Enter your email & password to log in.</p>
        <form class="mt-10" @submit="handleFormSubmit">
          <fieldset :disabled="isSubmitting" class="grid gap-5">
            <div>
              <UiInput label="Email" type="email" name="email" placeholder="john@example.com" v-model="form.email" />
            </div>
            <div>
              <UiInput label="Password" type="password" name="password" placeholder="Password"
                v-model="form.password" />
            </div>
            <div>
              <UiButton class="w-full" type="submit" text="Log in" />
            </div>
          </fieldset>
        </form>
        <p class="mt-8 text-sm">
          <NuxtLink class="font-semibold text-primary underline-offset-2 hover:underline" to="#">Forgot password?
          </NuxtLink>
        </p>
        <p class="mt-4 text-sm text-muted-foreground">
          Don't have an account?
          <NuxtLink class="font-semibold text-primary underline-offset-2 hover:underline" to="#">Create account
          </NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { z } from 'zod'

const { loggedIn, fetch } = useUserSession()
const localePath = useLocalePath()

if (loggedIn.value) {
  await fetch()
  navigateTo(localePath('/'))
}

const isSubmitting = ref(false)

const schema = z.object({
  email: z.email('Email is required'),
  password: z.string('Password is required').min(1),
})

type Schema = z.output<typeof schema>

const form = ref<Schema>({
  email: '',
  password: '',
})

const handleFormSubmit = async (e: Event) => {
  e.preventDefault()
  isSubmitting.value = true

  // TODO: Show erros in form
  const data = schema.safeParse(form.value)

  if (data.success) {
    try {
      const response = await $fetch('/api/auth/login', {
        method: 'POST',
        body: data.data
      })

      await fetch()
      navigateTo(localePath('/'))
    } catch (error) {
      console.error('Login failed:', error)
    } finally {
      isSubmitting.value = false
    }
  }
}
</script>
