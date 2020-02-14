<template>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card>
            <v-toolbar dark color="red">
                <v-btn icon dark @click="close">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>Saída</v-toolbar-title>
                <v-spacer></v-spacer>

            </v-toolbar>
            <v-container>
                <v-row :style="{ 'padding-left' : '50px', 'height': '60px' }" >
                    <v-col cols="12" sm="12" md="3">
                        <v-text-field
                            v-model="dataSaida"
                            outlined
                            label="Data Saída"
                            disabled
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="4">
                        <v-text-field
                            v-model="observacoes"
                            label="Observações"
                            outlined
                            disabled
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="5" :style="{ width: '9x' }">
                        <v-text-field
                            v-model="solicitante"
                            label="Solicitante"
                            outlined
                            disabled
                        ></v-text-field>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="12" sm="12" md="12">
                        <v-simple-table>
                            <template v-slot:default>
                                <thead>
                                    <tr>
                                        <th class="text-left">Produto</th>
                                        <th class="text-left">Propriedade</th>
                                        <th class="text-left">Qtd. Saída</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="item in desserts" :key="item.id">
                                        <td>{{ item.produto }}</td>
                                        <td>{{ item.propriedadeproduto }}</td>
                                        <td>{{ item.qtdSaida }}</td>
                                    </tr>
                                </tbody>
                            </template>
                        </v-simple-table>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>

export default {
    data: () => ({
        dataSaida: "",
        observacoes: "",
        solicitante: 0,
        saida: {},
        desserts: [],
    }),
    computed: {
        dialog: {
            get() {
                return this.open;
            },
            set() {
                this.$emit('close',false);
            }
        }
    },
    watch: {
        idSaida(){
            this.getSaida();
            this.getItens();
        }
    },
    props: {
        open: Boolean,
        idSaida: Number
    },
    methods: {
        close() {
            this.$emit('close',false);
        },
        getSaida() {
            this.axios.get(process.env.VUE_APP_URL_API + '/saida/' + this.idSaida,).then(response => {
                this.saida = response.data;
                this.dataSaida = this.saida.dataSaida.split("T")[0].split("-").reverse().join("/");
                this.observacoes = this.saida.observacoes;
                this.solicitante = this.saida.solicitante;
            });
        },
        getItens() {
            this.axios.get(process.env.VUE_APP_URL_API + '/saida/getItensIdSaida/' + this.idSaida).then(response => {
                this.desserts = response.data;
            });
        },
    }
}
</script>

<style>
    @media only screen and (max-width: 640px) {
        .snackbar {
            margin-top: -10px;
        }
    }

    @media only screen and (min-width: 640px) {
        .snackbar {
            margin-top: -50px;
        }
    }
</style>
