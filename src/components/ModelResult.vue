<template>
    <v-sheet
        class="!bg-black/20 !border !border-[rgb(185_157_117/0.15)] !rounded-[20px] !px-7 !pt-6 !pb-7 max-sm:!px-4 max-sm:!py-5"
        rounded="xl"
        elevation="0"
    >
        <div class="flex items-center gap-4 mb-6 pb-5 border-b border-[rgb(185_157_117/0.1)] max-sm:flex-col max-sm:text-center">
            <div class="w-[52px] h-[52px] bg-[rgb(185_157_117/0.1)] rounded-2xl flex items-center justify-center shrink-0">
                <v-icon size="28" color="#B99D75">mdi-chart-arc</v-icon>
            </div>
            <div>
                <h2 class="text-[1.35rem] font-bold m-0 mb-1 bg-talos-gold bg-clip-text text-transparent max-sm:text-[1.2rem]">Resultado da Otimização</h2>
                <p class="text-[rgb(255_252_239/0.65)] text-sm m-0">
                    Carteira sugerida com base no modelo
                    <v-chip size="x-small" variant="tonal" color="#B99D75" class="!ml-1">
                        {{ modelLabel }}
                    </v-chip>
                </p>
            </div>
        </div>

        <v-btn
            class="!bg-gradient-to-br !from-talos-gold !to-[#9b835f] !text-talos-bg !font-semibold normal-case !rounded-[40px] tracking-normal mb-6 hover:-translate-y-px hover:shadow-[0_8px_20px_rgb(185_157_117/0.25)] max-sm:w-full"
            size="large"
            @click="openSaveModal = true"
        >
            <template #prepend>
                <v-icon>mdi-content-save</v-icon>
            </template>
            Salvar Portfólio
        </v-btn>

        <v-row class="mb-6 mt-0">
            <v-col cols="12" md="4">
                <v-card class="!flex !items-center gap-3.5 !p-[18px] !bg-black/25 !border !border-[rgb(185_157_117/0.12)] !rounded-2xl transition-[border-color] duration-200 hover:!border-[rgb(185_157_117/0.28)]">
                    <div class="w-12 h-12 rounded-[14px] flex items-center justify-center shrink-0 bg-[rgb(34_197_94/0.12)]">
                        <v-icon color="#22c55e" size="24">mdi-cash-multiple</v-icon>
                    </div>
                    <div class="min-w-0">
                        <p class="text-[rgb(255_252_239/0.55)] text-xs uppercase tracking-wide m-0 mb-1">Dividend Yield</p>
                        <p class="text-[#22c55e] text-[1.35rem] font-bold m-0">{{ formatPercent(optimization.dividend_yield) }}</p>
                    </div>
                </v-card>
            </v-col>
            <v-col cols="12" md="4">
                <v-card class="!flex !items-center gap-3.5 !p-[18px] !bg-black/25 !border !border-[rgb(185_157_117/0.12)] !rounded-2xl transition-[border-color] duration-200 hover:!border-[rgb(185_157_117/0.28)]">
                    <div class="w-12 h-12 rounded-[14px] flex items-center justify-center shrink-0 bg-[rgb(245_158_11/0.12)]">
                        <v-icon color="#f59e0b" size="24">mdi-chart-line</v-icon>
                    </div>
                    <div class="min-w-0">
                        <p class="text-[rgb(255_252_239/0.55)] text-xs uppercase tracking-wide m-0 mb-1">Risco da Carteira</p>
                        <p class="text-[#f59e0b] text-[1.35rem] font-bold m-0">{{ formatPercent(optimization.portfolio_risk) }}</p>
                    </div>
                </v-card>
            </v-col>
            <v-col cols="12" md="4">
                <v-card class="!flex !items-center gap-3.5 !p-[18px] !bg-black/25 !border !border-[rgb(185_157_117/0.12)] !rounded-2xl transition-[border-color] duration-200 hover:!border-[rgb(185_157_117/0.28)]">
                    <div class="w-12 h-12 rounded-[14px] flex items-center justify-center shrink-0 bg-[rgb(185_157_117/0.12)]">
                        <v-icon color="#B99D75" size="24">mdi-shield-check</v-icon>
                    </div>
                    <div class="min-w-0">
                        <p class="text-[rgb(255_252_239/0.55)] text-xs uppercase tracking-wide m-0 mb-1">Risco Aceitável</p>
                        <p class="text-talos-cream text-[1.35rem] font-bold m-0">{{ formatPercent(optimization.acceptable_risk) }}</p>
                    </div>
                </v-card>
            </v-col>
        </v-row>

        <v-divider class="!border-[rgb(185_157_117/0.15)] !opacity-100 mb-6" />

        <div>
            <div class="flex items-center gap-2.5 mb-4">
                <v-icon color="#B99D75" size="22">mdi-format-list-bulleted</v-icon>
                <h3 class="text-talos-cream text-base font-semibold m-0">Alocação por Ativo</h3>
            </div>
            <div class="rounded-[14px] overflow-hidden border border-[rgb(185_157_117/0.12)] bg-black/20">
                <v-table density="comfortable" class="talos-allocation-table">
                    <thead>
                        <tr>
                            <th>Ação</th>
                            <th>Setor</th>
                            <th class="text-end">Percentual</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in stockAllocation" :key="item.stock">
                            <td class="!font-semibold !text-talos-cream">{{ item.stock }}</td>
                            <td>{{ item.sector }}</td>
                            <td class="text-end !text-talos-gold !font-semibold">{{ formatPercent(item.percentage) }}</td>
                        </tr>
                    </tbody>
                </v-table>
            </div>
        </div>

        <v-divider class="!border-[rgb(185_157_117/0.15)] !opacity-100 my-6" />

        <div>
            <div class="flex items-center gap-2.5 mb-4">
                <v-icon color="#B99D75" size="22">mdi-chart-pie</v-icon>
                <h3 class="text-talos-cream text-base font-semibold m-0">Diversificação por Setor</h3>
            </div>
            <v-row>
                <v-col
                    v-for="(value, sector) in allocationBySector"
                    :key="sector"
                    cols="12"
                    sm="6"
                    md="4"
                >
                    <v-card class="!bg-black/25 !border !border-[rgb(185_157_117/0.12)] !rounded-[14px] pa-4 transition-[border-color] duration-200 hover:!border-[rgb(185_157_117/0.25)]">
                        <p class="text-[rgb(255_252_239/0.55)] text-xs uppercase tracking-wide m-0 mb-1">{{ sector }}</p>
                        <p class="text-talos-cream text-[1.35rem] font-bold m-0">{{ formatPercent(value) }}</p>
                    </v-card>
                </v-col>
            </v-row>
        </div>
    </v-sheet>

    <SavePortfolioModal v-model="openSaveModal" @confirm="handleSave" />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { notify } from '@/utils/toast';
import { savePortfolio } from '@/services/portfolio';
import SavePortfolioModal from '@/components/SavePortfolioModal.vue';
import { usePortfoliosStore } from '@/stores/portfoliosStore';

const store = usePortfoliosStore();

const props = defineProps<{
    optimization: {
        model_id?: string;
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

const modelLabel = computed(() => {
    const id = props.optimization?.model_id;
    if (!id) return '1.0';
    return id === 'custom' ? 'Personalizável' : `Modelo ${id}`;
});

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
            stocks: props.optimization.stock_allocation.map((item) => ({
                stock: item.stock,
                percentage: item.percentage,
            })),
        });

        store.addPortfolio(newPortfolio);

        notify.success('Portfólio salvo com sucesso!');
        openSaveModal.value = false;
    } catch (error: any) {
        notify.error(
            error?.response?.data?.message || 'Erro ao salvar portfólio',
        );
    }
}
</script>
