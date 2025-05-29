import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const SetLocation = () => {
  const router = useRouter();

  const handleChooseLocation = () => {
    // Navigate to map screen
    router.push('/map');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('@/assets/mobile-images/Location/location screen.png')}
          style={styles.illustration}
          resizeMode="contain"
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>Set Your Exact Location</Text>
          <Text style={styles.subtitle}>
            Enable location to find nearby grocery stores faster and easier.
          </Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={handleChooseLocation}
        >
          <Text style={styles.buttonText}>Choose Location</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustration: {
    width: '100%',
    height: 300,
    marginBottom: 40,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 48,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  button: {
    backgroundColor: '#FF5722',
    borderRadius: 32,
    paddingVertical: 14,
    paddingHorizontal: 24,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SetLocation; 