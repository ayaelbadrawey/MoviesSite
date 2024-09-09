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
.navigation {
  position: relative;
}

.navlink {
  text-decoration: none;
  color: #fff;
  font-weight: 500;
  position: relative;
  padding: 10px;
}

.navlink::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: 5px;
  height: 5px;
  background-color: red;
  border-radius: 50%;
  visibility: hidden;
}

.active-navlink::after {
  visibility: visible;
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
