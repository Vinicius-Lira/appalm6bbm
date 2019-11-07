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
                Almoxarifado 6BBM
            </v-list-item-title>
        </v-list-item>

        <v-divider class="mx-3 mb-3" />

        <v-list nav>
            <div />

            <v-list-item
              v-for="(link, i) in links"
              :key="i"
              :to="link.to"
              active-class="error white--text"
            >
                <v-list-item-action>
                <v-icon>{{ link.icon }}</v-icon>
            </v-list-item-action>

            <v-list-item-title v-text="link.text" />
            </v-list-item>
        </v-list>

        <v-card
          max-width="500"
          class="mx-auto"
        >
          <v-list>
            <v-list-group
              :key="'menu'"
              :prepend-icon="'mdi-city'"
              no-action
              :style="{ color: '#fff' }"
            >

              <template v-slot:activator>
                <v-list-item>
                  <v-list-item-title v-text="'Patrimônio'"></v-list-item-title>
                </v-list-item>
              </template>

              <v-list-item
                :key="'Bens'"
                :to="'/patrimonio'"
                active-class="error white--text"
              >
                <v-list-item-content>
                  <v-list-item-title v-text="'Bens'"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item
                :key="'Movimentações'"
                :to="'/patrimonio'"
                active-class="error white--text"
              >
                <v-list-item-content>
                  <v-list-item-title v-text="'Movimentações'"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item
                :key="'Baixa'"
                :to="'/patrimonio'"
                active-class="error white--text"
              >
                <v-list-item-content>
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
      links: [
        {
          to: '/',
          icon: 'mdi-view-dashboard',
          text: 'Início'
        },
        {
          to: '/cadastro',
          icon: 'mdi-clipboard-outline',
          text: 'Cadastros'
        },
        {
          to: '/patrimonio',
          icon: 'mdi-clipboard-outline',
          text: 'Patrimônio'
        },
      ]
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
