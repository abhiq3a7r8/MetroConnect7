/**
 * Testcases for AuthProvider & useAuthContext:
 * 1. Provides auth context values from useAuth (user, error, loading, functions).
 * 2. Throws an error when useAuthContext is used outside of AuthProvider.
 */

import { fireEvent, render, screen } from "@testing-library/react-native";
import React from "react";
import { Button, Text } from "react-native";
import { AuthProvider, useAuthContext } from "../../../src/core/providers/AuthProvider";
import useAuth from "../../../src/presentation/state/useAuth"; // Import the actual hook to mock it

// Mock the custom hook useAuth
jest.mock("../../../src/presentation/state/useAuth");

const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

describe("AuthProvider", () => {
  const TestComponent: React.FC = () => {
    const { user, error, loading, login, register, logout, setLoading } = useAuthContext();

    return (
      <>
        <Text testID="user">{user?.id}</Text>
        <Text testID="error">{error ?? "no-error"}</Text>
        <Text testID="loading">{loading ? "true" : "false"}</Text>
        <Button testID="login-button" onPress={() => login("test", "password")} title="Login" />
        <Button testID="register-button" onPress={() => register("test", "password")} title="Register" />
        <Button testID="logout-button" onPress={() => logout()} title="Logout" />
        <Button testID="set-loading-button" onPress={() => setLoading(true)} title="Set Loading" />
      </>
    );
  };

  beforeEach(() => {
    mockUseAuth.mockReturnValue({
      user: { id: "1", name: "Test User" }, // Assuming User type has id and name
      error: null,
      loading: false,
      setLoading: jest.fn((value: boolean | ((prevState: boolean) => boolean)) => {}), // Correctly type setLoading
      login: jest.fn(({ phone, password }: { phone: string; password: string }) => Promise.resolve({ success: true })), // Correctly type login
      register: jest.fn(({ email, phone, password }: { email: string; phone: string; password: string }) => Promise.resolve({ success: true })), // Correctly type register
      logout: jest.fn(() => Promise.resolve(undefined)),
    });
  });

  // ✅ Testcase 1: context values are provided correctly
  it("provides auth context values from useAuth", async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId("user").children.join("")).toBe("1");
    expect(screen.getByTestId("error").children.join("")).toBe("no-error");
    expect(screen.getByTestId("loading").children.join("")).toBe("false");
  });

  // ✅ Testcase 2: error thrown when context used outside provider
  it("throws an error when useAuthContext is used outside AuthProvider", () => {
    const ConsoleError = console.error;
    console.error = jest.fn(); // suppress React error boundary noise

    const BrokenComponent: React.FC = () => {
      useAuthContext();
      return null;
    };

    expect(() => render(<BrokenComponent />)).toThrow(
      "useAuthContext must be used within an AuthProvider"
    );

    console.error = ConsoleError;
  });

  // ✅ Testcase 3: login function calls useAuth's login
  it("calls the login function from useAuth when login is invoked", async () => {
    const { login } = mockUseAuth();
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    fireEvent.press(screen.getByTestId("login-button"));
    expect(login).toHaveBeenCalledWith("test", "password");
  });

  // ✅ Testcase 4: register function calls useAuth's register
  it("calls the register function from useAuth when register is invoked", async () => {
    const { register } = mockUseAuth();
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    fireEvent.press(screen.getByTestId("register-button"));
    expect(register).toHaveBeenCalledWith("test", "password");
  });

  // ✅ Testcase 5: logout function calls useAuth's logout
  it("calls the logout function from useAuth when logout is invoked", async () => {
    const { logout } = mockUseAuth();
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    fireEvent.press(screen.getByTestId("logout-button"));
    expect(logout).toHaveBeenCalled();
  });

  // ✅ Testcase 6: setLoading function calls useAuth's setLoading
  it("calls the setLoading function from useAuth when setLoading is invoked", async () => {
    const { setLoading } = mockUseAuth();
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    fireEvent.press(screen.getByTestId("set-loading-button"));
    expect(setLoading).toHaveBeenCalledWith(true);
  });
});
