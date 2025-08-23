import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import UserRepository from "../../data/repositories/UserRepository";
import LoginUser from "../../domain/usecases/LoginUser";
import RegisterUser from "../../domain/usecases/RegisterUser";

const userRepo = new UserRepository();
const loginUseCase = new LoginUser(userRepo);
const registerUseCase = new RegisterUser(userRepo);

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("[Auth][restoreUser] START");
    const restoreUser = async () => {
      try {
        const token = await SecureStore.getItemAsync("jwt");
        console.log("[Auth][restoreUser] Retrieved token:", token);

        if (token) {
          try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            console.log("[Auth][restoreUser] Decoded payload:", payload);

            // 🔑 Check expiration
            const now = Math.floor(Date.now() / 1000); // current time in seconds
            if (payload.exp && payload.exp < now) {
              console.log("[Auth][restoreUser] Token expired at:", payload.exp);
              await SecureStore.deleteItemAsync("jwt");
              setUser(null);
              return;
            }

            const restoredUser = {
              id: payload.id,
              email: payload.email,
              token,
            };
            setUser(restoredUser);
            console.log("[Auth][restoreUser] Restored user set:", restoredUser);
            return restoredUser;
          } catch (decodeErr) {
            console.log("[Auth][restoreUser] Failed to decode token:", decodeErr);
          } 

        } else {
          console.log("[Auth][restoreUser] No token found in SecureStore");
        }
        
      } catch (err) {
        console.log("[Auth][restoreUser] ERROR while retrieving token:", err);
      } finally {
        console.log("[Auth][restoreUser] FINISHED → loading=false");
        setLoading(false); 
      }
    };

    restoreUser();
  }, []);

  // ✅ Watch for user state changes
  useEffect(() => {
    console.log("[Auth] user state changed:", user);
  }, [user]);

  const login = async ({ phone, password }) => {
    console.log("[Auth][login] START with phone:", phone);
    try {
      const loggedInUser = await loginUseCase.execute({ phone, password });
      console.log("[Auth][login] Use case returned:", loggedInUser);

      await SecureStore.setItemAsync("jwt", loggedInUser.token);
      console.log("[Auth][login] JWT stored successfully");

      setUser(loggedInUser);
      console.log("[Auth][login] User state updated:", loggedInUser);

      setError(null);
      console.log("[Auth][login] Cleared error state");

      console.log("[Auth][login] SUCCESS");
      return loggedInUser;
    } catch (err) {
      console.log("[Auth][login] ERROR:", err.message, err);
      setError(err.message);
      throw err;
    }
  };

  const register = async ({ email, phone, password }) => {
    console.log("[Auth][register] START with email:", email, "phone:", phone);
    try {
      const newUser = await registerUseCase.execute({ email, phone, password });
      console.log("[Auth][register] Use case returned:", newUser);

      await SecureStore.setItemAsync("jwt", newUser.token);
      console.log("[Auth][register] JWT stored successfully");

      setUser(newUser);
      console.log("[Auth][register] User state updated:", newUser);

      setError(null);
      console.log("[Auth][register] Cleared error state");

      console.log("[Auth][register] SUCCESS");
      return newUser;
    } catch (err) {
      console.log("[Auth][register] ERROR:", err.message, err);
      setError(err.message);
      throw err;
    }
  };

  const logout = async () => {
    console.log("[Auth][logout] START");
    await SecureStore.deleteItemAsync("jwt");
    console.log("[Auth][logout] JWT deleted from SecureStore");

    setUser(null);
    console.log("[Auth][logout] User state cleared");

    console.log("[Auth][logout] SUCCESS");
  };

  console.log("[Auth] Hook Render → user:", user, "| error:", error, "| loading:", loading);

  return { user, error, loading, setLoading, login, register, logout };
}
