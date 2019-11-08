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
                        <v-btn color="primary" class="mb-2"  v-on="on">Novo</v-btn>
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
                                            label="Novo Responsável"
                                            :items="pessoas"
                                            item-text="nome"
                                            item-value="id"
                                            outlined
                                        ></v-autocomplete>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="4">
                                        <v-select
                                            :items="setores"
                                            item-text="setor"
                                            item-value="id"
                                            label="Setor Novo"
                                            outlined
                                        ></v-select>
                                    </v-col>
                                </v-row>

                                <v-row>
                                    <v-col cols="12" sm="12" md="4">
                                        <v-select
                                            :items="situacoes"
                                            item-text="situacao"
                                            item-value="id"
                                            label="Situação"
                                            outlined
                                        ></v-select>
                                    </v-col>

                                    <v-col cols="12" sm="12" md="4">
                                        <v-text-field 
                                            label="Detalhe"
                                            outlined                                       
                                        >
                                        </v-text-field>
                                    </v-col>

                                    <v-col cols="12" sm="12" md="4">
                                        <v-text-field
                                            v-model="editedItem.dataMovimentacao"
                                            :rules="[v => !!v || 'Obrigatório prencher a data movimentação!']"
                                            label="Data Movimentação"
                                            outlined
                                            v-mask="'##/##/####'"
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
                text: 'Código Patri.',
                align: 'left',
                sortable: true,
                value: 'codigo',
            },
            { text: 'Descrição', value: 'descricao' },
            { text: 'Responsável Novo', value: 'responsavelNovo' },
            { text: 'Responsável Ant.', value: 'responsavelAnterior' },
            { text: 'Setor Novo', value: 'setorNovo' },
            { text: 'Setor Ant.', value: 'setorAnterior' },
            { text: 'Detalhe Atual', value: 'detalheAtual' },
            { text: 'Detalhe Ant.', value: 'detalheAnterior' },
            { text: 'Data Mov.', value: 'dataMovimentacao' },
            { text: 'Ações', value: 'action', sortable: false },
        ],
        desserts: [],
        editedIndex: -1,
        editedItem: {
            idPatrimonio: "",
            idResponsavelAnterior: "",
            idResponsavelAtual: "",
            idSetorAnterior: "",
            idSetorAtual: "",
            idSituacaoAnterior: "",
            idSituacaoAtual: "",
            detalheAnterior: "",
            detalheAtual: "",
            dataMovimentacao: "",
            createdAt: "",
            updatedAt: ""
        },
        defaultItem: {
            idPatrimonio: "",
            idResponsavelAnterior: "",
            idResponsavelAtual: "",
            idSetorAnterior: "",
            idSetorAtual: "",
            idSituacaoAnterior: "",
            idSituacaoAtual: "",
            detalheAnterior: "",
            detalheAtual: "",
            dataMovimentacao: "",
            createdAt: "",
            updatedAt: ""
        },
        patrimonios: [],
        setores: [],
        situacoes: [],
        pessoas: [],
    }),

    computed: {
        formTitle () {
            return this.editedIndex === -1 ? 'Nova Movimentação' : 'Editar Movimentação'
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
        initialize () {
            this.axios.get(process.env.VUE_APP_URL_API + '/movimentacaoPatrimonio').then(response => {
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
            this.editedIndex = this.desserts.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
        },

        deleteItem (item) {
            this.axios.delete(process.env.VUE_APP_URL_API + '/movimentacaoPatrimonio/' + item.id + "/delete").then(response => {
                if(response.data){
                    this.snackbar = true;
                    this.color = 'success';
                    this.textoSnackbar = "Pessoa apagada com sucesso!";
                    this.initialize();
                }else {
                    this.snackbar = true;
                    this.color = 'error';
                    this.textoSnackbar = "Ocorreu um erro ao tentar apagar o registro!";
                }
            });
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
                this.axios.put(process.env.VUE_APP_URL_API + '/movimentacaoPatrimonio', this.editedItem).then(response => {
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
                    this.axios.post(process.env.VUE_APP_URL_API + '/movimentacaoPatrimonio', this.editedItem).then(response => {
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
