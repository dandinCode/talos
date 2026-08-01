<template>
    <div class="bg-black/20 border border-[rgb(185_157_117/0.1)] rounded-[20px] !p-5">
        <div class="flex items-center !gap-2.5 !mb-4">
            <v-icon color="#B99D75" size="20">mdi-tune-variant</v-icon>
            <h3 class="text-talos-cream text-base max-sm:!text-sm font-semibold !m-0">Modelo de Otimização</h3>
        </div>

        <v-progress-linear v-if="loading" indeterminate color="#B99D75" class="!mb-4" />

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 !gap-3">
            <button
                v-for="model in models"
                :key="model.id"
                type="button"
                class="text-left !p-4 rounded-2xl border transition-all duration-200"
                :class="analysis.modelId === model.id
                    ? '!border-talos-gold !bg-[rgb(185_157_117/0.12)]'
                    : 'border-[rgb(185_157_117/0.15)] bg-black/25 hover:border-[rgb(185_157_117/0.3)]'"
                @click="selectModel(model)"
            >
                <div class="flex items-center justify-between !mb-2">
                    <span class="text-talos-cream font-semibold">{{ model.name }}</span>
                    <v-chip
                        size="x-small"
                        variant="tonal"
                        :color="model.customizable ? '#f59e0b' : '#B99D75'"
                    >
                        v{{ model.version }}
                    </v-chip>
                </div>
                <p class="text-[rgb(255_252_239/0.6)] !text-xs !m-0 leading-relaxed">
                    {{ model.description }}
                </p>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useAnalysisStore, DEFAULT_CONSTRAINTS } from '@/stores/analysisStore';
import { fetchOptimizationModels } from '@/services/optimizationModels';
import type { OptimizationModel } from '@/types/types';

const analysis = useAnalysisStore();
const models = ref<OptimizationModel[]>([]);
const loading = ref(true);

onMounted(async () => {
    try {
        models.value = await fetchOptimizationModels();
    } catch (error) {
        console.error(error);
        models.value = [
            {
                id: '1.0',
                name: 'Modelo 1.0',
                description: 'Modelo original do Talos com todas as restrições padrão.',
                version: '1.0',
                customizable: false,
                defaultConstraints: { ...DEFAULT_CONSTRAINTS },
            },
            {
                id: 'custom',
                name: 'Personalizável',
                description: 'Escolha quais restrições aplicar na otimização.',
                version: 'custom',
                customizable: true,
                defaultConstraints: { ...DEFAULT_CONSTRAINTS },
            },
        ];
    } finally {
        loading.value = false;
    }
});

function selectModel(model: OptimizationModel) {
    analysis.setModelId(model.id);
    if (!model.customizable) {
        analysis.resetConstraints();
    }
}
</script>
