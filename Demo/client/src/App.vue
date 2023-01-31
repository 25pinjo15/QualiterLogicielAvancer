<script setup lang="ts">
import TheHeader from "@/components/Header.vue";
import { useUser } from '@/shared/stores';
import { useRouter } from 'vue-router';

const userStore = useUser()
const router = useRouter();

//Objectif: Déconnecter l'utilisateur en cours
const signOut = async () => {
  await userStore.signOut()
  router.push("/signin")
};
</script>

<template>
  <div class="d-flex flex-column app-container">
    <TheHeader :is-authenticated="userStore.isAuthenticated" @sign-out="signOut" />
    <router-view class="flex-fill" />
  </div>
</template>

<style lang="scss">
@import "./assets/base.scss";

.app-container {
  min-height: 100vh;
  background-image: url(./assets/background.jpg);
  background-size: cover;
}
</style>
