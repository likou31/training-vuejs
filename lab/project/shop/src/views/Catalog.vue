<template>
    <v-container align="center" justify="center">
        <h1>Nos {{ category.label }}</h1>
        <div class="filter">
            <v-container>
                <v-row>
                    <v-col cols="3">
                        <v-select
                            :items="category.items"
                            item-text="brand"
                            id="brand_filter"
                            label="Marque"
                            v-model="brandSelectedForSort"
                        ></v-select>
                    </v-col>
                    <v-col cols="3">
                        <v-select
                            :items="sizeAvailable"
                            id="taille_filter"
                            label="Taille"
                            v-model="sizeSelectedForSort"
                        ></v-select>
                    </v-col>
                    <v-col cols="1">
                        <v-btn text icon>
                            <v-icon @click="sort = 'asc'">mdi-arrow-up</v-icon>
                        </v-btn>
                    </v-col>
                    <v-col cols="1">
                        <v-btn text icon>
                            <v-icon @click="sort = 'dsc'"
                                >mdi-arrow-down</v-icon
                            >
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </div>
        <div class="itemAvailable">{{ itemAvailable }} articles trouvés</div>
        <div v-if="itemAvailable === 0">
            Aucun article ne correspond à votre recherche.
        </div>
        <v-flex id="flex">
            <div
                v-for="item in itemsSortedAndFiltered"
                :key="item.label"
                :value="item"
            >
                <item :item="item"></item>
            </div>
        </v-flex>
    </v-container>
</template>

<script>
import serviceCatalog from '../services/catalog';
import Item from '../components/Item.vue';

export default {
    data() {
        return {
            category: {
                items: [],
            },
            brandSelectedForSort: undefined,
            sizeSelectedForSort: undefined,
            sort: undefined,
        };
    },

    components: {
        Item,
    },

    methods: {},
    computed: {
        sizeAvailable: function() {
            let res = this.category.items.map(item => item.sizes).flat();
            if (Number.parseFloat(res[0])) {
                res.sort();
            } else {
                res = ['S', 'M', 'L', 'XL', 'XXL'];
            }
            return res;
        },
        itemAvailable: function() {
            return this.itemsSortedAndFiltered.length;
        },
        itemsSortedAndFiltered() {
            let res = this.category.items;

            //Filters

            if (this.brandSelectedForSort) {
                res = res.filter(
                    item => item.brand === this.brandSelectedForSort,
                );
            }

            if (this.sizeSelectedForSort) {
                res = res.filter(item =>
                    item.sizes.includes(this.sizeSelectedForSort),
                );
            }

            // Tri du prix
            if (this.sort) {
                if (this.sort === 'asc') {
                    res.sort(
                        (item1, item2) => item1.unitPrice - item2.unitPrice,
                    );
                } else if (this.sort === 'dsc') {
                    res.sort(
                        (item1, item2) => item2.unitPrice - item1.unitPrice,
                    );
                }
            }
            return res;
        },
    },
    async beforeCreate() {
        const category = await serviceCatalog.getCategory(
            this.$route.params.categoryId,
        );
        this.category = category;
    },

    async beforeRouteUpdate(to, from, next) {
        const category = await serviceCatalog.getCategory(to.params.categoryId);
        this.category = category;
        next();
    },
};
</script>

<style>
#flex {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
}
#sizes {
    height: 20px;
    width: 90px;
}
.vcard {
    height: 470px;
    width: 250px;
    padding: 10px;
    margin-bottom: 20px;
}
.title_article {
    color: grey;
    font-weight: bold;
}
.img-article {
    box-shadow: 2px 2px 12px #aaa;
    -webkit-transition: all 1s cubic-bezier(0.6, 2, 0.4, 1);
    -moz-transition: all 1s cubic-bezier(0.6, 2, 0.4, 1);
    -ms-transition: all 1s cubic-bezier(0.6, 2, 0.4, 1);
    -o-transition: all 1s cubic-bezier(0.6, 2, 0.4, 1);
    transition: all 1s cubic-bezier(0.6, 2, 0.4, 1);
}
.img-article:hover {
    -moz-transform: scale(1.03);
    -ms-transform: scale(1.03);
    -o-transform: scale(1.03);
    transform: scale(1.03);
}
fieldset {
    margin-left: 10px;
}
.price {
    font-weight: bold;
    color: #595959;
}
.vbutton {
    width: 230px;
    margin-top: 10px;
    color: white;
}
.filter {
    margin-right: auto;
    margin-left: auto;
    height: 100px;
    width: 1000px;
    background-color: #c1c0c0;
    border-radius: 10px;
    border: 1px black;
}

.itemAvailable {
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: 950px;
    color: grey;
}
</style>
