<script setup lang="ts">
const router = useRouter()

const file = computed({
  get: () => {
    const file = router.currentRoute.value.query.file
    return typeof file === 'string' ? file : 'first'
  },
  set: (val) => router.replace({ query: { file: val } }),
})

const { data, refresh } = useFetch(() => '/api/html/' + file.value)

watch(file, async (val) => {
  if (val) await refresh()
})
</script>

<template>
  <div class="space-y-4 p-6">
    <h1 class="font-bold">Documentation</h1>
    <Button @click="file = 'first'">First</Button>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div class="prose min-h-4 border border-slate-800" v-html="data" />
  </div>
</template>
