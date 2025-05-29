import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function SplashScreen3() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      {/* Logo and Title */}
      <View style={styles.header}>
        <View style={styles.logoRow}>
            <Image
            source={require('../assets/mobile-images/icons/Shopping icon with text.png')}
            style={styles.logo}
            resizeMode="contain"
            />
            
        </View>
    </View>
      {/* Main Illustration */}
      <View style={styles.illustrationContainer}>
        <Image
          source={require('../assets/mobile-images/auth/Splash Screen 3.png')}
          style={styles.illustration}
          resizeMode="contain"
        />
      </View>
      {/* Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/login')}
        activeOpacity={0.85}
      >
        <Text style={styles.buttonText}>Start shopping</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFEFD5',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  header: {
    alignItems: 'center',
    marginTop: 48,
    marginBottom: 12,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 137,
  },
  logo: {
    width: 230,
    height: 48,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FF5722',
    letterSpacing: 1,
  },
  illustrationContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  illustration: {
    width: 260,
    height: 200,
    marginTop: 12,
    marginBottom: 12,
  },
  button: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: Platform.OS === 'android' ? 40 : 48,
    backgroundColor: '#FF5722',
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});