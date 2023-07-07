<script>
    export default {
        props: {
            filmResults: {
                type: Array,
                required: true           
            },
            indexR: 1
        },
        methods: {
            getImage(path) {
                if(path == null || path == undefined)
                    return ''
                else
                    return 'https://image.tmdb.org/t/p/original//' + path
            },
            goToDetailSearched() {
                if(this.filmResults.name == null) {
                    this.$router.push('/film/detail/' + this.filmResults.id);
                }
                else {
                    this.$router.push('/tv_series/detail/' + this.filmResults.id);
                }
            },
        }
    }
</script>

<template>
     <div class="film-container">
    <ul>
      <li @click="goToDetailSearched()">
        <img v-if="filmResults.poster_path != undefined" :src="getImage(filmResults.poster_path)" alt="">
        <p>{{ filmResults.title || filmResults.name }}</p>
      </li>
    </ul>
  </div>
</template>

<style scoped>
    ul {
        list-style-type: none;
        display: flex;
        flex-direction: column;
        
    }

    li{
        display: flex;
        background-color: #212529;
        font-size: 14px;
    }

    li p {
        word-wrap: break-word;
    }

    img {
        height: 30px;
    }
</style>