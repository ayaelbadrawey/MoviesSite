<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>

  <div class="navigation d-flex justify-content-evenly text-decoration-none d-lg-flex d-none">
    <RouterLink class="navlink" active-class="active-navlink" to="/">Home</RouterLink>
    <RouterLink class="navlink" active-class="active-navlink" to="/">Genre</RouterLink>
    <RouterLink class="navlink" active-class="active-navlink" to="/">Country</RouterLink>
    <div class="position-relative">
      <input class="rounded-4 border-0 px-3 py-1" placeholder="Search movies....">
      <font-awesome-icon class="search-icon" icon="magnifying-glass" />
    </div>
    <RouterLink class="navlink" active-class="active-navlink" to="/movies">Movies</RouterLink>
    <RouterLink class="navlink" active-class="active-navlink" to="/">Series</RouterLink>
    <div class="d-flex justify-content-between align-baseline">
      <RouterLink class="navlink" active-class="active-navlink" to="/">Login/Signup</RouterLink>
      <font-awesome-icon class="bell-icon" icon="bell" />
    </div>
  </div>
</template>

<style scoped>
.navlink {
  text-decoration: none;
  color: #fff;
  font-weight: 500;
}

.search-icon {
  position: absolute;
  right: 10px;
  top: 8px;
}

.bell-icon {
  color: white;
  margin: 5px;
}
</style>
