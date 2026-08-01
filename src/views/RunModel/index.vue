<template>
    <div class="min-h-screen talos-page-gradient">
        <v-container class="!py-6">
            <v-sheet
                class="!bg-[rgb(28_45_65/0.85)] backdrop-blur-[10px] !border !border-[rgb(185_157_117/0.2)] !rounded-[28px] overflow-visible"
                rounded="xl" elevation="0">
                <div
                    class="flex items-center !gap-5 !px-8 !pt-8 !pb-6 bg-gradient-to-br from-[rgb(185_157_117/0.05)] to-transparent border-b border-[rgb(185_157_117/0.1)] max-md:flex-col max-md:text-center max-md:!p-6">
                    <div class="w-14 h-14 bg-[rgb(185_157_117/0.1)] rounded-[18px] flex items-center justify-center">
                        <v-icon size="32" color="#B99D75">mdi-robot-outline</v-icon>
                    </div>
                    <div>
                        <h2
                            class="text-h4 font-weight-bold !m-0 bg-talos-gold bg-clip-text text-transparent max-sm:!text-2xl">
                            Executar Modelo de Seleção</h2>
                        <p class="text-subtitle-1 !mt-1 !text-[rgb(255_252_239/0.7)] !m-0">Otimize sua carteira com base
                            em dados históricos e programação linear</p>
                    </div>
                </div>

                <v-alert
                    class="!mx-8 !my-6 max-md:!m-4 !bg-[rgb(185_157_117/0.05)] !border !border-[rgb(185_157_117/0.15)] !rounded-[20px]"
                    variant="tonal" density="comfortable" rounded="lg">
                    <div class="text-talos-cream">
                        <div class="flex items-center text-sm text-talos-gold">
                            <v-icon size="20" color="#B99D75" class="mr-2">mdi-information-outline</v-icon>
                            <strong>Status das Ações</strong>
                        </div>
                        <p class="!mt-2 !mb-2">
                            Ao passar o mouse por cima das ações você poderá ver o status dela.
                        </p>
                        <div class="flex items-center flex-wrap !gap-2 !mt-2 max-md:flex-col max-md:items-start">
                            <v-chip size="small" color="#22c55e" variant="tonal" class="font-medium">validated</v-chip>
                            <span class="text-[rgb(255_252_239/0.6)] text-xs !mr-4 max-md:!mb-2">= ação
                                verificada</span>

                            <v-chip size="small" color="#f59e0b" variant="tonal" class="font-medium">pending</v-chip>
                            <span class="text-[rgb(255_252_239/0.6)] text-xs !mr-4 max-md:!mb-2">= ação ainda não
                                verificada</span>

                            <v-chip size="small" color="#ef4444" variant="tonal" class="font-medium">invalid</v-chip>
                            <span class="text-[rgb(255_252_239/0.6)] text-xs !mr-4 max-md:!mb-2">= ação possivelmente
                                inexistente / não encontrada</span>
                        </div>
                        <div
                            class="flex items-start !gap-2 bg-black/20 !p-3 rounded-xl text-[13px] text-[rgb(255_252_239/0.7)] !mt-3">
                            <v-icon size="16" color="#B99D75">mdi-shield-check</v-icon>
                            <span>
                                Qualquer pessoa pode cadastrar ativos. Cabe a você decidir se quer rodar o modelo com
                                eles.
                                Caso algum ativo não exista, o modelo apenas <strong
                                    class="text-talos-gold">ignora</strong> e segue com os
                                outros.
                            </span>
                        </div>
                    </div>
                </v-alert>

                <div class="!px-8 max-md:!px-4">
                    <div class="grid grid-cols-1 !gap-4">
                        <OptimizationModelSelector />
                        <ConstraintSelector />

                        <div
                            class="grid !gap-6 items-stretch max-md:!gap-4"
                            :class="showRiskInput ? 'grid-cols-2 max-md:grid-cols-1' : 'grid-cols-1'"
                        >
                            <div class="flex flex-col min-h-0">
                                <div
                                    class="flex-1 flex flex-col min-h-[220px] bg-black/20 border border-[rgb(185_157_117/0.1)] rounded-[20px] !p-5">
                                    <div class="flex items-center !gap-2.5 !mb-4 shrink-0">
                                        <v-icon color="#B99D75" size="20">mdi-calendar-range</v-icon>
                                        <h3 class="text-talos-cream text-base max-sm:!text-sm font-semibold !m-0">Período de
                                            Análise</h3>
                                    </div>
                                    <div class="flex-1 flex flex-col min-h-0">
                                        <DateRangeSelector />
                                    </div>
                                </div>
                            </div>
                            <div v-if="showRiskInput" class="flex flex-col min-h-0">
                                <div
                                    class="flex-1 flex flex-col min-h-[220px] bg-black/20 border border-[rgb(185_157_117/0.1)] rounded-[20px] !p-5">
                                    <div class="flex items-center !gap-2.5 !mb-4 shrink-0">
                                        <v-icon color="#B99D75" size="20">mdi-chart-line</v-icon>
                                        <h3 class="text-talos-cream text-base max-sm:!text-sm font-semibold !m-0">Nível de
                                            Risco</h3>
                                    </div>
                                    <div>
                                        <AcceptableRiskInput />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="!px-8 !py-6 max-md:!px-4">
                    <div
                        class="flex justify-between items-center !mb-5 max-md:flex-col max-md:items-start max-md:!gap-3">
                        <div class="flex items-center">
                            <v-icon color="#B99D75" size="24">mdi-stock</v-icon>
                            <h3 class="text-talos-cream text-lg font-semibold !m-0 !ml-2">Seleção de Ações</h3>
                        </div>
                        <div class="talos-selected-badge">
                            <v-chip :color="analysis.selectedSymbols.length > 0 ? '#B99D75' : '#4a5568'"
                                variant="tonal">
                                <v-icon start size="14"
                                    :color="analysis.selectedSymbols.length > 0 ? '#B99D75' : '#9aa4bf'">mdi-check-circle</v-icon>
                                {{ analysis.selectedSymbols.length }} ações selecionadas
                            </v-chip>
                        </div>
                    </div>
                    <StockSelector />
                </div>

                <v-divider class="!bg-[rgb(185_157_117/0.15)] !my-4 !mx-8 max-md:!mx-4" />

                <div class="!px-8 !pb-8 max-md:!px-4 max-md:!pb-6">
                    <v-btn
                        class="!bg-gradient-to-br !from-talos-gold !to-[#9b835f] !text-talos-bg !font-bold normal-case !text-base !py-5 !rounded-[48px] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgb(185_157_117/0.3)] disabled:opacity-50 disabled:transform-none"
                        size="x-large" block :loading="loading"
                        :disabled="analysis.selectedSymbols.length === 0 || loading" @click="runModel">
                        <template #prepend>
                            <v-icon>mdi-play-circle</v-icon>
                        </template>

                        <span v-if="!loading">
                            Rodar Modelo com {{ analysis.selectedSymbols.length }} ações
                        </span>
                        <span v-else>
                            Executando modelo...
                        </span>
                    </v-btn>
                    <p v-if="analysis.selectedSymbols.length > 0 && analysis.selectedSymbols.length < 5"
                        class="flex items-center justify-center !gap-2 !mt-3 text-[#f59e0b] text-xs">
                        <v-icon size="14" color="#f59e0b">mdi-alert</v-icon>
                        Recomendamos selecionar pelo menos 5 ações para uma melhor diversificação
                    </p>
                </div>

                <v-alert v-if="runError" type="error" variant="tonal"
                    class="!border !border-[rgb(239_68_68/0.35)] !mx-8 !mb-4 max-md:!mx-4" rounded="lg" closable
                    @click:close="runError = null">
                    {{ runError }}
                </v-alert>

                <div v-if="modelResult?.optimization" ref="resultsRef" class="!px-4 !pb-8">
                    <ModelResult :optimization="modelResult.optimization" />
                </div>
            </v-sheet>
        </v-container>
    </div>
</template>

<script setup lang="ts">
import StockSelector from "@/components/StockSelector.vue";
import DateRangeSelector from "@/components/DateRangeSelector.vue";
import AcceptableRiskInput from "@/components/AcceptableRiskInput.vue";
import OptimizationModelSelector from "@/components/OptimizationModelSelector.vue";
import ConstraintSelector from "@/components/ConstraintSelector.vue";
import { useAnalysisStore } from "@/stores/analysisStore";
import { analyzeStocks } from "@/services/analisys";
import ModelResult from "@/components/ModelResult.vue";
import { notify } from "@/utils/toast";
import { ref, nextTick, computed } from 'vue';

const modelResult = ref<any | null>(null);
const runError = ref<string | null>(null);
const resultsRef = ref<HTMLElement | null>(null);
const analysis = useAnalysisStore();
const loading = ref(false)

const showRiskInput = computed(() => {
    if (analysis.modelId !== 'custom') return true;
    return analysis.constraints.useRiskLimit;
});

async function runModel() {
    if (!analysis.selectedSymbols || analysis.selectedSymbols.length < 5) {
        notify.error('Selecione pelo menos 5 ações para uma otimização eficiente.');
        return;
    }

    modelResult.value = null;
    runError.value = null;

    const payload: any = {
        stocks: analysis.selectedSymbols,
        modelId: analysis.modelId,
    }

    if (analysis.modelId === 'custom') {
        payload.constraints = { ...analysis.constraints }
    }

    if (analysis.start && analysis.start.trim() !== '') {
        payload.start = analysis.start
    }

    if (analysis.end && analysis.end.trim() !== '') {
        payload.end = analysis.end
    }

    if (
        analysis.acceptableRisk !== null &&
        analysis.acceptableRisk !== undefined &&
        showRiskInput.value
    ) {
        payload.acceptableRisk = analysis.acceptableRisk
    }

    notify.info('Aguarde enquanto o modelo é executado...');
    loading.value = true;

    try {
        const result = await analyzeStocks(payload as any);

        if (result.error || !result.optimization) {
            const message = result.error ?? 'Falha ao otimizar a carteira.';
            runError.value = message;
            notify.error(message);
            return;
        }
        modelResult.value = result;
        notify.success('Modelo executado com sucesso!');
        await nextTick();
        resultsRef.value?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch (err) {
        console.error(err);
        notify.error('Erro ao executar modelo.');
    } finally {
        loading.value = false;
    }
}
</script>
