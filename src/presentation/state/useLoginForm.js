import { useState } from "react";
import { useAuthContext } from "../../core/providers/AuthProvider";
import { useNotify } from "../../core/providers/Notification";
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
      setLoading(true);
      if (isSignUp) {
        const newUser = await register({ email, phone, password });
        showNotification("Welcome " + newUser.email, "success");
      } else {
        const loggedInUser = await login({ phone, password });
        if (loggedInUser) {
          showNotification("Welcome back " + loggedInUser.email, "success");
        }
      }
    } catch (err) {
      if (err instanceof Error) showNotification(err.message, "error");
      else console.error("Auth error:", err);
    } finally {
      setLoading(false); 
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
    validateForm, // Expose validateForm for testing
  };
}
