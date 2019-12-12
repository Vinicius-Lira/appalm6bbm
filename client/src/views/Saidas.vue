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
               
                <div class="flex-grow-1"></div>
                <saida
                    v-bind:openDialog="novaSaida"
                    @close="close"
                ></saida>
               

                <v-dialog v-model="dialog" max-width="1000px">
                    
                    <template v-slot:activator="{ on }">
                        <v-btn color="primary" class="mb-2"  @click="novo">Nova</v-btn>
                    </template>
                </v-dialog>
            </v-toolbar>
        </template>

        <template v-slot:item.action="{ item }">
            <v-icon
                small
                class="mr-2"
                @click="editItem(item)"
            >
                mdi-eye
            </v-icon>
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
        novaSaida: false,
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
                text: 'Data Saida',
                align: 'left',
                sortable: true,
                value: 'dataSaida',
            },
            { text: 'Observações', value: 'observacoes', sortable: false },
            { text: 'Solicitante', value: 'solicitante', sortable: true },
            { text: 'Resp. Entrega', value: 'responsavelEntrega', sortable: true },
            { text: 'Ações', value: 'action', sortable: false },
        ],
        desserts: [],
        mensagemAlerta: "",
        
    }),
    watch: {
        dialog (val) {
            val || this.close()
        },
    },
    created () {
        this.initialize()
    },
    methods: {
        adicionaProduto() {
            this.itens.push({});
        },
        getIdProdutos(val){
            this.editedItem.itensEntrada.push(val);

            if(this.editedItem.itensEntrada.length == this.itens.length) {
                this.registraEntrada();
            }
        },
        initialize () {
            this.axios.get(process.env.VUE_APP_URL_API + '/saida').then(response => {
                this.desserts = response.data;
            });

            this.axios.get(process.env.VUE_APP_URL_API + '/contrato').then(response => {
                this.contratos = response.data;
            });
        },
        close() {
             this.novaSaida = false;
        },
        novo() {
            this.novaSaida = true;
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
