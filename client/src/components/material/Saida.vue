<template>
      <v-row justify="center">
            <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
                <v-card>
                    <v-toolbar dark color="red">
                        <v-btn icon dark @click="close">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                        <v-toolbar-title>Saída</v-toolbar-title>
                        <v-spacer></v-spacer>

                        <v-toolbar-items>
                            <v-btn dark text @click="salvar">Salvar</v-btn>
                        </v-toolbar-items>
                    </v-toolbar>

                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="12" md="12">
                                <v-subheader>Dados Saída</v-subheader>
                            </v-col>
                        </v-row>
                        <v-row v-if="erro">
                            <v-col cols="12" sm="12" md="12">
                                <v-alert type="error">
                                    Ocorreu um erro ao realizar a saída tente novamente!
                                </v-alert>
                            </v-col>
                        </v-row>

                        <confirma-usuario
                            v-bind:openDialog="validaUsuario"
                            v-bind:idUsuario="saida.idSolicitante"
                            @senhaCorreta="salvaSaida"
                            @close="closeValidaUsuario"
                        ></confirma-usuario>

                        <v-row :style="{ margin: '0px', padding: '0px', height: '80px'}">
                            <v-col cols="12" sm="12" md="3">
                                <v-text-field
                                    v-model="saida.dataSaida"
                                    :rules="[v => !!v || 'Obrigatório prencher a data de saída!']"
                                    label="Data Saída *"
                                    v-mask="['##/##/####']"
                                    outlined
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12" md="4">
                                <v-text-field
                                    v-model="saida.observacoes"
                                    label="Observações"
                                    outlined
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12" md="5">
                                <v-autocomplete
                                    v-model="saida.idSolicitante"
                                    :items="pessoas"
                                    item-value="id" item-text="nome"
                                    label="Solicitante *"
                                    outlined
                                ></v-autocomplete>
                            </v-col>
                        </v-row>
                        <small>* campos obrigatórios!</small>
                        <v-row>
                            <v-col cols="12" sm="12" md="12">
                                <v-subheader>Itens Saída</v-subheader>
                            </v-col>
                        </v-row>

                        <v-row
                            v-for="(item, index) in itens"
                            v-bind:key="index"
                        >
                            <v-col cols="12" sm="12" md="12">
                                <item-saida
                                    v-bind:item="item"
                                    v-bind:index="index"
                                    v-bind:getItens="getItem"
                                    @item="getItens"
                                    @remove="removeItem"
                                ></item-saida>
                            </v-col>

                        </v-row>
                        <v-row>
                            <v-col cols="12" sm="12" md="12">
                                <v-btn color="primary" class="mb-2" @click="adicionaItem">Adicionar</v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card>
            </v-dialog>
        </v-row>
</template>

<script>
    export default {
        data: () => ({
            saida: {
                dataSaida: "",
                observacoes: "",
                idSolicitante: null,
                idResponsavelEntrega: null,
                itens: []
            },
            saidaDafult: {
                dataSaida: "",
                observacoes: "",
                idSolicitante: null,
                idResponsavelEntrega: null,
                itens: []
            },
            item: {
                idProduto: null,
                idPropriedadeProduto: null,
                qtdSaida: 0,
            },
            itemDafault: {
                idProduto: null,
                idPropriedadeProduto: null,
                qtdSaida: 0,
            },
            itens: [],
            pessoas: [],
            getItem: false,
            validaUsuario: false,
            erro: false,
        }),
        watch: {
            saidaEdit(val) {
                if(val) {
                    this.saida.dataSaida = val.dataSaida;
                    this.saida.observacoes = val.observacoes;
                    this.saida.idSolicitante = val.idSolicitante;
                    this.saida.idResponsavelEntrega = val.idResponsavelEntrega;

                    this.axios.get(process.env.VUE_APP_URL_API + '/saida/getItensIdSaida/' + val.id).then(response => {
                        this.itens = response.data;
                    });
                }
            }
        },
        created(){
            console.log(this.saidaDafult);
            this.saida = this.saidaDafult;
            this.itens.push(this.item);
            this.item = this.itemDafault;
            this.getPessoas();
        },
        computed: {
            dialog: {
                get() {
                    return this.openDialog;
                },
                set() {
                    this.$emit('close',false);
                }
            }
        },
        props: {
            openDialog: Boolean,
            saidaEdit: Object
        },
        methods: {
            close() {
                this.saida = this.saidaDafult;
                this.dialog = false;
            },
            getItens(item) {
                this.saida.itens.push(item);
            },
            getPessoas() {
                this.axios.get(process.env.VUE_APP_URL_API + '/pessoa').then(response => {
                    this.pessoas = response.data;
                });
            },
            adicionaItem() {
                this.item = this.itemDafault;
                this.itens.push(this.item);
                this.item = this.itemDafault;
            },
            removeItem(index) {
                this.saida.itens = [];
                this.getItem = true;
                setTimeout(() => {
                    this.itens = [];
                    this.saida.itens.forEach(item => {
                        if(item.index != index) {
                            this.itens.push(item);
                        }
                    });
                    this.getItem = false;
                    this.saida.itens = [];
                }, 300);
            },
            validaCampos() {
                var data = this.saida.dataSaida.split("/");
                if(data[0] <= 31 && data[0] >= 1) {
                    if(data[1] >= 1 && data[1] <= 12) {
                        if(this.saida.idSolicitante != null && this.saida.usuario != "") {
                            return true && this.validaItens();
                        }
                    }
                }
                return  false;
            },
            validaItens() {
                var itens = this.saida.itens;

                for(var i = 0; i < itens.length; i++) {
                    if(itens[i].idProduto == "") {
                        return false;
                    }

                    if(itens[i].idPropriedadeProduto == "") {
                        return false;
                    }

                    if(itens[i].qtdSaida == "") {
                        return false;
                    }
                }

                return true;
            },
            salvar() {
                 this.erro = false;
                this.saida.itens = [];
                this.getItem = true;
                setTimeout(() => {
                    this.getItem = false;
                    this.saida.usuario = localStorage.getItem("usuarioAppB4");
                    if(this.validaCampos()) {
                        this.validaUsuario = true;
                    }

                }, 300);
            },
            salvaSaida() {
                this.closeValidaUsuario();
                this.axios.post(process.env.VUE_APP_URL_API + '/saida', this.saida).then(response => {
                    if(response.data){
                        this.saida = this.saidaDafult;
                        this.$emit('close');
                    }

                    if(!response.data){
                        this.erro = true;
                    }
                });
            },
            closeValidaUsuario() {
                this.validaUsuario = false;
            }
        },

    }
</script>
