<script setup lang="ts">
import { useUser } from "@/shared/stores";
const userStore = useUser()
</script>

<template>
  <div class="container d-flex flex-row p-20 justify-content-center align-items-center">
    <form class="card">
      <h2 class="d-flex flex-fill justify-content-center mb-20">Mon profil</h2>
      <p class="d-flex flex-fill justify-content-center mb-20">{{ userStore.currentUser?.name }}</p>
    </form>
  </div>
</template>

<style scoped></style>
