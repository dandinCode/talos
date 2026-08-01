<template>
    <div
        v-if="analysis.modelId === 'custom'"
        class="bg-black/20 border border-[rgb(185_157_117/0.1)] rounded-[20px] !p-5 !mt-4"
    >
        <div class="flex items-center !gap-2.5 !mb-4">
            <v-icon color="#B99D75" size="20">mdi-shield-lock-outline</v-icon>
            <h3 class="text-talos-cream text-base max-sm:!text-sm font-semibold !m-0">Restrições do Modelo</h3>
        </div>

        <p class="text-[rgb(255_252_239/0.6)] !text-xs !mb-4 !m-0">
            Escolha quais restrições de programação linear serão aplicadas na otimização.
        </p>

        <div class="flex flex-col !gap-3">
            <div
                v-for="item in constraintOptions"
                :key="item.key"
                class="flex items-start !gap-3 !p-3 rounded-xl border border-[rgb(185_157_117/0.12)] bg-black/25"
            >
                <v-switch
                    :model-value="analysis.constraints[item.key]"
                    color="#B99D75"
                    density="compact"
                    hide-details
                    @update:model-value="analysis.setConstraint(item.key, Boolean($event))"
                />
                <div>
                    <p class="text-talos-cream !text-sm font-medium !m-0">{{ item.label }}</p>
                    <p class="text-[rgb(255_252_239/0.55)] !text-xs !m-0 !mt-1">{{ item.description }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useAnalysisStore } from '@/stores/analysisStore';
import type { ConstraintConfig } from '@/types/types';

const analysis = useAnalysisStore();

const constraintOptions: {
    key: keyof ConstraintConfig;
    label: string;
    description: string;
}[] = [
    {
        key: 'useRiskLimit',
        label: 'Limite de risco',
        description: 'A carteira não pode ultrapassar o risco aceitável (volatilidade ponderada).',
    },
    {
        key: 'useSectorCap',
        label: 'Limite por setor',
        description: 'Nenhum setor pode concentrar mais do que o percentual máximo definido.',
    },
    {
        key: 'useFullAllocation',
        label: 'Alocação total',
        description: 'Todo o capital deve ser distribuído entre os ativos (100%).',
    },
    {
        key: 'requireMinSectors',
        label: 'Diversificação mínima',
        description: 'Exige pelo menos 5 setores diferentes na seleção de ações.',
    },
];
</script>
