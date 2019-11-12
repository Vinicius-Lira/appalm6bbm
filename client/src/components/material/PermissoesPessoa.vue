<template>
    <v-simple-table>
        <template v-slot:default dense>
            <thead>
                <tr>
                    <th class="text-left">Permissão</th>
                </tr>
            </thead>
            <tbody>
                <tr :style="{ 'padding': '0px', 'margin': '0px', height: '30px' }">
                    <td >
                        <v-switch
                            v-model="permissoes.cadastrosCadastrar"
                            :style="{height: '20px', 'padding': '0px', 'margin': '0px' }"
                            color="red darken-4"
                            label="Cadastro Cadastrar"
                        ></v-switch>
                    </td>
                </tr>

                <tr :style="{ 'padding': '0px', 'margin': '0px', height: '30px' }">
                    <td >
                        <v-switch
                            v-model="permissoes.cadastrosEditar"
                            :style="{height: '20px', 'padding': '0px', 'margin': '0px' }"
                            color="red darken-4"
                            label="Cadastro Editar"
                        ></v-switch>
                    </td>
                </tr>

                <tr :style="{ 'padding': '0px', 'margin': '0px', height: '30px' }">
                    <td >
                        <v-switch
                            v-model="permissoes.cadastrosApagar"
                            :style="{height: '20px', 'padding': '0px', 'margin': '0px' }"
                            color="red darken-4"
                            label="Cadastro Apagar"
                        ></v-switch>
                    </td>
                </tr>

                <tr :style="{ 'padding': '0px', 'margin': '0px', height: '30px' }">
                    <td >
                        <v-switch
                            v-model="permissoes.patrimonioCadastrar"
                            :style="{height: '20px', 'padding': '0px', 'margin': '0px' }"
                            color="red darken-4"
                            label="Patrimônio Cadastrar"
                        ></v-switch>
                    </td>
                </tr>

                <tr :style="{ 'padding': '0px', 'margin': '0px', height: '30px' }">
                    <td >
                        <v-switch
                            v-model="permissoes.patrimonioEditar"
                            :style="{height: '20px', 'padding': '0px', 'margin': '0px' }"
                            color="red darken-4"
                            label="Patrimônio  Editar"
                        ></v-switch>
                    </td>
                </tr>

                <tr :style="{ 'padding': '0px', 'margin': '0px', height: '30px' }">
                    <td >
                        <v-switch
                            v-model="permissoes.patrimonioApagar"
                            :style="{height: '20px', 'padding': '0px', 'margin': '0px' }"
                            color="red darken-4"
                            label="Patrimônio Apagar"
                        ></v-switch>
                    </td>
                </tr>

                <tr :style="{ 'padding': '0px', 'margin': '0px', height: '30px' }">
                    <td >
                        <v-switch
                            v-model="permissoes.patrimonioMovimentar"
                            :style="{height: '20px', 'padding': '0px', 'margin': '0px' }"
                            color="red darken-4"
                            label="Patrimônio Movimentar"
                        ></v-switch>
                    </td>
                </tr>
                <tr :style="{ 'padding': '0px', 'margin': '0px', height: '30px' }">
                    <td >
                        <v-switch
                            v-model="permissoes.patrimonioMovimentarEditar"
                            :style="{height: '20px', 'padding': '0px', 'margin': '0px' }"
                            color="red darken-4"
                            label="Patrimônio Movimentar Editar"
                        ></v-switch>
                    </td>
                </tr>
                <tr :style="{ 'padding': '0px', 'margin': '0px', height: '30px' }">
                    <td >
                        <v-switch
                            v-model="permissoes.patrimonioMovimentarApagar"
                            :style="{height: '20px', 'padding': '0px', 'margin': '0px' }"
                            color="red darken-4"
                            label="Patrimônio Movimentar Apagar"
                        ></v-switch>
                    </td>
                </tr>
                <tr :style="{ 'padding': '0px', 'margin': '0px', height: '30px' }">
                    <td >
                        <v-switch
                            v-model="permissoes.patrimonioDescarregar"
                            :style="{height: '20px', 'padding': '0px', 'margin': '0px' }"
                            color="red darken-4"
                            label="Patrimônio Descarregar"
                        ></v-switch>
                    </td>
                </tr>
                <tr :style="{ 'padding': '0px', 'margin': '0px', height: '30px' }">
                    <td >
                        <v-switch
                            v-model="permissoes.patrimonioDescarregarEditar"
                            :style="{height: '20px', 'padding': '0px', 'margin': '0px' }"
                            color="red darken-4"
                            label="Patrimônio Descarregar Editar"
                        ></v-switch>
                    </td>
                </tr>

                <tr :style="{ 'padding': '0px', 'margin': '0px', height: '30px' }">
                    <td >
                        <v-switch
                            v-model="permissoes.patrimonioDescarregarApagar"
                            :style="{height: '20px', 'padding': '0px', 'margin': '0px' }"
                            color="red darken-4"
                            label="Patrimônio Descarregar Apagar"
                        ></v-switch>
                    </td>
                </tr>
            </tbody>

        </template>
    </v-simple-table>

</template>

<script>
    export default {
        data: () => ({
            permissoes: {
                id: null,
                idResponsavel: null,
                cadastrosCadastrar: null,
                cadastrosEditar: null,
                cadastrosApagar: null,
                patrimonioCadastrar: null,
                patrimonioEditar: null,
                patrimonioApagar: null,
                patrimonioMovimentar: null,
                patrimonioMovimentarEditar: null,
                patrimonioMovimentarApagar: null,
                patrimonioDescarregar: null,
                patrimonioDescarregarEditar: null,
                patrimonioDescarregarApagar: null
            }
        }),
        props: {
            idResponsavel: {
                type: Number
            },
        },
        created() {
            this.initialize();
        },
        watch: {
            'permissoes.cadastrosCadastrar'() {
                this.save();
            },
            'permissoes.cadastrosEditar'() {
                this.save();
            },
            'permissoes.cadastrosApagar'() {
                this.save();
            },
            'permissoes.patrimonioCadastrar'() {
                this.save();
            },
            'permissoes.patrimonioEditar'() {
                this.save();
            },
            'permissoes.patrimonioApagar'() {
                this.save();
            },
            'permissoes.patrimonioMovimentar'() {
                this.save();
            },
            'permissoes.patrimonioMovimentarEditar'() {
                this.save();
            },
            'permissoes.patrimonioMovimentarApagar'() {
                this.save();
            },
            'permissoes.patrimonioDescarregar'() {
                this.save();
            },
            'permissoes.patrimonioDescarregarEditar'() {
                this.save();
            },
            'permissoes.patrimonioDescarregarApagar'() {
                this.save();
            },
            idResponsavel() {
                this.initialize();
            }
        },
        methods: {
            initialize () {
                this.axios.get(process.env.VUE_APP_URL_API + '/permissao/getById/' + this.idResponsavel).then(response => {
                    if(response.data){
                        this.permissoes = response.data;
                    }
                });
            },
            save(){
                if(this.permissoes.id != null) {
                    this.axios.put(process.env.VUE_APP_URL_API + '/permissao/', this.permissoes).then(response => {
                        if(response.data){
                            this.permissoes = response.data;
                        }
                    });
                }
            }
        }
    }
</script>

