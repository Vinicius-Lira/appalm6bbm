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

                <v-dialog v-model="dialog" max-width="1000px">

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
                                            v-model="editedItem.idPatrimonio"
                                            label="Patrimônio"
                                            :items="patrimonios"
                                            item-text="descricao"
                                            item-value="id"
                                            outlined
                                        ></v-autocomplete>
                                    </v-col>
                                </v-row>
                                 <v-row>
                                    <v-col cols="12" sm="12" md="8">
                                        <v-autocomplete
                                            v-model="editedItem.idResponsavelRecebimento"
                                            :items="pessoas"
                                            item-text="nome"
                                            item-value="id"
                                            label="Responsável Recebimento"
                                            outlined
                                        ></v-autocomplete>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="4">
                                        <v-text-field
                                            v-model="editedItem.dataBaixa"
                                            :rules="[v => !!v || 'Obrigatório prencher a data da baixa!']"
                                            label="Data Movimentação"
                                            outlined
                                            v-mask="'##/##/####'"
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="12" sm="12" md="12">
                                        <v-text-field
                                            v-model="editedItem.observacoes"
                                            label="Observações"
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

            <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">Reset</v-btn>
        </template>

    </v-data-table>

</template>

<script>
export default {
    name: 'obm',
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
        headers: [
            {
                text: 'Cód. Patrimônio',
                align: 'left',
                sortable: true,
                value: 'codigo',
            },
            { text: 'Ultimo Responsável', value: 'ultimoResponsavel' },
            { text: 'Responsável Recebimento', value: 'responsavelRecebimento' },
            { text: 'Observações', value: 'observacoes' },
            { text: 'Data Baixa', value: 'dataBaixa' },
            { text: 'Ações', value: 'action', sortable: false },
        ],
        desserts: [],
        editedIndex: -1,
        editedItem: {
            idPatrimonio: null,
            idUltimoResponsavel: null,
            idResponsavelRecebimento: null,
            idSetor: null,
            observacoes: null,
            dataBaixa: null,
            createdAt: "",
            updatedAt: ""
        },
        defaultItem: {
            idPatrimonio: null,
            idUltimoResponsavel: null,
            idResponsavelRecebimento: null,
            idSetor: null,
            observacoes: null,
            dataBaixa: null,
            createdAt: "",
            updatedAt: ""
        },
        pessoas: [],
        setores: [],
        situacoes: [],
        patrimonios: []
    }),

    computed: {
        formTitle () {
            return this.editedIndex === -1 ? 'Nova Baixa' : 'Editar Baixa'
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
        novo() {
            if(localStorage.getItem("usuario")) {
                this.axios.get(process.env.VUE_APP_URL_API + '/permissao/' + localStorage.getItem("usuario")).then(response => {
                    if(response.data) {
                        if(response.data.patrimonioDescarregar) {
                            this.dialog = true;
                        }
                        if(!response.data.patrimonioDescarregar) {
                            this.snackbar = true;
                            this.color = 'error';
                            this.textoSnackbar = "Você não tem permissão para baixar patrimônios!";
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
            this.axios.get(process.env.VUE_APP_URL_API + '/descargaPatrimonio').then(response => {
                this.desserts = response.data;
            });

            this.axios.get(process.env.VUE_APP_URL_API + '/pessoa').then(response => {
                this.pessoas = response.data;
            });

            this.axios.get(process.env.VUE_APP_URL_API + '/setor').then(response => {
                this.setores = response.data;
            });

            this.axios.get(process.env.VUE_APP_URL_API + '/situacaoPatrimonio').then(response => {
                this.situacoes = response.data;
            });

            this.axios.get(process.env.VUE_APP_URL_API + '/patrimonio').then(response => {
                this.patrimonios = response.data;
            });
        },
        editItem (item) {
            if(localStorage.getItem("usuario")) {
                this.axios.get(process.env.VUE_APP_URL_API + '/permissao/' + localStorage.getItem("usuario")).then(response => {
                    if(response.data) {
                        if(response.data.patrimonioDescarregar) {
                            this.editedIndex = this.desserts.indexOf(item);
                            this.editedItem = Object.assign({}, item);
                            this.dialog = true;
                        }
                        if(!response.data.patrimonioDescarregar) {
                            this.snackbar = true;
                            this.color = 'error';
                            this.textoSnackbar = "Você não tem permissão para editar baixas de patrimônios!";
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
            if(localStorage.getItem("usuario")) {
                this.axios.get(process.env.VUE_APP_URL_API + '/permissao/' + localStorage.getItem("usuario")).then(response => {
                    if(response.data) {
                        if(response.data.patrimonioDescarregar) {
                             this.axios.delete(process.env.VUE_APP_URL_API + '/descargaPatrimonio/' + item.id + "/delete").then(response => {
                                if(response.data){
                                    this.snackbar = true;
                                    this.color = 'success';
                                    this.textoSnackbar = "Baixa apagada com sucesso!";
                                    this.initialize();
                                }else {
                                    this.snackbar = true;
                                    this.color = 'error';
                                    this.textoSnackbar = "Ocorreu um erro ao tentar apagar o registro!";
                                }
                            });
                        }
                        if(!response.data.patrimonioDescarregar) {
                            this.snackbar = true;
                            this.color = 'error';
                            this.textoSnackbar = "Você não tem permissão para apagar baixas de patrimônios!";
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
                this.axios.put( process.env.VUE_APP_URL_API + '/descargaPatrimonio', this.editedItem).then(response => {
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
                    this.axios.post( process.env.VUE_APP_URL_API + '/descargaPatrimonio', this.editedItem).then(response => {
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
