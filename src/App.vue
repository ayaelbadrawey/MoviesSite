<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
</script>

<template>
  <header class="container py-5">
    <Navbar />
  </header>
  <main class="container mt-5">
    <RouterView />
  </main>
</template>

<style>
*:focus {
  outline: none;
  box-shadow: none;
}

body {
  background-color: #000;
}
</style>
