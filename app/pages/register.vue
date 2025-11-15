<script setup lang="ts">
import type { FormSubmitEvent, AuthFormField } from '@nuxt/ui'
import { z } from 'zod'

const toast = useToast()
const { loggedIn, user, session, fetch, clear } = useUserSession()

const fields: AuthFormField[] = [{
  name: 'username',
  type: 'text',
  label: 'Username',
  placeholder: 'Enter your username',
  required: true,
}, {
  name: 'email',
  type: 'email',
  label: 'Email',
  placeholder: 'Enter your email',
  required: true,
}, {
  name: 'password',
  label: 'Password',
  type: 'password',
  placeholder: 'Enter your password',
  required: true,
}, {
  name: 'confirmPassword',
  label: 'Confirm Password',
  type: 'password',
  placeholder: 'Confirm your password',
  required: true,
}, {
  name: 'remember',
  label: 'Remember me',
  type: 'checkbox',
}]

const schema = z.object({
  username: z.string('Username is required').min(4, 'Username must be at least 4 characters'),
  email: z.email('Invalid email'),
  password: z.string('Password is required').min(8, 'Must be at least 8 characters').regex(/[A-Z]/, 'Must contain at least one uppercase letter').regex(/[a-z]/, 'Must contain at least one lowercase letter').regex(/[0-9]/, 'Must contain at least one number'),
  confirmPassword: z.string('Please confirm your password'),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
})

// TODO: Refine message is not being shown -> idk why lol

type Schema = z.output<typeof schema>

async function onSubmit(payload: FormSubmitEvent<Schema>) {
  try {
    const data = await $fetch('/api/auth/register', {
      method: 'POST',
      body: payload.data,
    })
    await fetch()
  } catch (error) {
    if (error && typeof error === 'object' && 'statusMessage' in error) {
      toast.add({
        color: 'error',
        title: 'Registration failed',
        description: error.statusMessage as string,
      })
    } else {
      console.error('An unexpected error occurred:', error)
    }
  }
}
</script>

<template>
  <div class="w-full flex justify-center">
    <div class="container">
      <div class="flex flex-col items-center justify-center gap-4 p-4">
        <UPageCard class="w-full max-w-md">
          <UAuthForm
            :schema="schema"
            title="Login"
            description="Enter your credentials to access your account."
            icon="i-lucide-user"
            :fields="fields"
            @submit="onSubmit"
          />
        </UPageCard>
      </div>
      <div>
        <UButton @click="console.log(session)">
          Log Session
        </UButton>
        <UButton color="error" @click="clear">
          Log out
        </UButton>
        <p>{{ loggedIn }}</p>
        <p>{{ user }}</p>
        <p>{{ session }}</p>
      </div>
    </div>
  </div>
</template>
