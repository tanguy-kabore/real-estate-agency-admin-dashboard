"use client";

import { AuthBindings } from "@refinedev/core";
import Cookies from "js-cookie";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";
import dotenv from 'dotenv';

dotenv.config();

// Clé secrète pour signer et vérifier le JWT (doit être stockée de manière sécurisée côté serveur)
const secretKey: Secret | undefined = process.env.NEXT_PUBLIC_SECRET_KEY;

export const authProvider: AuthBindings = {
  login: async ({ email, password, remember }) => {
    try {
      const response = await fetch('https://real-estate-agency-rest-api.onrender.com/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const { token } = await response.json();
        console.log("Generated Token:", JSON.stringify(token));

        const decoded = jwtDecode(token);
        console.log("Decoded Token:", decoded);

        // Vérifier et décoder le JWT
        /* const decoded = jwt.verify(token, secretKey || "") as JwtPayload;
        console.log("Decoded Token:", decoded); */

        // Stocker les informations de l'utilisateur dans le cookie
        Cookies.set("auth", JSON.stringify(decoded), {
          expires: remember ? 30 : 1,
          path: "/",
          sameSite: "None",
        });

        console.log("Redirecting to /");
        return {
          success: true,
          redirectTo: "/",
        };
      } else {
        return {
          success: false,
          error: {
            name: "LoginError",
            message: "Identifiant ou mot de passe incorrect",
          },
        };
      }
    } catch (error) {
      console.error("Erreur de connexion :", error);

      if (error instanceof jwt.JsonWebTokenError) {
        return {
          success: false,
          error: {
            name: "DecodeError",
            message: "Erreur lors du décodage du token",
          },
        };
      } else {
        return {
          success: false,
          error: {
            name: "LoginError",
            message: "Une erreur s'est produite lors de la connexion",
          },
        };
      }
    }
  },
  logout: async () => {
    Cookies.remove("auth", { path: "/" });
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  check: async () => {
    const auth = Cookies.get("auth");
    if (auth) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      logout: true,
      redirectTo: "/login",
    };
  },
  getPermissions: async () => {
    const auth = Cookies.get("auth");
    if (auth) {
      const parsedUser = JSON.parse(auth);
      return parsedUser.roles;
    }
    return null;
  },
  getIdentity: async () => {
    const auth = Cookies.get("auth");
    if (auth) {
      const parsedUser = JSON.parse(auth);
      return parsedUser;
    }
    return null;
  },
  onError: async (error) => {
    if (error.response?.status === 401) {
      return {
        logout: true,
      };
    }

    return { error };
  },
};