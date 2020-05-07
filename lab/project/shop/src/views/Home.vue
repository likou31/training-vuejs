<template>
    <v-container class="justify-center text-center">
        <v-row>
            <v-col cols="12">
                <v-img
                    src="home.jpg"
                    class="white--text align-end"
                    max-height="600px"
                >
                </v-img>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <span class="display-3">
                    Bienvenue sur <strong>Clothes</strong>
                </span>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <br />
                <br />
                <h2 class="display-2">Les plus grandes marques</h2>
                <br />
                <h2 class="display-2">aux meilleurs prix !</h2>
                <br />
                <br />
                <h2 class="display-1">
                    Découvrez ci-dessous nos univers
                </h2>
                <v-row class="justify-center text-center">
                    <div v-for="category in categories" :key="category.id">
                        <v-card class="ml-5" id="vcard" @click="goToCatalog(category.id)">
                            <v-img :src="category.image" height="300" width="300"></v-img>
                            DECOUVRIR NOS {{ category.label.toUpperCase() }}
                        </v-card>
                    </div>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import serviceCatalog from '../services/catalog';
export default {
    data() {
        return {
            categories: [],
        };
    },
    methods: {
        goToCatalog(categoryId) {
            this.$router.push({ name: 'Catalog', params: { categoryId } });
        },
    },
    async beforeCreate() {
        const categories = await serviceCatalog.getCategories();
        this.categories = categories.sort((c1, c2) =>
            c1.label.localeCompare(c2.label),
        );
    },
};
</script>

<style>
#vcard{
    -webkit-transition: all 1s cubic-bezier( .6, 2, .4, 1);
	-moz-transition: all 1s cubic-bezier( .6, 2, .4, 1);
	-ms-transition: all 1s cubic-bezier( .6, 2, .4, 1);
	-o-transition: all 1s cubic-bezier( .6, 2, .4, 1);
	transition: all 1s cubic-bezier( .6, 2, .4, 1);
}

#vcard:hover{
	-moz-transform: scale(1.03);
	-ms-transform: scale(1.03);
	-o-transform: scale(1.03);
	transform: scale(1.03);

}
</style>
