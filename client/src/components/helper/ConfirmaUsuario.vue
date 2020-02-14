<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="600px">

            <v-card>
                <v-card-title>
                    <span class="headline">Autenticação</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row v-if="senhaIncorreta">
                            <v-col cols="12" sm="12" md="12">
                                <v-alert type="error">
                                    Senha incorreta!
                                </v-alert>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" sm="12" md="12">
                                <v-text-field
                                    v-model="senha"
                                    label="Senha *" 
                                    required
                                    outlined
                                    :type="'password'"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                    <small>* Campos obrigatórios!</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="fecha">Cancelar</v-btn>
                    <v-btn color="blue darken-1" text @click="autentica">Confirmar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
    export default {
        data: () => ({ 
            senha: "",
            senhaIncorreta: false,
        }),
        computed: {
            dialog: {
                get() {
                    return this.openDialog;
                },
                set() {
                    this.$emit('close',false);
                }
            }
        },
        watch: {
            senha(val) {
                if(val.length > 0) {
                    this.senhaIncorreta = false;
                }
            }
        },
        props: {
            openDialog: Boolean,
            idUsuario: Number
        },
        methods: {
            fecha() {
                this.$emit('close');
            },
            valid() {
                return this.senha != "" ? true : false;
            },
            autentica() {
                if(this.valid()) {
                    var data = {
                        idUsuario: this.idUsuario,
                        senha: this.senha
                    };
                    this.axios.post(process.env.VUE_APP_URL_API + '/login/autenticaSaida', data).then(response => {
                        if(response.data) {
                            this.senhaIncorreta = false;
                            this.$emit("senhaCorreta");
                        }
                        
                        if(!response.data){
                            this.senhaIncorreta = true;
                            this.senha = "";
                        }
                    });
                }
            }
        }
    }
</script>