export function validateEmail(email) {
  if (!email) return "Email is required";
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email) ? null : "Invalid email format";
}

export function validatePhone(phone) {
  if (!phone) return "Phone number is required";
  const regex = /^[0-9]{10}$/;
  return regex.test(phone) ? null : "Phone number must be 10 digits";
}

export function validatePassword(password) {
  if (!password) return "Password is required";
  if (password.length < 6) return "Password must be at least 6 characters";
  return null;
}

export function validateConfirmPassword(password, confirmPassword) {
  if (!confirmPassword) return "Please confirm your password";
  return password === confirmPassword ? null : "Passwords do not match";
}
