<template>
    <v-app-bar app dark>
        <router-link to="/" text class="logo">
            <span class="display-1">Clothes</span>
        </router-link>

        <div v-for="category in categories" :key="category.id">
            <v-btn small class="ml-5" @click="goToCatalog(category.id)"
                >Nos {{ category.label }}</v-btn
            >
        </div>
        <v-spacer></v-spacer>
        <v-menu min-width="600px" :close-on-content-click="false">
            <template v-slot:activator="{ on }">
                <v-btn class="ml-5" v-on="on">
                    <span class="mr-2">Mon panier ({{ itemInCart }})</span>
                    <v-icon>mdi-shopping</v-icon>
                </v-btn>
            </template>
            <v-card v-if="itemInCart === 0">
                <v-card-title>Mon panier</v-card-title>
                <span class="emptyBasket">Votre panier est vide.</span>
            </v-card>
            <v-card v-else>
                <v-card-title>Mon panier</v-card-title>
                <v-row v-for="item in cart.items" :key="item.size">
                    <v-col cols="0.5">
                    </v-col>
                    <v-col cols="6"  class="articleInBasket">
                    {{ item.label }} - {{ item.brand }} ({{ item.size }}) 
                    </v-col>
                    <v-col cols="3"  class="articleInBasket">x{{ item.quantity }} 
                        <v-btn text icon>
                            <v-icon
                                @click="addToQuantity(item)"
                                >mdi-arrow-up</v-icon
                            >
                        </v-btn>
                        <v-btn text icon>
                            <v-icon
                                @click="subToQuantity(item)"
                                >mdi-arrow-down</v-icon
                            >
                        </v-btn>
                    </v-col>
                    <v-col cols="2"  class="articleInBasket">{{ (item.unitPrice*item.quantity).toFixed(2) }} €</v-col>
                    <v-col cols="0.5"></v-col>
                </v-row>
                <v-row>
                    <v-col cols="7.5">
                    </v-col>
                    <v-col cols="4">
                        Prix Total : {{ (prixTotal).toFixed(2) }} €
                    </v-col>
                </v-row>
                <v-row>
                    <v-col></v-col>
                    <v-col cols="5">
                        <v-btn color="black--text white" @click="emptyBasket">
                            VIDER LE PANIER
                        </v-btn>
                    </v-col>
                    <v-col cols="5">
                        <v-btn color="white--text black">
                            COMMANDER
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card>
        </v-menu>
    </v-app-bar>
</template>

<script>
import serviceCatalog from '../services/catalog';
import cartService from '../services/cart';

export default {
    data() {
        return {
            categories: [],
            cart: [],
        };
    },
    methods: {
        goToCatalog(categoryId) {
            this.$router.push({ name: 'Catalog', params: { categoryId } });
        },
        addToQuantity(item){
            cartService.incrementCartItem(item.id);
        },
        subToQuantity(item){
            cartService.decrementCartItem(item.id);
        },
        emptyBasket(){
            cartService.emptyCart();
        }
    },

    computed: {
        itemInCart(){
            let res = 0;
            if (this.cart.items === undefined){
                res = 0;
            }
            else{
                for (let i = 0; i < this.cart.items.length; i++){
                    res += this.cart.items[i].quantity;
                }
            }
            return res;
        },

        prixTotal(){
            let res = 0;
            for (let i = 0; i < this.cart.items.length; i++){
                res += this.cart.items[i].unitPrice * this.cart.items[i].quantity;
            }
            return res;
        }
    },

    async beforeCreate() {
        const categories = await serviceCatalog.getCategories();
        this.categories = categories.sort((c1, c2) =>
            c1.label.localeCompare(c2.label),
        );
        this.cart = cartService.cart;
    },
};
</script>

<style scoped>
.logo {
    color: white;
    text-decoration: none;
}

.emptyBasket{
    margin:30px;
}

.articleInBasket{
    border-bottom:1px solid grey;
    margin-bottom:5px;
}
</style>
