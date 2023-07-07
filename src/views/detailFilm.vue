<script setup>
import NavBar from '../components/NavBar.vue';
import { getFilmDetail } from '../Function'
</script>

<script>
export default {
    data() {
        return {
            filmDetail: []
        }
    },
    async mounted() {
        const movieId = this.$route.path.split('/').pop();
        this.filmDetail = await getFilmDetail(movieId)
    },
    methods: {
        getImageUrl(path) {
            return 'https://image.tmdb.org/t/p/original//' + path
        },
        async refresh() {
            const movieId = this.$route.path.split('/').pop();
            getFilmDetail(movieId)
            this.filmDetail = await getFilmDetail(movieId);
            window.scrollTo(0, 0);
        },
        goBack() {
            this.$route.path = '/film'
        }
    }
}
</script>   

<template>
    <NavBar @evento-lingua="refresh()" />
    <a href="/film"><button> {{ $t('goBack') }} </button></a>
    <div class="detail-container">
        <img :src="getImageUrl(filmDetail.poster_path)" alt="">
        <div class="right-side">
            <p>
                {{ filmDetail.title }}
            </p>
            <hr>
            <div class="genres">
                <div v-for="genre in filmDetail.genres"> {{ genre.name }}</div>
            </div>
            <div class="film-detail">
                <dl>
                    <dt>{{$t('description')}}</dt>
                    <dd id="description"> {{ filmDetail.overview }} </dd>
                </dl>
                <div class="release-date">
                    <div> {{ $t('release_date') }} </div>
                    <div>--> {{ filmDetail.release_date }} &lt;-- </div>
                </div>
            </div>
            <hr>
        </div>
    </div>
</template>

<style scoped>
.detail-container {
    position: relative;
    left: 50%;
    height: 700px;
    background-image: linear-gradient(#212529, rgb(154, 19, 15) 90%);
    width: 95%;
    transform: translate(-50%);
    margin-top: 1rem;
    display: flex;
    text-align: center;
    justify-content: flex-end;
    border-radius: 1.2rem;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    margin-bottom: 2rem;
}

img {
    height: 90%;
    width: 40%;
    position: absolute;
    left: 25%;
    right: 25%;
    top: 50%;
    bottom: 50%;
    transform: translate(-55%, -49%);
    border-radius: 1rem;
    margin-left: 1rem;
}

hr {
    width: 80%;
    height: 2px;
    border-color: hotpink;
    background-color: hotpink;
}

.right-side {
    height: auto;
    width: 50%;
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: start;
}

.right-side p:first-child {
    padding: 10px;
    font-size: 30px;
    font-weight: bold;
}

.genres {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 15px;
    display: flex;
    gap: 2rem;
    margin-top: 1.5rem;
    margin-left: 1.9rem;
}

.genres div {
    border: 3px solid rgb(128, 32, 163);
    border-radius: 5px;
    background-color: rgb(128, 32, 163);
    color: white;
    font-weight: bold;
    padding: 2px 10px;
}

dl {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    margin-top: 3rem;
}

dl dt {
    font-size: 24px;
    color: aqua;
}

#description {
    padding: 3px 30px;
    text-align: center;
    margin-top: 1rem;
}

.release-date {

    margin-top: 2rem;
    font-size: 20px;
    margin-bottom: 1rem;
}

.release-date div:first-child {
    color: aqua;
    font-size: 24px;
}

button {
    color: #0dcaf0;
    border: 1px solid #0dcaf0;
    background-color: unset;
    padding: 5px 8px;
    margin-top: 1rem;
    margin-left: 3rem;
    border-radius: .25rem;
    font-size: 22px;
    cursor: pointer;
    left: 10%;
    transition-duration: 0.4s;

    z-index: -1000;
}

button:hover {
    color: black;
    background-color: #0dcaf0;
    transform: scale(1.1);
    box-shadow: 0 0px 16px 0 rgb(130, 132, 230), 0 17px 50px 0 rgba(0, 0, 0, 0.19);
}
</style>