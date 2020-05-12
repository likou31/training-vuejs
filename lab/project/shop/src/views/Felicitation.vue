<template>
    <v-container class="justify-center text-center">
        <v-row>
            <v-col cols="12">
                <v-img
                    src="home.jpg"
                    class="white--text align-end"
                    max-height="400px"
                ></v-img>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <span class="display-3">Merci pour votre Commande !</span>
            </v-col>
        </v-row>
        <a @click="retourPageAccueil"
            >Cliquer ici pour retourner à la page d'acceuil</a
        >
    </v-container>
</template>
<script>
export default {
    methods: {
        retourPageAccueil() {
            this.$router.push({ name: 'Home' });
        },
    },
};
</script>
