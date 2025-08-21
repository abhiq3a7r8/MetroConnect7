import React, { useEffect, useRef } from "react";
import { Animated, Dimensions } from "react-native";
import Ptext from "../PoppinsText";

const { width } = Dimensions.get("window");

type NotificationType = "success" | "error" | "warning" | "info";

interface NotificationProps {
  message: string;
  type: NotificationType;
  duration: number;
  onHide: () => void;
}

export default function Notification({ message, type, duration, onHide }: NotificationProps) {
  const translateY = useRef(new Animated.Value(-100)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, { toValue: 0, duration: 300, useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 1, duration: 300, useNativeDriver: true }),
    ]).start();

    const timeout = setTimeout(() => {
      Animated.parallel([
        Animated.timing(translateY, { toValue: -100, duration: 300, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0, duration: 300, useNativeDriver: true }),
      ]).start(onHide);
    }, duration);

    return () => clearTimeout(timeout);
  }, []);

  // Colors for borders and text
  const colors: Record<NotificationType, { bg: string; border: string; text: string }> = {
    success: { bg: "bg-green-50", border: "border-green-600", text: "text-green-800" },
    error: { bg: "bg-red-100", border: "border-red-400", text: "text-red-800" },
    warning: { bg: "bg-yellow-50", border: "border-yellow-600", text: "text-yellow-800" },
    info: { bg: "bg-blue-50", border: "border-blue-600", text: "text-blue-800" },
  };

  const style = colors[type];

  return (
    <Animated.View
      style={{ transform: [{ translateY }], opacity, width: width * 0.9 }}
      className={`absolute top-12 self-center p-4 rounded-2xl ${style.bg} border ${style.border}`}
    >
      <Ptext className={`text-center text-base font-medium ${style.text}`}>{message}</Ptext>
    </Animated.View>
  );
}
