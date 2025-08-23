import { useAuthContext } from "@/src/core/providers/AuthProvider";
import { useNotify } from "@/src/core/providers/Notification";
import { router } from "expo-router";
import { useState } from "react";
import {
  validateConfirmPassword,
  validateEmail,
  validatePassword,
  validatePhone,
} from "../../shared/utils/Validation";

export default function useLoginForm() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  // ✅ Use loading from auth context
  const { login, register, loading, setLoading } = useAuthContext();
  const { showNotification } = useNotify();

  const toggleForm = () => {
    setIsSignUp(prev => !prev);
    setErrors({
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    });
  };

  const validateForm = () => {
    const newErrors = {
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    };

    if (isSignUp) {
      const emailError = validateEmail(email);
      if (emailError) newErrors.email = emailError;

      const confirmError = validateConfirmPassword(password, confirmPassword);
      if (confirmError) newErrors.confirmPassword = confirmError;
    }

    const phoneError = validatePhone(phone);
    if (phoneError) newErrors.phone = phoneError;

    const passwordError = validatePassword(password);
    if (passwordError) newErrors.password = passwordError;

    setErrors(newErrors);
    
    return Object.values(newErrors).every(err => err === "");
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true); // ✅ use context loading
      if (isSignUp) {
        const newUser = await register({ email, phone, password });
        showNotification("Welcome " + newUser.email, "success");
        router.push("/(tabs)");
      } else {
        const loggedInUser = await login({ phone, password });
        showNotification("Welcome back " + loggedInUser.email, "success");
        router.push("/(tabs)");
      }
    } catch (err) {
      if (err instanceof Error) showNotification(err.message, "error");
      else console.error("Auth error:", err);
    } finally {
      setLoading(false); // ✅ update context loading
    }
  };

  return {
    isSignUp,
    email,
    setEmail,
    phone,
    setPhone,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    toggleForm,
    errors,
    loading, // from context
    handleSubmit,
  };
}
