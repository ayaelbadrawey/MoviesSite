<script setup>
import MovieCard from '@/components/MovieCard.vue';
import Loading from '@/components/Loading.vue';
import axiosClient from '@/axiosClient';
import { computed, onMounted, ref, watch } from 'vue';

const key = 'd8b30ddf56e9f31f5633a0cc2fb3f2dd';
const type = 'movie';
const movies = ref({ results: [] });
const currentPage = ref(1);
const totalPages = ref(1);
const isLoading = ref(false);

function debounce(fn, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
    };
}

async function fetchMoviesPerPage() {
    isLoading.value = true;
    try {
        const response = await axiosClient.get(`/${type}/week?api_key=${key}&language=en-US&page=${currentPage.value}`);
        movies.value = response.data;
        totalPages.value = movies.value.total_pages;
        console.log(movies.value);
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
    finally {
        isLoading.value = false;
    }
}

const debouncedFetchMovies = debounce(fetchMoviesPerPage, 300);

onMounted(() => {
    fetchMoviesPerPage();
});

watch(currentPage, () => {
    debouncedFetchMovies();
});

const pagesToShow = computed(() => {
    const pageRange = 3;
    let start = Math.max(1, currentPage.value - Math.floor(pageRange / 2));
    let end = Math.min(totalPages.value, start + pageRange - 1);
    if (end - start + 1 < pageRange) {
        start = Math.max(1, end - pageRange + 1);
    }
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
});

function nextPage() {
    if (currentPage.value < totalPages.value) {
        currentPage.value += 1;
    }
}

function prevPage() {
    if (currentPage.value > 1) {
        currentPage.value -= 1;
    }
}

function goToPage(page) {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
    }
}
</script>

<template>
    <div>
        <Loading v-if="isLoading" />
        <div v-else>
            <div class="row">
                <MovieCard v-for="movie in movies.results" :key="movie.id" :movie="movie" />
            </div>
            <nav class="pagination-controls">
                <div class="d-flex justify-content-center align-items-centers">
                    <button @click="prevPage" :disabled="currentPage === 1" class="next-prev">Previous</button>

                    <span v-if="totalPages > 1">
                        <button v-if="currentPage > 3" @click="goToPage(1)">1</button>
                        <span v-if="currentPage > 4">...</span>
                        <button v-for="page in pagesToShow" :key="page" @click="goToPage(page)"
                            :class="{ active: currentPage === page }">
                            {{ page }}
                        </button>
                        <span class="text-white" v-if="currentPage < totalPages - 3">....</span>
                        <button class="text-white" v-if="currentPage < totalPages - 1" @click="goToPage(totalPages)">
                            {{ totalPages }}</button>
                    </span>
                    <button @click="nextPage" :disabled="currentPage === totalPages" class="next-prev">Next</button>
                </div>
                <div class="mt-3">
                    <span class="text-white fw-bold"> Go To</span>
                    <input type="number" min="1" :max="totalPages" class="goto-input" v-model="currentPage" />
                </div>
            </nav>
        </div>
    </div>
</template>

<style scoped>
.pagination-controls {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 20px 0 40px 0;
}

button {
    background-color: unset;
    border: unset;
    margin: 0 5px;
    color: #fff;
    font-size: 20px;
    border-radius: 5px;
}

.page-number button.active {
    font-weight: bold;
    background-color: #007bff;
    color: white;
}

button[disabled] {
    opacity: 0.5;
    pointer-events: none;
}

.next-prev {
    border: 1px solid red;
    border-radius: 5px;
    padding: 2px;
    text-align: center;
    width: 90px;
}

.active {
    border: 1px solid white;
    border-radius: 5px;
    padding: 2px 10px 2px 10px;
    text-align: center;
}

.goto-input {
    width: 50px;
    margin: 2px 10px 2px 10px;
    background-color: #000;
    border: 1px solid red;
    color: #fff;
    border-radius: 5px;
    text-align: center;
    -moz-appearance: textfield;
    appearance: textfield;
}

.goto-input::-webkit-inner-spin-button,
.goto-input::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>
