<template>
    <v-container>
        <v-row>
            <v-col>
                <span class="display-3 font-weight-thin">Passer Commande</span>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-card>
                    <v-card-text>
                        <v-card-title>Mon panier</v-card-title>
                        <v-row
                            v-for="item in cart.items"
                            :key="item.size"
                            class="article"
                        >
                            <v-col cols="7">
                                {{ item.label }} - {{ item.brand }} ({{
                                    item.size
                                }})
                            </v-col>
                            <v-col cols="4"> x{{ item.quantity }} </v-col>
                            <v-col
                                >{{
                                    (item.unitPrice * item.quantity).toFixed(2)
                                }}
                                €</v-col
                            >
                        </v-row>
                        <v-row>
                            <v-col cols="11"> </v-col>
                            <v-col>
                                <strong>{{ prixTotal.toFixed(2) }} €</strong>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="6">
                <v-card>
                    <v-card-text>
                        <v-card-title>
                            Livraison
                        </v-card-title>
                        <v-text-field
                            label="Nom"
                            placeholder="Nom"
                            v-model="client.nom"
                            outlined
                            dense
                        ></v-text-field>
                        <v-text-field
                            label="Prénom"
                            placeholder="Prénom"
                            v-model="client.prenom"
                            outlined
                            dense
                        ></v-text-field>
                        <v-text-field
                            label="Adresse"
                            placeholder="Adresse"
                            v-model="client.adresse"
                            outlined
                            dense
                        ></v-text-field>
                        <v-text-field
                            label="Code postale"
                            placeholder="Code postale"
                            v-model="client.codePostale"
                            outlined
                            dense
                        ></v-text-field>
                        <v-text-field
                            label="Ville"
                            placeholder="Ville"
                            v-model="client.ville"
                            outlined
                            dense
                        ></v-text-field>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col>
                <v-card>
                    <v-card-text>
                        <v-card-title>
                            Paiement
                        </v-card-title>
                        <v-row>
                            <v-col cols="6">
                                <v-text-field
                                    v-model="carteBleue.numCarte"
                                    counter="19"
                                    label="Numéro de Carte"
                                    outlined
                                    dense
                                ></v-text-field>
                            </v-col>
                            <v-col cols="3">
                                <v-text-field
                                    v-model="carteBleue.dateExp"
                                    counter="5"
                                    label="Date d'expiration"
                                    outlined
                                    dense
                                ></v-text-field>
                            </v-col>
                            <v-col cols="3">
                                <v-text-field
                                    v-model="carteBleue.cvc"
                                    counter="3"
                                    label="CVC"
                                    outlined
                                    dense
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-btn
                    :disabled="!pouvoirPayer"
                    block
                    color="white--text black"
                    @click="validerCommande()"
                >
                    PAYER
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import cartService from '../services/cart';

export default {
    data() {
        return {
            cart: cartService.cart,
            client: {
                nom: undefined,
                prenom: undefined,
                adresse: undefined,
                codePostale: undefined,
                ville: undefined,
            },
            carteBleue: {
                numCarte: undefined,
                dateExp: undefined,
                cvc: undefined,
            },
        };
    },
    methods: {
        validerCommande() {
            cartService.emptyCart();
            this.$router.push({ name: 'Felicitation' });
        },
    },
    computed: {
        prixTotal() {
            let res = 0;
            for (let i = 0; i < this.cart.items.length; i++) {
                res +=
                    this.cart.items[i].unitPrice * this.cart.items[i].quantity;
            }
            return res;
        },
        pouvoirPayer() {
            let res = true;
            console.log('mdr');
            for (const property in this.client) {
                if (
                    this.client[property] === undefined ||
                    this.client[property] === ''
                ) {
                    res = false;
                }
            }
            for (const property in this.carteBleue) {
                if (
                    this.carteBleue[property] === undefined ||
                    this.carteBleue[property] === ''
                ) {
                    res = false;
                }
            }
            return res;
        },
    },
};
</script>

<style>
.article {
    border-bottom: grey 1px solid;
}
</style>
