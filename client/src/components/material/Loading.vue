<template>
    <v-dialog v-model="dialog" fullscreen>
        <v-container fluid fill-height style="background-color: rgba(255, 255, 255, 0.5);width: 100%;heigth: 100vh;">
            <v-layout justify-center align-center>
                <v-progress-circular
                    indeterminate
                    color="primary">
                </v-progress-circular>
            </v-layout>
        </v-container>
    </v-dialog>
</template>

<script>
    export default {
        data: () => ({

        }),
        computed: {
            dialog: {
                get() {
                    return this.loading;
                },
                set() {
                    this.$emit('close',false);
                }
            }
        },
         props: {
            loading: Boolean
         }
    }
</script>