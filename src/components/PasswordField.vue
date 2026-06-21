<template>
    <v-text-field
        v-model="model"
        name="password"
        :label="label"
        :type="show ? 'text' : 'password'"
        :autocomplete="autocomplete"
        variant="outlined"
        :rules="rules"
    >
        <template #prepend-inner>
            <v-icon color="white" class="opacity-100">mdi-lock-outline</v-icon>
        </template>

        <template #append-inner>
            <v-btn
                type="button"
                variant="text"
                icon
                density="compact"
                tabindex="-1"
                aria-label="Mostrar ou ocultar senha"
                @click.prevent="toggle"
            >
                <v-icon color="white" class="opacity-100">{{ show ? 'mdi-eye-off' : 'mdi-eye' }}</v-icon>
            </v-btn>
        </template>
    </v-text-field>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface Props {
    modelValue: string;
    label?: string;
    autocomplete?: string;
    rules?: ((v: string) => true | string)[];
}

const props = withDefaults(defineProps<Props>(), {
    label: 'Senha',
    autocomplete: 'current-password',
    rules: () => [],
});

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
}>();

const show = ref(false);

const model = computed({
    get: () => props.modelValue,
    set: (value: string) => emit('update:modelValue', value),
});

function toggle() {
    show.value = !show.value;
}
</script>
