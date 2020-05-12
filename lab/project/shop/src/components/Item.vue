<template>
    <v-card class="ml-5 vcard">
        <span class="title_article">{{ item.label }}</span>
        <br />
        <span>{{ item.brand }}</span>
        <v-img
            :src="item.image"
            height="240"
            width="240"
            class="img-article"
        ></v-img>
        <br />
        <v-row>
            <v-col cols="5" class="pb-0">
                <v-select
                    :items="item.sizes"
                    id="sizes"
                    label="Taille"
                    outlined
                    dense
                    v-model="sizeSelected"
                ></v-select>
            </v-col>
            <v-col class="text-right pb-0">
                <span class="price">{{ item.unitPrice.toFixed(2) }}</span>
            </v-col>
        </v-row>
        <v-btn
            class="vbutton"
            color="inherit"
            :disabled="!sizeSelected"
            @click="addToPanier(item)"
            >AJOUTEZ AU PANIER</v-btn
        >
    </v-card>
</template>

<script>
import cartService from '../services/cart';

export default {
    props: {
        item: Object,
    },
    data() {
        return {
            sizeSelected: undefined,
        };
    },
    methods: {
        addToPanier: function(itemSelected) {
            itemSelected.size = this.sizeSelected;
            cartService.addToCart(itemSelected);
        },
    },
};
</script>
