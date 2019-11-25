<template>
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
            <produtos-lote
                v-bind:open="dialogProdutosLote"
                v-bind:idLote="idLote"
                @close="closeProdutosLote"
            ></produtos-lote>
            <v-toolbar flat color="white">
                <v-container>
                    <v-row>
                        <v-col cols="12" sm="12" md="5">
                            <v-text-field
                                v-model="search"
                                append-icon="mdi-magnify"
                                label="Buscar"
                                single-line
                                hide-details
                                outlined
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
                <v-snackbar
                        v-model="snackbar"
                        :bottom="y === 'bottom'"
                        :color="color"
                        :left="x === 'left'"
                        :multi-line="mode === 'multi-line'"
                        :right="x === 'right'"
                        :timeout="timeout"
                        :top="y === 'top'"
                        :vertical="mode === 'vertical'"

                        class="snackbar"
                    >
                        {{ textoSnackbar }}
                        <v-btn
                            dark
                            text
                            icon
                            @click="snackbar = false"
                        >
                            <v-icon
                                class="mr-2"
                                @click="snackbar = false"
                            >mdi-close</v-icon>
                        </v-btn>
                </v-snackbar>
                <div class="flex-grow-1"></div>
                
                <v-dialog v-model="dialog" max-width="1500px">

                    <template v-slot:activator="{ on }">
                        <v-btn color="primary" class="mb-2"  @click="novo">Nova</v-btn>
                    </template>

                    <v-card>
                        <v-card-title>
                            <span class="headline">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="12" md="3">
                                        <v-text-field
                                            v-model="editedItem.numeroLote"
                                            :rules="[v => !!v || 'Obrigatório prencher o número lote!']"
                                            v-mask="['L##/##', 'L##/###','L##/####']"
                                            label="Nº Lote"
                                            outlined
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="3">
                                        <v-autocomplete
                                            v-model="editedItem.idContrato"
                                            :items="contratos"
                                            label="Contrato"
                                            outlined
                                            item-value="id" item-text="numeroContrato"
                                        ></v-autocomplete>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="3">
                                        <v-text-field
                                            v-model="editedItem.valorLote"
                                            v-money="money"
                                            label="Valor Lote"
                                            outlined
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="3">
                                        <v-select
                                            :items="situacoes"
                                            v-model="editedItem.situacao"
                                            :rules="[v => !!v || 'Obrigatório prencher a situação!']"
                                            label="Situação"
                                            outlined
                                        ></v-select>
                                    </v-col>
                                </v-row>

                                <v-row>
                                    <v-col cols="12" sm="12" md="12">
                                        <v-autocomplete
                                            v-model="editedItem.idFornecedor"
                                            :items="fornecedores"
                                            label="Fornecedores"
                                            outlined
                                            item-value="id" item-text="razaoSocial"
                                        ></v-autocomplete>
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
                @click="openProdutosLote(item)"
            >
                mdi-eye
            </v-icon>
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

            <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">Reset</v-btn>
        </template>

    </v-data-table>

</template>

<script>

import {VMoney} from 'v-money';

export default {
    data: () => ({
        dialog: false,
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
                text: 'Nº Lote',
                align: 'left',
                sortable: true,
                value: 'numeroLote',
            },
            { text: 'Contrato', align: 'center', value: 'contrato' },
            { text: 'Valor Lote', align: 'center', value: 'valorLote' },
            { text: 'Valor Consumido', align: 'center', value: 'valorConsumido' },
            { text: 'Situação', align: 'center', value: 'situacao' },
            { text: 'Fornecedor', align: 'center', value: 'fornecedor' },
            { text: 'Ações', value: 'action', sortable: false },
        ],
        desserts: [],
        editedIndex: -1,
        editedItem: {
            numeroLote: "",
            idContrato: "",
            valorLote: "",
            valorConsumido: "",
            situacao: "",
            idFornecedor: "",
            createdAt: "",
            updatedAt: ""
        },
        defaultItem: {
            numeroLote: "",
            idContrato: "",
            valorLote: "",
            valorConsumido: "",
            situacao: "",
            idFornecedor: "",
            createdAt: "",
            updatedAt: ""
        },
        contratos: [],
        fornecedores: [],
        produtos: [],
        dialogProdutosLote: false,
        idLote: null,
    }),
    directives: {money: VMoney},
    computed: {
        formTitle () {
            return this.editedIndex === -1 ? 'Novo Lote' : 'Editar Lote'
        }
    },
    watch: {
        dialog (val) {
            val || this.close()
        },
    },
    created () {
        this.initialize()
    },
    methods: {
        openProdutosLote(item) {
            this.idLote = item.id;
            this.dialogProdutosLote = true;
        },
        closeProdutosLote() {
            this.idLote = null;
            this.dialogProdutosLote = false;
        },
        novo() {
            if(localStorage.getItem("usuarioAppB4")) {
                this.axios.get(process.env.VUE_APP_URL_API + '/permissao/' + localStorage.getItem("usuarioAppB4")).then(response => {
                    if(response.data) {
                        if(response.data.cadastrosCadastrar) {
                            this.dialog = true;
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
            this.axios.get(process.env.VUE_APP_URL_API + '/contrato').then(response => {
                this.contratos = response.data;
            });
            
            this.axios.get(process.env.VUE_APP_URL_API + '/produto').then(response => {
                this.produtos = response.data;
            });

            this.axios.get(process.env.VUE_APP_URL_API + '/fornecedor').then(response => {
                this.fornecedores = response.data;
            });

            this.axios.get(process.env.VUE_APP_URL_API + '/lote').then(response => {
                this.desserts = response.data;
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
                            this.axios.delete(process.env.VUE_APP_URL_API + '/lote/' + item.id + "/delete").then(response => {
                                if(response.data){
                                    this.snackbar = true;
                                    this.color = 'success';
                                    this.textoSnackbar = "Hierarquia apagada com sucesso!";
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
            this.dialog = false;
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
                this.axios.put(process.env.VUE_APP_URL_API + '/lote', this.editedItem).then(response => {
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
                    this.axios.post(process.env.VUE_APP_URL_API + '/lote', this.editedItem).then(response => {
                        if(response.data.id){
                            this.textoSnackbar = "Lote inserido com sucesso!";
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
