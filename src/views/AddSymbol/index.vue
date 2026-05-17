<template>
  <div class="add-symbol-bg">
    <v-container class="d-flex justify-center align-center" style="min-height: 90vh">
      <v-card class="symbol-card" elevation="24">
        <div class="card-decoration">
          <div class="decoration-bar"></div>
          <div class="decoration-glow"></div>
        </div>

        <div class="card-header">
          <v-avatar size="70" class="header-avatar">
            <v-icon size="36" color="#B99D75">mdi-plus-circle</v-icon>
          </v-avatar>
          <h2 class="text-h4 font-weight-bold novo-simbolo-text">Novo Símbolo</h2>
          <p class="text-subtitle-1 text-grey">Adicione um novo ativo à base de dados</p>
        </div>

        <v-card-text class="card-content">
          <div class="input-wrapper">
            <v-text-field v-model="symbol" label="Símbolo da Ação" placeholder="ex: PETR4, VALE3, ITUB4"
              :error="symbolError" :error-messages="symbolError ? 'Formato inválido. Use apenas letras e números.' : ''"
              variant="outlined" class="symbol-input" bg-color="rgba(255,255,255,0.02)" hide-details="auto"
              @keyup.enter="handleSubmit">
              <template #prepend>
                <v-icon color="#B99D75" size="22">mdi-cash</v-icon>
              </template>

              <template #append>
                <v-chip v-if="symbol && !symbolError" size="small" color="success" variant="tonal" class="valid-chip">
                  <v-icon start size="14">mdi-check-circle</v-icon>
                  válido
                </v-chip>
              </template>
            </v-text-field>

            <div class="examples mt-2">
              <span class="examples-label">Exemplos:</span>
              <v-chip v-for="ex in examples" :key="ex" size="x-small" variant="tonal" color="grey-darken-2"
                class="example-chip" @click="symbol = ex">
                {{ ex }}
              </v-chip>
            </div>
          </div>

          <v-expand-transition>
            <v-alert v-if="symbol && !symbolError" type="info" variant="tonal" class="info-alert mt-4"
              density="compact">
              <div class="d-flex align-center">
                <span>O símbolo <strong>{{ symbol.toUpperCase() }}</strong> será verificado no Yahoo Finance.</span>
              </div>
            </v-alert>
          </v-expand-transition>
          <div class="stats-section mt-6">
            <div class="stat-item">
              <span class="stat-value">{{ totalSymbols }}</span>
              <span class="stat-label">ativos cadastrados</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <span class="stat-value">{{ lastUpdate }}</span>
              <span class="stat-label">última atualização</span>
            </div>
          </div>
        </v-card-text>

        <v-divider class="mx-6 divider-gold" />

        <v-card-actions class="pa-6">
          <v-btn class="submit-btn" block :loading="loading" @click="handleSubmit">
            <template #prepend>
              <v-icon>mdi-plus</v-icon>
            </template>
            Registrar Símbolo
          </v-btn>
        </v-card-actions>

        <div class="card-footer">
          <p class="text-caption text-grey">
            <v-icon size="14" color="#B99D75" class="mr-1">mdi-lightbulb-outline</v-icon>
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

<style scoped>
.add-symbol-bg {
  min-height: 100vh;
  background: radial-gradient(circle at top, #1C2D41 0%, #0f1a24 100%);
  position: relative;
  overflow: hidden;
}

.add-symbol-bg::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(rgba(185, 157, 117, 0.04) 1px, transparent 1px);
  background-size: 50px 50px;
  pointer-events: none;
}

.symbol-card {
  width: 500px;
  background: rgba(28, 45, 65, 0.9) !important;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(185, 157, 117, 0.2);
  border-radius: 28px !important;
  position: relative;
  overflow: hidden;
  animation: slideUp 0.5s ease;
}

.divider-gold {
  border-color: rgba(185, 157, 117, 0.15) !important;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card-decoration {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 8px;
  background: linear-gradient(90deg, transparent, #b99d75, transparent);
  opacity: 0.5;
}

.decoration-bar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, #b99d75, transparent);
}

.decoration-glow {
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  height: 60px;
  background: radial-gradient(circle, rgba(185, 157, 117, 0.2) 0%, transparent 70%);
  filter: blur(20px);
}

.card-header {
  text-align: center;
  padding: 40px 40px 20px;
}

.header-avatar {
  background: linear-gradient(135deg, rgba(185, 157, 117, 0.15), rgba(185, 157, 117, 0.05));
  border: 2px solid rgba(185, 157, 117, 0.3);
  margin-bottom: 16px;
  transition: all 0.3s ease;
}

.symbol-card:hover .header-avatar {
  transform: scale(1.05);
  border-color: #b99d75;
}

.novo-simbolo-text {
  background: #b99d75;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 8px;
}

.text-grey {
  color: rgba(255, 252, 239, 0.65) !important;
}

.card-content {
  padding: 20px 40px !important;
}

.input-wrapper {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  padding: 24px;
  border: 1px solid rgba(185, 157, 117, 0.12);
}

.symbol-input :deep(.v-field) {
  background: rgba(0, 0, 0, 0.3) !important;
  border-radius: 16px !important;
}

.symbol-input :deep(.v-field__outline) {
  --v-field-border-opacity: 0.2;
  color: #b99d75;
}

.symbol-input :deep(.v-field--focused .v-field__outline) {
  --v-field-border-opacity: 0.5;
}

.symbol-input :deep(label) {
  color: rgba(255, 252, 239, 0.6) !important;
}

.symbol-input :deep(input) {
  color: #fffcef !important;
  font-weight: 500;
}

.valid-chip {
  background: rgba(34, 197, 94, 0.1) !important;
  color: #22c55e !important;
  pointer-events: none;
}

.examples {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.examples-label {
  color: rgba(255, 252, 239, 0.55);
  font-size: 12px;
  margin-right: 4px;
}

.example-chip {
  background: rgba(185, 157, 117, 0.05) !important;
  color: rgba(255, 252, 239, 0.6) !important;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

.example-chip:hover {
  background: rgba(185, 157, 117, 0.15) !important;
  color: #b99d75 !important;
  border-color: rgba(185, 157, 117, 0.3);
}

.info-alert {
  background: rgba(185, 157, 117, 0.05) !important;
  border: 1px solid rgba(185, 157, 117, 0.15) !important;
  color: rgba(255, 252, 239, 0.6) !important;
  border-radius: 12px !important;
}

.stats-section {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 16px;
  padding: 16px;
  border: 1px solid rgba(185, 157, 117, 0.12);
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
}

.stat-value {
  font-size: 24px;
  font-weight: 700;
  color: #b99d75;
  line-height: 1.2;
}

.stat-label {
  font-size: 11px;
  color: rgba(255, 252, 239, 0.55);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stat-divider {
  width: 1px;
  height: 30px;
  background: rgba(185, 157, 117, 0.2);
}

.submit-btn {
  background: linear-gradient(135deg, #b99d75 0%, #9b835f 100%) !important;
  color: #1c2d41 !important;
  font-weight: 700;
  font-size: 16px;
  padding: 24px !important;
  border-radius: 16px !important;
  text-transform: none;
  letter-spacing: 0.5px;
  transition: all 0.3s ease !important;
  position: relative;
  overflow: hidden;
}

.submit-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.submit-btn:hover::before {
  left: 100%;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(185, 157, 117, 0.3);
}

.submit-btn:disabled {
  opacity: 0.7;
  filter: grayscale(0.5);
}

.card-footer {
  padding: 20px 40px;
  text-align: center;
  background: rgba(0, 0, 0, 0.2);
  border-top: 1px solid rgba(185, 157, 117, 0.1);
}

:deep(.v-snackbar__content) {
  padding: 16px 20px !important;
  font-weight: 500;
}

:deep(.v-snackbar--variant-tonal) {
  border: 1px solid rgba(185, 157, 117, 0.15) !important;
}

@media (max-width: 600px) {
  .symbol-card {
    width: 90%;
    margin: 20px;
  }

  .card-header {
    padding: 30px 20px 15px;
  }

  .card-content {
    padding: 15px 20px !important;
  }

  .input-wrapper {
    padding: 16px;
  }

  .stat-value {
    font-size: 20px;
  }

  .stat-label {
    font-size: 10px;
  }

  .submit-btn {
    padding: 20px !important;
  }

  .card-footer {
    padding: 15px 20px;
  }
}
</style>