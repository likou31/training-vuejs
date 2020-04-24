function initApp() {
    const app = new Vue({
        el: '#app',
        data: {
            categories,
            countries,
            categorySelected: {},
            itemSelected: {},
            panier: [],
        },

        methods: {
            addToPanier: function(){
                this.panier.push(this.itemSelected);
            },

            removeFromPanier: function(itemToDelete){
                this.panier = this.panier.filter(item => item.id !== itemToDelete.id);
            },

            itemInPanier: function(){
                let res = false;
                for (let i  = 0; i < panier.length; i++){
                    if (this.panier[i].id === this.itemSelected.id){
                        res = true;
                    }
                }
                return res;
            }
        },

        computed: {
            prixTotal: function(){
                total = 0;
                this.panier.forEach(item => total += item.unitPrice);
                return Number.parseFloat(total).toFixed(2);
            }
        }
    });
}