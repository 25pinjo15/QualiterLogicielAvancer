import { defineStore } from "pinia";
import { signIn, fetchCurrentUser, createUser, signOut } from "@/shared/services";
import type { UserInterface, UserFormInterface, SigninFormInterface } from "@/shared/interfaces";

interface UserState {
  //Ici currentUser = undefined veut dire qu'on a pas encore fait de fetchCurrentUser
  //S'il est à null c'est qu'on a fait le fetchCurrentUser et qu'on a pas de user
  currentUser: UserInterface | null | undefined;
  error: any;
}

export const useUser = defineStore("user", {
  state: (): UserState => ({
    currentUser: undefined,
    error: null,
  }),
  getters: {
    //Objectif: Retourner vrai si l'utilisateur est authentifié
    isAuthenticated(): boolean {
      return !!this.currentUser;
    },
  },
  actions: {
    //Objectif: Appeler le service de création d'utilisateur et mettre à jour le currentUser
    async createUser(data: UserFormInterface) {
      try {
        this.currentUser = await createUser(data);
        this.error = null;
      } catch (error: any) {
        this.currentUser = undefined;
        this.error = error;
      }
    },

    //Objectif: Appeler le service de connexion d'utilisateur et mettre à jour le currentUser
    async signIn(data: SigninFormInterface) {
      try {
        this.currentUser = await signIn(data);
        this.error = null;
      } catch (error: any) {
        this.currentUser = undefined;
        this.error = error;
      }
    },

    //Objectif: Appeler le service de récupération d'utilisateur et mettre à jour le currentUser
    async fetchCurrentUser() {
      try {
        this.currentUser = await fetchCurrentUser();
        this.error = null
      } catch (error: any) {
        this.currentUser = undefined;
        this.error = error;
      }
    },

    //Objectif: Appeler le service de déconexxion d'utilisateur et mettre à jour le currentUser
    async signOut() {
      try {
        await signOut();
        this.currentUser = undefined;
        this.error = null;
      } catch (error: any) {
        this.error = error;
      }
    },
  },
});
