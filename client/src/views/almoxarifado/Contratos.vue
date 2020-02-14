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
                                    <v-col cols="12" sm="12" md="3">
                                        <v-text-field
                                            v-model="editedItem.numeroContrato"
                                            :rules="[v => !!v || 'Obrigatório prencher número do contrato!']"
                                            label="Nº Contrato"
                                            v-mask="['###/####', '####/####', '#####/####']"
                                            outlined
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="3">
                                        <v-select
                                            v-model="editedItem.tipoContrato"
                                            :items="tipoContratos"
                                            label="Tipo Contrato"
                                            outlined
                                        ></v-select>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="3">
                                        <v-text-field
                                            v-model="editedItem.dataHomologacao"
                                            v-mask="['##/##/####']"
                                            label="Data Homologação"
                                            outlined
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="3">
                                        <v-text-field
                                            v-model="editedItem.dataVigencia"
                                            v-mask="['##/##/####']"
                                            label="Data Vigencia"
                                            outlined
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="12" sm="12" md="4">
                                        <v-autocomplete
                                            v-model="editedItem.categoria"
                                            :items="categoriaContrato"
                                            label="Categoria"
                                            outlined
                                        ></v-autocomplete>
                                    </v-col>

                                    <v-col cols="12" sm="12" md="4">
                                        <v-select
                                            v-model="editedItem.situacao"
                                            :items="situacoes"
                                            item-value="value" item-text="text"
                                            label="Situação"
                                            outlined
                                        ></v-select>
                                    </v-col>

                                    <v-col cols="12" sm="12" md="4">
                                        <v-text-field
                                            v-model="editedItem.valorContrato"
                                            v-money="money"
                                            label="Valor Contrato"
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

import {VMoney} from 'v-money';

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
                text: 'Nº Contrato',
                align: 'left',
                sortable: true,
                value: 'numeroContrato',
            },
            { text: 'Tipo Con.', value: 'tipoContrato', sortable: true },
            { text: 'Dt. Homologação', value: 'dataHomologacao', sortable: true },
            { text: 'Dt. Vigencia', value: 'dataVigencia', sortable: true },
            { text: 'Categoria', value: 'categoria', sortable: true },
            { text: 'Situação', value: 'situacao', sortable: true },
            { text: 'Ações', value: 'action', sortable: false },
        ],
        desserts: [],
        editedIndex: -1,
        editedItem: {
            numeroContrato: null,
            tipoContrato: null,
            dataHomologacao: "",
            dataVigencia: "",
            categoria: null,
            situacao: false,
            valorContrato: 0.0,
            valorConsumido: 0.0,
            createdAt: "",
            updatedAt: ""
        },
        defaultItem: {
            numeroContrato: null,
            tipoContrato: null,
            dataHomologacao: "",
            dataVigencia: "",
            categoria: null,
            situacao: "",
            valorContrato: "",
            valorConsumido: "",
            createdAt: "",
            updatedAt: ""
        },
        money: {
            decimal: ',',
            thousands: '.',
            prefix: 'R$ ',
            suffix: '',
            precision: 2,
            masked: false
        },
        tipoContratos: [
            'Pregão Presencial',
            'Compra Direta'
        ],
        categoriaContrato: [
            'APH',
            'Gêneros Alimentícios',
            'Materiais de Expediente',
            'Informática',
            'Fardamento',
            'Pneus',
            'Restaurante',
            'Higiene e Limpeza',
        ],
        situacoes: [
            {
                text: "Ativo",
                value: "Ativo"
            },
            {
                text: "Inativo",
                value: "Inativo"
            }
        ],
        dialogLotes: false,
    }),
    directives: {money: VMoney},
    computed: {
        formTitle () {
            return this.editedIndex === -1 ? 'Novo Contrato' : 'Editar Contrato'
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
        closeLotes() {
            this.dialogLotes = false;
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
                            this.axios.delete(process.env.VUE_APP_URL_API + '/contrato/' + item.id + "/delete").then(response => {
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
                this.axios.put(process.env.VUE_APP_URL_API + '/contrato', this.editedItem).then(response => {
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
                    this.axios.post(process.env.VUE_APP_URL_API + '/contrato', this.editedItem).then(response => {
                        if(response.data.id){
                            this.textoSnackbar = "Contrato inserido com sucesso!";
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
