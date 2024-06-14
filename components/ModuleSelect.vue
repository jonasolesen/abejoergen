<script setup lang="ts">
const moduleId = defineModel<number | undefined>()

const { data: modules, status } = useFetch('/api/modules', { default: () => [], key: 'modules' })
</script>

<template>
  <Select v-model="moduleId" :disabled="status !== 'success'">
    <SelectTrigger>
      <SelectValue v-if="status === 'pending'" placeholder="Loading..." />
      <SelectValue v-else-if="status === 'error'" placeholder="Could not fetch modules" />
      <SelectValue v-else placeholder="Select a module id" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup v-for="{ id, name } in modules" :key="id">
        <SelectItem :value="id">{{ name }}</SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
