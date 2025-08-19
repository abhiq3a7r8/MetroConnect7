import { LoginTexts } from "../../../shared/constants/strings";
import useLoginForm from "../../state/useLoginForm";
import Card from "../generic/Card";
import Header from "../generic/Header";
import LongButton from "../generic/LongButton";
import TextBox from "../generic/TextInput";
import SignUpPrompt from "./SignUpPrompt";

export default function LoginBox() {
  const {
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
  } = useLoginForm();

  const handleSubmit = () => {
    const isValid = validateForm();
    if (isValid) {
      console.log("Form submitted", { email, phone, password, confirmPassword });
    }
  };

  return (
    <Card>
      <Header
        title={isSignUp ? LoginTexts.welcomeTitle2 : LoginTexts.welcomeTitle}
        subtitle={
          isSignUp ? LoginTexts.welcomeSubtitle2 : LoginTexts.welcomeSubtitle
        }
      />

      {isSignUp && (
        <TextBox
          placeholder={LoginTexts.Email}
          value={email}
          onChangeText={setEmail}
          error={errors?.email || ""}
        />
      )}

      <TextBox
        placeholder={LoginTexts.loginPlaceholder}
        value={phone}
        onChangeText={setPhone}
        error={errors?.phone || ""}
      />

      <TextBox
        placeholder={LoginTexts.passwordPlaceHolder}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        error={errors?.password || ""}
      />

      {isSignUp && (
        <TextBox
          placeholder={LoginTexts.ConfirmPasswordPlaceHolder}
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          error={errors?.confirmPassword || ""}
        />
      )}

      <LongButton
        title={isSignUp ? LoginTexts.signUpButton : LoginTexts.signInButton}
        onPress={handleSubmit}
      />

      <SignUpPrompt isSignUp={isSignUp} toggleForm={toggleForm} />
    </Card>
  );
}
