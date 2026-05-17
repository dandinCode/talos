<template>
    <v-container class="mt-10">
        <v-sheet class="pa-6" rounded elevation="4" color="#121212">
            <h2 class="text-h5 mb-6 text-white">
                Resultado da Otimização
            </h2>
            <v-btn class="mb-6" color="green-accent-3" variant="outlined" @click="openSaveModal = true">
                Salvar Portfólio
            </v-btn>

            <v-row class="mb-6">
                <v-col cols="12" md="4">
                    <v-card class="pa-4 glass-card">
                        <p class="label">Dividend Yield</p>
                        <p class="value">{{ formatPercent(optimization.dividend_yield) }}</p>
                    </v-card>
                </v-col>
                <v-col cols="12" md="4">
                    <v-card class="pa-4 glass-card">
                        <p class="label">Risco da Carteira</p>
                        <p class="value">{{ formatPercent(optimization.portfolio_risk) }}</p>
                    </v-card>
                </v-col>
                <v-col cols="12" md="4">
                    <v-card class="pa-4 glass-card">
                        <p class="label">Risco Aceitável</p>
                        <p class="value">
                            {{ formatPercent(optimization.acceptable_risk) }}
                        </p>
                    </v-card>
                </v-col>
            </v-row>
            <h3 class="text-h6 font-weight-bold mb-4 text-white">
                Alocação por Ativo
            </h3>
            <v-table density="comfortable">
                <thead>
                    <tr>
                        <th>Ação</th>
                        <th>Setor</th>
                        <th>Percentual</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in stockAllocation" :key="item.stock">
                        <td>{{ item.stock }}</td>
                        <td>{{ item.sector }}</td>
                        <td>{{ formatPercent(item.percentage) }}</td>
                    </tr>
                </tbody>
            </v-table>
            <h3 class="text-h6 font-weight-bold mt-8 mb-4 text-white">
                Diversificação por Setor
            </h3>
            <v-row>
                <v-col v-for="(value, sector) in allocationBySector" :key="sector" cols="12" sm="6"
                    md="4">
                    <v-card class="pa-4 glass-card">
                        <p class="label">{{ sector }}</p>
                        <p class="value">{{ formatPercent(value) }}</p>
                    </v-card>
                </v-col>
            </v-row>
        </v-sheet>
    </v-container>
    <SavePortfolioModal v-model="openSaveModal" @confirm="handleSave" />

</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { notify } from '@/utils/toast';
import { savePortfolio } from '@/services/portfolio';
import SavePortfolioModal from '@/components/SavePortfolioModal.vue';
import { usePortfoliosStore } from '@/stores/portfoliosStore'

const store = usePortfoliosStore()

const props = defineProps<{
    optimization: {
        dividend_yield: number;
        portfolio_risk: number;
        acceptable_risk: number | null;
        stock_allocation: {
            stock: string;
            sector: string;
            percentage: number;
        }[];
        allocation_by_sector: Record<string, number>;
    };
}>();

const openSaveModal = ref(false);

const stockAllocation = computed(
    () => props.optimization?.stock_allocation ?? [],
);

const allocationBySector = computed(
    () => props.optimization?.allocation_by_sector ?? {},
);

function formatPercent(value: number | null | undefined): string {
    if (value == null || Number.isNaN(value)) return '—';
    return `${value.toFixed(2)}%`;
}

async function handleSave(name: string) {
    try {
        const newPortfolio = await savePortfolio({
            name,
            totalRisk: props.optimization.portfolio_risk,
            totalReturn: props.optimization.dividend_yield,
            stocks: props.optimization.stock_allocation.map(item => ({
                stock: item.stock,
                percentage: item.percentage
            }))
        });

        store.addPortfolio(newPortfolio)

        notify.success('Portfólio salvo com sucesso!');
        openSaveModal.value = false;
    } catch (error: any) {
        notify.error(
            error?.response?.data?.message || 'Erro ao salvar portfólio'
        );
    }
}
</script>


<style scoped>
.glass-card {
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
}

.label {
    color: #9aa4bf;
    font-size: 0.85rem;
}

.value {
    color: white;
    font-size: 1.4rem;
    font-weight: 600;
}
</style>
