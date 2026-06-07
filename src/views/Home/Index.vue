<template>
    <div class="talos-home-container bg-talos-bg min-h-screen">
        <section class="min-h-[85vh] flex items-center justify-center relative bg-[radial-gradient(circle_at_70%_30%,rgb(185_157_117/0.1)_0%,transparent_70%),linear-gradient(135deg,#1C2D41_0%,#14222f_100%)]">
            <v-container fluid class="!py-10 !px-5">
                <v-row class="fill-height align-center justify-center text-center">
                    <v-col cols="12" md="10" lg="8">
                        <div class="flex items-center justify-center !gap-4 !mb-6">
                            <img src="@/assets/talos_logo.png" alt="Talos" class="w-[70px] h-[70px] max-sm:w-[50px] max-sm:h-[50px] drop-shadow-[0_0_20px_rgb(185_157_117/0.3)]" />
                            <h1 class="!text-[72px] max-md:!text-5xl max-sm:!text-4xl font-extrabold tracking-tight !m-0">
                                <span class="text-talos-gold">Talos</span>
                            </h1>
                        </div>
                        <p class="!text-[22px] max-md:!text-lg max-sm:!text-base font-medium italic text-talos-gold tracking-wide mx-auto !my-2 max-sm:!mb-4">Transforme dados em dividendos.</p>
                        <p class="!text-lg max-md:!text-base leading-relaxed text-[rgb(255_252_239/0.85)] max-w-[800px] mx-auto !mb-8">
                            Uma plataforma inteligente para criação e otimização de carteiras de investimento em ações
                            baseada em dados históricos, diversificação setorial e modelos matemáticos
                            de otimização.
                        </p>
                        <div class="flex !gap-5 justify-center flex-wrap max-sm:flex-col max-sm:items-center">
                            <v-btn size="x-large" class="!bg-talos-gold !text-talos-bg !font-semibold normal-case !px-8 !py-3 !rounded-[48px] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgb(185_157_117/0.3)] max-sm:w-full max-sm:max-w-[280px]" to="/dashboard">
                                <v-icon start>mdi-chart-line</v-icon>
                                Começar Agora
                            </v-btn>
                        </div>
                    </v-col>
                </v-row>
            </v-container>
        </section>

        <section class="!py-20 max-sm:!py-12 bg-talos-bg">
            <v-container>
                <v-row class="!-mx-2">
                    <v-col cols="12" md="6" class="!px-2 !pb-4 md:!pb-0">
                        <div class="!mb-6">
                            <span class="inline-block text-xs font-semibold uppercase tracking-widest text-talos-gold !mb-3">Sobre o Talos</span>
                            <h2 class="!text-4xl max-md:!text-[28px] max-sm:!text-2xl font-bold text-talos-cream !m-0 !mb-2">O que é este projeto?</h2>
                        </div>
                        <div>
                            <p class="text-[rgb(255_252_239/0.85)] leading-relaxed !text-base">
                                Este sistema foi criado para auxiliar investidores na tomada de decisão
                                ao montar carteiras de investimento em ações. A proposta é simples:
                                permitir que o usuário selecione qualquer conjunto de ações e, a partir
                                disso, gerar uma carteira otimizada de acordo com critérios de risco,
                                retorno e diversificação.
                            </p>
                            <p class="!mt-4 text-[rgb(255_252_239/0.85)] leading-relaxed !text-base">
                                Internamente, a plataforma utiliza uma API própria de otimização
                                (<strong class="text-talos-gold">Portfolio Optimized API</strong>) que aplica técnicas de
                                <strong class="text-talos-gold">programação linear</strong> para encontrar a melhor distribuição
                                possível de capital entre os ativos selecionados.
                            </p>
                        </div>
                    </v-col>
                    <v-col cols="12" md="6" class="!px-2 !pb-4 md:!pb-0">
                        <div class="bg-[rgb(255_252_239/0.03)] border border-[rgb(185_157_117/0.2)] rounded-3xl !p-8">
                            <div class="flex items-center !gap-3 !mb-4">
                                <v-icon size="28" color="#B99D75">mdi-database</v-icon>
                                <h3 class="!text-xl font-semibold text-talos-cream !m-0">Fontes de Dados</h3>
                            </div>
                            <p class="text-[rgb(255_252_239/0.7)] leading-relaxed !m-0">
                                Os dados históricos de preços e retornos são obtidos automaticamente
                                através do Yahoo Finance, permitindo análises baseadas em informações
                                reais de mercado.
                            </p>
                            <div class="flex items-center !gap-3 !mb-4 !mt-6">
                                <v-icon size="28" color="#B99D75">mdi-calendar-range</v-icon>
                                <h3 class="!text-xl font-semibold text-talos-cream !m-0">Período de Análise</h3>
                            </div>
                            <p class="text-[rgb(255_252_239/0.7)] leading-relaxed !m-0">
                                O usuário pode definir o período histórico a ser analisado. Caso nenhuma
                                data seja informada, o sistema utiliza automaticamente os últimos
                                <strong class="text-talos-gold">12 meses</strong> como base.
                            </p>
                        </div>
                    </v-col>
                </v-row>
            </v-container>
        </section>

        <section class="!py-20 max-sm:!py-12 bg-talos-bg-soft">
            <v-container>
                <div class="text-center !mb-12">
                    <span class="inline-block text-xs font-semibold uppercase tracking-widest text-talos-gold !mb-3">Processo</span>
                    <h2 class="!text-4xl max-md:!text-[28px] max-sm:!text-2xl font-bold text-talos-cream !m-0 !mb-2">Como funciona?</h2>
                    <p class="!text-lg text-[rgb(255_252_239/0.7)] max-w-[600px] mx-auto">Três passos para uma carteira otimizada</p>
                </div>
                <v-row class="!-mx-2">
                    <v-col cols="12" md="4" v-for="(step, index) in steps" :key="index" class="!px-2 !pb-4 md:!pb-0">
                        <div class="bg-[rgb(255_252_239/0.03)] border border-[rgb(185_157_117/0.2)] rounded-3xl !p-8 max-sm:!p-6 text-center transition-all duration-300 h-full hover:-translate-y-2 hover:border-talos-gold hover:shadow-[0_20px_40px_rgb(0_0_0/0.3)]">
                            <div class="w-12 h-12 bg-gradient-to-br from-talos-gold to-[#9b835f] rounded-full flex items-center justify-center !text-xl font-bold text-talos-bg mx-auto !mb-6">
                                {{ index + 1 }}
                            </div>
                            <h3 class="!text-xl font-semibold text-talos-cream !mb-3">{{ step.title }}</h3>
                            <p class="text-[rgb(255_252_239/0.7)] leading-relaxed !text-sm">{{ step.description }}</p>
                        </div>
                    </v-col>
                </v-row>
            </v-container>
        </section>

        <section class="!py-20 max-sm:!py-12 bg-talos-bg">
            <v-container>
                <div class="text-center !mb-12">
                    <span class="inline-block text-xs font-semibold uppercase tracking-widest text-talos-gold !mb-3">Desafios Superados</span>
                    <h2 class="!text-4xl max-md:!text-[28px] max-sm:!text-2xl font-bold text-talos-cream !m-0 !mb-2">Quais problemas o Talos resolve?</h2>
                    <p class="!text-lg text-[rgb(255_252_239/0.7)] max-w-[600px] mx-auto">
                        Investir sem estratégia pode custar caro. O Talos resolve os principais desafios de quem quer
                        montar uma carteira inteligente.
                    </p>
                </div>
                <div class="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] !gap-6 !mt-8 max-sm:grid-cols-1">
                    <div v-for="problem in problems" :key="problem.title" class="bg-[rgb(255_252_239/0.03)] border border-[rgb(185_157_117/0.2)] rounded-[20px] !p-7 text-center transition-all duration-300 hover:border-talos-gold hover:-translate-y-1">
                        <div class="!mb-5">
                            <v-icon size="32" color="#B99D75">{{ problem.icon }}</v-icon>
                        </div>
                        <h3 class="!text-lg font-semibold text-talos-cream !mb-3">{{ problem.title }}</h3>
                        <p class="text-[rgb(255_252_239/0.7)] !text-sm leading-relaxed">{{ problem.description }}</p>
                    </div>
                </div>
            </v-container>
        </section>

        <section class="!py-20 max-sm:!py-12 bg-talos-bg-soft">
            <v-container>
                <div class="bg-[rgb(185_157_117/0.05)] border border-[rgb(185_157_117/0.2)] rounded-[32px] !p-12 max-md:!px-6 max-md:!py-8">
                    <div class="flex items-center justify-center !gap-3 !mb-8 flex-wrap">
                        <v-icon size="32" color="#B99D75">mdi-shield-alert</v-icon>
                        <h2 class="!text-4xl max-md:!text-[28px] max-sm:!text-2xl font-bold text-talos-cream !m-0">O que este projeto NÃO é</h2>
                    </div>
                    <div class="flex flex-col !gap-6">
                        <div v-for="item in disclaimer" :key="item.title" class="flex !gap-4 items-start">
                            <v-icon size="20" color="#B99D75" class="shrink-0 !mt-0.5">mdi-close-circle</v-icon>
                            <div>
                                <h4 class="!text-base font-semibold text-talos-cream !mb-1">{{ item.title }}</h4>
                                <p class="text-[rgb(255_252_239/0.6)] !text-sm !m-0">{{ item.description }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </v-container>
        </section>

        <section class="!py-20 max-sm:!py-12 bg-talos-bg">
            <v-container>
                <div class="flex items-center !gap-[60px] max-w-[1000px] mx-auto max-md:flex-col max-md:text-center max-md:!gap-8">
                    <div class="flex-1">
                        <span class="inline-block text-xs font-semibold uppercase tracking-widest text-talos-gold !mb-3">Inspiração</span>
                        <h2 class="!text-4xl max-md:!text-[28px] max-sm:!text-2xl font-bold text-talos-cream !m-0 !mb-2">Por que Talos?</h2>
                        <p class="text-[rgb(255_252_239/0.85)] leading-relaxed !mb-5">
                            O nome <strong class="text-talos-gold">Talos</strong> vem da mitologia grega. Talos era um gigante de bronze criado
                            para proteger a ilha de Creta, circulando constantemente suas fronteiras para impedir invasões.
                        </p>
                        <p class="text-[rgb(255_252_239/0.85)] leading-relaxed !mb-5">
                            Assim como o guardião mitológico, o Talos foi criado para proteger e fortalecer seus
                            investimentos, ajudando você a tomar decisões mais seguras, equilibradas e inteligentes.
                        </p>
                        <p class="text-white italic border-l-[3px] border-talos-gold !pl-5 !mt-6 max-md:text-left">
                            Com análise de risco, retorno e diversificação, o Talos atua como um sistema de defesa
                            estratégico para sua carteira.
                        </p>
                    </div>
                    <div class="shrink-0 w-[120px] h-[120px] bg-[rgb(185_157_117/0.1)] rounded-full flex items-center justify-center">
                        <v-icon size="80" color="#B99D75">mdi-shield-crown</v-icon>
                    </div>
                </div>
            </v-container>
        </section>

        <section class="!py-20 max-sm:!py-12 bg-talos-bg-soft">
            <v-container>
                <div class="text-center max-w-[800px] mx-auto bg-[rgb(185_157_117/0.03)] border border-[rgb(185_157_117/0.2)] rounded-[32px] !p-12 max-md:!px-6 max-md:!py-8">
                    <div class="flex items-center justify-center !gap-3 !mb-6 flex-wrap">
                        <v-icon size="40" color="#B99D75">mdi-compass</v-icon>
                        <h2 class="!text-4xl max-md:!text-[28px] max-sm:!text-2xl font-bold text-talos-cream !m-0">Visão de Futuro</h2>
                    </div>
                    <p class="!text-lg leading-relaxed text-[rgb(255_252_239/0.85)]">
                        O projeto está em constante evolução. Entre as ideias futuras estão a inclusão
                        de indicadores fundamentalistas, perfis de investimento pré-configurados e a
                        possibilidade de o usuário escolher quais critérios deseja considerar no
                        processo de otimização.
                    </p>
                </div>
            </v-container>
        </section>

        <footer class="bg-talos-bg-deep border-t border-[rgb(185_157_117/0.1)] !pt-12 !pb-6">
            <v-container>
                <div class="text-center">
                    <div class="flex items-center justify-center !gap-3 !mb-6">
                        <img src="@/assets/talos_logo.png" alt="Talos" class="w-8 h-8" />
                        <span class="!text-xl font-semibold text-talos-cream">Talos</span>
                    </div>
                    <div>
                        <p class="text-[rgb(255_252_239/0.6)] !text-sm !mb-3">
                            Baseado em pesquisa acadêmica sobre otimização de carteiras utilizando
                            programação linear.
                        </p>
                        <a href="https://repositorio.ufc.br/handle/riufc/82322" target="_blank" class="text-talos-gold no-underline !text-sm transition-colors duration-300 hover:text-[#e6d5b8] hover:underline">
                            📄 Leia o TCC completo
                        </a>
                    </div>
                    <div class="!mt-8 !pt-6 border-t border-[rgb(185_157_117/0.1)]">
                        <p class="text-[rgb(255_252_239/0.4)] !text-xs !m-0">&copy; {{ new Date().getFullYear() }} Talos. Todos os direitos reservados.</p>
                    </div>
                </div>
            </v-container>
        </footer>
    </div>
</template>

<script setup lang="ts">
const steps = [
    {
        title: 'Seleção de Ações',
        description: 'O usuário escolhe quais símbolos deseja analisar. Qualquer pessoa pode cadastrar ações, cabendo ao investidor decidir se deseja utilizá-las ou não.'
    },
    {
        title: 'Otimização Matemática',
        description: 'O modelo avalia retorno esperado, risco (volatilidade) e correlação entre ativos para gerar uma carteira eficiente.'
    },
    {
        title: 'Diversificação Inteligente',
        description: 'Além da diversificação entre ativos, o sistema também considera a diversificação por setor econômico, reduzindo exposição concentrada.'
    }
]

const problems = [
    {
        icon: 'mdi-alert-circle',
        title: 'Falta de direção',
        description: 'Muitos investidores não sabem quais ativos escolher ou como distribuir seu capital de forma eficiente.'
    },
    {
        icon: 'mdi-chart-line-variant',
        title: 'Decisões sem base',
        description: 'Escolher ações apenas por "achismo" ou hype pode gerar prejuízos e risco desnecessário.'
    },
    {
        icon: 'mdi-scale-balance',
        title: 'Desequilíbrio na carteira',
        description: 'Sem uma boa alocação, sua carteira pode ficar exposta demais a um único setor ou ativo.'
    },
    {
        icon: 'mdi-timer-sand',
        title: 'Falta de tempo',
        description: 'Analisar ativos, risco e retorno manualmente exige tempo e conhecimento técnico.'
    }
]

const disclaimer = [
    {
        title: 'Não é uma ferramenta de recomendação financeira',
        description: 'O sistema não indica compras ou vendas de ativos.'
    },
    {
        title: 'Não substitui um assessor de investimentos',
        description: 'As decisões finais devem sempre considerar contexto pessoal e orientação profissional.'
    },
    {
        title: 'Não garante retornos',
        description: 'Os resultados são baseados em modelos matemáticos e dados históricos.'
    }
]
</script>
