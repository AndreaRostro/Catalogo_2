<script>
import { getFilmByResearch } from '../Function'
import SearchingResults from './searchingResults.vue';
export default {
    data() {
        return {
            language: localStorage.getItem('language') || null,
            ricerca: null,
            researchResults: [],
        };
    },
    methods: {
        refresh() {
            this.language = localStorage.getItem('language')
        },
        changeLanguage() {
            if (this.language === "en") {
                this.language = "en";

            }
            else {
                this.language = "it";

            }
            window.location.reload()

            localStorage.setItem("language", this.language);

            this.$emit("evento-lingua");
        },
        goToSearched() {
            this.$router.push("/film/searched");
            localStorage.setItem("valoreRicerca", this.ricerca);
        },
        refreshResults() {
            if (this.ricerca.length >= 3 || this.ricerca.length <= 0) {
                localStorage.setItem('valoreRicerca', this.ricerca)
                getFilmByResearch()
                    .then(response => {
                        this.researchResults = response.results
                        window.scrollTo(0, 0);
                    })
                    .catch(err => {
                        console.error(err);
                    });
            }
        },
        click() {
            localStorage.setItem('actualPage', 1)
        },

        getActiveClass(route) {
            if (this.$route.path.includes(route)) {
                return 'red-color'
            }
            else {
                return ''
            }
        }
    },
    components: { SearchingResults }
}
</script>
<template>
    <nav id="nav-bar">
        <ul>
            <li>
                <img src="../assets/favicon.png" alt="">
            </li>
            <li>
                <a href="/film" @click="click()">
                    <p id="title"> {{ $t('title') }}</p>
                </a>
            </li>
            <li>
                <a href="/film" class="scelta" :class="getActiveClass('/film')" id="film" @click="click()"> {{ $t('film') }}
                </a>
            </li>
            <li>
                <a href="/tv_series" class="scelta" :class="getActiveClass('/tv_series')" id="serie" @click="click()"> {{
                    $t('tv_series') }}</a>
            </li>
            <li class="form">
                <form class="modulo-ricerca">
                    <input id="search" type="text" :placeholder="$t('search')" required v-model="ricerca"
                        @input="refreshResults()">
                    <input id="submit" type="submit" :value="$t('SEARCH')" @click="goToSearched()" v-if="ricerca != null">
                </form>
                <div class="prova">
                    <SearchingResults v-for="(results) in researchResults.slice(0, 5)" :filmResults="results" />
                </div>
            </li>
            <li>
                <select id="lingua" @change="changeLanguage()" v-model="language">
                    <option value="en">English</option>
                    <option value="it">Italiano</option>
                </select>
            </li>
        </ul>
    </nav>
</template>


<style scoped>
#nav-bar {
    position: sticky;
    top: 0;
    width: 100%;
    height: 95px;
    background-image: linear-gradient(to top, #212529, black);
}

ul {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    list-style-type: none;
    padding: 0;
}

li {
    margin-bottom: 5px;
}

.red-color {
    color: rgb(216, 37, 37);
}

img {
    height: 80px;
    margin-left: 1.5rem;
    margin-top: .5rem;
}

p {
    color: beige;
    margin-left: 4rem;
    font-size: 35px;
}

li:nth-child(-n+4) {
    transition: transform 0.25s ease-in-out;
    font-family: cursive;
    /* font-weight: bold; */

}

li:hover:nth-child(-n+4) {
    transform: scale(1.2);
}

a {
    color: beige;
    font-size: 30px;
    text-decoration: none;
    text-align: start;
}

#title {
    margin-right: 2rem;
    font-weight: bold;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}

#film {
    margin-left: 2rem;
    margin-right: 1rem;
}

#serie {
    margin-left: .2rem;
}

#lingua {
    font-size: 1.2rem;
    margin-left: 31.5rem;
    color: white;
    background-color: #6c757d;
    border-radius: .25rem;
    padding: 5px 8px;
    position: absolute;
    top: 50%;
    left: 54%;
    transform: translate(-50%, -50%);
}

form {
    display: flex;
    position: absolute;
    top: 50%;
    left: 75%;
    transform: translate(-50%, -50%);
}

input {
    color: white;
    background-color: #212529;
    padding: 5px;
    cursor: auto;
    border: 1.3px solid white;
    border-radius: .25rem;
    height: 33px;
    filter: brightness(1.3);
    transition-duration: 0.4s;
}

.prova {
    position: absolute;
    left: 63.5%;
    top: 4rem;
    width: 13rem;
    display: flex;
    flex-direction: column;
    z-index: 1000000;
}

input:first-child {
    width: 13rem;
}

form input:last-child {
    margin-left: 1rem;
    color: #7209b7;
    border-color: #7209b7;
    cursor: pointer;
    box-shadow: 0 0px 10px 0 #7209b7, 0 17px 50px 0 rgba(0, 0, 0, 0.19);

}

form input:last-child:hover {
    color: white;
    background-color: #7209b7;
    transition: .20s ease-in-out;
}
</style>