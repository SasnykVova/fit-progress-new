import { globalStyles } from "@/styles/globalStyles";
import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

interface IHomeProps {}

const Home: React.FunctionComponent<IHomeProps> = (props) => {
  const data = [
    "- create your own exercises",
    "- organize exercises into specific groups",
    "- delete exercises when needed",
  ];
  const tapData = [
    "- open its detail page",
    "- add sets with repetitions and weight",
  ];
  return (
    <View style={styles.home}>
      <View style={styles.wrapper}>
        <Text style={globalStyles.h2}>Welcome to the system!</Text>
        <View style={styles.textBlockWrapper}>
          <Text style={styles.subTitle}>In this app, you can:</Text>
          <View>
            {data.map((item, index) => (
              <Text key={index}>{item}</Text>
            ))}
          </View>
          <Text style={{ fontWeight: "500" }}>Tap on an exercise to:</Text>
          <View>
            {tapData.map((item, index) => (
              <Text key={index}>{item}</Text>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  home: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 16,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  textBlockWrapper: {
    alignItems: "center",
    gap: 16,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "500",
  },
});

export default Home;
