<script setup lang="ts">
import type { SelectItem } from '~/types/ui'
import Select from './ItemSelect.vue'

const baseRackName = 'Rack6'
const rackSlots = [4, 6, 8, 10, 12, 14]
const selectedRackSlots = ref(rackSlots[0])

const rackSlotItems: SelectItem<number>[] = rackSlots.map((slot) => ({
  label: `${baseRackName} | ${slot}`,
  value: slot,
}))

const { data: modules, status } = useFetch('/api/modules', {
  default: () => [],
  key: 'modules',
  transform: (data) => data.map(({ name, id }) => ({ label: name, value: id })),
})

type Rack = {
  id: number // Currently only needed for v-key to ensure the correct rack is removed
  slotCount: number
  slots: number[]
}

const racks = ref<Rack[]>([
  {
    id: new Date().valueOf(),
    slotCount: Math.min(...rackSlots),
    slots: Array.from({ length: Math.max(...rackSlots) }),
  },
])

function addRack() {
  racks.value.push({
    id: new Date().valueOf(),
    slotCount: selectedRackSlots.value,
    slots: Array.from({ length: Math.max(...rackSlots) }),
  })
}

function removeRack(index: number) {
  console.log('removeRack', index)
  racks.value.splice(index, 1)
}
</script>

<template>
  <div class="p-6">
    <div class="mb-4 rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead class="w-[200px] text-center">Rack | Slot</TableHead>
            <template v-for="i in selectedRackSlots" :key="i">
              <TableHead class="text-center">Slot {{ i }}</TableHead>
            </template>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="(rack, i) in racks" :key="rack.id">
            <TableCell class="font-medium">
              <Select v-model="selectedRackSlots" :items="rackSlotItems" placeholder="Select rack" />
            </TableCell>
            <template v-for="j in selectedRackSlots" :key="j">
              <TableCell class="max-w-[100px]">
                <Select v-model="rack.slots[j]" :items="modules" placeholder="Select module" />
              </TableCell>
            </template>
            <TableCell class="space-x-4 text-right">
              <Button v-if="racks.length > 1" @click="removeRack(i)">Remove</Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
    <Button @click="addRack">Add rack</Button>
  </div>
</template>
