<script setup lang="ts">
import type { FormSubmitEvent, AuthFormField } from '@nuxt/ui'
import { z } from 'zod'

const toast = useToast()
const { loggedIn, user, session, fetch, clear } = useUserSession()

const fields: AuthFormField[] = [{
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
  name: 'remember',
  label: 'Remember me',
  type: 'checkbox',
}]

const schema = z.object({
  email: z.string('Email is required'),
  password: z.string('Password is required'),
})

type Schema = z.output<typeof schema>

async function onSubmit(payload: FormSubmitEvent<Schema>) {
  try {
    const data = await $fetch('/api/auth/login', {
      method: 'POST',
      body: payload.data,
    })

    await fetch()
  } catch (error) {
    if (error && typeof error === 'object' && 'statusMessage' in error) {
      toast.add({
        color: 'error',
        title: 'Login failed',
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
        <p>Login data: test2@example.com - Test1234</p>
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
