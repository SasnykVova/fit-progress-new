import { useModeStore } from "@/store/modeStore";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { Button, Icon, Text, useTheme } from "react-native-paper";

export default function StopWatch({ initialTime = 0 }) {
  const [time, setTime] = useState(initialTime);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const theme = useTheme();
  const { mode } = useModeStore();
  const { t } = useTranslation("muscleGroupTab");
  const router = useRouter();

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 16);
      }, 16);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [running]);

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor((ms % 60000) / 1000)
      .toString()
      .padStart(2, "0");
    const centiseconds = Math.floor((ms % 1000) / 10)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}:${centiseconds}`;
  };
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: mode === "white" ? "#fafaf9" : "#0a0a0a" },
      ]}
    >
      <View style={{ width: 250, display: "flex", alignItems: "center" }}>
        <Text
          variant="displayLarge"
          style={{ color: theme.colors.primary, marginBottom: 20 }}
        >
          {formatTime(time)}
        </Text>
      </View>

      <View style={styles.buttonsRow}>
        <Button
          mode="contained"
          onPress={() => setRunning((prev) => !prev)}
          style={[
            styles.button,
            {
              backgroundColor: running ? "#737373" : theme.colors.primary,
            },
          ]}
          labelStyle={{ fontWeight: "700" }}
          contentStyle={{ height: 50, width: 150 }}
        >
          {running ? t("stopWatch.pause") : t("stopWatch.start")}
        </Button>

        <Button
          mode="outlined"
          onPress={() => {
            setRunning(false);
            setTime(0);
          }}
          style={[styles.button, { borderColor: theme.colors.error }]}
          labelStyle={{ color: theme.colors.error, fontWeight: "700" }}
          contentStyle={{ height: 50, width: 150 }}
        >
          {t("stopWatch.reset")}
        </Button>
      </View>

      <View style={styles.backContainer}>
        <Button
          mode="contained"
          icon={(props) => (
            <Icon source="keyboard-backspace" size={25} color={props.color} />
          )}
          contentStyle={{ height: 50, width: 300 }}
          labelStyle={{ fontSize: 16, fontWeight: "700" }}
          style={styles.backButton}
          onPress={() => router.back()}
        >
          {t("stopWatch.back")}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  buttonsRow: {
    flexDirection: "row",
    gap: 15,
    justifyContent: "space-between",
  },
  button: {},
  backContainer: {
    position: "absolute",
    bottom: 40,
  },
  backButton: {},
});
