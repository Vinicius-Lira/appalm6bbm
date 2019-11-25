<template>
    <v-navigation-drawer
    id="app-drawer"
    v-model="inputValue"
    :src="image"
    app
    color="grey darken-2"
    dark
    floating
    mobile-break-point="991"
    persistent
    width="260"
    >
        <template v-slot:img="attrs">
            <v-img
                v-bind="attrs"
                gradient="to top, rgba(0, 0, 0, .7), rgba(0, 0, 0, .7)"
            />
        </template>

        <v-list-item two-line>
            <v-list-item-title class="title">
                B4 6BBM
            </v-list-item-title>
        </v-list-item>

        <v-divider class="mx-3 mb-3" />

        <v-card
          max-width="500"
          class="mx-auto"
        >
          <v-list>
            
            <v-list-item
              :key="'Dashboard'"
              :to="'/'"
              :prepend-icon="'mdi-archive'"
              :style="{ color: '#fff' }"             
              active-class="error white--text"
            >
              <v-list-item-icon>
                <v-icon>mdi-home</v-icon>
              </v-list-item-icon>

              <v-list-item-title>Dashboard</v-list-item-title>
            </v-list-item>

            <v-list-group
              :key="'Almoxarifado'"
              :prepend-icon="'mdi-city'"
              no-action
              class="menu-accordion"
            >

              <template v-slot:activator>
                <v-list-item
                  :style="{'margin-left': '-15px'}"
                >
                  <v-list-item-title v-text="'Almoxarifado'"></v-list-item-title>
                </v-list-item>
              </template>

              <v-list-item
                :key="'Contratos'"
                :to="'/contratos'"
                active-class="error white--text"
                :style="{ 'padding-left': '40px' }"
              >
                <v-list-item-icon>
                  <v-icon>mdi-circle-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content
                  :style="{ 'margin-left': '-15px' }"
                >
                  <v-list-item-title v-text="'Contratos'"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item
                :key="'Fornecedor'"
                :to="'/fornecedor'"
                active-class="error white--text"
                :style="{ 'padding-left': '40px' }"
              >
                <v-list-item-icon>
                  <v-icon>mdi-circle-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content
                  :style="{ 'margin-left': '-15px' }"
                >
                  <v-list-item-title v-text="'Fornecedor'"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item
                :key="'Categoria Produtos'"
                :to="'/categoriaProdutos'"
                active-class="error white--text"
                :style="{ 'padding-left': '40px' }"
              >
                <v-list-item-icon>
                  <v-icon>mdi-circle-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content
                  :style="{ 'margin-left': '-15px' }"
                >
                  <v-list-item-title >Categoria Produtos</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              
              <v-list-item
                :key="'Produtos'"
                :to="'/produtos'"
                active-class="error white--text"
                :style="{ 'padding-left': '40px' }"
              >
                <v-list-item-icon>
                  <v-icon>mdi-circle-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content
                  :style="{ 'margin-left': '-15px' }"
                >
                  <v-list-item-title >Produtos</v-list-item-title>
                </v-list-item-content>
              </v-list-item> 

              <v-list-item
                :key="'Lotes'"
                :to="'/lotes'"
                active-class="error white--text"
                :style="{ 'padding-left': '40px' }"
              >
                <v-list-item-icon>
                  <v-icon>mdi-circle-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content
                  :style="{ 'margin-left': '-15px' }"
                >
                  <v-list-item-title >Lotes</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              
              <v-list-item
                :key="'Propriedade Produtos'"
                :to="'/propriedadesProduto'"
                active-class="error white--text"
                :style="{ 'padding-left': '40px' }"
              >
                <v-list-item-icon>
                  <v-icon>mdi-circle-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content
                  :style="{ 'margin-left': '-15px' }"
                >
                  <v-list-item-title >Propriedade Produtos</v-list-item-title>
                </v-list-item-content>
              </v-list-item>


              <v-list-item
                :key="'Entrada'"
                :to="'/entradas'"
                active-class="error white--text"
                :style="{ 'padding-left': '40px' }"
              >
                <v-list-item-icon>
                  <v-icon>mdi-circle-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content
                  :style="{ 'margin-left': '-15px' }"
                >
                  <v-list-item-title v-text="'Entrada'"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item
                :key="'Movimentações'"
                :to="'/patrimonioMovimentacoes'"
                active-class="error white--text"
                :style="{ 'padding-left': '40px' }"
              >
                <v-list-item-icon>
                  <v-icon>mdi-circle-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content
                  :style="{ 'margin-left': '-15px' }"
                >
                  <v-list-item-title v-text="'Saída'"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>

            </v-list-group>

            <v-list-group
              :key="'Cadastros'"
              :prepend-icon="'mdi-archive'"
              no-action
              :style="{ color: '#fff' }"
            >

              <template v-slot:activator>
                <v-list-item
                  :style="{'margin-left': '-15px'}"
                >
                  <v-list-item-title >Cadastros</v-list-item-title>
                </v-list-item>
              </template>

              <v-list-item
                :prepend-icon="'mdi-archive'"
                :key="'Grupos Patrimônio'"
                :to="'/grupoPatrimonio'"
                active-class="error white--text"
                :style="{ 'padding-left': '40px' }"
              >
                <v-list-item-icon>
                  <v-icon>mdi-circle-outline</v-icon>
                </v-list-item-icon>

                <v-list-item-content 
                  :style="{ 'margin-left': '-15px' }"
                >
                  <v-list-item-title v-text="'Grupo Patrimônio'"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item
                :key="'Hierarquia'"
                :to="'/hierarquia'"
                active-class="error white--text"
                :style="{ 'padding-left': '40px' }"
              >
                <v-list-item-icon>
                  <v-icon>mdi-circle-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content
                  :style="{ 'margin-left': '-15px' }"
                >
                  <v-list-item-title v-text="'Hierarquia'"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item
                :key="'OBM'"
                :to="'/obms'"
                active-class="error white--text"
                :style="{ 'padding-left': '40px' }"
              >
                <v-list-item-icon>
                  <v-icon>mdi-circle-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content
                  :style="{ 'margin-left': '-15px' }"
                >
                  <v-list-item-title v-text="'OBM'"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item
                :key="'Pessoas'"
                :to="'/pessoas'"
                active-class="error white--text"
                :style="{ 'padding-left': '40px' }"
              >
                <v-list-item-icon>
                  <v-icon>mdi-circle-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content
                  :style="{ 'margin-left': '-15px' }"
                >
                  <v-list-item-title v-text="'Pessoas'"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item
                :key="'Setores'"
                :to="'/setores'"
                active-class="error white--text"
                :style="{ 'padding-left': '40px' }"
              >
                <v-list-item-icon>
                  <v-icon>mdi-circle-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content
                  :style="{ 'margin-left': '-15px' }"
                >
                  <v-list-item-title v-text="'Setores'"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item
                :key="'Situação Patrimônio'"
                :to="'/situacaoPatrimonio'"
                active-class="error white--text"
                :style="{ 'padding-left': '40px' }"
              >
                <v-list-item-icon>
                  <v-icon>mdi-circle-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content
                  :style="{ 'margin-left': '-15px' }"
                >
                  <v-list-item-title v-text="'Situação Patrimônio'"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-group>


            <v-list-group
              :key="'Patrimônio'"
              :prepend-icon="'mdi-city'"
              no-action
              class="menu-accordion"
            >

              <template v-slot:activator>
                <v-list-item
                  :style="{'margin-left': '-15px'}"
                >
                  <v-list-item-title v-text="'Patrimônio'"></v-list-item-title>
                </v-list-item>
              </template>

              <v-list-item
                :key="'Bens'"
                :to="'/patrimonio'"
                active-class="error white--text"
                :style="{ 'padding-left': '40px' }"
              >
                <v-list-item-icon>
                  <v-icon>mdi-circle-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content
                  :style="{ 'margin-left': '-15px' }"
                >
                  <v-list-item-title v-text="'Bens'"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item
                :key="'Movimentações'"
                :to="'/patrimonioMovimentacoes'"
                active-class="error white--text"
                :style="{ 'padding-left': '40px' }"
              >
                <v-list-item-icon>
                  <v-icon>mdi-circle-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content
                  :style="{ 'margin-left': '-15px' }"
                >
                  <v-list-item-title v-text="'Movimentações'"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item
                :key="'Baixa'"
                :to="'/patrimonioBaixas'"
                active-class="error white--text"
                :style="{ 'padding-left': '40px' }"
              >
                <v-list-item-icon>
                  <v-icon>mdi-circle-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content
                  :style="{ 'margin-left': '-15px' }"
                >
                  <v-list-item-title v-text="'Baixa'"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>

            </v-list-group>
            
          </v-list>


        </v-card>

    </v-navigation-drawer>
</template>

<script>
// Utilities
  import {
    mapMutations,
    mapState
  } from 'vuex'

  export default {
    props: {
      opened: {
        type: Boolean,
        default: false
      }
    },
    data: () => ({
      
    }),
    computed: {
      ...mapState('app', ['image', 'color']),
      inputValue: {
        get () {
          return this.$store.state.app.drawer
        },
        set (val) {
          this.setDrawer(val)
        }
      }
    },

    methods: {
      ...mapMutations('app', ['setDrawer', 'toggleDrawer'])
    }
  }
</script>

<style>
  .menu-accordion {
    text-decoration: none;
  }
</style>