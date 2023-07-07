<script >
import FilmContainer from '../components/filmContainer.vue'
import NavBar from '../components/NavBar.vue'
import { useFavStore } from '../store/favStore.js'

export default {
    components: {
        NavBar,
        FilmContainer
    },
    data() {
        return {
            store: null
        }
    },
    created() {
        this.refresh()
    },
    methods: {
        refresh() {
        this.store = useFavStore()
        this.store.fetchFavorites()
        }
    }
}
</script>

<template>
    <NavBar style="z-index: 1;" @evento-lingua="refresh()"/>
    <div class="header">
        <a href="/film" style="width: 33%;">
            <button> {{ $t('goBack') }} </button>
        </a>
        <h1 style="width: 33%;"> {{ $t('favorite_film') }} </h1>
        <div style="width: 33%;"></div>
    </div>
    <ul>
        <li>
            <FilmContainer v-for="film in store.favList" :key="film.id" :film="film" class="film-container" />
        </li>
    </ul>
</template>

<style scoped>
.header {
    display: flex;
    text-align: center;
    justify-content: space-between;
}

li {
    display: flex;
    flex-flow: row wrap;
    justify-content: start;
    gap: 6px;
}

ul .film-container {
    display: flex;
    flex-direction: row;
}

.film-container:nth-child(4n+1) {
    margin-left: 20px;
}

.film-container:nth-child(4n) {
    margin-right: 20px;
}

.film-container {
    padding: 8px;
    padding-top: 10px;
}


h1 {
    text-align: center;
    margin-top: 10px;
    font-family: 'Courier New', Courier, monospace;
    color: white;
    text-shadow: 2px 2px 9px cyan;

}

button {
    color: #0dcaf0;
    border: 1px solid #0dcaf0;
    background-color: unset;
    padding: 5px 8px;
    margin-top: 1rem;
    margin-right: 4rem;
    border-radius: .25rem;
    font-size: 22px;
    cursor: pointer;
    left: 10%;
    z-index: -1000;
    transition-duration: 0.4s;

}

button:hover {
    color: black;
    background-color: #0dcaf0;
    transform: scale(1.2);
    box-shadow: 0 0px 16px 0 #0dcaf0, 0 17px 50px 0 rgba(0, 0, 0, 0.19);

}
</style>
