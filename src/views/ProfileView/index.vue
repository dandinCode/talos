<template>
  <div class="min-h-screen talos-page-gradient !py-10 !px-5 max-sm:!py-5 max-sm:!px-4">
    <v-container class="!max-w-[520px] mx-auto">
      <div class="!mb-4">
        <v-btn
          variant="text"
          class="!text-talos-cream normal-case tracking-normal !rounded-[40px] !bg-[rgb(185_157_117/0.1)] hover:!bg-[rgb(185_157_117/0.2)] hover:!text-talos-gold"
          @click="goBack"
        >
          <v-icon start size="18">mdi-arrow-left</v-icon>
          Voltar
        </v-btn>
      </div>
      <v-card class="!bg-[rgb(28_45_65/0.85)] backdrop-blur-[10px] !border !border-[rgb(185_157_117/0.2)] !rounded-[28px] overflow-hidden shadow-[0_20px_40px_rgb(0_0_0/0.35)]">
        <div class="text-center !pt-8 !px-8 !pb-5 max-sm:!pt-6 max-sm:!px-5 max-sm:!pb-4 bg-gradient-to-br from-[rgb(185_157_117/0.08)] to-[rgb(185_157_117/0.02)]">
          <div class="w-14 h-14 bg-gradient-to-br from-[rgb(185_157_117/0.15)] to-[rgb(185_157_117/0.05)] rounded-[18px] flex items-center justify-center mx-auto !mb-4 border border-[rgb(185_157_117/0.3)]">
            <v-icon size="28" color="#B99D75">mdi-account-circle</v-icon>
          </div>
          <h2 class="!text-[28px] max-sm:!text-2xl font-bold !m-0 !mb-2 bg-gradient-to-br from-talos-cream via-talos-gold to-[#8B7355] bg-clip-text text-transparent">Meu Perfil</h2>
          <p class="text-[rgb(255_252_239/0.6)] !text-sm !m-0">Gerencie suas informações pessoais</p>
        </div>

        <v-divider class="!bg-[rgb(185_157_117/0.15)] !mx-6" />

        <v-card-text class="!p-8 max-sm:!p-6">
          <div class="relative flex justify-center !mb-8">
            <v-avatar size="100" class="!bg-gradient-to-br !from-talos-gold !via-[#9b835f] !to-[#7a6349] shadow-[0_8px_20px_rgb(185_157_117/0.3)]">
              <span class="text-h5 font-weight-bold text-talos-bg">
                {{ initials }}
              </span>
            </v-avatar>
            <div class="absolute bottom-0 right-[38%] max-sm:right-[34%] bg-[#22c55e] rounded-full w-7 h-7 flex items-center justify-center border-[3px] border-talos-bg-deep">
              <v-icon size="16" color="#1C2D41">mdi-check</v-icon>
            </div>
          </div>

          <div class="flex flex-col !gap-6">
            <div class="flex flex-col !gap-2">
              <label class="text-talos-cream !text-sm font-medium flex items-center">
                <v-icon size="16" color="#B99D75" class="!mr-1">mdi-account-outline</v-icon>
                Nome completo
              </label>
              <v-text-field
                v-model="name"
                placeholder="Seu nome completo"
                variant="outlined"
                class="talos-v-custom-input"
                bg-color="rgba(0,0,0,0.2)"
                :loading="loading"
              >
                <template #append-inner>
                  <v-icon v-if="name" size="18" color="#22c55e" class="opacity-70">mdi-check-circle</v-icon>
                </template>
              </v-text-field>
              <p class="text-[rgb(255_252_239/0.4)] !text-[11px] !mt-1 !mb-0">Seu nome será usado para identificação na plataforma</p>
            </div>

            <div class="flex flex-col !gap-2">
              <label class="text-talos-cream !text-sm font-medium flex items-center">
                <v-icon size="16" color="#B99D75" class="!mr-1">mdi-email-outline</v-icon>
                Email
              </label>
              <v-text-field
                :model-value="email"
                variant="outlined"
                readonly
                disabled
                class="talos-v-custom-input talos-v-readonly-input"
                bg-color="rgba(0,0,0,0.15)"
              >
                <template #append-inner>
                  <v-chip size="x-small" color="#B99D75" variant="tonal" class="!bg-[rgb(185_157_117/0.15)] !text-talos-gold !text-[10px]">
                    não editável
                  </v-chip>
                </template>
              </v-text-field>
              <p class="text-[rgb(255_252_239/0.4)] !text-[11px] !mt-1 !mb-0">
                O email não pode ser alterado. Entre em contato com o suporte para mais informações.
              </p>
            </div>
          </div>

          <div class="bg-black/25 border border-[rgb(185_157_117/0.15)] rounded-2xl !p-4 max-sm:!p-3 !mt-6 flex flex-col !gap-3">
            <div class="flex items-center !gap-3 text-[rgb(255_252_239/0.6)] !text-[13px]">
              <v-icon size="18" color="#B99D75">mdi-shield-check</v-icon>
              <span>Dados protegidos com criptografia</span>
            </div>
            <div class="flex items-center !gap-3 text-[rgb(255_252_239/0.6)] !text-[13px]">
              <v-icon size="18" color="#B99D75">mdi-clock-outline</v-icon>
              <span>Membro desde: {{ memberSince }}</span>
            </div>
          </div>
        </v-card-text>

        <v-divider class="!bg-[rgb(185_157_117/0.15)] !mx-6" />

        <v-card-actions class="!px-8 !pb-8 !pt-6 max-sm:!px-6 max-sm:!pt-5 max-sm:!pb-6 max-sm:flex-col !gap-4">
          <v-btn
            class="flex-1 !bg-transparent !border !border-[rgb(185_157_117/0.3)] !text-talos-cream normal-case !rounded-[40px] !px-6 !py-2 hover:!bg-[rgb(185_157_117/0.1)] hover:!border-talos-gold"
            variant="outlined"
            @click="goBack"
          >
            Cancelar
          </v-btn>
          <v-btn
            class="flex-1 !bg-gradient-to-br !from-talos-gold !to-[#9b835f] !text-talos-bg !font-semibold normal-case !rounded-[40px] !px-6 !py-2 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgb(185_157_117/0.3)] disabled:opacity-50 disabled:transform-none"
            :loading="loading"
            @click="handleSave"
          >
            Salvar alterações
          </v-btn>
        </v-card-actions>
      </v-card>

      <div class="text-center !mt-6 !p-4">
        <p class="text-[rgb(255_252_239/0.4)] !text-xs !m-0 flex items-center justify-center !gap-1.5">
          <v-icon size="14" color="#B99D75">mdi-lock-outline</v-icon>
          Suas informações estão seguras e são utilizadas apenas para personalização da sua experiência.
        </p>
      </div>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { getUserInitials, decodeUTF8 } from '@/utils/user'
import { notify } from '@/utils/toast'
import { updateUser } from '@/services/user'
import { useUserStore } from '@/stores/userStore'

const router = useRouter()
const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const name = ref('')
const loading = ref(false)

watch(
  user,
  (u) => {
    if (u && typeof u === 'object') {
      name.value = decodeUTF8(u.name || '')
    }
  },
  { immediate: true, deep: true },
)

const email = computed(() => (user.value && typeof user.value === 'object' ? user.value.email || '' : ''))
const initials = computed(() => getUserInitials(user.value && typeof user.value === 'object' ? user.value : {}))

const memberSince = computed(() => {
  const u = user.value
  if (!u || typeof u !== 'object' || !u.createdAt) return '-'

  return new Date(u.createdAt).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })
})

async function handleSave() {
  if (!name.value.trim()) {
    notify.warning('Nome é obrigatório')
    return
  }

  loading.value = true

  try {
    await updateUser({
      name: name.value
    })
    notify.success('Perfil atualizado com sucesso')
    await userStore.loadUser()
  } catch (e: any) {
    notify.error(
      e?.response?.data?.message || 'Erro ao atualizar perfil'
    )
  } finally {
    loading.value = false
  }
}

function goBack() {
  router.back()
}
</script>
