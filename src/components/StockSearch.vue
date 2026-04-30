<template>
    <v-text-field v-model="search" label="Buscar ação (ex: PETR4, Petrobras...)" prepend-inner-icon="mdi-magnify"
        variant="outlined" density="comfortable" clearable class="search-field"
        placeholder="Digite o código ou nome da empresa" />
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

<style scoped>
.search-field :deep(.v-field) {
    background: rgba(0, 0, 0, 0.25) !important;
    border-radius: 50px !important;
}

.search-field :deep(.v-field__outline) {
    color: #B99D75;
    --v-field-border-opacity: 0.2;
}

.search-field :deep(.v-field--focused .v-field__outline) {
    --v-field-border-opacity: 0.5;
}

.search-field :deep(label) {
    color: rgba(255, 252, 239, 0.5) !important;
}

.search-field :deep(input) {
    color: #FFFCEF !important;
}

.search-field :deep(input::placeholder) {
    color: rgba(255, 252, 239, 0.3);
}

.search-field :deep(.v-icon) {
    color: #B99D75 !important;
}
</style>