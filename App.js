import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import CurrencyConverter from "./src/components/currencyConverter";

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <CurrencyConverter />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
});

export default App;
