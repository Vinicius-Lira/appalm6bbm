<template>
      <v-row justify="center">
            <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
                <v-card>
                    <v-toolbar dark color="red">
                        <v-btn icon dark @click="dialog = false">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                        <v-toolbar-title>Produtos Lote</v-toolbar-title>
                        <v-spacer></v-spacer>

                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="12" md="12">
                                        <v-autocomplete
                                            v-model="editedItem.idProduto"
                                            :items="produtos"
                                            outlined
                                            item-value="id" item-text="produto"
                                            @change="buscaPropriedades"
                                        ></v-autocomplete>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="4">
                                        <v-text-field
                                            v-model="editedItem.qtdContratada"
                                            label="Qtd. Contratada"
                                            outlined
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="4">
                                        <v-select
                                            :items="propriedades"
                                            v-model="editedItem.idPropriedadeProduto"
                                            label="Propriedade Produto"
                                            item-value="id" item-text="tamanho"
                                            outlined
                                        ></v-select>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="4">
                                        <v-text-field
                                            v-model="editedItem.valorUnitario"
                                            label="Valor Unitário"
                                            v-money="money"
                                            outlined
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>
                    </v-toolbar>
                </v-card>
            </v-dialog>
        </v-row>
</template>

<script>
    export default {
        data: () => ({

        }),
        watch: {

        },
        props: {

        },
        methods: {

        }
    }
</script>