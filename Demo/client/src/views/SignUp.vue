<script setup lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useUser } from "@/shared/stores";
import type { UserFormInterface } from "@/shared/interfaces";

const state = reactive<UserFormInterface>({
  name: "Cédrik Dubogue",
  email: "email@email.com",
  password: "pass123",
});

const router = useRouter();
const userStore = useUser()

//Objectif: Créer un nouvel utilisateur et le placer sur l'écran de connexion s'il y a lieu
const submit = async () => {
  await userStore.createUser({ ...state });
  if (!userStore.error) router.push("/signin");
};
</script>

<template>
  <div class="container d-flex flex-row p-20 justify-content-center align-items-center">
    <div class="card">
      <h2 class="d-flex flex-fill justify-content-center mb-20">Inscription</h2>
      <div class="d-flex flex-column mb-10">
        <label for="name" class="mb-5">Nom</label>
        <input id="name" v-model="state.name" type="text" />
      </div>
      <div class="d-flex flex-column mb-10">
        <label for="email" class="mb-5">Courriel</label>
        <input id="email" v-model="state.email" type="email" />
      </div>
      <div class="d-flex flex-column mb-20">
        <label for="password" class="mb-5">Password</label>
        <input id="password" v-model="state.password" type="password" />
      </div>
      <div>
        <p>
          {{ userStore.error }}
        </p>
      </div>
      <div class="d-flex flex-fill">
        <button class="btn btn-primary d-flex flex-fill justify-content-center" @click="submit">Inscription</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
div > p {
  color: red;
}
</style>
