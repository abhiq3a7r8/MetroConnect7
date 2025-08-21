import { useState } from 'react';
import UserRepository from '../../data/repositories/UserRepository';
import LoginUser from '../../domain/usecases/LoginUser';
import RegisterUser from '../../domain/usecases/RegisterUser';

const userRepo = new UserRepository();
const loginUseCase = new LoginUser(userRepo);
const registerUseCase = new RegisterUser(userRepo);

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const login = async ({ phone, password }) => {
    try {
      const loggedInUser = await loginUseCase.execute({ phone, password });
      setUser(loggedInUser);
      setError(null);
      return loggedInUser;
    } catch (err) {
      setError(err.message);
      console.log("hook error: " + err.message);
      throw err;
    }
  };

  const register = async ({ email, phone, password }) => {
    try {
      const newUser = await registerUseCase.execute({ email, phone, password });
      setUser(newUser);
      setError(null);
      return newUser;
    } catch (err) {
      setError(err.message);
      console.log("hook error: " + err.message);
      throw err;
    }
  };
  
  return { user, error, login, register };
}
