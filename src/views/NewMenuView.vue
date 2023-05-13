<script setup lang="ts">
  import Navbar from '../components/NavbarComponent.vue';
</script>

<template>
  <header>
    <Navbar />
  </header>

  <main>
    <div class="container-fluid">
      <h1>Novo cardápio</h1>
    </div>
  </main>
</template>

<style scoped>
  main .container-fluid {
    margin-top: 100px;
  }
</style>
