<template>
  <div class="w-full max-w-full relative">
    <!-- TODO: Maybe remove the "snow" -->
    <UiMeteors :number="30" class="-mt-10" />
    <div class="relative flex items-center justify-center my-10 z-19">
      <div class="relative w-full max-w-[330px] px-5">
        <h1 class="text-2xl font-bold tracking-tight lg:text-3xl">
          Sign up
        </h1>
        <p class="mt-1 text-muted-foreground">
          Create a new account
        </p>
        <form class="mt-10" @submit="handleSubmit">
          <fieldset :disabled="isSubmitting" class="grid gap-5">
            <div>
              <UiLabel class="mb-2" for="username">
                Username
              </UiLabel>
              <UiInput
                id="username"
                v-model="form.username"
                required
                placeholder="John Doe"
              />
            </div>
            <div>
              <UiLabel class="mb-2" for="email">
                Email
              </UiLabel>
              <UiInput
                id="email"
                v-model="form.email"
                required
                type="email"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <UiLabel class="mb-2" for="password">
                Password
              </UiLabel>
              <UiInput
                id="password"
                v-model="form.password"
                required
                label="Password"
                type="password"
                placeholder="Password"
              />
            </div>
            <div>
              <UiLabel class="mb-2" for="confirmPassword">
                Confirm Password
              </UiLabel>
              <UiInput
                id="confirmPassword"
                v-model="form.confirmPassword"
                required
                label="Confirm Password"
                type="password"
                placeholder="Password"
              />
            </div>
            <UiButton class="w-full" type="submit" text="Create account" />
          </fieldset>
        </form>
        <p class="mt-8 text-sm text-muted-foreground">
          Already have an account?
          <NuxtLink class="font-semibold text-primary underline-offset-2 hover:underline" :to="$localePath('/login')">
            Log in
          </NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { z } from 'zod'

const { loggedIn, user, session, fetch, clear } = useUserSession()

const isSubmitting = ref(false)

const schema = z.object({
  username: z.string('Username is required').min(4, 'Username must be at least 4 characters'),
  email: z.email('Invalid email'),
  password: z.string('Password is required').min(8, 'Must be at least 8 characters').regex(/[A-Z]/, 'Must contain at least one uppercase letter').regex(/[a-z]/, 'Must contain at least one lowercase letter').regex(/[0-9]/, 'Must contain at least one number'),
  confirmPassword: z.string('Please confirm your password'),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
})

type Schema = z.output<typeof schema>

const form = ref<Schema>({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const handleSubmit = async (e: Event) => {
  e.preventDefault()

  const data = schema.safeParse(form.value)

  if (data.success) {
    isSubmitting.value = true
    try {
      const response = await $fetch('/api/auth/register', {
        method: 'POST',
        body: data.data,
      })

      await fetch()
    } catch (error) {
      console.error(error)
    } finally {
      isSubmitting.value = false
    }
  }
}
</script>
