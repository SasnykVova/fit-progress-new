import { StyleSheet, View } from "react-native";

interface IBMIBadgeProps {
  bmi: string | undefined;
}

const BMIBadge: React.FunctionComponent<IBMIBadgeProps> = ({ bmi }) => {
  const getBadgeColor = (bmi: string | undefined) => {
    switch (bmi) {
      case "Недостатня вага":
      case "Underweight":
        return "#bef264";
      case "Нормальна вага":
      case "Normal":
        return "#22c55e";
      case "Зайва вага":
      case "Overweight":
        return "#f97316";
      default:
        return "#dc2626";
    }
  };

  const badgeColor = getBadgeColor(bmi);

  return <View style={[styles.box, { backgroundColor: badgeColor }]}></View>;
};

export default BMIBadge;

const styles = StyleSheet.create({
  box: {
    width: 16,
    height: 16,
    borderRadius: 4,
    backgroundColor: "#000",
  },
});
