<template>

    <v-card class="card-master">
        <v-toolbar
            color="red darken-1"
            dark
            flat
        >

            <template >
                <v-tabs
                    v-model="tab"
                    align-with-title
                    background-color="transparent"
                >
                    <v-tabs-slider color="yellow"></v-tabs-slider>

                    <v-tab v-for="item in items" :key="item">
                        {{ item }}
                    </v-tab>
                </v-tabs>
            </template>
        </v-toolbar>

        <v-tabs-items v-model="tab">

            <v-tab-item :key="items[0]" >
                <grupoPatrimonio></grupoPatrimonio>
            </v-tab-item>

            <v-tab-item :key="items[1]" >
                <hierarquia></hierarquia>
            </v-tab-item>

            <v-tab-item :key="items[2]" >
                <obm></obm>
            </v-tab-item>

            <v-tab-item :key="items[3]" >
                <pessoas></pessoas>
            </v-tab-item>

            <v-tab-item :key="items[4]" >
                <setores></setores>
            </v-tab-item>

            <v-tab-item :key="items[5]" >
                <situacaoPatrimonio></situacaoPatrimonio>
            </v-tab-item>

        </v-tabs-items>
    </v-card>

</template>

<script>
export default {
    data: () => ({
        tab: null,
        items: [
            'Grupo Patrimônio', 'Hierarquia', 'Obm', 'Pessoas', 'Setores', 'Situação Patrimônio',
        ],
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    }),
    computed: {

    },
    watch: {

    },
    created () {

    },
    methods: {

    }
}
</script>

<style>
    @media only screen and (max-width: 640px) {

    }

    @media only screen and (min-width: 640px) {

    }

    .card-master {
        margin-left: 10px;
        margin-right: 10px;
    }
</style>
