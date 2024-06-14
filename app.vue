<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtErrorBoundary>
      <Builder />
      <template #error="{ error }">
        <p>An error occurred: {{ error }}</p>
      </template>
    </NuxtErrorBoundary>
  </div>
</template>
