<template>
    <v-app>
        <v-app-bar
            v-if="isMobile"
            color="#1C2D41"
            elevation="0"
            class="!border-b !border-[rgb(185_157_117/0.15)]"
            density="comfortable"
        >
            <v-app-bar-nav-icon icon="mdi-menu" color="#B99D75" @click="openSidebar" />
            <v-app-bar-title class="!text-talos-gold !font-bold !text-[1.1rem]">Talos</v-app-bar-title>
        </v-app-bar>

        <Sidebar ref="sidebarRef" />

        <v-main>
            <router-view />
        </v-main>
    </v-app>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useDisplay } from 'vuetify'
import Sidebar from '@/components/Sidebar.vue'

const display = useDisplay()
const isMobile = computed(() => display.smAndDown.value)

const sidebarRef = ref<{ openDrawer: () => void } | null>(null)

function openSidebar() {
    sidebarRef.value?.openDrawer()
}
</script>
