<template>
  <ProfileTabGeneric>
    <div class="grid md:grid-cols-3 grid-cols-1 gap-5">
      <div>
        <UiLabel class="mb-2 text-lg" for="settings-profile-picture">
          Profile picture
        </UiLabel>
        <p class="text-sm text-muted-foreground">
          This will be displayed on your profile and in comments.
        </p>
      </div>
      <div class="md:col-span-2 col-span-1 flex items-center">
        <UiAvatar
          id="settings-profile-picture"
          src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
          alt="Colm Tuite"
          fallback="CT"
          :delay-ms="600"
          class="size-16"
        />
      </div>

      <UiGradientDivider class="md:col-span-3 col-span-1" />

      <div>
        <UiLabel class="mb-2 text-lg" for="settings-bio">
          Bio
        </UiLabel>
        <p class="text-sm text-muted-foreground">
          This will be displayed on your profile page.
        </p>
      </div>
      <div class="md:col-span-2 col-span-1">
        <WidgetTipTapEditor id="settings-bio" />
      </div>

      <UiGradientDivider class="md:col-span-3 col-span-1" />
      <!-- TODO: Theme Switcher -->
      <!-- <div>
                <UiLabel class="mb-2 text-lg" for="settings-bio">
                    Theme
                </UiLabel>
                <p class="text-sm text-muted-foreground">
                    Choose your site and profile theme.
                </p>
            </div>
            <div class="col-span-2">

            </div> -->

      <div>
        <UiLabel class="mb-2 text-lg">
          Socials
        </UiLabel>
        <p class="text-sm text-muted-foreground">
          Add links to your social media profiles.
        </p>
      </div>
      <div class="md:col-span-2 col-span-1">
        <div class="space-y-5 w-full">
          <UiInputGroup>
            <UiInputGroupInput placeholder="https://x.com/..." />
            <UiInputGroupAddon>
              <Icon name="lucide:twitter" />
            </UiInputGroupAddon>
          </UiInputGroup>
          <UiInputGroup>
            <UiInputGroupInput placeholder="https://instagram.com/..." />
            <UiInputGroupAddon>
              <Icon name="lucide:instagram" />
            </UiInputGroupAddon>
          </UiInputGroup>
          <UiInputGroup>
            <UiInputGroupInput placeholder="https://www..." />
            <UiInputGroupAddon>
              <Icon name="lucide:globe" />
            </UiInputGroupAddon>
          </UiInputGroup>
        </div>
      </div>
    </div>
  </ProfileTabGeneric>
</template>

<script setup lang="ts">
/**
 * - Profile Picture
 * - Bio
 * - Profile Theme
 * - Social Links
 * - Maybe later info like PH (tattoos, piercings, etc...)
 */
</script>
