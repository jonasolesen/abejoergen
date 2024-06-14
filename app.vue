<script setup lang="ts">
function test() {
  console.log('hallo');
}

// const moduleId = 1;
const moduleId = ref<number | undefined>();
const { data, error, refresh } = useFetch(`/api/modules/${moduleId.value}`, {
  immediate: false,
});

watch(data, (value) => console.log('data', value));
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <label for="moduleId">
      Module id
      <input type="number" v-model="moduleId" />
    </label>
    <button @click="refresh">Fetch</button>
    <pre v-if="data">{{ data }}</pre>
    <div v-else-if="error">An error occurred: {{ error }}</div>
  </div>
</template>
