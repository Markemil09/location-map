import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Slot } from 'expo-router';

const Layout = () => (
  <View style={styles.container}>
    <Slot />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default Layout;