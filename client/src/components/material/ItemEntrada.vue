<template>
    <v-container>
        <v-row :style="{ margin: '0px', padding: '0px', height: '55px'}">
            <v-col cols="12" sm="12" md="8" >
                <v-autocomplete
                    v-model="idProduto"
                    label="Produto"
                    :items="produtos"
                    :rules="[v => !!v || 'Obrigatório prencher a qtd. entrada!']"
                    item-text="produto" item-value="id"
                    outlined
                    dense
                ></v-autocomplete>
            </v-col>
            <v-col cols="12" sm="12" md="4">
                <v-text-field
                    v-model="qtdEntrada"
                    :rules="[v => !!v || 'Obrigatório prencher a qtd. entrada!']"
                    label="Qtd. Entrada"
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
                this.$emit('idProduto', {
                idProduto: this.idProduto,
                qtdEntrada: this.qtdEntrada
            });
            }
        }
    },
    props: {
        salva: Boolean
    },
    created () {
       this.axios.get(process.env.VUE_APP_URL_API + '/produto').then(response => {
            this.produtos = response.data;
        });
    },
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
