import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
  Platform,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function SplashScreen2() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <Image
        source={require('../assets/mobile-images/auth/Splash Screen 2.jpg')}
        style={styles.image}
        resizeMode="cover"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/splash-screen-3')}
        activeOpacity={0.85}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'flex-end',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  button: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: Platform.OS === 'android' ? 40 : 48,
    backgroundColor: '#FF5722',
    height: 52,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    elevation: 2,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});