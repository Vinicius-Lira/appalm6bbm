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
                            <v-alert v-model="alertaCampos" type="warning">
                                {{ mensagemAlerta }}
                            </v-alert>
                            <v-container>
                                <v-row :style="{ margin: '0px', padding: '0px', height: '80px'}">
                                    <v-col cols="12" sm="12" md="4">
                                        <v-text-field
                                            v-model="editedItem.dataEntrada"
                                            :rules="[v => !!v || 'Obrigatório prencher a data de entrada!']"
                                            label="Data Entrada *"
                                            v-mask="['##/##/####']"
                                            outlined
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="4">
                                        <v-text-field
                                            v-model="editedItem.observacoes"
                                            label="Observações"
                                            outlined
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="4">
                                        <v-select
                                            v-model="editedItem.idContrato"
                                            :items="contratos"
                                            item-value="id" item-text="numeroContrato"
                                            label="Contrato *"
                                            outlined
                                        ></v-select>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-subheader>Itens Entrada</v-subheader>
                                    <v-col cols="12" sm="12" md="12">
                                        <item-entrada 
                                            v-bind:key="item.key"
                                            v-for="item in itens"
                                            v-bind:salva="salvaItens"
                                            v-bind:idContrato="editedItem.idContrato"
                                            v-bind:item="item"
                                            @idProduto="getIdProdutos"
                                        >
                                        </item-entrada>
                                    </v-col>
                                    <v-subheader>Todos os campos com * é obrigatório o seu preenchimento!</v-subheader>
                                    <v-col cols="12" sm="12" md="12">
                                        <v-btn color="primary" class="mb-2"  @click="adicionaProduto">Adicionar</v-btn>
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
                text: 'Data Entrada',
                align: 'left',
                sortable: true,
                value: 'dataEntrada',
            },
            { text: 'Observações', value: 'observacoes', sortable: false },
            { text: 'Contrato', value: 'contrato', sortable: true },
            { text: 'Resp. Entrada', value: 'pessoa', sortable: true },
            { text: 'Ações', value: 'action', sortable: false },
        ],
        desserts: [],
        editedIndex: -1,
        editedItem: {
            dataEntrada: "",
            observacoes: "",
            idContrato: null,
            idPessoa: null,
            usuario: localStorage.getItem("usuarioAppB4"),
            itensEntrada: [],
            createdAt: "",
            updatedAt: ""
        },
        defaultItem: {
            dataEntrada: "",
            observacoes: "",
            idContrato: null,
            idPessoa: null,
            usuario: localStorage.getItem("usuarioAppB4"),
            itensEntrada: [],
            createdAt: "",
            updatedAt: ""
        },
        item: {
            idContrato: null,
            idLote: null,
            idProduto: null,
            idPropriedadeProduto: null,
            qtdEntrada: 0
        },
        contratos: [],
        itens: [],
        salvaItens: false,
        alertaCampos: false,
        mensagemAlerta: ""
    }),

    computed: {
        formTitle () {
            return this.editedIndex === -1 ? 'Nova Entrada' : 'Editar Entrada'
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
        validaCampos() {
            var camposEntrada = this.editedItem.dataEntrada != "" && this.editedItem.idContrato != "";
            var itens = false;
            if(this.editedItem.dataEntrada == "") {
                this.mensagemAlerta = "Obrigatório preencher a data da entrada!"
            }
            if(this.editedItem.idContrato == "") {
                this.mensagemAlerta = "Selecionar o contrato!"
            }
            for(var i = 0; i < this.editedItem.itensEntrada.length; i++) {
                if(this.editedItem.itensEntrada[i].idProduto != "" && this.editedItem.itensEntrada[i].idPropriedadeProduto != "" && this.editedItem.itensEntrada[i].qtdEntrada != "") {
                    itens = true;
                }
            }

            return camposEntrada && itens;
        },
        adicionaProduto() {
            this.itens.push({});
        },
        getIdProdutos(val){
            this.editedItem.itensEntrada.push(val);
            if(this.editedItem.itensEntrada.length == this.itens.length) {
                this.registraEntrada();
            }
        },
        novo() {
            if(localStorage.getItem("usuarioAppB4")) {
                this.axios.get(process.env.VUE_APP_URL_API + '/permissao/' + localStorage.getItem("usuarioAppB4")).then(response => {
                    if(response.data) {
                        if(response.data.cadastrosCadastrar) {
                            this.dialog = true;
                            this.itens.push({});
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
            this.axios.get(process.env.VUE_APP_URL_API + '/entrada').then(response => {
                this.desserts = response.data;
            });

            this.axios.get(process.env.VUE_APP_URL_API + '/contrato').then(response => {
                this.contratos = response.data;
            });
        },
        editItem (item) {
            if(localStorage.getItem("usuarioAppB4")) {
                this.axios.get(process.env.VUE_APP_URL_API + '/permissao/' + localStorage.getItem("usuarioAppB4")).then(response => {
                    if(response.data) {
                        if(response.data.cadastrosEditar) {
                            this.editedIndex = this.desserts.indexOf(item);
                            this.editedItem = Object.assign({}, item);
                            this.axios.get(process.env.VUE_APP_URL_API + '/entrada/entradaItens/' + this.editedItem.id).then(response => {
                                this.itens = response.data;
                            });
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
                            this.axios.delete(process.env.VUE_APP_URL_API + '/entrada/' + item.id + "/delete").then(response => {
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
            this.itens = [];
            this.dialog = false;
            setTimeout(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
                this.salvaItens = false;
            }, 300);
        },
        registraEntrada() {
            if(this.validaCampos()) {
                if (this.editedIndex > -1) {
                    this.axios.put(process.env.VUE_APP_URL_API + '/entrada', this.editedItem).then(response => {
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
                        
                        this.axios.post(process.env.VUE_APP_URL_API + '/entrada', this.editedItem).then(response => {
                            if(response.data){
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
            }

            if(!this.validaCampos()) {
                setTimeout(() => {
                    this.salvaItens = false;
                }, 300);
                this.mensagemAlerta = "Verifique se todos os campos marcados com * estão preenchidos corretamente!"
                this.alertaCampos = true;
            }
        
        },
        save () {
            this.salvaItens = true;
            this.editedItem.itensEntrada = [];
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
