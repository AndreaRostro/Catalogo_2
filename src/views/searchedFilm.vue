<script setup>
import NavBar from '../components/NavBar.vue';
import FilmContainer from '../components/filmContainer.vue'
import { getFilmByResearch }from '../Function'
</script>
<script>

export default {
    components: {
        FilmContainer,
        NavBar
    },
    data() {
        return {
            filmList: [],
            titoloCercato: localStorage.getItem('valoreRicerca'),
        };
    },
    created() {
        this.refresh()
    },
    methods: {
        refresh() {
            getFilmByResearch()
            .then(response => {
                this.filmList = response.results
                window.scrollTo(0, 0);
            })
            .catch(err => {
                console.error(err);
         });
        }
    }
}
</script>

<template>
    <div>
        <NavBar @evento-lingua="refresh()" style="z-index: 1;"/>
        <ul>
            <FilmContainer v-for="film in filmList" v-show="film.poster_path!=null" :key="film.id" :film="film"
                class="film-container" @evento-cerca-film="refresh()" />
        </ul>
    </div>
</template>

<style scoped>
ul {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
}
ul .film-container {
  display: flex;
  flex-direction: row;
}

.film-container:nth-child(4n+1) {
  margin-left: 20px !important;
}

.film-container:nth-child(4n) {
  margin-right: 20px !important;
}

.film-container {
  padding: 8px;
  padding-top: 30px;
}
</style>