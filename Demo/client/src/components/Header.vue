<script setup lang="ts">
defineProps<{ isAuthenticated: boolean }>();
const emit = defineEmits<{
  (e: "signOut"): void;
}>();
</script>

<template>
  <nav class="header-container d-flex flex-row align-items px-20">
    <div class="flex-fill d-flex flex-row align-items-center">
      <router-link to="/">
        <img src="@/assets/logo.svg" width="120" alt="" />
      </router-link>
    </div>

    <ul class="d-flex flex-row align-items-center">
      <template v-if="isAuthenticated">
        <li>
          <router-link to="/profile"> Profil </router-link>
        </li>
        <li class="ml-10" @click="emit('signOut')">Déconnexion</li>
      </template>
      <template v-else>
        <li>
          <router-link to="/signin"> Connexion </router-link>
        </li>
        <li class="ml-10">
          <router-link to="/signup"> Inscription </router-link>
        </li>
      </template>
    </ul>
  </nav>
</template>

<style scoped>
.header-container {
  background-color: var(--primary-1);
}

a,
li {
  color: white;
  cursor: pointer;
}
</style>
