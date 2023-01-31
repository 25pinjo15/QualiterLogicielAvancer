import type { SigninFormInterface, UserInterface } from "@/shared/interfaces";
import axios from "axios";

const BASE_URL = "/api/auth";
//ATTENTION: Pas de Try/Catch ici car on veut le contrôle dans le signIn.vue


//Objectif: Communiquer avec le serveur et
//          récupérer les données de l'utilisateur connecté s'il y a lieu
export async function signIn(data: SigninFormInterface): Promise<UserInterface | null> {
  const response = await axios.post(BASE_URL, data);
  if (!response.data.error) {
    return response.data;
  } else {
    throw new Error("Client error in signIn() : " + response.data.error);
  }
}

//Objectif: Communiquer avec le serveur et
//          faire supprimer le cookie de token
export async function signOut(): Promise<void> {
  await axios.delete(BASE_URL);
}
