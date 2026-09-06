<template>
  <div class="talos-auth-shell px-5">
    <div
      class="talos-auth-card !w-[520px] !max-w-full !p-10 text-center"
      role="status"
      aria-live="polite"
    >
      <div class="flex items-center justify-center gap-3 !mb-8">
        <img
          src="@/assets/talos_logo.png"
          alt="Talos"
          class="w-12 h-12 drop-shadow-[0_0_16px_rgb(185_157_117/0.35)]"
        />
        <span class="text-2xl font-bold text-talos-gold tracking-tight">Talos</span>
      </div>

      <div
        class="mx-auto !mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[rgb(185_157_117/0.12)] border border-[rgb(185_157_117/0.25)]"
      >
        <v-icon size="36" color="#B99D75" class="maintenance-icon">mdi-wrench-clock</v-icon>
      </div>

      <h1 class="talos-glow-text !text-[1.75rem] !font-bold !text-white !m-0 !mb-3">
        Sistema em manutenção
      </h1>

      <p class="!text-[rgb(255_252_239/0.75)] !text-base !leading-relaxed !m-0 !mb-6">
        {{ message }}
      </p>

      <div
        v-if="estimatedReturn"
        class="inline-flex items-center gap-2 rounded-xl border border-[rgb(185_157_117/0.25)] bg-[rgb(255_252_239/0.04)] !px-4 !py-2.5 !mb-6"
      >
        <v-icon size="18" color="#B99D75">mdi-clock-outline</v-icon>
        <span class="!text-sm text-talos-cream">
          Previsão de retorno:
          <strong class="text-talos-gold font-semibold">{{ estimatedReturn }}</strong>
        </span>
      </div>

      <p class="!text-sm !text-[rgb(255_252_239/0.45)] !m-0">
        Agradecemos a compreensão. Em breve tudo volta ao normal.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useSystemStore } from '@/stores/systemStore'

const systemStore = useSystemStore()

const message = computed(
  () =>
    systemStore.maintenanceMessage ||
    'Estamos realizando melhorias para oferecer uma experiência ainda melhor. O acesso ao Talos está temporariamente indisponível.',
)

const estimatedReturn = computed(() => systemStore.maintenanceEstimatedReturn)
</script>

<style scoped>
.maintenance-icon {
  animation: pulse-soft 2.4s ease-in-out infinite;
}

@keyframes pulse-soft {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.72;
    transform: scale(0.94);
  }
}
</style>
