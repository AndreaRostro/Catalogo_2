import { defineStore } from "pinia";
import { getFavoritesMovies } from "../Function";
export const useFavStore = defineStore({
    id: 'usefavStore',
    state: () => ({
        favList: [],
    }),
    getters: {
        getFavList: async (state) => {
            if (JSON.stringify(state.favList) === '[]') {
                const response = await getFavoritesMovies()
                state.favList = response.results;
            }
            return state.favList
        }
    },
    actions: {
        fetchFavorites() {
            getFavoritesMovies()
                .then(response => {
                    this.favList = response.results;
                })
                .catch(err => {
                    console.error(err);
                });
        }
    },
})