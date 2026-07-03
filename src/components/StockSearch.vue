<template>
    <v-text-field
        v-model="search"
        label="Buscar ação (ex: PETR4, Petrobras...)"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        density="comfortable"
        clearable
        class="talos-v-search"
        placeholder="Digite o código ou nome da empresa"
    />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStocksStore } from '@/stores/stocksStore'

const stocks = useStocksStore()

const search = computed({
    get: () => stocks.searchTerm,
    set: (value: string) => stocks.setSearch(value),
})
</script>
