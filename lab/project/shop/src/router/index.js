import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import NotFound from '../views/NotFound.vue';
import Catalog from '../views/Catalog.vue';
import Commande from '../views/Commande.vue';
import Felicitation from '../views/Felicitation.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '*',
        name: 'NotFound',
        component: NotFound,
    },
    {
        path: '/catalog/:categoryId',
        name: 'Catalog',
        component: Catalog,
    },
    {
        path: '/commande',
        name: 'Commande',
        component: Commande,
    },
    {
        path: '/felication',
        name: 'Felicitation',
        component: Felicitation,
    },
];

const router = new VueRouter({
    routes,
});

export default router;
