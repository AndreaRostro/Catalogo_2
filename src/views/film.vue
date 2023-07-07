<script setup>
import NavBar from '../components/NavBar.vue';
import Footer from '../components/footer.vue'
import FilmContainer from '../components/filmContainer.vue'
import { getMovies } from '../Function.js'

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
      page: null,
    };
  },
  created() {
    this.refreshMovies();
  },
  methods: {
    refreshMovies() {
      getMovies()
        .then(response => {
          this.filmList = response.results;
          this.page = response.page;
          window.scrollTo(0, 0);
        })
        .catch(error => {
          console.error(error);
        });
    },
    goToFavorites() {
      this.$router.push('/film/favorites');
    },
  }
}
</script>

<template>
  <div class="body">

  
  <NavBar @evento-lingua="refreshMovies()" style="z-index: 100;" />
  <div class="fav" v-if="filmList.length > 0">
    <hr>
    <button @click="goToFavorites()">{{$t('favorites')}}</button>
    <hr>
  </div>
  <ul>
    <li>
      <FilmContainer v-for="film in filmList" :key="film.id" :film="film" class="film-container" />
    </li>
  </ul>
  <Footer v-if="filmList.length > 0" @evento-page-down="refreshMovies()" @evento-page-up="refreshMovies()"
    @evento-page="refreshMovies()" :data_page="page" />
  </div>
</template>

<style scoped>
.body {
  background-image: linear-gradient(black 5%, #0f645d 25%, black) ;

}
ul {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
}

ul .film-container {
  display: flex;
  flex-direction: row;
}

li {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
}

.film-container:nth-child(4n+1) {
  margin-left: 20px;
}

.film-container:nth-child(4n) {
  margin-right: 20px;
}

.film-container {
  padding: 8px;
  padding-top: 30px;
}

.fav {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  gap: 20px;
}

hr {
  width: 35%;
  height: 3.3px;
  border-color: purple;
  background-color: purple;
}

button {
  color: white;
  background-color: black;
  padding: 5px;
  cursor: auto;
  border: 1.9px solid #7209b7;
  border-radius: .25rem;
  height: 45px;
  width: 140px;
  font-size: 25px;
  filter: brightness(1.3);
  cursor: pointer;
  transition: 0.4s;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}

button:hover {
  color: white;
  background-color: #7209b7;
  box-shadow: 0 0px 16px 0 hotpink, 0 17px 50px 0 rgba(0, 0, 0, 0.19);
}
</style>