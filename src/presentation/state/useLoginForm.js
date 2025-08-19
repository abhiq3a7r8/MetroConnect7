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
  const toggleForm = () => setIsSignUp((prev) => !prev);

  const [errors, setErrors] = useState({
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const validateForm = (isSignUp) => {
    const newErrors = {};

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
    return Object.keys(newErrors).length === 0;
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
    validateForm,
  };
}
