import React from "react";
import { View } from "react-native";

interface GapProps {
  size?: number;
  horizontal?: boolean;
}

export default function Gap({ size = 16, horizontal = false }: GapProps) {
  return <View style={horizontal ? { width: size } : { height: size }} />;
}
