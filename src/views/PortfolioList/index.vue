<template>
    <div class="portfolio-page">
        <v-container class="py-8">
            <div class="header glass-panel">
                <div>
                    <h1 class="title">
                        <span class="my-portfolios-text">Meus Portfólios</span>
                    </h1>
                    <p class="subtitle">Gerencie suas carteiras de investimento com inteligência</p>
                </div>

                <v-btn size="x-large" class="create-btn" @click="goCreate">
                    <template #prepend>
                        <v-icon size="20">mdi-plus</v-icon>
                    </template>
                    Novo Portfólio
                </v-btn>
            </div>

            <div v-if="loading" class="loading-state">
                <v-progress-circular indeterminate size="64" width="4" color="#B99D75" />
                <p class="loading-text">Carregando seus portfólios...</p>
            </div>

            <v-row v-else>
                <v-col v-for="portfolio in portfolios" :key="portfolio.id" cols="12" sm="6" lg="4">
                    <v-hover v-slot="{ isHovering, props }">
                        <v-card v-bind="props" class="portfolio-card" :class="{ 'card-hover': isHovering }"
                            @click="viewPortfolio(portfolio.id)">
                            <div class="card-badge" :class="getPerformanceClass(portfolio)">
                                <v-icon size="14">mdi-trending-up</v-icon>
                                <span>{{ getPerformanceLabel(portfolio) }}</span>
                            </div>
                            <div class="card-icon">
                                <v-avatar size="56" class="card-avatar" variant="tonal">
                                    <v-icon size="28" color="#B99D75">mdi-briefcase-variant</v-icon>
                                </v-avatar>
                            </div>
                            <v-card-item>
                                <v-card-title class="card-title">
                                    {{ portfolio.name }}
                                </v-card-title>
                                <v-card-subtitle class="card-subtitle">
                                    <v-icon size="14">mdi-calendar</v-icon>
                                    Criado em {{ formatDate(portfolio.createdAt) }}
                                </v-card-subtitle>
                            </v-card-item>
                            <v-card-text class="card-content">
                                <div class="metrics-grid">
                                    <div class="metric-item">
                                        <span class="metric-label">Retorno Total</span>
                                        <div class="metric-value-wrapper">
                                            <v-icon size="18" color="success">mdi-trending-up</v-icon>
                                            <span class="metric-value success--text">
                                                {{ portfolio.totalReturn?.toFixed(2) }}%
                                            </span>
                                        </div>
                                    </div>
                                    <div class="metric-item">
                                        <span class="metric-label">Risco</span>
                                        <div class="metric-value-wrapper">
                                            <v-icon size="18" color="warning">mdi-chart-line</v-icon>
                                            <span class="metric-value warning--text">
                                                {{ (portfolio.totalRisk)?.toFixed(2) }}%
                                            </span>
                                        </div>
                                    </div>
                                    <div class="metric-item">
                                        <span class="metric-label">Ativos</span>
                                        <div class="metric-value-wrapper">
                                            <v-icon size="18" color="info">mdi-puzzle</v-icon>
                                            <span class="metric-value">
                                                {{ portfolio.portfolioStocks?.length || 0 }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="performance-chart">
                                    <div class="chart-bar" :style="{ width: getPerformanceWidth(portfolio) + '%' }" />
                                </div>
                            </v-card-text>
                            <v-divider class="card-divider" />
                            <v-card-actions class="card-actions">
                                <v-btn variant="text" color="#B99D75" size="small"
                                    @click.stop="viewPortfolio(portfolio.id)">
                                    <v-icon start size="16">mdi-eye</v-icon>
                                    Ver detalhes
                                </v-btn>
                                <v-spacer />
                                <v-btn icon variant="text" size="small" color="grey"
                                    @click.stop="toggleMenu(portfolio.id)">
                                    <v-icon>mdi-dots-vertical</v-icon>
                                </v-btn>
                                <v-menu v-model="portfolio.menuOpen" :close-on-content-click="false" activator="parent"
                                    location="bottom end">
                                    <v-list density="compact" class="action-menu">
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

                                        <v-list-item @click="confirmDelete(portfolio.id)" class="delete-item">
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
        </v-container>

        <DeletePortfolioDialog v-model="deleteDialog.show" :portfolio-id="deleteDialog.portfolioId"
            :portfolio-name="deleteDialog.portfolioName" @confirm="executeDelete" />
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

<style scoped>
.portfolio-page {
    min-height: 100vh;
    background: radial-gradient(circle at top, #1C2D41 0%, #0f1a24 100%);
    padding: 20px;
}

.glass-panel {
    background: rgba(28, 45, 65, 0.85) !important;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(185, 157, 117, 0.2);
    border-radius: 24px !important;
    padding: 24px 32px;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
}

.title {
    font-size: 36px;
    font-weight: 800;
    margin-bottom: 8px;
}

.my-portfolios-text {
    color: #fffcef;
}

.subtitle {
    color: rgba(255, 252, 239, 0.65);
    font-size: 16px;
    margin: 0;
}

.create-btn {
    background: #b99d75;
    color: #1c2d41 !important;
    border-radius: 40px !important;
    padding: 0 24px !important;
    height: 52px !important;
    font-weight: 600;
    text-transform: none;
    letter-spacing: normal;
    box-shadow: 0 8px 20px rgba(185, 157, 117, 0.25);
    transition: all 0.3s ease;
}

.create-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 28px rgba(185, 157, 117, 0.35);
}

.loading-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 400px;
}

.loading-text {
    color: rgba(255, 252, 239, 0.6);
    margin-top: 20px;
    font-size: 16px;
}

.card-avatar {
    background: rgba(185, 157, 117, 0.12) !important;
}

.portfolio-card {
    background: rgba(0, 0, 0, 0.25) !important;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(185, 157, 117, 0.12);
    border-radius: 20px !important;
    padding: 20px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.card-hover {
    transform: translateY(-4px) scale(1.02);
    border: 1px solid rgba(185, 157, 117, 0.35) !important;
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.35);
}

.card-badge {
    position: absolute;
    top: 16px;
    right: 16px;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 4px;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(5px);
}

.performance-excellent {
    background: rgba(0, 230, 118, 0.1);
    color: #00e676;
}

.performance-good {
    background: rgba(33, 150, 243, 0.1);
    color: #2196f3;
}

.performance-regular {
    background: rgba(255, 193, 7, 0.1);
    color: #ffc107;
}

.card-icon {
    margin-bottom: 16px;
}

.card-title {
    font-size: 20px;
    font-weight: 700;
    color: #fffcef;
    margin-bottom: 4px;
    padding: 0 !important;
}

.card-subtitle {
    color: rgba(255, 252, 239, 0.55);
    font-size: 13px;
    display: flex;
    align-items: center;
    gap: 4px;
}

.card-content {
    padding: 16px 0 0 !important;
}

.metrics-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    margin-bottom: 20px;
}

.metric-item {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.metric-label {
    font-size: 11px;
    color: rgba(255, 252, 239, 0.5);
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.metric-value-wrapper {
    display: flex;
    align-items: center;
    gap: 4px;
}

.metric-value {
    font-size: 16px;
    font-weight: 700;
    color: #fffcef;
}

.success--text {
    color: #00e676 !important;
}

.warning--text {
    color: #ff7043 !important;
}

.performance-chart {
    height: 4px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 2px;
    overflow: hidden;
    margin-top: 8px;
}

.chart-bar {
    height: 100%;
    background: linear-gradient(90deg, #b99d75, #9b835f);
    border-radius: 2px;
    transition: width 0.3s ease;
}

.card-divider {
    background: rgba(185, 157, 117, 0.12);
    margin: 16px 0 8px;
}

.card-actions {
    padding: 8px 4px !important;
}

.action-menu {
    background: #1c2d41 !important;
    border: 1px solid rgba(185, 157, 117, 0.2);
}

.action-menu :deep(.v-list-item) {
    color: #fffcef;
}

.action-menu :deep(.v-list-item:hover) {
    background: rgba(185, 157, 117, 0.1) !important;
}

.delete-item:hover {
    background: rgba(244, 67, 54, 0.1) !important;
}

.create-card {
    background: rgba(0, 0, 0, 0.2) !important;
    border: 2px dashed rgba(185, 157, 117, 0.3);
    border-radius: 20px !important;
    height: 100%;
    min-height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
}

.create-card:hover {
    border-color: #b99d75;
    background: rgba(28, 45, 65, 0.5) !important;
    transform: scale(1.02);
}

.create-card-content {
    text-align: center;
    padding: 32px;
}

.create-card-content h3 {
    color: #fffcef;
    font-size: 20px;
    margin: 16px 0 8px;
}

.create-card-content p {
    color: rgba(255, 252, 239, 0.55);
    font-size: 14px;
    margin: 0;
}

.empty-state {
    background: rgba(28, 45, 65, 0.6) !important;
    border: 1px solid rgba(185, 157, 117, 0.15);
    border-radius: 24px !important;
    padding: 48px;
    text-align: center;
}

.empty-state h3 {
    color: #fffcef;
    font-size: 24px;
    margin: 16px 0 8px;
}

.empty-state p {
    color: rgba(255, 252, 239, 0.55);
    font-size: 16px;
    margin-bottom: 24px;
}

.delete-dialog {
    background: #1c2d41 !important;
    border: 1px solid rgba(185, 157, 117, 0.2);
}

.delete-dialog :deep(.v-card-title) {
    color: #fffcef;
}

.delete-dialog :deep(.v-card-text) {
    color: rgba(255, 252, 239, 0.6);
}

@media (max-width: 600px) {
    .header {
        flex-direction: column;
        gap: 16px;
        text-align: center;
    }

    .title {
        font-size: 28px;
    }

    .metrics-grid {
        grid-template-columns: 1fr;
        gap: 12px;
    }

    .create-btn {
        width: 100%;
    }
}
</style>