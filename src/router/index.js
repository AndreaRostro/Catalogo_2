import film from '../views/film.vue'
import tv_series from '../views/tv_series.vue'
import detailFilm from '../views/detailFilm.vue'
import detailTv_Series from '../views/detailTv_Series.vue'
import searchedFilm from '../views/searchedFilm.vue'
import favorites from '../views/favorites.vue'
import { createRouter, createWebHistory } from 'vue-router'
const routes = [
    {
        path: '/', component: film
    },
    {
        path: '/film', component: film
    },
    {
        path: '/tv_series', component: tv_series
    },
    {
        path: '/film/favorites', component: favorites
    },
    {
        path: '/film/searched', component: searchedFilm 
    },
    {
        path: '/film/detail/:id', component: detailFilm
    },
    {
        path: '/tv_series/detail/:id', component: detailTv_Series
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router