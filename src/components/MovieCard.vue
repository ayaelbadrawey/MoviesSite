<script setup>
const props = defineProps({
    movie: {},
})
const img_Path = 'http://image.tmdb.org/t/p/w500/';
function formatNumber(number) {
    if (number - Math.floor(number) >= 0.1) {
        return parseFloat(number).toFixed(1);
    } else {
        return Math.floor(number);
    }
}
</script>
<template>
    <div class="col-xl-3 col-lg-6 col-12 ">
        <div class="px-1 rounded-2 movie-card">
            <img :src="img_Path + movie.poster_path" alt="Movie poster" class="movie-poster">
            <div class="d-flex justify-content-between align-items-baseline mx-auto">
                <h1 class="movie-title">{{ movie.title }}</h1>
                <div class="movie-rate">{{ formatNumber(movie.vote_average) }}</div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.movie-card {
    height: 500px;
    padding: 10px;
    margin-bottom: 5px;
}

.movie-poster {
    width: 100%;
    height: 80%;
    object-fit: cover;
    border-radius: 5px;
}

.movie-title {
    font-size: 1.2em;
    text-align: center;
    margin-top: 10px;
    word-wrap: break-word;
    color: white;
}

.movie-rate {
    background-color: red;
    padding: 2px;
    border-radius: 5px;
    color: white;
    font-weight: 500;
    width: 15%;
    text-align: center;
}
</style>