<template>
    <v-data-table
        :headers="headers"
        :items="desserts"
        :search="search"
        sort-by="calories"
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

                <nova-pessoa
                    v-bind:dialogNovo="dialogNovo"
                    v-bind:hierarquias="hierarquias"
                    v-bind:obms="obms"
                    v-bind:setores="setores"
                    @close="closeNovo"
                ></nova-pessoa>

                <editar-pessoa
                    v-bind:dialogEditar="dialogEditar"
                    v-bind:hierarquias="hierarquias"
                    v-bind:obms="obms"
                    v-bind:setores="setores"
                    v-bind:escalas="escalas"
                    v-bind:pessoa="pessoa"
                    @close="closeEditar"
                ></editar-pessoa>

                <v-dialog v-model="dialog" max-width="1000px">
                    <template v-slot:activator="{ on }">
                        <v-btn color="primary" class="mb-2" @click="nova"  >Nova</v-btn>
                    </template>
                </v-dialog>
            </v-toolbar>
        </template>

        <template v-slot:item.action="{ item }">
           <v-icon
                small
                class="mr-2"
                @click="editarPessoa(item)"
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
    data: () => ({
        dialog: false,
        search: "",
        hierarquias: [],
        obms: [],
        setores: [],
        escalas: [],
        dialogNovo: false,
        dialogEditar: false,
        tipoPessoas: [
            {
                tipo: "Administrador",
                value: 'true'
            },
            {
                tipo: "Normal",
                value: 'false'
            }
        ],
        imgSrc: null,
        rowsPerPageItems: [8, 12, 15],
        pagination: {
            rowsPerPage: 20
        },
        headers: [
            {
                text: 'Nome',
                align: 'left',
                sortable: true,
                value: 'nome',
            },
            { text: 'Matrícula', value: 'matricula' },
            { text: 'Hierarquia', value: 'hierarquia' },
            { text: 'OBM', value: 'obm' },
            { text: 'Setor', value: 'setor' },
            { text: 'Ações', value: 'action', sortable: false },
        ],
        desserts: [],
        editedIndex: -1,
        pessoa: {},
        snackbar: {
            text: "",
            color: "",
            state: false,
        },
    }),
    computed: {
        formTitle () {
            return this.editedIndex === -1 ? 'Nova Pessoa' : 'Editar Pessoa'
        }
    },
    watch: {
        dialog (val) {
            val || this.close()
        },
    },
    created () {
        this.initialize();
    },
    methods: {
        nova() {
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
        closeEditar() {
            this.dialogEditar = false;
            this.initialize();
        },
        closeNovo() {
            this.dialogNovo = false;
            this.initialize();
        },
        deleteItem (item) {
            if(localStorage.getItem("usuarioAppB4")) {
                this.axios.get(process.env.VUE_APP_URL_API + '/permissao/' + localStorage.getItem("usuarioAppB4")).then(response => {
                    if(response.data) {
                        if(response.data.cadastrosApagar) {
                            this.axios.delete(process.env.VUE_APP_URL_API + '/pessoa/' + item.id + "/delete").then(response => {
                                if(response.data){
                                    this.snackbar.color = 'success';
                                    this.snackbar.text = "Pessoa apagada com sucesso!";
                                    this.initialize();
                                }
                                if(!response.data) {
                                    this.snackbar.color = 'error';
                                    this.snackbar.text = "Ocorreu um erro ao tentar apagar o registro!";
                                }
                                this.snackbar.state = true;
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
        editarPessoa(item) {
            if(localStorage.getItem("usuarioAppB4")) {
                this.axios.get(process.env.VUE_APP_URL_API + '/permissao/' + localStorage.getItem("usuarioAppB4")).then(response => {
                    if(response.data) {
                        if(response.data.cadastrosEditar) {
                            this.pessoa = Object.assign({}, item);
                            this.dialogEditar = true;
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
        initialize () {
            this.desserts = [];

            this.axios.get(process.env.VUE_APP_URL_API + '/hierarquia').then(response => {
                this.hierarquias = response.data;
            });

            this.axios.get(process.env.VUE_APP_URL_API + '/batalhao').then(response => {
                this.obms = response.data;
            });

            this.axios.get(process.env.VUE_APP_URL_API + '/setor').then(response => {
                this.setores = response.data;
            });

            this.axios.get(process.env.VUE_APP_URL_API + '/pessoa').then(response => {
                this.desserts = response.data;
                
                var i = 0;
                for(i in this.desserts) {
                    if(this.desserts[i].dataNascimento) {
                        this.desserts[i].dataNascimento = this.desserts[i].dataNascimento.toString().split('T')[0].split('-').reverse().join('/');
                    }
                }
            });
        }
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
