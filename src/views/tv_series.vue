<script setup>
import NavBar from '../components/NavBar.vue';
import Footer from '../components/footer.vue'
import FilmContainer from '../components/filmContainer.vue'
import { getTV } from '../Function.js';
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
    page: null
  };
},
created() {
      this.refresh()
},
methods: {
    refresh() {
      getTV()
      .then(response => {  
        this.filmList = response.results;
        this.page = response.page
        window.scrollTo(0, 0);
      })
      .catch(err => {
        console.error(err);
      });
    },
    goToFavorites() {
      this.$router.push('/film/favorites')
    }
  }
}
</script>

<template>
<div>
  <NavBar @evento-lingua="refresh()" style="z-index: 100;"/>
  <div class="fav" v-if="filmList.length>0">  
      <hr>
      <!-- <button @click="goToFavorites()">Favorites</button> -->
      <hr>
    </div>
  <ul>
    <FilmContainer v-for="film in filmList" :key="film.id" :film="film" class="film-container"/>
  </ul>
  <Footer v-if="filmList.length>0" @evento-page-down="refresh()" @evento-page-up="refresh()" @evento-page="refresh()" :data_page="page"/>
</div>
</template>

<style scoped>
ul {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
}

.film-container:nth-child(4n+1) {
  margin-left: 20px 
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
    border: 1.8px solid #7209b7;
    border-radius: .25rem;
    height: 45px;
    width: 140px;
    font-size: 25px;
    filter: brightness(1.3);   
    cursor: pointer;
  }

  button:hover {
    color: white;
    background-color: #7209b7;
    transition: .20s ease-in-out;
  }
</style>