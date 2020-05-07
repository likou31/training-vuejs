import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import NotFound from '../views/NotFound.vue';
import Catalog from '../views/Catalog.vue'
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
    }
];

const router = new VueRouter({
    routes,
});

export default router;
