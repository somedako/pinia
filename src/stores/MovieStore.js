import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';

// export const useMovieStore = defineStore('movieStore', {
//     state: () => ({
//         movies: [],
//         activeTab: 1,
//     }),
//     //на основе стейта сделать фльтрацию изменить исходный массив обьект значение  не могут быть асинхронными
//     //getters изминения state и могут быть асинхронными
//     getters: {
//         watchMovies() {
//             return this.movies.filter((el) => el.isWatched);
//         },
//         totalCountMovies() {
//             return this.movies.length;
//         },
//     },

//     actions: {
//         setActiveTab(id) {
//             return (this.activeTab = id);
//         },

//         toggleWatched(id) {
//             const idx = this.movies.findIndex((el) => el.id === id);
//             this.movies[idx].isWatched = !this.movies[idx].isWatched;
//         },

//         deleteMovie(id) {
//             this.movies = this.movies.filter((el) => el.id !== id);
//         },
//     },
// });

export const useMovieStore = defineStore('movieStore', () => {
    const movies = ref([]);
    const activeTab = ref(2);

    const moviesOnLocalStorage = localStorage.getItem('movies');
    if (moviesOnLocalStorage) {
        movies.value = JSON.parse(moviesOnLocalStorage)._value;
    }

    const watchMovies = computed(() =>
        movies.value.filter((el) => el.isWatched)
    );

    const totalCountMovies = computed(() => movies.value.length);

    const setActiveTab = (id) => (activeTab.value = id);

    const toggleWatched = (id) => {
        const idx = movies.value.findIndex((el) => el.id === id);
        movies.value[idx].isWatched = !movies.value[idx].isWatched;
    };

    const deleteMovie = (id) => movies.value.filter((el) => el.id !== id);

    watch(
        () => movies,
        (state) => {
            localStorage.setItem('movies', JSON.stringify(state));
        },
        { deep: true }
    );

    return {
        movies,
        activeTab,
        watchMovies,
        totalCountMovies,
        setActiveTab,
        toggleWatched,
        deleteMovie,
    };
});
