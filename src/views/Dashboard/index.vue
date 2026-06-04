<template>
    <div class="talos-dashboard-bg relative min-h-screen talos-page-gradient overflow-hidden">
        <v-container
            class="relative z-[1] py-10 px-5 max-w-full overflow-x-hidden box-border max-sm:py-5 max-sm:px-2.5">
            <div
                class="flex justify-between items-center mb-6 max-[1000px]:flex-col max-[1000px]:gap-5 max-[1000px]:text-center max-[1000px]:p-5 bg-[rgb(28_45_65/0.85)] backdrop-blur-[10px] border border-[rgb(185_157_117/0.2)] rounded-3xl px-8 py-6">
                <div>
                    <div
                        class="inline-flex items-center bg-[rgb(185_157_117/0.12)] px-3 py-1 rounded-[20px] mb-3 text-talos-gold text-[13px]">
                        <v-icon size="18" color="#B99D75" class="mr-1">mdi-hand-wave</v-icon>
                        <span>Olá, {{ firstName }}</span>
                    </div>
                    <h1
                        class="text-[38px] max-[1000px]:text-[32px] max-sm:text-[28px] font-extrabold mb-2 text-talos-cream">
                        Bem-vindo de volta</h1>
                    <p class="text-[rgb(255_252_239/0.65)] text-base">Acompanhe seus investimentos e desempenho em tempo
                        real</p>
                </div>
                <v-btn
                    class="!bg-talos-gold !text-talos-bg !font-semibold normal-case !rounded-[40px] !px-6 !py-3 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgb(185_157_117/0.3)] max-[1000px]:w-full"
                    @click="router.push('/PortfolioList')">
                    <template #prepend>
                        <v-icon size="18">mdi-briefcase-outline</v-icon>
                    </template>
                    Acessar Portfólios
                </v-btn>
            </div>

            <v-row class="mt-6 !mx-0" align="stretch" dense>
                <v-col cols="12" sm="6" md="3" class="flex max-[1000px]:mb-3" v-for="(metric, index) in metrics"
                    :key="index">
                    <v-card
                        class="talos-glow-card flex-1 w-full min-h-[140px] !p-6 !bg-black/25 backdrop-blur-[10px] border border-[rgb(185_157_117/0.12)] !rounded-[20px] flex items-start gap-3.5 transition-all duration-300 cursor-pointer overflow-visible hover:-translate-y-1 hover:border-[rgb(185_157_117/0.35)]"
                        @click="metric.action ? router.push(metric.action) : null">
                        <div class="w-[52px] h-[52px] min-w-[52px] min-h-[52px] shrink-0 rounded-[14px] flex items-center justify-center"
                            :style="{ background: metric.bgColor }">
                            <v-icon :color="metric.iconColor">{{ metric.icon }}</v-icon>
                        </div>
                        <div class="flex-1 min-w-0 flex flex-col gap-0.5">
                            <span
                                class="block text-[rgb(255_252_239/0.55)] text-[11px] font-semibold uppercase tracking-wide leading-snug break-words">{{
                                    metric.title }}</span>
                            <div class="flex items-center gap-2 my-1 min-h-9">
                                <span class="text-[28px] max-sm:text-2xl font-bold text-talos-cream"
                                    :class="metric.valueClass">{{
                                        metric.value }}</span>
                            </div>
                            <span class="text-[rgb(255_252_239/0.55)] text-[11px]">{{ metric.subtitle }}</span>
                        </div>
                    </v-card>
                </v-col>
            </v-row>

            <v-row class="mt-8">
                <v-col cols="12" md="8">
                    <v-card
                        class="talos-glow-card talos-chart-card !bg-black/25 backdrop-blur-[10px] border border-[rgb(185_157_117/0.12)] !rounded-3xl h-full">
                        <v-card-item>
                            <template #title>
                                <span class="text-talos-gold text-lg font-semibold">Performance Geral</span>
                            </template>
                            <template #subtitle>
                                Evolução dos seus portfólios nos últimos 30 dias
                            </template>
                            <template #append>
                                <v-chip size="small" color="#B99D75" variant="tonal">
                                    <v-icon start size="14">mdi-calendar</v-icon>
                                    Últimos 30 dias
                                </v-chip>
                            </template>
                        </v-card-item>
                        <v-card-text>
                            <div class="rounded-2xl p-[60px] max-[1000px]:p-[30px] text-center">
                                <div>
                                    <v-icon size="48" color="rgba(255,252,239,0.5)">mdi-chart-line</v-icon>
                                    <p class="text-[rgb(255_252_239/0.55)] mt-3">Gráfico de performance será carregado
                                        aqui</p>
                                </div>
                            </div>
                        </v-card-text>
                    </v-card>
                </v-col>

                <v-col cols="12" md="4">
                    <v-card
                        class="talos-glow-card talos-sector-card !bg-black/25 backdrop-blur-[10px] border border-[rgb(185_157_117/0.12)] !rounded-3xl h-full">
                        <v-card-item>
                            <template #title>
                                <span class="text-talos-gold text-lg font-semibold">Distribuição por Setor</span>
                            </template>
                            <template #subtitle>
                                Baseado nos seus portfólios ativos
                            </template>
                        </v-card-item>

                        <v-card-text>
                            <div class="flex flex-col gap-4">
                                <div v-for="sector in sectorDistribution" :key="sector.name"
                                    class="flex justify-between items-center">
                                    <div class="flex items-center gap-2">
                                        <div class="w-2.5 h-2.5 rounded-full" :style="{ background: sector.color }">
                                        </div>
                                        <span class="text-talos-cream text-sm">{{ sector.name }}</span>
                                    </div>
                                    <div class="flex items-center gap-1.5">
                                        <span class="text-talos-gold font-semibold text-sm">{{ sector.percentage
                                        }}%</span>
                                        <span class="text-[rgb(255_252_239/0.55)] text-xs">({{ sector.count }})</span>
                                    </div>
                                </div>
                            </div>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>

            <v-row class="mt-8">
                <v-col cols="12">
                    <h2 class="text-talos-gold text-2xl max-sm:text-xl font-semibold">Ações Rápidas</h2>
                </v-col>

                <v-col cols="12" md="4" v-for="action in quickActions" :key="action.title">
                    <v-card
                        class="talos-glow-card !p-8 max-[1000px]:mb-4 !bg-black/25 backdrop-blur-[10px] border border-[rgb(185_157_117/0.12)] !rounded-3xl cursor-pointer transition-all duration-300 text-center hover:-translate-y-[5px] hover:border-[rgb(185_157_117/0.35)]"
                        @click="router.push(action.route)">
                        <div class="w-[70px] h-[70px] rounded-[20px] flex items-center justify-center mx-auto mb-5"
                            :style="{ background: action.bgColor }">
                            <v-icon size="32" :color="action.iconColor">{{ action.icon }}</v-icon>
                        </div>
                        <h3 class="text-talos-cream text-xl font-semibold mb-2">{{ action.title }}</h3>
                        <p class="text-[rgb(255_252_239/0.55)] text-sm mb-4">{{ action.description }}</p>
                        <v-btn variant="text" :color="action.iconColor" class="normal-case font-medium">
                            Acessar
                            <v-icon end size="16">mdi-arrow-right</v-icon>
                        </v-btn>
                    </v-card>
                </v-col>
            </v-row>

            <v-row class="mt-8">
                <v-col cols="12">
                    <div class="flex justify-between items-center mb-5">
                        <h2 class="text-talos-gold text-2xl max-sm:text-xl font-semibold">Últimos Portfólios</h2>
                        <v-btn variant="text" color="#B99D75" @click="router.push('/PortfolioList')">
                            Ver todos
                            <v-icon end size="16">mdi-arrow-right</v-icon>
                        </v-btn>
                    </div>
                </v-col>

                <v-col cols="12" md="4" v-for="portfolio in recentPortfolios" :key="portfolio.id">
                    <v-card
                        class="talos-glow-card !p-6 max-sm:mb-4 !bg-black/25 backdrop-blur-[10px] border border-[rgb(185_157_117/0.12)] !rounded-3xl cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-[rgb(185_157_117/0.35)]"
                        @click="openPortfolio(portfolio.id)">
                        <div class="flex justify-between items-center mb-4">
                            <div
                                class="w-12 h-12 bg-[rgb(185_157_117/0.12)] rounded-[14px] flex items-center justify-center">
                                <v-icon color="#B99D75">mdi-briefcase-variant</v-icon>
                            </div>
                            <v-menu location="bottom end">
                                <template #activator="{ props }">
                                    <v-btn icon variant="text" size="small" color="grey" v-bind="props">
                                        <v-icon>mdi-dots-vertical</v-icon>
                                    </v-btn>
                                </template>
                                <v-list class="talos-action-menu">
                                    <v-list-item @click.stop="openPortfolio(portfolio.id)">
                                        <template #prepend>
                                            <v-icon size="18">mdi-eye</v-icon>
                                        </template>
                                        <v-list-item-title>Ver detalhes</v-list-item-title>
                                    </v-list-item>
                                    <v-list-item @click.stop="router.push(`/portfolio/${portfolio.id}/edit`)">
                                        <template #prepend>
                                            <v-icon size="18">mdi-pencil</v-icon>
                                        </template>
                                        <v-list-item-title>Editar</v-list-item-title>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                        </div>

                        <h3 class="text-talos-cream text-lg font-semibold mb-1.5">{{ portfolio.name }}</h3>
                        <p class="text-[rgb(255_252_239/0.55)] text-xs mb-4 flex items-center">
                            <v-icon size="12" color="rgba(255,252,239,0.5)" class="mr-1">mdi-calendar</v-icon>
                            Criado em {{ formatDate(portfolio.createdAt) }}
                        </p>

                        <div class="flex gap-6 mb-4">
                            <div class="flex flex-col">
                                <span
                                    class="text-[rgb(255_252_239/0.55)] text-[11px] uppercase tracking-wide">Retorno</span>
                                <span class="text-lg font-semibold"
                                    :class="portfolio.totalReturn >= 0 ? '!text-[#22c55e]' : '!text-[#ef4444]'">
                                    {{ portfolio.totalReturn?.toFixed(2) }}%
                                </span>
                            </div>
                            <div class="flex flex-col">
                                <span
                                    class="text-[rgb(255_252_239/0.55)] text-[11px] uppercase tracking-wide">Risco</span>
                                <span class="text-lg font-semibold !text-[#f59e0b]">
                                    {{ portfolio.totalRisk?.toFixed(2) }}%
                                </span>
                            </div>
                        </div>

                        <div class="flex justify-between items-center pt-3 border-t border-[rgb(185_157_117/0.12)]">
                            <span class="text-[rgb(255_252_239/0.55)] text-xs flex items-center">
                                <v-icon size="12" color="rgba(255,252,239,0.5)" class="mr-1">mdi-puzzle</v-icon>
                                {{ portfolio.portfolioStocks?.length || 0 }} ativos
                            </span>
                            <v-chip size="x-small" color="#B99D75" variant="tonal">
                                Ativo
                            </v-chip>
                        </div>
                    </v-card>
                </v-col>

                <v-col cols="12" md="4" v-if="!recentPortfolios.length">
                    <v-card
                        class="talos-glow-card !p-10 !bg-black/25 backdrop-blur-[10px] !border-2 !border-dashed !border-[rgb(185_157_117/0.25)] !rounded-3xl text-center cursor-pointer transition-all duration-300 min-h-[300px] flex flex-col items-center justify-center gap-3 hover:!border-[rgb(185_157_117/0.45)] hover:!bg-[rgb(28_45_65/0.9)]"
                        @click="router.push('/RunModel')">
                        <v-icon size="48" color="rgba(255,252,239,0.5)">mdi-briefcase-plus</v-icon>
                        <h3 class="text-talos-cream text-xl">Criar Primeiro Portfólio</h3>
                        <p class="text-[rgb(255_252_239/0.55)]">Comece a otimizar seus investimentos agora</p>
                        <v-btn color="#B99D75" variant="tonal" class="mt-2">
                            Criar Portfólio
                        </v-btn>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useRouter } from "vue-router"
import { usePortfoliosStore } from "@/stores/portfoliosStore"
import { getUserFirstName } from "@/utils/user"
import { useUserStore } from "@/stores/userStore"

const router = useRouter()
const store = usePortfoliosStore()
const userStore = useUserStore();

const portfolios = computed(() => store.portfolios)
const firstName = computed(() => getUserFirstName(userStore.user))

const recentPortfolios = computed(() => {
    store.loadFromSession()
    if (!store.portfolios.length) {
        loadPortfolios()
    }
    return [...portfolios.value]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 3)
})

async function loadPortfolios() {
    await store.fetchPortfolios()
}

const avgReturn = computed(() => {
    if (!portfolios.value.length) return 0
    const total = portfolios.value.reduce((sum, p) => sum + (p.totalReturn || 0), 0)
    return (total / portfolios.value.length).toFixed(2)
})

const avgRisk = computed(() => {
    if (!portfolios.value.length) return 0
    const total = portfolios.value.reduce((sum, p) => sum + (p.totalRisk || 0), 0)
    return (total / portfolios.value.length).toFixed(2)
})

const bestPortfolio = computed(() => {
    return portfolios.value.reduce((best, p) => {
        if (!best) return p
        return p.totalReturn > best.totalReturn ? p : best
    }, null)
})

const totalAssets = computed(() => {
    const unique = new Set(
        portfolios.value.flatMap(p =>
            p.portfolioStocks?.map((s: any) => s.stock?.symbol?.symbol)
        )
    )
    return unique.size
})

const metrics = computed(() => [
    {
        title: 'Portfólios',
        value: portfolios.value.length,
        subtitle: 'carteiras criadas',
        icon: 'mdi-briefcase',
        bgColor: 'rgba(185, 157, 117, 0.12)',
        iconColor: '#B99D75',
        valueClass: ''
    },
    {
        title: 'Retorno Médio',
        value: `${avgReturn.value}%`,
        subtitle: 'média ponderada',
        icon: 'mdi-trending-up',
        bgColor: 'rgba(34, 197, 94, 0.1)',
        iconColor: '#22c55e',
        valueClass: '!text-[#22c55e]'
    },
    {
        title: 'Risco Médio',
        value: `${avgRisk.value}%`,
        subtitle: 'volatilidade',
        icon: 'mdi-chart-line',
        bgColor: 'rgba(245, 158, 11, 0.1)',
        iconColor: '#f59e0b',
        valueClass: '!text-[#f59e0b]'
    },
    {
        title: 'Total de Ativos',
        value: totalAssets.value,
        subtitle: 'posições diferentes',
        icon: 'mdi-puzzle',
        bgColor: 'rgba(59, 130, 246, 0.1)',
        iconColor: '#3b82f6',
        valueClass: '',
        action: '/AddSymbol'
    }
])

const quickActions = [
    {
        title: 'Analisar Ações',
        description: 'Use o modelo de otimização para criar carteiras',
        icon: 'mdi-chart-line',
        bgColor: 'rgba(185, 157, 117, 0.12)',
        iconColor: '#B99D75',
        route: '/RunModel'
    },
    {
        title: 'Adicionar Ativo',
        description: 'Cadastre novos símbolos na base de dados',
        icon: 'mdi-plus-circle',
        bgColor: 'rgba(59, 130, 246, 0.1)',
        iconColor: '#3b82f6',
        route: '/AddSymbol'
    }
]

function generateColor(index: number, total: number) {
    const hue = Math.round((360 / total) * index)
    return `hsl(${hue}, 70%, 55%)`
}

const sectorDistribution = computed(() => {
    const sectorMap: Record<string, number> = {}

    portfolios.value.forEach(portfolio => {
        if (!portfolio.portfolioStocks) return
        portfolio.portfolioStocks.forEach((ps: any) => {
            const sector = ps.stock?.sector ?? "Outros"
            sectorMap[sector] = (sectorMap[sector] || 0) + 1
        })
    })

    const total = Object.values(sectorMap).reduce((a, b) => a + b, 0)

    const entries = Object.entries(sectorMap)

    return entries.map(([name, count], index) => ({
        name,
        count,
        percentage: Number(((count / total) * 100).toFixed(1)),
        color: generateColor(index, entries.length)
    }))
})

function openPortfolio(id: number) {
    router.push(`/PortfolioDetails/${id}`)
}

function formatDate(date: string) {
    return new Date(date).toLocaleDateString("pt-BR", {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    })
}
</script>
