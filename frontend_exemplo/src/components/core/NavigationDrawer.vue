<template>
    <v-navigation-drawer v-model="toggle" fixed app>
        <v-toolbar flat dark :color="$root.themeColor" class="toolbar">

            <router-link :to="{ name: 'Dashboard' }">
                <img src="static/logo.png" width="36px"></img>
            </router-link>

            <router-link :to="{ name: 'Dashboard' }" class="text">
                B4
            </router-link>

        </v-toolbar>

        <v-list>

            <v-list @click="changeRoute('Dashboard', 1)">
                <v-list-tile-action>
                    <v-icon>dashboard</v-icon>
                </v-list-tile-action>
                <v-list-tile-title :class="[{'active': selectedIndex === 1}, 'item-title' ]" >Dashboard</v-list-tile-title>
            </v-list-tile>

            <v-list-group prepend-icon="folder_shared">

                <v-list-tile slot="activator">
                    <v-list-tile-title class="item-title">Cadastro</v-list-tile-title>
                </v-list-tile>

                <v-list-tile @click="changeRoute('Social', 2)">
                    <v-list-tile-action>
                        <v-icon>radio_button_unchecked</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title :class="[{'active': selectedIndex === 2}, 'item-title' ]">Função</v-list-tile-title>
                </v-list-tile>

                <v-list-tile @click="changeRoute('Chart', 3)">
                    <v-list-tile-action>
                        <v-icon>radio_button_unchecked</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title :class="[{'active': selectedIndex === 3}, 'item-title' ]">Pessoa</v-list-tile-title>
                </v-list-tile>

                <v-list-tile @click="changeRoute('Media', 4)">
                    <v-list-tile-action>
                        <v-icon>radio_button_unchecked</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title :class="[{'active': selectedIndex === 4}, 'item-title' ]">Media</v-list-tile-title>
                </v-list-tile>
            </v-list-group>

            <v-list-group prepend-icon="account_balance">
                <v-list-tile slot="activator">
                    <v-list-tile-title class="item-title">Patrimônio</v-list-tile-title>
                </v-list-tile>

                <v-list-tile @click="changeRoute('Social', 5)">
                    <v-list-tile-action>
                        <v-icon>radio_button_unchecked</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title :class="[{'active': selectedIndex === 5}, 'item-title' ]">Bens</v-list-tile-title>
                </v-list-tile>

                <v-list-tile @click="changeRoute('Snackbar', 6)">
                    <v-list-tile-action>
                        <v-icon>radio_button_unchecked</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title :class="[{'active': selectedIndex === 6}, 'item-title' ]">Baixa</v-list-tile-title>
                </v-list-tile>

                <v-list-tile @click="changeRoute('Snackbar', 7)">
                    <v-list-tile-action>
                        <v-icon>radio_button_unchecked</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title :class="[{'active': selectedIndex === 7}, 'item-title' ]">Movimentação</v-list-tile-title>
                </v-list-tile>

            </v-list-group>

        </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    toggle: {
        type: Boolean,
        required: false,
        default: true
    }
  },

  data() {
    return {
      selectedIndex: 1,
      admins: [
        ['Management', 'people_outline'],
        ['Settings', 'settings']
      ]
    }
  },

  methods: {
    changeRoute(routeName, selectedIndex) {
      const vm = this;

      vm.selectedIndex = selectedIndex;

      return vm.$router.push({ name: routeName });
    }
  }
}
</script>

<style>
  .toolbar {
    font-weight: bold;
    font-size: 18px;
  }

  .toolbar .text {
    padding-left: 15px;
    color: white;
    text-decoration:none;
  }

  .item-title {
    font-size: 17px;
    font-weight: 500;
  }
  .item-sub-title {
    font-size: 15px;
    font-weight: 500;
  }

  .active {
    font-weight: bold;
  }
</style>
