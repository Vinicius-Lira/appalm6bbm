<template>
    <v-dialog v-model="dialog" max-width="1000px">
        <v-card>
            <v-card-title>
                <span class="headline">Nova Pessoa</span>
            </v-card-title>

            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12" sm="6" md="6">
                            <v-text-field
                                v-model="pessoa.nome"
                                :rules="[v => !!v || 'Obrigatório prencher o nome!']"
                                label="Nome"
                                outlined
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                            <v-text-field
                                v-model="pessoa.email"
                                :rules="[v => !!v || 'Obrigatório prencher o email!']"
                                label="E-mail"
                                outlined
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field
                                v-model="pessoa.matricula"
                                :rules="[v => !!v || 'Obrigatório prencher o matrícula!']"
                                v-mask="['######-#', '######-#-##']"
                                label="Matrícula"
                                outlined
                            ></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="6" md="4">
                            <v-text-field
                                v-model="pessoa.dataNascimento"
                                :rules="[v => !!v || 'Obrigatório prencher a data nascimento!']"
                                v-mask="['##/##/####']"
                                label="Data Nascimento"
                                outlined
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-select
                                :items="sexos"
                                v-model="pessoa.sexo"
                                :rules="[v => !!v || 'Obrigatório prencher o sexo!']"
                                label="Sexo"
                                outlined
                            ></v-select>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="6" md="4">
                            <v-select
                                :items="hierarquias"
                                item-text="hierarquia"
                                item-value="id"
                                v-model="pessoa.idHierarquia"
                                :rules="[v => !!v || 'Obrigatório informar Posto/Graduação!']"
                                label="Hierarquia"
                                outlined
                            ></v-select>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-select
                                :items="obms"
                                v-model="pessoa.idBatalhao"
                                item-text="abreviacao"
                                item-value="id"
                                :rules="[v => !!v || 'Obrigatório prencher a OBM!']"
                                label="OBM"
                                outlined
                            ></v-select>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-select
                                :items="setores"
                                item-text="setor"
                                item-value="id"
                                v-model="pessoa.idSetor"
                                :rules="[v => !!v || 'Obrigatório prencher o setor!']"
                                label="Setor"
                                outlined
                            ></v-select>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="6" md="4">
                            <v-select
                                :items="tipoPessoas"
                                v-model="pessoa.tipoPessoa"
                                item-text="tipo"
                                item-value="value"
                                :rules="[v => !!v || 'Obrigatório prencher o tipo do cadastro!']"
                                label="Tipo usuário"
                                outlined
                            ></v-select>
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
</template>

<script>
    export default {
        data: () => ({
            pessoa: {
                nome: "",
                email: "",
                matricula: "",
                dataNascimento: "",
                dataIngresso: "",
                sexo: "",
                idHierarquia: 0,
                idBatalhao: 0,
                idSetor: 0,
                tipoPessoa: false,
            },
            tipoPessoas: [
                { tipo: "Administrador", value: "true"},
                { tipo: "Normal",       value: "false"}
            ],
            sexos: [ "FEMININO", "MASCULINO" ],
        }),
        watch: {
            dialogNovo(val) {
                console.log(val);
            }
        },
        computed: {
            dialog: {
                get() {
                    return this.dialogNovo;
                },
                set() {
                    this.$emit('close',false);
                }
            }
        },
        props: {
            dialogNovo: {
                type: Boolean
            },
            hierarquias: {
                type: Array
            },
            obms: {
                type: Array
            },
            setores: {
                type: Array
            },
        },
        methods: {
            close(){
                this.$emit('close', true);
            },
            isValidEmail() {
                var parse_email = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;
                return  parse_email.test(this.pessoa.email);
            },
            isValidDate(date) {
                var aux = [];
                if(date != ''){
                    aux = date.split('/');
                    if(parseInt(aux[0]) > 0 && parseInt(aux[0]) < 31){
                        if(parseInt(aux[1]) > 0 && parseInt(aux[1]) < 12){
                            if(parseInt(aux[2]) > 1900 && parseInt(aux[2]) < 3000){
                                return true;
                            }
                        }
                    }
                }

                return false;
            },
            save () {
                if(this.validaCampos()){
                    this.axios.post(process.env.VUE_APP_URL_API + '/pessoa', this.pessoa).then(response => {
                        if(response.data.id){
                            this.close();
                        }
                        if(!response.data.id) {
                            this.close();
                        }
                    });
                }
                if(!this.validaCampos()) {
                    this.close();
                }
            },
            validaCampos() {
                return  this.pessoa.nome != '' &&
                        this.isValidEmail() &&
                        this.pessoa.matricula != '' &&
                        this.pessoa.sexo != '' &&
                        this.pessoa.tipoSanguineo != "" &&
                        this.pessoa.idHierarquia != null &&
                        this.pessoa.idBatalhao != null &&
                        this.pessoa.idSetor != null;
            },
        }
    }

</script>
