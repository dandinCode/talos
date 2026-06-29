<template>
    <v-navigation-drawer
        v-model="drawer"
        :rail="collapsed && !isMobile"
        :permanent="!isMobile"
        :temporary="isMobile"
        class="talos-sidebar"
    >
        <div
            class="flex items-center gap-3 px-[18px] py-6 transition-all duration-200 cursor-pointer hover:opacity-[0.92]"
            :class="collapsed ? 'logo-rail justify-center px-0' : ''"
            role="button"
            tabindex="0"
            @click="goDashboard"
            @keydown.enter.prevent="goDashboard"
        >
            <div class="w-9 h-9 flex items-center justify-center bg-gradient-to-br from-[rgb(185_157_117/0.15)] to-[rgb(185_157_117/0.05)] rounded-xl shrink-0">
                <v-img :src="logo" width="32" height="32" />
            </div>
            <div v-if="!collapsed" class="flex flex-col gap-0.5 min-w-0">
                <span class="font-bold text-xl text-talos-gold tracking-tight leading-tight">Talos</span>
                <span class="text-[10px] font-medium italic text-[rgb(255_252_239/0.55)] leading-snug">Transforme dados em dividendos.</span>
            </div>
        </div>
        <v-divider class="!bg-[rgb(185_157_117/0.15)] my-1" />
        <v-list nav density="compact" class="px-3 py-2">
            <v-list-item
                v-for="item in menu"
                :key="item.title"
                :to="item.to"
                link
                class="nav-item !rounded-xl !my-1 transition-all duration-200 hover:!bg-[rgb(185_157_117/0.1)] group"
            >
                <template #prepend>
                    <v-icon class="nav-icon !text-[rgb(255_252_239/0.6)] group-hover:!text-talos-gold transition-colors duration-200 !text-[22px]">{{ item.icon }}</v-icon>
                </template>

                <v-list-item-title v-if="!collapsed" class="nav-title !text-[rgb(255_252_239/0.8)] !font-medium !text-sm group-hover:!text-talos-cream">
                    {{ item.title }}
                </v-list-item-title>
            </v-list-item>
        </v-list>

        <template #append>
            <v-divider class="!bg-[rgb(185_157_117/0.15)] my-1" />
            <v-list-item
                class="profile !px-4 !py-3 !mx-3 !my-2 !rounded-xl transition-all duration-200 hover:!bg-[rgb(185_157_117/0.08)] !flex !items-center"
                :class="collapsed ? 'profile-rail' : ''"
            >
                <template #prepend>
                    <v-avatar size="32" class="avatar !bg-gradient-to-br !from-talos-gold !to-[#9b835f] shrink-0">
                        <span class="font-bold text-[13px] text-talos-bg">{{ initials }}</span>
                    </v-avatar>
                </template>
                <v-list-item-title v-if="!collapsed" class="profile-name !text-talos-cream !font-medium !text-sm">
                    {{ firstName }}
                </v-list-item-title>
                <template #append>
                    <v-menu offset="7">
                        <template #activator="{ props }">
                            <v-btn icon variant="text" v-bind="props" class="!text-[rgb(255_252_239/0.5)] hover:!text-talos-gold hover:!bg-[rgb(185_157_117/0.1)] transition-colors duration-200">
                                <v-icon size="20">mdi-dots-vertical</v-icon>
                            </v-btn>
                        </template>
                        <v-list class="!bg-talos-bg !border !border-[rgb(185_157_117/0.2)] !rounded-xl !p-2 min-w-[160px]">
                            <v-list-item @click="goProfile" class="menu-item !rounded-lg !my-0.5 !text-talos-cream transition-all duration-200 hover:!bg-[rgb(185_157_117/0.1)] hover:!text-talos-gold group">
                                <template #prepend>
                                    <v-icon size="18" class="menu-icon !text-[rgb(255_252_239/0.6)] group-hover:!text-talos-gold">mdi-account-outline</v-icon>
                                </template>
                                <v-list-item-title>Perfil</v-list-item-title>
                            </v-list-item>
                            <v-divider class="!bg-[rgb(185_157_117/0.15)] my-1" />
                            <v-list-item @click="logout" class="menu-item logout-item !rounded-lg !my-0.5 !text-talos-cream transition-all duration-200 hover:!bg-[rgb(185_157_117/0.1)] hover:!text-talos-gold group">
                                <template #prepend>
                                    <v-icon size="18" class="menu-icon !text-[rgb(255_252_239/0.6)] group-hover:!text-talos-gold">mdi-logout</v-icon>
                                </template>
                                <v-list-item-title>Sair</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </template>
            </v-list-item>
            <div v-if="!isMobile" class="flex justify-center py-4 pb-5 transition-all duration-200" :class="collapsed ? 'toggle-rail' : ''">
                <v-btn icon variant="text" class="!text-[rgb(255_252_239/0.5)] hover:!text-talos-gold hover:!bg-[rgb(185_157_117/0.1)] transition-all duration-200" @click="collapsed = !collapsed">
                    <v-icon size="20">
                        {{ collapsed ? 'mdi-chevron-right' : 'mdi-chevron-left' }}
                    </v-icon>
                </v-btn>
            </div>
        </template>
    </v-navigation-drawer>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDisplay } from 'vuetify'
import { getUserFirstName, getUserInitials } from "@/utils/user"
import logo from '@/assets/talos_logo.png'
import { useUserStore } from '@/stores/userStore'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const display = useDisplay()

const isMobile = computed(() => display.smAndDown.value)
const drawer = ref(true)
const collapsed = ref(false)

watch(
    isMobile,
    (mobile) => {
        drawer.value = !mobile
        if (mobile) collapsed.value = false
    },
    { immediate: true }
)

watch(
    () => route.fullPath,
    () => {
        if (isMobile.value) drawer.value = false
    }
)

function openDrawer() {
    drawer.value = true
}

defineExpose({ openDrawer })
const firstName = computed(() => getUserFirstName(userStore.user))
const initials = computed(() => getUserInitials(userStore.user))

const menu = [
    {
        title: 'Dashboard',
        icon: 'mdi-view-dashboard-outline',
        to: '/Dashboard'
    },
    {
        title: 'Adicionar Ativo',
        icon: 'mdi-plus-circle-outline',
        to: '/AddSymbol'
    },
    {
        title: "Meus Portfólios",
        icon: "mdi-briefcase-outline",
        to: "/PortfolioList",
    },
    {
        title: 'Analisar Ações',
        icon: 'mdi-chart-line',
        to: '/RunModel'
    }
]

function goDashboard() {
    router.push('/Dashboard')
}

function goProfile() {
    router.push('/ProfileView')
}

async function logout() {
    await userStore.logout()
    router.push('/login')
}
</script>
