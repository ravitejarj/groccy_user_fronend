import React from 'react';
import { View } from 'react-native';
import { Stack } from 'expo-router';
import BottomTabBar from '@/components/Navigation/BottomTabBar';

export default function TabLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: '#F6F6F6' }}>
      <Stack screenOptions={{ headerShown: false }}>
        {/* Home Tab */}
        <Stack.Screen name="index" />
        <Stack.Screen name="explore" />

        {/* Orders Tab */}
        <Stack.Screen name="orders" />

        {/* Cart Tab */}
        <Stack.Screen name="cart" />

        {/* Profile Tab */}
        <Stack.Screen name="profile" />
      </Stack>
      <BottomTabBar />
    </View>
  );
}
