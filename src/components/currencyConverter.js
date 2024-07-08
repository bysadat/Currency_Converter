import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { getLatestRates } from "../services/currencyServices";

const CurrencyConverter = () => {
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [targetCurrency, setTargetCurrency] = useState("EUR");
  const [amount, setAmount] = useState("1");
  const [conversionRate, setConversionRate] = useState(null);
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [currencyOptions, setCurrencyOptions] = useState([]);

  useEffect(() => {
    fetchConversionRate();
  }, [baseCurrency, targetCurrency]);

  useEffect(() => {
    // TThis Fetches the  currency options when component mounts.
    fetchCurrencyOptions();
  }, []);

  const fetchConversionRate = async () => {
    try {
      const data = await getLatestRates(baseCurrency);
      setConversionRate(data.conversion_rates[targetCurrency]);
    } catch (error) {
      console.error(
        "Error getting latest conversion rate , please try again later",
        error
      );
    }
  };

  const fetchCurrencyOptions = async () => {
    try {
      const data = await getLatestRates("USD");
      const options = Object.keys(data.conversion_rates).map((key) => ({
        label: key,
        value: key,
      }));
      setCurrencyOptions(options);
    } catch (error) {
      console.error("Error getting  currency option.Please try again ", error);
    }
  };

  const handleConvert = () => {
    const amountFloat = parseFloat(amount);
    if (isNaN(amountFloat) || !conversionRate) {
      setConvertedAmount(null);
      return;
    }
    setConvertedAmount((amountFloat * conversionRate).toFixed(2));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Currency Converter</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      <RNPickerSelect
        style={pickerSelectStyles}
        onValueChange={(value) => setBaseCurrency(value)}
        items={currencyOptions}
        placeholder={{ label: "Select Base Currency", value: null }}
        value={baseCurrency}
      />
      <RNPickerSelect
        style={pickerSelectStyles}
        onValueChange={(value) => setTargetCurrency(value)}
        items={currencyOptions}
        placeholder={{ label: "Select Target Currency", value: null }}
        value={targetCurrency}
      />
      <Button title="Convert" onPress={handleConvert} />
      {convertedAmount && (
        <Text style={styles.result}>
          {amount} {baseCurrency} = {convertedAmount} {targetCurrency}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  title: {
    fontSize: 30,
    marginBottom: 200,
  },
  input: {
    height: 40,
    borderColor: "black",
    borderWidth: 1,
    marginBottom: 30,
    width: "100%",
    padding: 10,
  },
  result: {
    marginTop: 50,
    fontSize: 30,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
    marginBottom: 10,
    width: "100%",
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "black",
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
    marginBottom: 10,
    width: "100%",
  },
});

export default CurrencyConverter;
