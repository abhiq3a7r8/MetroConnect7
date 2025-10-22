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
    const restoreUser = async () => {
      try {
        const token = await SecureStore.getItemAsync("jwt");

        if (token) {
          try {
            const payload = JSON.parse(atob(token.split(".")[1]));

            const now = Math.floor(Date.now() / 1000);
            if (payload.exp && payload.exp < now) {
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
            return restoredUser;
          } catch (decodeErr) {
            
          }
        }
      } catch (err) {
        
      } finally {
        setLoading(false);
      }
    };

    restoreUser();
  }, []);

  const login = async ({ phone, password }) => {
    try {
      const loggedInUser = await loginUseCase.execute({ phone, password });
      await SecureStore.setItemAsync("jwt", loggedInUser.token);
      console.log('i was here');
      setUser(loggedInUser);
      setError(null);
      return loggedInUser;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const register = async ({ email, phone, password }) => {
    try {
      const newUser = await registerUseCase.execute({ email, phone, password });
      await SecureStore.setItemAsync("jwt", newUser.token);
      setUser(newUser);
      setError(null);
      return newUser;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync("jwt");
    setUser(null);
  };

  return { user, error, loading, setLoading, login, register, logout };
}
