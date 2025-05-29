import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack screenOptions={{ headerShown: false }}>
            {/* Authentication & Onboarding */}
            <Stack.Screen name="index" />
            <Stack.Screen name="onboarding" />
            <Stack.Screen name="Login" />
            <Stack.Screen name="SignupStep_1" />
            <Stack.Screen name="SignupStep_2" />
            <Stack.Screen name="SignupStep_3" />
            <Stack.Screen name="forgot-password" />
            <Stack.Screen name="verify-otp" />
            <Stack.Screen name="set-new-password" />

            {/* Location */}
            <Stack.Screen name="SetLocation" />
            <Stack.Screen name="MapScreen" />
            <Stack.Screen name="AddressForm" />

            {/* Orders */}
            <Stack.Screen name="order-summary" />
            <Stack.Screen name="order-track" />
            <Stack.Screen name="order-success" />
            <Stack.Screen name="order-failed" />

            {/* Payment */}
            <Stack.Screen name="payment-methods" />
            <Stack.Screen name="add-card" />

            {/* Main App */}
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
