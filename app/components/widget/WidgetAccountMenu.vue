<template>
  <UiPopover>
    <UiPopoverTrigger as-child>
      <UiButton to="#" variant="ghost" size="sm">
        <Icon class="size-5" name="lucide:user" />
      </UiButton>
    </UiPopoverTrigger>
    <UiPopoverContent class="w-44 p-3">
      <div class="space-y-3">
        <div class="text-xs font-medium text-muted-foreground">
          Account
        </div>
        <UiGradientDivider />
        <UiButton
          :to="$localePath(`/profile/${user.username}`)"
          variant="ghost"
          size="sm"
          class="w-full justify-start"
        >
          <Icon class="size-5" name="lucide:user-pen" />
          Profile
        </UiButton>
        <UiButton
          :to="$localePath('/')"
          variant="ghost"
          size="sm"
          class="w-full justify-start"
        >
          <Icon class="size-5" name="lucide:settings" />
          Settings
        </UiButton>
        <UiButton
          :to="$localePath('/')"
          variant="ghost"
          size="sm"
          class="w-full justify-start"
        >
          <Icon class="size-5" name="lucide:heart" />
          Favorites
        </UiButton>
        <UiButton
          :to="$localePath('/')"
          variant="ghost"
          size="sm"
          class="w-full justify-start"
        >
          <Icon class="size-5" name="lucide:user-check" />
          Following
        </UiButton>
        <UiGradientDivider />
        <UiButton
          variant="ghost"
          size="sm"
          class="w-full justify-start"
          @click="clear"
        >
          <Icon class="size-5" name="lucide:log-out" />
          Log out
        </UiButton>
      </div>
    </UiPopoverContent>
  </UiPopover>
</template>

<script setup lang="ts">
const { user, clear } = useUserSession()
</script>

<style scoped></style>
