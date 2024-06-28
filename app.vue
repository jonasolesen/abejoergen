<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtErrorBoundary>
      <Builder />
      <Documentation />
      <template #error="{ error }">
        <p>An error occurred: {{ error }}</p>
      </template>
    </NuxtErrorBoundary>
  </div>
</template>
