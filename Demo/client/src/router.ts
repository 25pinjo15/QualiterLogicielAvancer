import { createRouter, createWebHistory } from "vue-router";
import { useUser } from "@/shared/stores";
import { isAuthenticatedGuard, isNotAuthenticatedGuard } from "@/shared/guards";

//Objectif: Ajouter des gardes pour qu'un utilisateur connecté soit redirigé vers la page de profil
//          et qu'un utilisateur non connecté soit redirigé vers la page de connexion
export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: () => import("@/views/Home.vue"),
    },
    {
      path: "/signin",
      beforeEnter: [isNotAuthenticatedGuard],
      component: () => import("@/views/SignIn.vue"),
    },
    {
      path: "/signup",
      beforeEnter: [isNotAuthenticatedGuard],
      component: () => import("@/views/SignUp.vue"),
    },
    {
      path: "/profile",
      beforeEnter: [isAuthenticatedGuard],
      component: () => import("@/views/Profile.vue"),
    },
    {
      path: "/:notfound(.*)*",
      component: () => import("@/views/NotFound.vue"),
    },
  ],
});

//Objectif: Vérifier si l'utilisateur est connecté avant de charger la page
router.beforeEach(async () => {
  const userStore = useUser();
  //Ici currentUser = undefined veut dire qu'on a pas encore fait de fetchCurrentUser
  //S'il est à null c'est qu'on a fait le fetchCurrentUser et qu'on a pas de user
  if (userStore.currentUser == undefined) {
    await userStore.fetchCurrentUser();
  }
});
