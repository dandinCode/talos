<template>
    <div class="min-h-screen talos-page-gradient !p-5">
        <v-container class="!py-8">
            <div class="flex flex-col gap-10">
            <div class="flex justify-between items-center max-sm:flex-col max-sm:gap-4 max-sm:text-center bg-[rgb(28_45_65/0.85)] backdrop-blur-[10px] border border-[rgb(185_157_117/0.2)] rounded-3xl !px-8 !py-6 max-sm:!p-5">
                <div>
                    <h1 class="!text-4xl max-sm:!text-[28px] !font-extrabold !mb-2 !m-0">
                        <span class="text-talos-cream">Meus Portfólios</span>
                    </h1>
                    <p class="text-[rgb(255_252_239/0.65)] !text-base !m-0">Gerencie suas carteiras de investimento com inteligência</p>
                </div>

                <v-btn
                    size="x-large"
                    class="!bg-talos-gold !text-talos-bg !rounded-[40px] !px-6 !h-[52px] !font-semibold normal-case tracking-normal shadow-[0_8px_20px_rgb(185_157_117/0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgb(185_157_117/0.35)] max-sm:w-full"
                    @click="goCreate"
                >
                    <template #prepend>
                        <v-icon size="20">mdi-plus</v-icon>
                    </template>
                    Novo Portfólio
                </v-btn>
            </div>

            <div v-if="loading" class="flex flex-col items-center justify-center min-h-[400px]">
                <v-progress-circular indeterminate size="64" width="4" color="#B99D75" />
                <p class="text-[rgb(255_252_239/0.6)] !mt-5 !text-base">Carregando seus portfólios...</p>
            </div>

            <v-row v-else class="!-mx-2">
                <v-col v-for="portfolio in portfolios" :key="portfolio.id" cols="12" sm="6" lg="4" class="!px-2 !pb-4 lg:!pb-0">
                    <v-hover v-slot="{ isHovering, props }">
                        <v-card
                            v-bind="props"
                            class="!bg-black/25 backdrop-blur-[10px] border !rounded-[20px] !p-5 cursor-pointer relative overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
                            :class="isHovering
                                ? '!-translate-y-1 !scale-[1.02] !border-[rgb(185_157_117/0.35)] !shadow-[0_16px_32px_rgb(0_0_0/0.35)]'
                                : '!border-[rgb(185_157_117/0.12)]'"
                            @click="viewPortfolio(portfolio.id)"
                        >
                            <div
                                class="absolute !top-4 !right-4 !px-3 !py-1 !rounded-[20px] !text-xs !font-semibold flex items-center !gap-1 backdrop-blur-[5px]"
                                :class="{
                                    'bg-[rgb(0_230_118/0.1)] text-[#00e676]': getPerformanceClass(portfolio) === 'performance-excellent',
                                    'bg-[rgb(33_150_243/0.1)] text-[#2196f3]': getPerformanceClass(portfolio) === 'performance-good',
                                    'bg-[rgb(255_193_7/0.1)] text-[#ffc107]': getPerformanceClass(portfolio) === 'performance-regular',
                                }"
                            >
                                <v-icon size="14">mdi-trending-up</v-icon>
                                <span>{{ getPerformanceLabel(portfolio) }}</span>
                            </div>
                            <div class="!mb-4">
                                <v-avatar size="56" class="!bg-[rgb(185_157_117/0.12)]" variant="tonal">
                                    <v-icon size="28" color="#B99D75">mdi-briefcase-variant</v-icon>
                                </v-avatar>
                            </div>
                            <v-card-item class="!p-0">
                                <v-card-title class="!text-xl !font-bold !text-talos-cream !mb-1 !p-0">
                                    {{ portfolio.name }}
                                </v-card-title>
                                <v-card-subtitle class="!text-[rgb(255_252_239/0.55)] !text-[13px] !flex !items-center !gap-1 !opacity-100">
                                    <v-icon size="14">mdi-calendar</v-icon>
                                    Criado em {{ formatDate(portfolio.createdAt) }}
                                </v-card-subtitle>
                            </v-card-item>
                            <v-card-text class="!pt-4 !pb-0 !px-0">
                                <div class="grid grid-cols-3 !gap-4 !mb-5 max-sm:grid-cols-1 max-sm:!gap-3">
                                    <div class="flex flex-col !gap-1">
                                        <span class="!text-[11px] text-[rgb(255_252_239/0.5)] uppercase tracking-wide">Retorno Total</span>
                                        <div class="flex items-center !gap-1">
                                            <v-icon size="18" color="success">mdi-trending-up</v-icon>
                                            <span class="text-base font-bold !text-[#00e676]">
                                                {{ portfolio.totalReturn?.toFixed(2) }}%
                                            </span>
                                        </div>
                                    </div>
                                    <div class="flex flex-col !gap-1">
                                        <span class="!text-[11px] text-[rgb(255_252_239/0.5)] uppercase tracking-wide">Risco</span>
                                        <div class="flex items-center !gap-1">
                                            <v-icon size="18" color="warning">mdi-chart-line</v-icon>
                                            <span class="text-base font-bold !text-[#ff7043]">
                                                {{ (portfolio.totalRisk)?.toFixed(2) }}%
                                            </span>
                                        </div>
                                    </div>
                                    <div class="flex flex-col !gap-1">
                                        <span class="!text-[11px] text-[rgb(255_252_239/0.5)] uppercase tracking-wide">Ativos</span>
                                        <div class="flex items-center !gap-1">
                                            <v-icon size="18" color="info">mdi-puzzle</v-icon>
                                            <span class="text-base font-bold text-talos-cream">
                                                {{ portfolio.portfolioStocks?.length || 0 }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="!h-1 !bg-white/10 !rounded-sm overflow-hidden !mt-2">
                                    <div
                                        class="!h-full bg-gradient-to-r from-talos-gold to-[#9b835f] !rounded-sm transition-[width] duration-300"
                                        :style="{ width: getPerformanceWidth(portfolio) + '%' }"
                                    />
                                </div>
                            </v-card-text>
                            <v-divider class="!bg-[rgb(185_157_117/0.12)] !mt-4 !mb-2" />
                            <v-card-actions class="!py-2 !px-1">
                                <v-btn variant="text" color="#B99D75" size="small" @click.stop="viewPortfolio(portfolio.id)">
                                    <v-icon start size="16">mdi-eye</v-icon>
                                    Ver detalhes
                                </v-btn>
                                <v-spacer />
                                <v-btn icon variant="text" size="small" color="grey" @click.stop="toggleMenu(portfolio.id)">
                                    <v-icon>mdi-dots-vertical</v-icon>
                                </v-btn>
                                <v-menu v-model="portfolio.menuOpen" :close-on-content-click="false" activator="parent" location="bottom end">
                                    <v-list density="compact" class="talos-action-menu">
                                        <v-list-item @click="editPortfolio(portfolio.id)">
                                            <template #prepend>
                                                <v-icon size="18">mdi-pencil</v-icon>
                                            </template>
                                            <v-list-item-title>Editar</v-list-item-title>
                                        </v-list-item>

                                        <v-list-item @click="duplicatePortfolio(portfolio.id)">
                                            <template #prepend>
                                                <v-icon size="18">mdi-content-copy</v-icon>
                                            </template>
                                            <v-list-item-title>Duplicar</v-list-item-title>
                                        </v-list-item>

                                        <v-divider />

                                        <v-list-item @click="confirmDelete(portfolio.id)" class="hover:!bg-[rgb(244_67_54/0.1)]">
                                            <template #prepend>
                                                <v-icon size="18" color="error">mdi-delete</v-icon>
                                            </template>
                                            <v-list-item-title class="text-error">
                                                Excluir
                                            </v-list-item-title>
                                        </v-list-item>
                                    </v-list>
                                </v-menu>
                            </v-card-actions>
                        </v-card>
                    </v-hover>
                </v-col>
            </v-row>
            </div>
        </v-container>

        <DeletePortfolioDialog
            v-model="deleteDialog.show"
            :portfolio-id="deleteDialog.portfolioId"
            :portfolio-name="deleteDialog.portfolioName"
            @confirm="executeDelete"
        />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from "vue"
import { useRouter } from "vue-router"
import { getMyPortfolios, removePortfolio } from "@/services/portfolio"
import { usePortfoliosStore } from "@/stores/portfoliosStore"
import DeletePortfolioDialog from '@/components/DeletePortfolioDialog.vue'
import { notify } from '@/utils/toast';

const portfolioStore = usePortfoliosStore()
const router = useRouter()
const portfolios = ref<any[]>([])
const loading = ref(true)

const deleteDialog = reactive({
    show: false,
    portfolioId: null as number | null,
    portfolioName: ''
})

async function loadPortfolios() {
    portfolioStore.loadFromSession()
    if (!portfolioStore.portfolios.length) {
        await portfolioStore.fetchPortfolios()
    }
    portfolios.value = portfolioStore.portfolios.map((p: any) => ({
        ...p,
        menuOpen: false
    }))
    loading.value = false
}

function viewPortfolio(id: number) {
    router.push(`/PortfolioDetails/${id}`)
}

function editPortfolio(id: number) {
    router.push(`/portfolio/${id}/edit`)
}

function duplicatePortfolio(id: number) {
    console.log('Duplicar:', id)
}

function confirmDelete(id: number) {
    const portfolio = portfolios.value.find(p => p.id === id)
    deleteDialog.portfolioId = id
    deleteDialog.portfolioName = portfolio?.name || ''
    deleteDialog.show = true
}

async function executeDelete(id: number) {
    try {
        await removePortfolio(id)

        portfolioStore.removePortfolio(id)
        portfolios.value = portfolios.value.filter(p => p.id !== id)

        notify.success('Portfólio excluído com sucesso')
    } catch (error: any) {
        notify.error('Erro ao excluir portfólio')
    } finally {
        deleteDialog.show = false
    }
}

function toggleMenu(id: number) {
    portfolios.value = portfolios.value.map(p => ({
        ...p,
        menuOpen: p.id === id ? !p.menuOpen : false
    }))
}

function goCreate() {
    router.push("/RunModel")
}

function formatDate(date: string) {
    return new Date(date).toLocaleDateString("pt-BR", {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    })
}

function getPerformanceClass(portfolio: any) {
    const return_ = portfolio.totalReturn || 0
    if (return_ > 15) return 'performance-excellent'
    if (return_ > 5) return 'performance-good'
    return 'performance-regular'
}

function getPerformanceLabel(portfolio: any) {
    const return_ = portfolio.totalReturn || 0
    if (return_ > 15) return 'Excelente'
    if (return_ > 5) return 'Bom'
    return 'Regular'
}

function getPerformanceWidth(portfolio: any) {
    const return_ = portfolio.totalReturn || 0
    return Math.min((return_ / 30) * 100, 100)
}

onMounted(loadPortfolios)
</script>
