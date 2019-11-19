<template>
    <v-app>
        <core-app-bar v-if="exibeMenu" />

        <core-drawer v-if="exibeMenu"/>

        <core-view />
    </v-app>
</template>

<script>
    export default {
        data: () => ({
            route: null
        }),
        components: {
            CoreDrawer: () => import('@/components/core/Drawer'),
            CoreAppBar: () => import('@/components/core/AppBar'),
            CoreView: () => import('@/components/core/View')
        },
        computed: {
            exibeMenu: function () {
                if(this.$route.name != 'Login') {
                    return true;
                }

                return false;
            }
        }
    }
</script>
