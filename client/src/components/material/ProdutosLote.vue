<template>
      <v-row justify="center">
            <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
                <v-card>
                    <v-toolbar dark color="red">
                        <v-btn icon dark @click="dialog = false">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                        <v-toolbar-title>Produtos Lote</v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>

                    <v-data-table
                        :headers="headers"
                        :items="desserts"
                        :search="search"
                        class="elevation-1 ma-2"
                        :footer-props="{
                            'items-per-page-options': [8,10,12,14]
                        }"
                    >
                        <template v-slot:top>
                            <v-toolbar flat color="white">
                                <div class="flex-grow-1"></div>
                                <v-dialog v-model="dialogNovo" max-width="1000px">

                                    <template v-slot:activator="{ on }">
                                        <v-btn color="primary" class="mb-2"  @click="novo">Novo</v-btn>
                                    </template>

                                    <v-card>
                                        <v-card-title>
                                            <span class="headline">{{ formTitle }}</span>
                                        </v-card-title>

                                        <v-card-text>
                                            <v-container>
                                                <v-row>
                                                    <v-col cols="12" sm="12" md="12">
                                                        <v-autocomplete
                                                            v-model="editedItem.idProduto"
                                                            :items="produtos"
                                                            outlined
                                                            item-value="id" item-text="produto"
                                                        ></v-autocomplete>
                                                    </v-col>
                                                    <v-col cols="12" sm="12" md="6">
                                                        <v-text-field
                                                            v-model="editedItem.qtdContratada"
                                                            label="Qtd. Contratada"
                                                            outlined
                                                        ></v-text-field>
                                                    </v-col>
                                                    <v-col cols="12" sm="12" md="6">
                                                        <v-text-field
                                                            v-model="editedItem.valorUnitario"
                                                            label="Valor Unitário"
                                                            v-money="money"
                                                            outlined
                                                        ></v-text-field>
                                                    </v-col>
                                                </v-row>
                                            </v-container>
                                        </v-card-text>

                                        <v-card-actions>
                                            <div class="flex-grow-1"></div>
                                            <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
                                            <v-btn color="blue darken-1" text @click="save">Salvar</v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                            </v-toolbar>
                        </template>

                         <template v-slot:item.action="{ item }">
                            <v-icon
                                small
                                class="mr-2"
                                @click="editItem(item)"
                            >
                                mdi-pencil
                            </v-icon>
                            <v-icon
                                small
                                @click="deleteItem(item)"
                            >
                                mdi-delete
                            </v-icon>
                            </template>
                    </v-data-table>
                         
                </v-card>
            </v-dialog>
        </v-row>
</template>


<script>

import {VMoney} from 'v-money';

export default {
    data: () => ({
        dialogNovo: false,
        search: "",
        textoSnackbar: "",
        color: 'success',
        mode: '',
        snackbar: false,
        timeout: 6000,
        x: null,
        y: 'top',
        rowsPerPageItems: [8, 12, 15],
        pagination: {
            rowsPerPage: 20
        },
        money: {
            decimal: ',',
            thousands: '.',
            prefix: 'R$ ',
            suffix: '',
            precision: 2,
            masked: false
        },
        situacoes: [
            "Ativo",
            "Inativo"
        ],
        headers: [
            {
                text: 'Produto',
                align: 'left',
                sortable: true,
                value: 'produto',
            },
            { text: 'Qtd. Contratada', value: 'qtdContratada' },
            { text: 'Qtd. Recebida', value: 'qtdRecebida' },
            { text: 'Qtd. Restante', value: 'qtdRestante' },
            { text: 'Valor Unitário', value: 'valorUnitario' },
            { text: 'Ações', value: 'action', sortable: false },
        ],
        desserts: [],
        editedIndex: -1,
        editedItem: {
            idLote: "",
            idProduto: "",
            qtdContratada: "",
            qtdRecebida: "",
            qtdRestante: "",
            valorUnitario: "",
            createdAt: "",
            updatedAt: ""
        },
        defaultItem: {
            idLote: "",
            idProduto: "",
            qtdContratada: "",
            qtdRecebida: "",
            qtdRestante: "",
            valorUnitario: "",
            createdAt: "",
            updatedAt: ""
        },
        produtos: []
    }),
    directives: {money: VMoney},
    computed: {
        dialog: {
            get() {
                return this.open;
            },
            set() {
                this.$emit('close',false);
            }
        },
        formTitle () {
            return this.editedIndex === -1 ? 'Novo Produto Lote' : 'Editar Produto Lote'
        },
    },
    watch: {
        idLote(val) {
            if(val){
                this.getProdutosLote();
            }
        }
    },
    props: {
        open: {
            type: Boolean
        },
        idLote: {
            type: Number
        }
    },
    created () {
        this.initialize();
    },
    methods: {
        getProdutosLote() {
            this.axios.get(process.env.VUE_APP_URL_API + '/produtosLote/lote/' + this.idLote).then(response => {
                this.desserts = response.data;
            });
        },
        novo() {
            if(localStorage.getItem("usuarioAppB4")) {
                this.axios.get(process.env.VUE_APP_URL_API + '/permissao/' + localStorage.getItem("usuarioAppB4")).then(response => {
                    if(response.data) {
                        if(response.data.cadastrosCadastrar) {
                            this.dialogNovo = true;
                        }
                        if(!response.data.cadastrosCadastrar) {
                            this.snackbar = true;
                            this.color = 'error';
                            this.textoSnackbar = "Você não tem permissão para cadastrar!";
                        }
                    }
                    if(!response.data){
                        this.snackbar = true;
                        this.color = 'error';
                        this.textoSnackbar = "Tente novamente ocorreu um erro!";
                    }
                });    
            }
        },
        initialize () {
            this.axios.get(process.env.VUE_APP_URL_API + '/produto').then(response => {
                this.produtos = response.data;
            });
        },
        editItem (item) {
            if(localStorage.getItem("usuarioAppB4")) {
                this.axios.get(process.env.VUE_APP_URL_API + '/permissao/' + localStorage.getItem("usuarioAppB4")).then(response => {
                    if(response.data) {
                        if(response.data.cadastrosEditar) {
                            this.editedIndex = this.desserts.indexOf(item);
                            this.editedItem = Object.assign({}, item);
                            this.dialog = true;
                        }
                        if(!response.data.cadastrosEditar) {
                            this.snackbar = true;
                            this.color = 'error';
                            this.textoSnackbar = "Você não tem permissão para editar!";
                        }
                    }
                    if(!response.data){
                        this.snackbar = true;
                        this.color = 'error';
                        this.textoSnackbar = "Tente novamente ocorreu um erro!";
                    }
                });    
            }
        },
        deleteItem (item) {
            if(localStorage.getItem("usuarioAppB4")) {
                this.axios.get(process.env.VUE_APP_URL_API + '/permissao/' + localStorage.getItem("usuarioAppB4")).then(response => {
                    if(response.data) {
                        if(response.data.cadastrosApagar) {
                            this.axios.delete(process.env.VUE_APP_URL_API + '/produtosLote/' + item.id + "/delete").then(response => {
                                if(response.data){
                                    this.snackbar = true;
                                    this.color = 'success';
                                    this.textoSnackbar = "Grupo apagado com sucesso!";
                                    this.initialize();
                                }else {
                                    this.snackbar = true;
                                    this.color = 'error';
                                    this.textoSnackbar = "Ocorreu um erro ao tentar apagar o registro!";
                                }
                            });
                        }
                        if(!response.data.cadastrosApagar) {
                            this.snackbar = true;
                            this.color = 'error';
                            this.textoSnackbar = "Você não tem permissão para apagar!";
                        }
                    }
                    if(!response.data){
                        this.snackbar = true;
                        this.color = 'error';
                        this.textoSnackbar = "Tente novamente ocorreu um erro!";
                    }
                });    
            }
        },

        close () {
            this.dialogNovo = false;
            setTimeout(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            }, 300);
        },
        validaCampos() {
            return  this.editedItem.abreviacao != '' && this.editedItem.descricao != '';
        },
        save () {
            if (this.editedIndex > -1) {
                this.axios.put(process.env.VUE_APP_URL_API + '/produtosLote', this.editedItem).then(response => {
                    if(response.data){
                        this.textoSnackbar = "Registro atualizado com sucesso!";
                        this.snackbar = true;
                        this.color = 'success';
                        this.initialize();
                        this.close();
                    }else {
                        this.snackbar = true;
                        this.color = 'error';
                        this.textoSnackbar = "Ocorreu um erro ao atualizar!";
                        this.close();
                    }
                });
            } else {
                if(this.validaCampos()){
                    this.editedItem.idLote = this.idLote;
                    this.axios.post(process.env.VUE_APP_URL_API + '/produtosLote', this.editedItem).then(response => {
                        if(response.data.id){
                            this.textoSnackbar = "Batalhão inserido com sucesso!";
                            this.snackbar = true;
                            this.color = 'success';
                            this.initialize();
                            this.close();
                        }else {
                            this.snackbar = true;
                            this.color = 'error';
                            this.textoSnackbar = "Ocorreu um erro ao cadastrar!";
                            this.close();
                        }
                    });
                }else {
                    this.snackbar = true;
                    this.color = 'error';
                    this.textoSnackbar = "Existe campos vazios ou incorretos!";
                    this.close();
                }
            }
        },
    }
}

</script>