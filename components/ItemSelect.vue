<script setup lang="ts" generic="T extends number | string">
import { useForwardPropsEmits } from 'radix-vue'
import type { SelectRootEmits, SelectRootProps } from 'radix-vue'
import type { SelectItem } from '~/types/ui'

const props = defineProps<SelectRootProps & { items: SelectItem<T>[]; placeholder?: string }>()
const emits = defineEmits<SelectRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <Select v-bind="forwarded">
    <SelectTrigger>
      <SelectValue :placeholder="placeholder" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup v-for="{ label, value } in items" :key="value">
        <SelectItem :value="value">{{ label }}</SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
