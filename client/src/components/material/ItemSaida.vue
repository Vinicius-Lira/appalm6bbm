<template>
    <v-container>
        <v-row :style="{ margin: '0px', padding: '0px', height: '55px'}">
            <v-col cols="12" sm="12" md="7" >
                <v-autocomplete
                    v-model="idProduto"
                    label="Produto *"
                    :items="produtos"
                    :rules="[v => !!v || 'Obrigatório selecionar o produto!']"
                    item-text="produto" item-value="id"
                    outlined
                    dense
                    @change="getPropriedades"
                ></v-autocomplete>
            </v-col>
            <v-col cols="12" sm="12" md="3">
                <v-select
                    :items="propriedades"
                    v-model="idPropriedadeProduto"
                    :rules="[v => !!v || 'Obrigatório prencher a qtd. entrada!']"
                    label="Propriedade * "
                    item-value="id" item-text="tamanho"
                    outlined
                    dense
                ></v-select>
            </v-col>
            <v-col cols="12" sm="12" md="2">
                <v-text-field
                    v-model="qtdEntrada"
                    :rules="[v => !!v || 'Obrigatório prencher a qtd. entrada!']"
                    label="Qtd. Entrada *"
                    outlined
                    dense
                ></v-text-field>
            </v-col>

        </v-row>
    </v-container>
</template>

<script>
export default {
    data: () => ({
        produtos: [],
        idProduto: null,
        qtdEntrada: 0,
        idPropriedadeProduto: null,
        propriedades: [],
        // qtdRules: [
        //     value => {
        //         this.axios.get(process.env.VUE_APP_URL_API + '/produtosLote/' + val).then(response => {
        //             this.produtos = response.data;
        //         });
        //     }
        // ]
    }),
    computed: {
        id: {
            get() {
                return this.idProduto;
            },
            set(val) {
                this.$emit('idProduto', val);
            }
        }
    },
    watch: {
        salva(val) {
            if(val) {
                this.item.idProduto = this.idProduto;
                this.item.idPropriedadeProduto = this.idPropriedadeProduto;
                this.item.qtdEntrada = this.qtdEntrada;
                this.$emit('idProduto', this.item);
            }
        },
        idContrato(val) {
            this.axios.get(process.env.VUE_APP_URL_API + '/produto/getProdutosByIdContrato/' + val).then(response => {
                this.produtos = response.data;
            });
        },
    },
    props: {
        salva: Boolean,
        idContrato: Number,
        item: Object,
    },
    created () {
       this.axios.get(process.env.VUE_APP_URL_API + '/produto/getProdutosByIdContrato/' + this.idContrato).then(response => {
            this.produtos = response.data;
        });

        this.idProduto = this.item.idProduto;
        this.qtdEntrada = this.item.qtdEntrada;
        this.idPropriedadeProduto = this.item.idPropriedadeProduto;
        this.getPropriedades();
    },
    methods: {
        getPropriedades() {
            this.axios.get(process.env.VUE_APP_URL_API + '/propriedadesProduto/produtoidProdutoidContrato/' + this.idProduto + "/" + this.idContrato).then(response => {
                this.propriedades = response.data;
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
