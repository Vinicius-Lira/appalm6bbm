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
        estadosCivils: [
            "SOLTEIRO",
            "CASADO",
            "DIVORCIADO"
        ],
        lts: [
            {
                text: "SIM",
                value: 'true'
            },
            {
                text: "NÃO",
                value: 'false'
            }
        ],
        hierarquias: [],
        obms: [],
        setores: [],
        escalas: [],
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
                text: 'Nome',
                align: 'left',
                sortable: true,
                value: 'nome',
            },
            { text: 'Matrícula', value: 'matricula' },
            { text: 'Hierarquia', value: 'hierarquia' },
            { text: 'OBM', value: 'obm' },
            { text: 'Setor', value: 'setor' }
        ],
        desserts: [],
        editedIndex: -1,
        editedItem: {
            nome: "",
            email: "",
            matricula: "",
            hierarquia: "",
            obm: "",
            setor: "",
            idHierarquia: 0,
            idBatalhao: 0,
            idSetor: 0
        },
        defaultItem: {
            nome: "",
            email: "",
            matricula: "",
            hierarquia: "",
            obm: "",
            setor: "",
            idHierarquia: 0,
            idBatalhao: 0,
            idSetor: 0
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
        initialize () {
            this.desserts = [];

            this.axios.get('http://localhost:3000/pessoa').then(response => {
                this.desserts = response.data;
                for(var i = 0; i < response.data.length; i++){
                    response.data[i].tipoPessoa == true ? response.data[i].tipoPessoa = 'true' : response.data[i].tipoPessoa = 'false';
                }
                this.desserts = response.data;
            });

            this.axios.get('http://localhost:3000/hierarquia').then(response => {
                this.hierarquias = response.data;

                var i = 0;
                var x = 0;

                for(i in this.desserts){
                    for(x in this.hierarquias){
                        if(this.hierarquias[x].id == this.desserts[i].idHierarquia){
                            this.desserts[i].hierarquia = this.hierarquias[x].hierarquia;
                        }
                    }
                }
            });

            this.axios.get('http://localhost:3000/batalhao').then(response => {
                this.obms = response.data;

                var i = 0;
                var x = 0;

                for(i in this.desserts){
                    for(x in this.obms){
                        if(this.obms[x].id == this.desserts[i].idBatalhao){
                            this.desserts[i].obm = this.obms[x].abreviacao;
                        }
                    }
                }
            });

            this.axios.get('http://localhost:3000/setor').then(response => {
                this.setores = response.data;
                var i = 0;
                var x = 0;

                for(i in this.desserts){
                    for(x in this.setores){
                        if(this.setores[x].id == this.desserts[i].idSetor){
                            this.desserts[i].setor = this.setores[x].setor;
                        }
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
