<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
    modelValue: boolean
    portfolioId: number | null
    portfolioName: string
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
    (e: 'confirm', id: number): void
}>()

const loading = ref(false)

function close() {
    emit('update:modelValue', false)
}

async function handleConfirm() {
    if (!props.portfolioId) return

    loading.value = true

    try {
        emit('confirm', props.portfolioId)
        close()
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <v-dialog :model-value="modelValue" max-width="400" @update:modelValue="emit('update:modelValue', $event)">
        <v-card class="delete-dialog">
            <v-card-title class="text-h5">
                Excluir Portfólio
            </v-card-title>

            <v-card-text>
                Tem certeza que deseja excluir o portfólio
                <strong>"{{ portfolioName }}"</strong>?
                Esta ação não pode ser desfeita.
            </v-card-text>

            <v-card-actions>
                <v-spacer />

                <v-btn variant="text" @click="close">
                    Cancelar
                </v-btn>

                <v-btn color="error" variant="tonal" :loading="loading" @click="handleConfirm">
                    Excluir
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>