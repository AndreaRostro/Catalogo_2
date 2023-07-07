<script>
import { addToFavorites } from '../Function'
import { useFavStore } from '../store/favStore'
export default {
  props: {
    film: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isInFavorite: true,
      buttonValue: this.$t('add'),
      store: null,
    }
  },

  async mounted() {
    this.store = useFavStore()
    const favorites = await this.store.getFavList
    for (let i = 0; i < favorites.length; i++) {
      if (this.film.id == favorites[i].id) {
        this.isInFavorite = false
        this.buttonValue = this.$t('remove')
        break
      }
      else {
        this.isInFavorite = true
        this.buttonValue = this.$t('add')
      }
    }
  },

  methods: {

    getImage(path) {
      if (path)
        return 'https://image.tmdb.org/t/p/original//' + path
      else
        return ''
    },

    goToDetail() {
      if (this.$route.path.includes('/film')) {
        if(this.film.name == null) {
          this.$router.push('/film/detail/' + this.film.id);
          window.scrollTo(0, 0);
        }
        else {
          this.$router.push('/tv_series/detail/' + this.film.id)
        }
        window.scrollTo(0, 0);
      }
      else {
        this.$router.push('/tv_series/detail/' + this.film.id);
        window.scrollTo(0, 0);
      }
    },

    refreshAdd(type, id) {
      if (this.isInFavorite) {
        addToFavorites(type, id, this.isInFavorite)
          .then(() => {
            this.isInFavorite = false;
            this.buttonValue = this.$t('remove')
          })
      }
      else if (!this.isInFavorite) {
        addToFavorites(type, id, this.isInFavorite)
          .then(() => {
            this.isInFavorite = true;
            this.buttonValue = this.$t('add')
          })
      }
    }
  }
}
</script>

<template>
  <div>
    <ul>
      <li>
        <img v-if="film.poster_path" :src="getImage(film.poster_path)" alt="">
      </li>
      <li class="text" id="title">
        <p>{{ film.title || film.name }}</p>
      </li>
      <li class="text" id="mark">
        <p> <b> {{ $t('vote') }}</b> {{ film.vote_average }}</p>
      </li>
      <li class="text" id="popularity">
        <p> <b>{{$t('popularity')}}:</b> {{ film.popularity }}</p>
      </li>
      <li>
        <p class="text" id="or-lang"> <b> {{$t('original_language') }} </b> "{{ film.original_language }}"</p>
      </li>
      <li class="button-det-fav">
        <button @click="goToDetail()">{{$t('detail')}}</button>
        <button @click="refreshAdd(film.media_type, film.id)" v-if="this.$route.path == ('/film')"
          :class="{ remove: !isInFavorite }"> <img src="../assets/favourites1.jpg" alt="">{{ buttonValue }} </button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
ul {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  list-style-type: none;
  width: 285px;
  background-color: #212529;
  border-radius: .7rem;
  text-align: center;
  padding-bottom: 50px;
  height: 650px;
}

img {
  height: 380px;
  width: 285px;
  border-top-left-radius: .3rem;
  border-top-right-radius: .3rem;
}

.text {
  text-align: center;
}

#title {
  font-size: large;
  cursor: pointer;
  font-weight: bold;
  line-height: 2rem;
  color: rgb(199, 36, 36);
}

#mark,
#popularity,
#or-lang {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  padding: 5px 10px;
  color: beige
}

button {
  color: #0dcaf0;
  border: 1px solid #0dcaf0;
  background-color: unset;
  padding: 5px 8px;
  margin-top: 2rem;
  border-radius: .25rem;
  font-size: 22px;
  cursor: pointer;
  transition-duration: 0.4s;
}

button img {
  width: 20px;
  height: 20px;
  color: white;
  background-color: white;
  margin-right: .5rem;
}

ul li:last-child {
  display: flex;
  gap: 10px;
}

button:hover {
  color: black;
  background-color: #0dcaf0;
  box-shadow: 0 0px 16px 0 #0dcaf0, 0 17px 50px 0 rgba(0, 0, 0, 0.19);
}

.button-det-fav {
  position: absolute;
  bottom: 35px;
}

.remove {
  color: red;
  border: 1px solid red;
  background-color: unset;
  padding: 5px 8px;
  margin-top: 2rem;
  border-radius: .25rem;
  font-size: 22px;
  cursor: pointer;
}

.remove:hover {
  color: black;
  background-color: red;
  box-shadow: 0 0px 16px 0 red, 0 17px 50px 0 rgba(0, 0, 0, 0.19);

}
</style>