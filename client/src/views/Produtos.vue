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
                                            v-model="editedItem.codigoBarras"
                                            label="Cód. Barra"
                                            outlined
                                        ></v-text-field>
                                    </v-col>

                                    <v-col cols="12" sm="12" md="9">
                                        <v-text-field
                                            v-model="editedItem.produto"
                                            label="Produto"
                                            outlined
                                        ></v-text-field>
                                    </v-col>
                                </v-row>

                                <v-row>
                                    <v-col cols="12" sm="12" md="6">
                                        <v-text-field
                                            v-model="editedItem.descricao"
                                            label="Descrição"
                                            outlined
                                        ></v-text-field>
                                    </v-col>

                                    <v-col cols="12" sm="12" md="6">
                                        <v-text-field
                                            v-model="editedItem.observacoes"
                                            label="Observações"
                                            outlined
                                        ></v-text-field>
                                    </v-col>
                                </v-row>

                                <v-row>
                                    <v-col cols="12" sm="12" md="3">
                                        <v-text-field
                                            v-model="editedItem.unidadeMedida"
                                            label="Unidade Medida"
                                            outlined
                                        ></v-text-field>
                                    </v-col>

                                    <v-col cols="12" sm="12" md="2">
                                        <v-text-field
                                            v-model="editedItem.qtdEstoque"
                                            label="Qtd. Estoque"
                                            outlined
                                        ></v-text-field>
                                    </v-col>

                                    <v-col cols="12" sm="12" md="2">
                                        <v-text-field
                                            v-model="editedItem.qtdMinima"
                                            label="Qtd. Minima"
                                            outlined
                                        ></v-text-field>
                                    </v-col>

                                    <v-col cols="12" sm="12" md="5">
                                        <v-select v-model="editedItem.idCategoriaProduto"
                                            :items="categorias"
                                            label="Categoria Produto"
                                            :rules="[v => !!v || 'Obrigatória selecionar a categoria do produto']"
                                            outlined
                                            item-value="id" item-text="categoria"
                                            required
                                        ></v-select>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="12" sm="12" md="3">
                                        <v-text-field
                                            v-model="editedItem.localizacao"
                                            label="Localização"
                                            :rules="[v => !!v || 'Obrigatório selecionar a localização']"
                                            outlined
                                        ></v-text-field>
                                    </v-col>

                                    <v-col cols="12" sm="12" md="3">
                                        <v-text-field
                                            v-model="editedItem.armario"
                                            label="Armário"
                                            :rules="[v => !!v || 'Obrigatório selecionar o armário']"
                                            outlined
                                        ></v-text-field>
                                    </v-col>

                                    <v-col cols="12" sm="12" md="6">
                                        <v-file-input
                                            color="deep-purple accent-4"
                                            counter
                                            label="Imagem"
                                            multiple
                                            placeholder=""
                                            prepend-icon="mdi-camera"
                                            outlined
                                            :show-size="1000"
                                            @change="setImage"
                                        >
                                           <template v-slot:selection="{ index, text }">
                                                <v-chip
                                                    v-if="index < 2"
                                                    color="deep-purple accent-4"
                                                    dark
                                                    label
                                                    small
                                                >
                                                   {{ text }}
                                                </v-chip>

                                                <span
                                                    v-else-if="index === 2"
                                                    class="overline grey--text text--darken-3 mx-2"
                                                >
                                                    +{{ foto.length - 2 }} Arquivo
                                                </span>
                                            </template>
                                       </v-file-input>
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
                text: 'Produto',
                align: 'left',
                sortable: true,
                value: 'produto',
            },
            { text: 'Descrição', value: 'descricao' },
            { text: 'Unidade Medida', value: 'unidadeMedida' },
            { text: 'Qtd. Estoque', value: 'qtdEstoque' },
            { text: 'Qtd. Minima', value: 'qtdMinima' },
            { text: 'Localização', value: 'localizacao' },
            { text: 'Armário', value: 'armario' },
            { text: 'Ações', value: 'action', sortable: false },
        ],
        desserts: [],
        editedIndex: -1,
        editedItem: {
            codigoBarras: "",
            produto: "",
            descricao: "",
            observacoes: "",
            unidadeMedida: "",
            qtdEstoque: "",
            qtdMinima: "",
            idCategoriaProduto: "",
            localizacao: "",
            armario: "",
            imagem: "",
            createdAt: "",
            updatedAt: ""
        },
        defaultItem: {
            codigoBarras: "",
            produto: "",
            descricao: "",
            observacoes: "",
            unidadeMedida: "",
            qtdEstoque: "",
            qtdMinima: "",
            idCategoriaProduto: "",
            localizacao: "",
            armario: "",
            imagem: "",
            createdAt: "",
            updatedAt: ""
        },
        categorias: []
    }),
    computed: {
        formTitle () {
            return this.editedIndex === -1 ? 'Novo Produto' : 'Editar Produto'
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
            this.axios.get(process.env.VUE_APP_URL_API + '/categoriaProduto').then(response => {
                this.categorias = response.data;
            });

            this.axios.get(process.env.VUE_APP_URL_API + '/produto').then(response => {
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
                            this.axios.delete(process.env.VUE_APP_URL_API + '/produto/' + item.id + "/delete").then(response => {
                                if(response.data){
                                    this.snackbar = true;
                                    this.color = 'success';
                                    this.textoSnackbar = "Produto apagado com sucesso!";
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
        setImage: function (e) {
            const file = e[0];
            if (!file.type.includes('image/')) {
                alert('Por favor selecione a foto!');
                return;
            }
            if (typeof FileReader === 'function') {
                const reader = new FileReader();
                reader.onload = (event) => {
                    this.imgSrc = event.target.result;
                    this.editedItem.imagem = this.imgSrc;
                }
                reader.readAsDataURL(file);
            } else {
                alert('Sorry, FileReader API not supported');
            }
        },
        save() {
            if (this.editedIndex > -1) {
                this.axios.put(process.env.VUE_APP_URL_API + '/produto', this.editedItem).then(response => {
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
                    this.axios.post(process.env.VUE_APP_URL_API + '/produto', this.editedItem).then(response => {
                        if(response.data.id){
                            this.textoSnackbar = "Produto inserido com sucesso!";
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
