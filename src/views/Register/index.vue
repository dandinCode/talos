<template>
    <div class="flex min-h-screen w-full items-center justify-center bg-[radial-gradient(circle_at_top,#1C2D41_0%,#0f1a24_100%)] px-5">
        <v-card
            color="transparent"
            class="talos-v-fields !w-[460px] !max-w-full !rounded-[18px] !border !border-white/20 !bg-[rgb(255_255_255/0.06)] backdrop-blur-[14px] !shadow-none !overflow-visible transition-all duration-250 ease-in-out hover:scale-[1.025] hover:shadow-[0_0_0_1px_rgb(79_140_255/0.25),0_0_45px_rgb(79_140_255/0.35)] !p-8"
            elevation="0"
        >
            <div class="text-center !mb-6">
                <h1 class="!text-[2rem] !font-bold !text-white !m-0 !mb-2 [text-shadow:0_0_22px_rgb(185_157_117/0.7)]">
                    Criar Conta
                </h1>
                <p class="!text-[rgb(255_252_239/0.7)] !text-base !m-0">
                    Junte-se ao <strong class="!text-white">Talos</strong> e construa carteiras de investimento
                    com apoio quantitativo.
                </p>
            </div>

            <form novalidate @submit.prevent="handleRegister">
                <v-text-field
                    v-model="name"
                    name="name"
                    label="Nome"
                    type="text"
                    autocomplete="name"
                    variant="outlined"
                    prepend-inner-icon="mdi-account-outline"
                    class="!mb-4"
                />

                <v-text-field
                    v-model="email"
                    name="email"
                    label="Email"
                    type="email"
                    autocomplete="email"
                    inputmode="email"
                    variant="outlined"
                    prepend-inner-icon="mdi-email-outline"
                    class="!mb-4"
                />

                <PasswordField
                    v-model="password"
                    autocomplete="new-password"
                    class="!mb-6"
                />

                <v-btn
                    type="submit"
                    color="blue-accent-3"
                    size="large"
                    block
                    class="!normal-case !tracking-normal"
                    :loading="loading"
                    :disabled="loading"
                >
                    Criar Conta
                </v-btn>
            </form>

            <div class="text-center !mt-6">
                <span class="!text-[rgb(255_252_239/0.7)]">Já tem conta?</span>
                <RouterLink to="/login" class="!ml-1.5 !text-talos-gold no-underline hover:underline">
                    Entrar
                </RouterLink>
            </div>
        </v-card>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { notify } from '@/utils/toast';
import { isValidEmail, isValidName, isValidPassword } from '@/utils/validators';
import { useUserStore } from '@/stores/userStore';
import PasswordField from '@/components/PasswordField.vue';

const router = useRouter();
const userStore = useUserStore();

const name = ref('');
const email = ref('');
const password = ref('');
const loading = ref(false);

async function handleRegister() {
    if (!name.value || !email.value || !password.value) {
        notify.error('Preencha todos os campos.');
        return;
    }

    if (!isValidName(name.value)) {
        notify.error('Nome inválido.');
        return;
    }

    if (!isValidEmail(email.value)) {
        notify.error('Email inválido.');
        return;
    }

    if (!isValidPassword(password.value)) {
        notify.error(
            'A senha deve ter no mínimo 8 caracteres, letras, números e um caractere especial.'
        );
        return;
    }

    loading.value = true;
    try {
        await userStore.register(name.value, email.value, password.value);
        notify.success('Conta criada com sucesso!');
        router.push('/Dashboard');
    } catch (error: any) {
        notify.error(
            error?.response?.data?.message || 'Erro ao criar conta'
        );
    } finally {
        loading.value = false;
    }
}
</script>
