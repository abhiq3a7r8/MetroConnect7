import { act, fireEvent, render } from "@testing-library/react-native";
import React, { useState } from "react";
import { Button, Text } from "react-native";
import {
  NotificationProvider,
  useNotify,
} from "../../../src/core/providers/Notification";
import { useNotification } from "../../../src/presentation/state/useNotification";

// Define NotificationType based on src/core/providers/Notification.tsx
type NotificationType = {
  message: string;
  type: "info" | "error" | "success";
  duration: number;
};

// Mock the custom hook useNotification
jest.mock("../../../src/presentation/state/useNotification");
jest.mock(
  "../../../src/presentation/components/generic/notification/NotificationContainer",
  () => {
    const { View, Text, Button } = require("react-native");
    return ({
      notif,
      onHide,
    }: {
      notif: NotificationType | null;
      onHide: () => void;
    }) => (
      <View testID="notification-container">
        {notif && (
          <>
            <Text testID="notification-message">{notif.message}</Text>
            <Text testID="notification-type">{notif.type}</Text>
            <Text testID="notification-duration">{String(notif.duration)}</Text>
            <Button testID="hide-button" onPress={onHide} title="Hide" />
          </>
        )}
      </View>
    );
  }
);

const mockUseNotification =
  useNotification as jest.MockedFunction<typeof useNotification>;

describe("NotificationProvider", () => {
  let mockHideNotification: jest.Mock;

  const TestComponent: React.FC = () => {
    const { notif, showNotification, hideNotification } = useNotify();

    return (
      <>
        <Text testID="context-notif">{notif ? notif.message : "no-notif"}</Text>
        <Button
          testID="show-info"
          onPress={() => showNotification("Info message", "info")}
          title="Show Info"
        />
        <Button
          testID="show-error"
          onPress={() =>
            showNotification("Error message", "error", 5000)
          }
          title="Show Error"
        />
        <Button
          testID="hide-notif"
          onPress={hideNotification}
          title="Hide Notif"
        />
      </>
    );
  };

  beforeEach(() => {
    mockHideNotification = jest.fn();

    // Simulate the internal state of useNotification
    mockUseNotification.mockImplementation(() => {
      const [notif, setNotif] = useState<NotificationType | null>(null);

      return {
        notif,
        showNotification: (message: string, type: any = "info", duration = 3000) => {
          setNotif({ message, type, duration });
        },
        hideNotification: () => {
          mockHideNotification();
          setNotif(null);
        },
      };
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // ✅ Testcase 1: Provides notification context values
  it("provides notification context values from useNotification", () => {
    const { getByTestId } = render(
      <NotificationProvider>
        <TestComponent />
      </NotificationProvider>
    );

    expect(getByTestId("context-notif").children.join("")).toBe("no-notif");
    expect(getByTestId("show-info")).toBeTruthy();
    expect(getByTestId("hide-notif")).toBeTruthy();
  });

  // ✅ Testcase 2: Throws an error when useNotify is used outside NotificationProvider
  it("throws an error when useNotify is used outside NotificationProvider", () => {
    const ConsoleError = console.error;
    console.error = jest.fn(); // suppress React error boundary noise

    const BrokenComponent: React.FC = () => {
      useNotify();
      return null;
    };

    expect(() => render(<BrokenComponent />)).toThrow(
      "useNotify must be used inside a NotificationProvider"
    );

    console.error = ConsoleError;
  });

  // ✅ Testcase 3: showNotification updates notif state and NotificationContainer
  it("showNotification updates notif state and NotificationContainer", () => {
    const { getByTestId } = render(
      <NotificationProvider>
        <TestComponent />
      </NotificationProvider>
    );

    act(() => {
      fireEvent.press(getByTestId("show-info"));
    });

    expect(getByTestId("notification-message").children.join("")).toBe(
      "Info message"
    );
    expect(getByTestId("notification-type").children.join("")).toBe("info");
    expect(getByTestId("notification-duration").children.join("")).toBe("3000");
  });

  // ✅ Testcase 4: hideNotification clears notif state
  it("hideNotification clears notif state", () => {
    const { getByTestId, queryByTestId } = render(
      <NotificationProvider>
        <TestComponent />
      </NotificationProvider>
    );

    act(() => {
      fireEvent.press(getByTestId("show-error"));
    });

    expect(getByTestId("notification-message")).toBeTruthy();

    act(() => {
      fireEvent.press(getByTestId("hide-notif"));
    });

    expect(queryByTestId("notification-message")).toBeNull();
  });

  // ✅ Testcase 5: NotificationContainer receives onHide prop and calls it
  it("NotificationContainer receives onHide prop and calls it", () => {
    const { getByTestId } = render(
      <NotificationProvider>
        <TestComponent />
      </NotificationProvider>
    );

    act(() => {
      fireEvent.press(getByTestId("show-info"));
    });

    act(() => {
      fireEvent.press(getByTestId("hide-button"));
    });

    expect(mockHideNotification).toHaveBeenCalledTimes(1);
  });
});
