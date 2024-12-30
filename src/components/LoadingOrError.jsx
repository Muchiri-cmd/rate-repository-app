import React from "react";
import { View,Text,ActivityIndicator,StyleSheet } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

const LoadingOrError = ({ loading, error }) => {
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2c3e50" />
        <Text style={styles.message}>Loading...</Text>
      </View>
    );
  }
  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <MaterialIcons name="error-outline" size={50} color="red" />
        <Text style={styles.errorMessage}>Error fetching data. Please try again later.</Text>
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create ({
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center',
    flex: 1, 
    backgroundColor: "#fff",
    fontSize:40
  },
  message: {
    marginTop: '10px',
    color: '#2c3e50',
  },
  errorMessage: {
    marginTop: '10px',
    color: 'red',
  },
});

export default LoadingOrError