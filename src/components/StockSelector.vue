<template>
    <div>
        <div class="flex justify-between items-center !pb-4 flex-wrap !gap-3 max-sm:flex-col max-sm:items-start">
            <div></div>
            <div class="flex gap-2 items-center flex-wrap max-sm:w-full max-sm:justify-start">
                <v-btn
                    size="small"
                    variant="text"
                    class="!text-[rgb(255_252_239/0.7)] !text-[13px] normal-case !rounded-[20px] !bg-[rgb(185_157_117/0.1)] !px-3 !py-1 !min-w-0 hover:!bg-[rgb(185_157_117/0.2)] hover:!text-talos-cream disabled:opacity-40 disabled:cursor-not-allowed"
                    @click="selectAll"
                    :disabled="stocks.filteredSymbols.length === 0"
                >
                    <v-icon size="16">mdi-check-all</v-icon>
                    Selecionar todas
                </v-btn>

                <v-btn
                    size="small"
                    variant="text"
                    class="!text-[rgb(255_252_239/0.7)] !text-[13px] normal-case !rounded-[20px] !bg-[rgb(185_157_117/0.1)] !px-3 !py-1 !min-w-0 hover:!bg-[rgb(185_157_117/0.2)] hover:!text-talos-cream disabled:opacity-40 disabled:cursor-not-allowed"
                    @click="analysis.clearSelection"
                    :disabled="analysis.selectedSymbols.length === 0"
                >
                    <v-icon size="16">mdi-close-circle</v-icon>
                    Limpar seleção
                </v-btn>

                <v-btn
                    size="small"
                    variant="text"
                    class="!text-[rgb(255_252_239/0.7)] !text-[13px] normal-case !rounded-[20px] !bg-[rgb(185_157_117/0.1)] !px-3 !py-1 !min-w-0 hover:!bg-[rgb(185_157_117/0.2)] hover:!text-talos-cream"
                    @click="showFilters = !showFilters"
                >
                    <v-icon size="16">mdi-filter</v-icon>
                    Setor
                    <v-icon size="14">{{ showFilters ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                </v-btn>

                <v-btn
                    size="small"
                    variant="text"
                    class="!text-[rgb(255_252_239/0.7)] !text-[13px] normal-case !rounded-[20px] !bg-[rgb(185_157_117/0.1)] !px-3 !py-1 !min-w-0 hover:!bg-[rgb(185_157_117/0.2)] hover:!text-talos-cream"
                    @click="showStatusFilter = !showStatusFilter"
                >
                    <v-icon size="16">mdi-filter</v-icon>
                    Status
                    <v-icon size="14">{{ showStatusFilter ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                </v-btn>

                <v-btn
                    size="small"
                    variant="text"
                    class="!text-[rgb(255_252_239/0.7)] !text-[13px] normal-case !rounded-[20px] !bg-[rgb(185_157_117/0.1)] !px-3 !py-1 !min-w-0 hover:!bg-[rgb(185_157_117/0.2)] hover:!text-talos-cream"
                    @click="hidden = !hidden"
                >
                    <v-icon size="16">{{ hidden ? 'mdi-eye' : 'mdi-eye-off' }}</v-icon>
                    {{ hidden ? 'Mostrar ações' : 'Ocultar ações' }}
                </v-btn>
            </div>
        </div>

        <div v-if="showFilters" class="bg-black/30 rounded-2xl !p-4 !mb-5 border border-[rgb(185_157_117/0.1)]">
            <div class="flex justify-between items-center !mb-3 text-[rgb(255_252_239/0.6)] text-xs">
                <span>Filtrar por setor</span>
                <v-btn size="x-small" variant="text" color="#B99D75" @click="clearSectorFilter">Limpar</v-btn>
            </div>
            <div class="flex flex-wrap !gap-2">
                <v-chip
                    v-for="sector in availableSectors"
                    :key="sector"
                    size="small"
                    variant="tonal"
                    :color="selectedSectors.includes(sector) ? '#B99D75' : 'grey'"
                    class="cursor-pointer"
                    @click="toggleSectorFilter(sector)"
                >
                    {{ sector }}
                </v-chip>
            </div>
        </div>

        <div v-if="showStatusFilter" class="bg-black/30 rounded-2xl !p-4 !mb-5 border border-[rgb(185_157_117/0.1)]">
            <div class="flex justify-between items-center !mb-3 text-[rgb(255_252_239/0.6)] text-xs">
                <span>Filtrar por status</span>
                <v-btn size="x-small" variant="text" color="#B99D75" @click="clearStatusFilter">Limpar</v-btn>
            </div>
            <div class="flex flex-wrap !gap-2">
                <v-chip
                    v-for="status in ['validated', 'pending', 'invalid']"
                    :key="status"
                    size="small"
                    variant="tonal"
                    :color="selectedStatuses.includes(status) ?
                        (status === 'validated' ? '#22c55e' : status === 'pending' ? '#f59e0b' : '#ef4444') : 'grey'"
                    class="cursor-pointer"
                    @click="toggleStatusFilter(status)"
                >
                    {{ status }}
                </v-chip>
            </div>
        </div>

        <stock-search />

        <div class="d-flex justify-center my-10" v-if="stocks.loading">
            <v-progress-circular indeterminate size="60" color="#B99D75" />
        </div>

        <template v-else>
            <div class="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] !gap-3 !mt-4 max-sm:grid-cols-1">
                <div
                    v-for="stock in displayedStocks"
                    :key="stock.id"
                    class="bg-black/25 border !rounded-2xl !px-4 !py-5 !min-h-[96px] flex items-center justify-between !gap-4 cursor-pointer transition-all duration-200 hover:bg-[rgb(185_157_117/0.08)] hover:border-[rgb(185_157_117/0.3)] hover:-translate-y-0.5"
                    :class="analysis.selectedSymbols.includes(stock.symbol)
                        ? 'bg-[rgb(185_157_117/0.12)] !border-talos-gold'
                        : 'border-[rgb(185_157_117/0.15)]'"
                    @click="analysis.toggleSymbol(stock.symbol)"
                >
                    <div class="flex-1 min-w-0 !pr-2">
                        <div class="font-bold text-talos-cream !text-base leading-tight">{{ stock.symbol }}</div>
                        <div class="!text-[11px] text-[rgb(255_252_239/0.5)] !mt-0.5 leading-snug line-clamp-2">{{ stock.company || '—' }}</div>
                    </div>
                    <div class="flex flex-col items-end !gap-1.5 !mr-3 shrink-0">
                        <v-chip
                            size="x-small"
                            :color="getSectorColor(stock.sector)"
                            variant="tonal"
                            class="!bg-[rgb(185_157_117/0.15)] !text-talos-gold !text-[10px] !h-auto !px-2 !py-0.5"
                        >
                            {{ stock.sector || 'Setor não definido' }}
                        </v-chip>
                        <v-chip size="x-small" :color="getStatusColor(stock.status)" variant="tonal" class="!text-[10px] !h-auto !px-2 !py-0.5">
                            {{ stock.status }}
                        </v-chip>
                    </div>
                    <div class="shrink-0">
                        <v-icon
                            :color="analysis.selectedSymbols.includes(stock.symbol) ? '#B99D75' : 'rgba(255,252,239,0.2)'"
                            size="22"
                        >
                            {{ analysis.selectedSymbols.includes(stock.symbol) ? 'mdi-check-circle' : 'mdi-circle-outline' }}
                        </v-icon>
                    </div>
                </div>

                <div v-if="filteredStocksByFilters.length === 0" class="text-center !py-12 text-[rgb(255_252_239/0.3)]">
                    <v-icon size="48" color="rgba(255,252,239,0.3)">mdi-database-search</v-icon>
                    <p>Nenhuma ação encontrada</p>
                </div>
            </div>

            <div v-if="showVerMais" class="flex justify-center !mt-5">
                <v-btn variant="text" class="!text-talos-gold normal-case !font-semibold tracking-wide" @click="expandStocks">
                    Ver mais
                    <v-icon size="18" class="ml-1">mdi-chevron-down</v-icon>
                </v-btn>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useStocksStore } from "@/stores/stocksStore";
import { useAnalysisStore } from "@/stores/analysisStore";
import StockSearch from "./StockSearch.vue";

const stocks = useStocksStore();
const analysis = useAnalysisStore();
const hidden = ref(false);
const showFilters = ref(false);
const showStatusFilter = ref(false);
const showAllStocks = ref(false);

const selectedSectors = ref<string[]>([]);
const selectedStatuses = ref<string[]>([]);

onMounted(() => {
    if (stocks.symbols.length === 0) {
        stocks.loadStocks();
    }
});

const availableSectors = computed(() => {
    const sectors = new Set<string>();
    stocks.filteredSymbols.forEach(stock => {
        if (stock.sector) sectors.add(stock.sector);
    });
    return Array.from(sectors).sort();
});

const filteredStocksByFilters = computed(() => {
    let filtered = stocks.filteredSymbols;

    if (selectedSectors.value.length > 0) {
        filtered = filtered.filter(stock =>
            stock.sector && selectedSectors.value.includes(stock.sector)
        );
    }

    if (selectedStatuses.value.length > 0) {
        filtered = filtered.filter(stock =>
            selectedStatuses.value.includes(stock.status)
        );
    }

    return filtered;
});

const PREVIEW_COUNT = 3;

const displayedStocks = computed(() => {
    const list = filteredStocksByFilters.value;
    if (!hidden.value) return list;
    return list.slice(0, PREVIEW_COUNT);
});

const showVerMais = computed(
    () => hidden.value && filteredStocksByFilters.value.length > PREVIEW_COUNT
);

function expandStocks() {
    hidden.value = false;
}

function toggleSectorFilter(sector: string) {
    const index = selectedSectors.value.indexOf(sector);
    if (index >= 0) {
        selectedSectors.value.splice(index, 1);
    } else {
        selectedSectors.value.push(sector);
    }
    showAllStocks.value = false;
}

function clearSectorFilter() {
    selectedSectors.value = [];
}

function toggleStatusFilter(status: string) {
    const index = selectedStatuses.value.indexOf(status);
    if (index >= 0) {
        selectedStatuses.value.splice(index, 1);
    } else {
        selectedStatuses.value.push(status);
    }
    showAllStocks.value = false;
}

function clearStatusFilter() {
    selectedStatuses.value = [];
}

function selectAll() {
    const symbols = filteredStocksByFilters.value.map(s => s.symbol);
    analysis.selectAll(symbols);
}

function getSectorColor(sector: string | undefined): string {
    if (!sector) return 'grey';
    const colors: Record<string, string> = {
        'Financeiro': '#B99D75',
        'Energia': '#f59e0b',
        'Tecnologia': '#3b82f6',
        'Saúde': '#22c55e',
        'Consumo': '#ef4444',
        'Industrial': '#8b5cf6',
        'Utilitades': '#06b6d4',
        'Materiais Básicos': '#ec4899'
    };
    return colors[sector] || '#6b7280';
}

function getStatusColor(status: string): string {
    switch (status) {
        case 'validated': return '#22c55e';
        case 'pending': return '#f59e0b';
        case 'invalid': return '#ef4444';
        default: return '#6b7280';
    }
}
</script>
