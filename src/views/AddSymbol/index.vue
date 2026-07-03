<template>
  <div class="talos-add-symbol-bg">
    <v-container class="d-flex justify-center align-center" style="min-height: 90vh">
      <v-card
        class="talos-symbol-card w-[500px] max-sm:w-[90%] max-sm:!mx-5 !bg-[rgb(28_45_65/0.9)] backdrop-blur-[20px] !border !border-[rgb(185_157_117/0.2)] !rounded-[32px] relative overflow-hidden"
        elevation="24"
      >
        <div class="absolute top-0 inset-x-0 h-2 pointer-events-none">
          <div class="talos-card-top-bar"></div>
          <div class="talos-card-top-glow"></div>
        </div>

        <div class="text-center !pt-10 !px-10 !pb-5 max-sm:!pt-[30px] max-sm:!px-5 max-sm:!pb-[15px] group">
          <v-avatar
            size="70"
            class="!bg-gradient-to-br !from-[rgb(185_157_117/0.15)] !to-[rgb(185_157_117/0.05)] !border-2 !border-[rgb(185_157_117/0.3)] !mb-4 transition-all duration-300 group-hover:scale-105 group-hover:!border-talos-gold"
          >
            <v-icon size="36" color="#B99D75">mdi-plus-circle</v-icon>
          </v-avatar>
          <h2 class="text-h4 font-weight-bold text-talos-gold !mb-2">Novo Símbolo</h2>
          <p class="text-subtitle-1 !text-[rgb(255_252_239/0.65)] !m-0">Adicione um novo ativo à base de dados</p>
        </div>

        <v-card-text class="!py-5 !px-10 max-sm:!py-[15px] max-sm:!px-5">
          <div class="bg-black/20 rounded-[20px] !p-6 border border-[rgb(185_157_117/0.12)] max-sm:!p-4">
            <v-text-field
              v-model="symbol"
              label="Símbolo da Ação"
              placeholder="ex: PETR4, VALE3, ITUB4"
              :error="symbolError"
              :error-messages="symbolError ? 'Formato inválido. Use apenas letras e números.' : ''"
              variant="outlined"
              class="talos-v-symbol-input"
              bg-color="rgba(255,255,255,0.02)"
              hide-details="auto"
              @keyup.enter="handleSubmit"
            >
              <template #prepend>
                <v-icon color="#B99D75" size="22">mdi-cash</v-icon>
              </template>

              <template #append>
                <v-chip
                  v-if="symbol && !symbolError"
                  size="small"
                  color="success"
                  variant="tonal"
                  class="!bg-[rgb(34_197_94/0.1)] !text-[#22c55e] pointer-events-none"
                >
                  <v-icon start size="14">mdi-check-circle</v-icon>
                  válido
                </v-chip>
              </template>
            </v-text-field>

            <div class="flex items-center !gap-2 flex-wrap !mt-2">
              <span class="text-[rgb(255_252_239/0.55)] !text-xs !mr-1">Exemplos:</span>
              <v-chip
                v-for="ex in examples"
                :key="ex"
                size="x-small"
                variant="tonal"
                color="grey-darken-2"
                class="!bg-[rgb(185_157_117/0.05)] !text-[rgb(255_252_239/0.6)] cursor-pointer transition-all duration-200 border border-transparent hover:!bg-[rgb(185_157_117/0.15)] hover:!text-talos-gold hover:border-[rgb(185_157_117/0.3)]"
                @click="symbol = ex"
              >
                {{ ex }}
              </v-chip>
            </div>
          </div>

          <v-expand-transition>
            <v-alert
              v-if="symbol && !symbolError"
              type="info"
              variant="tonal"
              class="!bg-[rgb(185_157_117/0.05)] !border !border-[rgb(185_157_117/0.15)] !text-[rgb(255_252_239/0.6)] !rounded-xl !mt-4"
              density="compact"
            >
              <div class="d-flex align-center">
                <span>O símbolo <strong>{{ symbol.toUpperCase() }}</strong> será verificado no Yahoo Finance.</span>
              </div>
            </v-alert>
          </v-expand-transition>

          <div class="flex justify-around items-center bg-black/20 rounded-2xl !p-4 border border-[rgb(185_157_117/0.12)] !mt-6">
            <div class="flex flex-col items-center flex-1">
              <span class="!text-2xl max-sm:!text-xl font-bold text-talos-gold leading-tight">{{ totalSymbols }}</span>
              <span class="!text-[11px] max-sm:!text-[10px] text-[rgb(255_252_239/0.55)] uppercase tracking-wide">ativos cadastrados</span>
            </div>
            <div class="w-px !h-[30px] bg-[rgb(185_157_117/0.2)]"></div>
            <div class="flex flex-col items-center flex-1">
              <span class="!text-2xl max-sm:!text-xl font-bold text-talos-gold leading-tight">{{ lastUpdate }}</span>
              <span class="!text-[11px] max-sm:!text-[10px] text-[rgb(255_252_239/0.55)] uppercase tracking-wide">última atualização</span>
            </div>
          </div>
        </v-card-text>

        <v-divider class="!mx-6 !border-[rgb(185_157_117/0.15)]" />

        <v-card-actions class="!p-6">
          <v-btn
            class="talos-submit-btn !bg-gradient-to-br !from-talos-gold !to-[#9b835f] !text-talos-bg !font-bold !text-base !py-6 max-sm:!py-5 !rounded-2xl normal-case tracking-wide !overflow-visible transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgb(185_157_117/0.3)] disabled:opacity-70 disabled:grayscale-[0.5]"
            block
            :loading="loading"
            prepend-icon="mdi-plus"
            @click="handleSubmit"
          >
            Registrar Símbolo
          </v-btn>
        </v-card-actions>

        <div class="!py-5 !px-10 max-sm:!py-[15px] max-sm:!px-5 text-center bg-black/20 border-t border-[rgb(185_157_117/0.1)]">
          <p class="text-caption !text-[rgb(255_252_239/0.55)] !m-0">
            <v-icon size="14" color="#B99D75" class="!mr-1">mdi-lightbulb-outline</v-icon>
            Dica: Para ações brasileiras, use o código sem .SA (ex: PETR4)
          </p>
        </div>
      </v-card>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { createStock, getStocksSummary } from "../../services/stocks";
import { isValidStockSymbol } from '@/utils/validators';
import { notify } from "@/utils/toast";

const symbol = ref("");
const loading = ref(false);
const totalSymbols = ref(0);
const lastUpdate = ref('');
const examples = ['PETR4', 'VALE3', 'ITUB4', 'ELET3', 'BPAC11'];

onMounted(async () => {
  try {
    const resul = await getStocksSummary()

    totalSymbols.value = resul?.totalAssets ?? 0

    lastUpdate.value = resul?.lastUpdate
      ? new Date(resul?.lastUpdate).toLocaleDateString('pt-BR')
      : '-'

  } catch (e) {
    console.error(e)
  }
})

const symbolError = computed(() =>
  symbol.value.length > 0 && !isValidStockSymbol(symbol.value)
);

async function handleSubmit() {
  loading.value = true;

  try {
    if (!symbol.value) {
      notify.warning('Informe um símbolo válido.')
      return;
    }

    const normalizedSymbol = symbol.value.trim().toUpperCase();

    if (!isValidStockSymbol(normalizedSymbol)) {
      notify.warning('Símbolo inválido. Use apenas letras e números.')
      return;
    }

    await createStock(normalizedSymbol);

    notify.success('Símbolo registrado com sucesso!')
    symbol.value = ''

    totalSymbols.value++
  } catch (error: any) {
    if (error?.response?.status === 409) {
      notify.error('Símbolo já existe na base de dados!')
    } else {
      notify.error('Erro ao registrar símbolo.')
    }
  } finally {
    loading.value = false;
  }
}
</script>
