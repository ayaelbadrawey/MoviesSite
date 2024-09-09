<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axiosClient from '@/axiosClient';
import Loading from '@/components/Loading.vue';

const movie = ref({
    production_companies: [],
    genres: [],
    origin_country: [],
    title: '',
    poster_path: '',
    release_date: '',
    runtime: null,
    vote_average: null,
    overview: ''
});
const isLoading = ref(false);
const route = useRoute();
const type = 'movie';
const key = 'd8b30ddf56e9f31f5633a0cc2fb3f2dd';
const img_Path = 'http://image.tmdb.org/t/p/w500/';

async function fetchMovieDetails() {
    isLoading.value = true;
    const movieId = route.params.id;
    try {
        const response = await axiosClient.get(`${type}/${movieId}?api_key=${key}&language=en-US`);
        movie.value = response.data;
        console.log(movie.value)
    } catch (error) {
        console.error('Error fetching movie details:', error);
    } finally {
        isLoading.value = false;
    }
}
onMounted(() => {
    fetchMovieDetails();
});

function convertMinutesToTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    const seconds = 0;

    return `${String(hours).padStart(2, '0')}:${String(remainingMinutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}
function formatNumber(number) {
    if (number - Math.floor(number) >= 0.1) {
        return parseFloat(number).toFixed(1);
    } else {
        return Math.floor(number);
    }
}
</script>

<template>
    <Loading v-if="isLoading" />
    <div class="row" v-else>
        <div class="col-xl-3 col-lg-6 col-12">
            <img :src="img_Path + movie.poster_path" alt="Movie poster" class="movie-poster">
        </div>
        <div class="col-xl-9 col-lg-6 col-12">
            <div class="d-flex flex-column mx-3 my-5">
                <div class="d-flex justify-content-between">
                    <h1 class="movie-title">{{ movie.title }}</h1>
                    <button class="add-to-fav">
                        <font-awesome-icon icon="plus" />
                        Add To Favorites</button>
                </div>
                <div class="d-flex mt-5 align-items-baseline flex-wrap">
                    <div class="genre mb-2" v-for="genre in movie.genres" :key="genre.id">
                        {{ genre.name }}
                    </div>
                    <div class="d-flex justify-content-between w-25 mx-4">
                        <span class="text-white">
                            <font-awesome-icon icon="calendar" />
                            {{ movie.release_date.split('-')[0] }}
                        </span>
                        <span class="text-white">
                            <font-awesome-icon icon="clock" />
                            {{ convertMinutesToTime(movie.runtime) }}
                        </span>
                        <span class="text-white">
                            <font-awesome-icon icon="star" />
                            {{ formatNumber(movie.vote_average) }}
                        </span>
                    </div>

                </div>
                <span class="text-white mt-3">{{ movie.overview }}</span>
                <span class="text-white fw-bold">{{ movie.tagline }}</span>
                <div class="d-flex flex-column mt-3">
                    <span class="text-white">Country : {{ movie.origin_country[0] }}</span>
                    <span class="text-white">Genre : {{ movie.genres.map(genre => genre.name).join(',') }}</span>
                    <span class="text-white">Date Release : {{ Date(movie.release_date) }}</span>
                    <span class="text-white">Production : {{ movie.production_companies.map(prod => prod.name).join(',')
                        }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.movie-poster {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
}

.movie-title {
    font-size: 25px;
    margin-top: 5px;
    word-wrap: break-word;
    color: white;
}

.add-to-fav {
    border: unset;
    background-color: red;
    color: #fff;
    font-weight: 500;
    border-radius: 10px;
    padding: 11px;
}

.genre {
    background-color: #fff;
    font-weight: 700;
    padding: 10px;
    border-radius: 8px;
    margin-right: 15px;
}
</style>