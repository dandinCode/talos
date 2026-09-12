import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

function readEnvFlag(value: string | undefined): boolean {
  return String(value ?? '').trim().toLowerCase() === 'true'
}

export const useSystemStore = defineStore('system', () => {
  const maintenanceMode = ref(readEnvFlag(import.meta.env.VITE_MAINTENANCE_MODE))
  const maintenanceMessage = ref(
    (import.meta.env.VITE_MAINTENANCE_MESSAGE as string | undefined)?.trim() || '',
  )
  const maintenanceEstimatedReturn = ref(
    (import.meta.env.VITE_MAINTENANCE_ESTIMATED_RETURN as string | undefined)?.trim() || '',
  )

  const isUnderMaintenance = computed(() => maintenanceMode.value)

  function enableMaintenance(message?: string, estimatedReturn?: string) {
    maintenanceMode.value = true
    if (message !== undefined) maintenanceMessage.value = message
    if (estimatedReturn !== undefined) maintenanceEstimatedReturn.value = estimatedReturn
  }

  function disableMaintenance() {
    maintenanceMode.value = false
  }

  return {
    maintenanceMode,
    maintenanceMessage,
    maintenanceEstimatedReturn,
    isUnderMaintenance,
    enableMaintenance,
    disableMaintenance,
  }
})
