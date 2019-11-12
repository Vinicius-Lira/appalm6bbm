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
                                    <v-col cols="4" sm="12" md="4">
                                        <v-text-field
                                            v-model="editedItem.codigo"
                                            :rules="[v => !!v || 'Obrigatório prencher o código!']"
                                            label="Código"
                                            v-mask="[ '#####','#######', '###/#####', '####/#####']"
                                            outlined
                                        ></v-text-field>
                                    </v-col>

                                    <v-col cols="4" sm="12" md="4">
                                        <v-select v-model="editedItem.vinculo"
                                            :items="vinculos"
                                            label="Vículo"
                                            :rules="[v => !!v || 'Obrigatória selecionar o vínculo']"
                                            outlined
                                            required
                                        ></v-select>
                                    </v-col>

                                    <v-col cols="4" sm="12" md="4">
                                        <v-text-field
                                            v-model="editedItem.dataEntrada"
                                            :rules="[v => !!v || 'Obrigatório prencher a data entrada!']"
                                            label="Data Entrada"
                                            outlined
                                            v-mask="'##/##/####'"
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="6" sm="12" md="6">
                                        <v-text-field
                                            v-model="editedItem.identificacao"
                                            :rules="[v => !!v || 'Obrigatório prencher a identificação!']"
                                            label="Identificação"
                                            outlined
                                        ></v-text-field>
                                    </v-col>

                                    <v-col cols="6" sm="12" md="6">
                                        <v-text-field
                                            v-model="editedItem.descricao"
                                            :rules="[v => !!v || 'Obrigatório prencher a descrição!']"
                                            label="Descrição"
                                            outlined
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="4" sm="12" md="4">
                                        <v-text-field
                                            v-model="editedItem.observacoes"
                                            :rules="[v => !!v || 'Obrigatório prencher a observações!']"
                                            label="Observações"
                                            outlined
                                        ></v-text-field>
                                    </v-col>

                                    <v-col cols="4" sm="12" md="4">
                                        <v-select v-model="editedItem.idResponsavel"
                                            :items="responsaveis"
                                            label="Responsável"
                                            :rules="[v => !!v || 'Obrigatória selecionar o responsável']"
                                            outlined
                                            required
                                            item-value="id" item-text="nome"
                                        ></v-select>
                                    </v-col>

                                    <v-col cols="4" sm="12" md="4">
                                        <v-select v-model="editedItem.idGrupo"
                                            :items="grupos"
                                            label="Grupo"
                                            :rules="[v => !!v || 'Obrigatória selecionar o grupo']"
                                            outlined
                                            required
                                            item-value="id" item-text="grupo"
                                        ></v-select>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="4" sm="12" md="4">
                                        <v-select v-model="editedItem.idSetor"
                                            :items="setores"
                                            label="Setor"
                                            :rules="[v => !!v || 'Obrigatória selecionar o setor']"
                                            outlined
                                            required
                                            item-value="id" item-text="setor"
                                        ></v-select>
                                    </v-col>

                                    <v-col cols="4" sm="12" md="4">
                                        <v-select v-model="editedItem.idSituacao"
                                            :items="situacoes"
                                            label="Situação"
                                            :rules="[v => !!v || 'Obrigatória selecionar a situação']"
                                            outlined
                                            required
                                            item-value="id" item-text="situacao"
                                        ></v-select>
                                    </v-col>

                                    <v-col cols="4" sm="12" md="4">
                                        <v-text-field
                                            v-model="editedItem.valorEconomico"
                                            :rules="[v => !!v || 'Obrigatório prencher o valor econômico!']"
                                            label="Valor econônico"
                                            outlined

                                            v-money="money"
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="4" sm="12" md="4">
                                        <v-text-field
                                            v-model="editedItem.dataCarga"
                                            :rules="[v => !!v || 'Obrigatório prencher a data carga!']"
                                            label="Data carga"
                                            outlined
                                            v-mask="'##/##/####'"
                                        ></v-text-field>
                                    </v-col>

                                    <v-col cols="4" sm="12" md="4">
                                        <v-select v-model="editedItem.baixado"
                                            :items="valorBaixado"
                                            label="Baixado"
                                            :rules="[v => !!v || 'Obrigatória selecionar se está baixado']"
                                            outlined
                                            required
                                            item-value="value" item-text="text"
                                        ></v-select>
                                    </v-col>

                                    <v-col cols="12" sm="6" md="4">
                                       <v-file-input
                                           color="deep-purple accent-4"
                                           counter
                                           label="Foto"
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
                                <v-row
                                    justify="center"
                                >
                                    <v-col cols="12" sm="12" md="12">

                                        <img v-bind:src="editedItem.foto" :style="{width: '100%'}"/>
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
        vinculos: [
            "Município",
            "Estado",
            "Outro"
        ],
        money: {
            decimal: ',',
            thousands: '.',
            prefix: 'R$ ',
            suffix: '',
            precision: 2,
            masked: false
        },
        responsaveis: [],
        grupos: [],
        setores: [],
        situacoes: [],
        valorBaixado: [
            {
                value: "SIM",
                text: "SIM"
            },
            {
                value: 'NÃO',
                text: "NÃO"
            }
        ],
        headers: [
            {
                text: 'Código',
                align: 'left',
                sortable: true,
                value: 'codigo',
            },
            { text: 'Vínculo', value: 'vinculo' },
            { text: 'Identificação', value: 'identificacao' },
            { text: 'Descrição', value: 'descricao' },
            { text: 'Observações', value: 'observacoes' },
            { text: 'Data Entrada', value: 'dataEntrada' },
            { text: 'Responsável', value: 'responsavelNome' },
            { text: 'Grupo', value: 'grupo' },
            { text: 'Setor', value: 'setor' },
            { text: 'Ações', value: 'action', sortable: false },
        ],
        desserts: [],
        editedIndex: -1,
        editedItem: {
            id: "",
            codigo: "",
            vinculo: "",
            identificacao: "",
            descricao: "",
            observacoes: "",
            dataEntrada: "",
            responsavel: "",
            grupo: "",
            setor: "",
            idResponsavel: null,
            idGrupo: null,
            idSetor: null,
            idSituacao: null,
            valorEconomico: "",
            dataCarga: "",
            foto: "",
            baixado: "",
            createdAt: "",
            updatedAt: ""
        },
        defaultItem: {
            id: null,
            codigo: null,
            vinculo: null,
            identificacao: null,
            descricao: null,
            observacoes: null,
            dataEntrada: null,
            responsavel: null,
            grupo: null,
            setor: null,
            idResponsavel: null,
            idGrupo: null,
            idSetor: null,
            idSituacao: null,
            valorEconomico: null,
            dataCarga: null,
            foto: null,
            baixado: null,
            createdAt: null,
            updatedAt: null
        },

    }),
    directives: {money: VMoney},
    computed: {
        formTitle () {
            return this.editedIndex === -1 ? 'Novo Patrimônio' : 'Editar Patrimônio'
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
                        if(response.data.patrimonioCadastrar) {
                            this.dialog = true;
                        }
                        if(!response.data.patrimonioCadastrar) {
                            this.snackbar = true;
                            this.color = 'error';
                            this.textoSnackbar = "Você não tem permissão para adicionar patrimônios!";
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

            this.responsaveis = [];
            this.axios.get(process.env.VUE_APP_URL_API + '/pessoa').then(response => {
                this.responsaveis = response.data;
            });
            this.grupos = [];
            this.axios.get(process.env.VUE_APP_URL_API + '/grupoPatrimonio').then(response => {
                this.grupos = response.data;
            });
            this.setores = [];
            this.axios.get(process.env.VUE_APP_URL_API + '/setor').then(response => {
                this.setores = response.data;
            });
            this.situacoes = [];
            this.axios.get(process.env.VUE_APP_URL_API + '/situacaoPatrimonio').then(response => {
                this.situacoes = response.data;
            });

            this.axios.get(process.env.VUE_APP_URL_API + '/patrimonio').then(response => {
                this.desserts = response.data;
                var i = 0;
                for(i in this.desserts){
                    this.desserts[i].baixado = this.desserts[i].baixado == true ? 'SIM' : 'NÃO';
                }
            });

        },

        editItem (item) {
            if(localStorage.getItem("usuario")) {
                this.axios.get(process.env.VUE_APP_URL_API + '/permissao/' + localStorage.getItem("usuario")).then(response => {
                    if(response.data) {
                        if(response.data.patrimonioCadastrar) {
                            this.editedIndex = this.desserts.indexOf(item);
                            this.editedItem = Object.assign({}, item);
                            this.dialog = true;
                        }
                        if(!response.data.patrimonioCadastrar) {
                            this.snackbar = true;
                            this.color = 'error';
                            this.textoSnackbar = "Você não tem permissão para editar patrimônios!";
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
                        if(response.data.patrimonioCadastrar) {
                            this.axios.delete(process.env.VUE_APP_URL_API + '/patrimonio/' + item.id + "/delete").then(response => {
                                if(response.data){
                                    this.snackbar = true;
                                    this.color = 'success';
                                    this.textoSnackbar = "Registro apagada com sucesso!";
                                    this.initialize();
                                }else {
                                    this.snackbar = true;
                                    this.color = 'error';
                                    this.textoSnackbar = "Ocorreu um erro ao tentar apagar o registro!";
                                }
                            });
                        }
                        if(!response.data.patrimonioCadastrar) {
                            this.snackbar = true;
                            this.color = 'error';
                            this.textoSnackbar = "Você não tem permissão para apagar patrimônios!";
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
                this.axios.put(process.env.VUE_APP_URL_API + '/patrimonio', this.editedItem).then(response => {
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
                    this.axios.post(process.env.VUE_APP_URL_API + '/patrimonio', this.editedItem).then(response => {
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
                   this.editedItem.foto = this.imgSrc;
               }
               reader.readAsDataURL(file);
           } else {
               alert('Sorry, FileReader API not supported');
           }
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
