<template>
    <div class="min-h-screen talos-page-gradient py-4">
        <v-container class="!max-w-[1400px] !py-10 !px-5 max-sm:!py-5 max-sm:!px-2.5">
            <div v-if="portfolio" class="flex flex-col gap-10">
                <div class="bg-[rgb(28_45_65/0.85)] backdrop-blur-[10px] border border-[rgb(185_157_117/0.2)] rounded-3xl !px-8 !py-6 max-sm:!p-5">
                    <div class="mb-4">
                        <v-btn
                            variant="text"
                            color="#B99D75"
                            size="small"
                            class="normal-case tracking-normal !px-3 !py-1 !rounded-[40px] !text-talos-cream hover:!bg-[rgb(185_157_117/0.12)] hover:!text-talos-gold"
                            @click="router.back()"
                        >
                            <v-icon start size="16">mdi-arrow-left</v-icon>
                            Voltar
                        </v-btn>
                    </div>
                    <h1 class="text-[34px] max-sm:text-[28px] font-bold mb-2 text-talos-cream">{{ portfolio.name }}</h1>
                    <p class="text-[rgb(255_252_239/0.65)] flex items-center text-sm">
                        <v-icon size="14" class="mr-1" color="#B99D75">mdi-calendar</v-icon>
                        Criado em {{ formatDate(portfolio.createdAt) }}
                    </p>
                </div>

                <v-row class="!-mx-2">
                    <v-col cols="12" md="4" class="!px-2 !pb-4 md:!pb-0">
                        <v-card class="talos-glow-card !flex !items-center !gap-4 !p-6 max-sm:!p-5 !bg-black/25 backdrop-blur-[10px] border border-[rgb(185_157_117/0.12)] !rounded-[20px] transition-all duration-300 hover:-translate-y-1 hover:border-[rgb(185_157_117/0.35)] hover:shadow-[0_10px_30px_rgb(185_157_117/0.12)]">
                            <div class="w-14 h-14 max-sm:w-12 max-sm:h-12 rounded-2xl flex items-center justify-center bg-[rgb(34_197_94/0.15)] text-[#22c55e]">
                                <v-icon size="28">mdi-trending-up</v-icon>
                            </div>
                            <div class="flex flex-1 flex-col gap-1.5">
                                <span class="text-[rgb(255_252_239/0.55)] text-[13px] uppercase tracking-wide">Retorno Esperado</span>
                                <span class="text-[32px] max-sm:text-2xl font-bold" :class="portfolio.totalReturn >= 0 ? '!text-[#22c55e]' : '!text-[#ef4444]'">
                                    {{ portfolio.totalReturn.toFixed(2) }}%
                                </span>
                            </div>
                        </v-card>
                    </v-col>
                    <v-col cols="12" md="4" class="!px-2 !pb-4 md:!pb-0">
                        <v-card class="talos-glow-card !flex !items-center !gap-4 !p-6 max-sm:!p-5 !bg-black/25 backdrop-blur-[10px] border border-[rgb(185_157_117/0.12)] !rounded-[20px] transition-all duration-300 hover:-translate-y-1 hover:border-[rgb(185_157_117/0.35)] hover:shadow-[0_10px_30px_rgb(185_157_117/0.12)]">
                            <div class="w-14 h-14 max-sm:w-12 max-sm:h-12 rounded-2xl flex items-center justify-center bg-[rgb(245_158_11/0.15)] text-[#f59e0b]">
                                <v-icon size="28">mdi-chart-line</v-icon>
                            </div>
                            <div class="flex flex-1 flex-col gap-1.5">
                                <span class="text-[rgb(255_252_239/0.55)] text-[13px] uppercase tracking-wide">Risco</span>
                                <span class="text-[32px] max-sm:text-2xl font-bold !text-[#f59e0b]">
                                    {{ (portfolio.totalRisk).toFixed(2) }}%
                                </span>
                            </div>
                        </v-card>
                    </v-col>
                    <v-col cols="12" md="4" class="!px-2 !pb-0">
                        <v-card class="talos-glow-card !flex !items-center !gap-4 !p-6 max-sm:!p-5 !bg-black/25 backdrop-blur-[10px] border border-[rgb(185_157_117/0.12)] !rounded-[20px] transition-all duration-300 hover:-translate-y-1 hover:border-[rgb(185_157_117/0.35)] hover:shadow-[0_10px_30px_rgb(185_157_117/0.12)]">
                            <div class="w-14 h-14 max-sm:w-12 max-sm:h-12 rounded-2xl flex items-center justify-center bg-[rgb(59_130_246/0.15)] text-[#3b82f6]">
                                <v-icon size="28">mdi-puzzle</v-icon>
                            </div>
                            <div class="flex flex-1 flex-col gap-1.5">
                                <span class="text-[rgb(255_252_239/0.55)] text-[13px] uppercase tracking-wide">Ativos</span>
                                <span class="text-[32px] max-sm:text-2xl font-bold text-talos-cream">
                                    {{ portfolio.portfolioStocks.length }}
                                </span>
                            </div>
                        </v-card>
                    </v-col>
                </v-row>

                <v-card class="talos-glow-card talos-stocks-card !bg-black/25 backdrop-blur-[10px] border border-[rgb(185_157_117/0.12)] !rounded-[20px] overflow-hidden !mt-2">
                    <v-card-title class="d-flex align-center !py-5 !px-6">
                        <v-icon start color="#B99D75" class="mr-2">mdi-format-list-bulleted</v-icon>
                        Ativos do Portfólio
                    </v-card-title>
                    <v-divider class="mx-4 !border-[rgb(185_157_117/0.12)]" />
                    <v-table class="talos-stocks-table max-sm:[&_th]:!p-3 max-sm:[&_td]:!p-3 max-sm:[&_th]:!text-[13px] max-sm:[&_td]:!text-[13px]">
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Empresa</th>
                                <th>Setor</th>
                                <th>Alocação</th>
                                <th>Dividend Yield</th>
                                <th>Volatilidade</th>
                                <th>Última atualização</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in portfolio.portfolioStocks" :key="item.id" class="transition-colors duration-200">
                                <td>
                                    <div class="flex items-center">
                                        <span class="font-weight-bold">{{ item.stock.symbol.symbol }}</span>
                                    </div>
                                </td>
                                <td>{{ item.stock.companyName || '—' }}</td>
                                <td>
                                    <v-chip size="small" :color="getSectorColor(item.stock.sector)" variant="tonal">
                                        {{ item.stock.sector || 'Não definido' }}
                                    </v-chip>
                                </td>
                                <td>
                                    <span class="text-[#22c55e] font-semibold">{{ item.percentage?.toFixed(2) || '0.00' }}%</span>
                                </td>
                                <td>
                                    <span class="text-[#22c55e] font-semibold">{{ item.stock.dividendYield?.toFixed(2) || '0.00' }}%</span>
                                </td>
                                <td>
                                    <span :class="getVolatilityClass(item.stock.volatility)">
                                        {{ (item.stock.volatility)?.toFixed(2) || '0.00' }}%
                                    </span>
                                </td>
                                <td>
                                    <span class="!text-[rgb(255_252_239/0.5)]">
                                        {{ formatDate(item.stock.lastFetchedAt) }}
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </v-table>
                    <v-card-text v-if="!portfolio.portfolioStocks?.length" class="text-center">
                        <v-icon size="48" color="grey-darken-1" class="mb-3">mdi-package-variant</v-icon>
                        <p class="!text-[rgb(255_252_239/0.5)]">Nenhum ativo encontrado neste portfólio</p>
                    </v-card-text>
                </v-card>
            </div>
            <div v-else-if="!portfolio" class="flex flex-col items-center justify-center min-h-[400px]">
                <v-progress-circular indeterminate size="60" color="#B99D75" />
                <p class="!text-[rgb(255_252_239/0.5)] mt-4">Carregando portfólio...</p>
            </div>
            <v-alert v-else type="error" variant="tonal" class="!bg-[rgb(239_68_68/0.1)] !border !border-[rgb(239_68_68/0.2)] !rounded-2xl text-white">
                <v-icon start>mdi-alert-circle</v-icon>
                Portfólio não encontrado
            </v-alert>
        </v-container>
    </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router"
import { usePortfoliosStore } from "@/stores/portfoliosStore"
import { computed, onMounted } from "vue"

const route = useRoute()
const router = useRouter()
const store = usePortfoliosStore()

const portfolio = computed(() =>
    store.getPortfolio(Number(route.params.id))
)

function formatDate(date: string) {
    return new Date(date).toLocaleDateString("pt-BR", {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    })
}

function getSectorColor(sector: string) {
    const colors: Record<string, string> = {
        'Financeiro': 'amber',
        'Energia': 'orange',
        'Tecnologia': 'blue',
        'Saúde': 'green',
        'Consumo': 'red',
        'Industrial': 'purple',
        'Materiais Básicos': 'brown',
        'Comunicações': 'cyan'
    }
    return colors[sector] || 'grey'
}

function getVolatilityClass(volatility: number) {
    if (!volatility) return '!text-[rgb(255_252_239/0.5)]'
    if (volatility < 20) return '!text-[#22c55e]'
    if (volatility < 35) return '!text-[#f59e0b]'
    return '!text-[#ef4444]'
}
</script>
