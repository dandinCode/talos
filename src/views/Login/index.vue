<template>
    <div class="flex min-h-screen w-full items-center justify-center bg-[radial-gradient(circle_at_top,#1C2D41_0%,#0f1a24_100%)] px-5">
        <v-card
            color="transparent"
            class="talos-v-fields !w-[460px] !max-w-full !rounded-[18px] !border !border-white/20 !bg-[rgb(255_255_255/0.06)] backdrop-blur-[14px] !shadow-none !overflow-visible transition-all duration-250 ease-in-out hover:scale-[1.025] hover:shadow-[0_0_0_1px_rgb(185_157_117/0.25),0_0_45px_rgb(185_157_117/0.35)] !p-8"
            elevation="0"
        >
            <div class="text-center !mb-6">
                <h1 class="!text-[2rem] !font-bold !text-white !m-0 !mb-2 [text-shadow:0_0_22px_rgb(185_157_117/0.7)]">
                    Entrar
                </h1>
                <p class="!text-[rgb(255_252_239/0.7)] !text-base !m-0">
                    Acesse sua conta e gerencie suas carteiras no <strong class="!text-white">Talos</strong>.
                </p>
            </div>

            <form novalidate @submit.prevent="handleLogin">
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
                    autocomplete="current-password"
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
                    Entrar
                </v-btn>
            </form>

            <div class="text-center !mt-6">
                <span class="!text-[rgb(255_252_239/0.7)]">Não tem conta?</span>
                <RouterLink to="/register" class="!ml-1.5 !text-talos-gold no-underline hover:underline">
                    Criar conta
                </RouterLink>
            </div>
        </v-card>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { notify } from '@/utils/toast';
import { isValidEmail } from '@/utils/validators';
import { useUserStore } from '@/stores/userStore';
import PasswordField from '@/components/PasswordField.vue';

const router = useRouter();
const userStore = useUserStore();

const email = ref('');
const password = ref('');
const loading = ref(false);

async function handleLogin() {
    if (!email.value || !password.value) {
        notify.error('Preencha todos os campos.');
        return;
    }

    if (!isValidEmail(email.value)) {
        notify.error('Email inválido.');
        return;
    }

    loading.value = true;
    try {
        await userStore.login(email.value, password.value);
        notify.success('Login realizado com sucesso!');
        router.push('/Dashboard');
    } catch (error: any) {
        notify.error(
            error?.response?.data?.message || 'Erro ao logar na conta'
        );
    } finally {
        loading.value = false;
    }
}
</script>
