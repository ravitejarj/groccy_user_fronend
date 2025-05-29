import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const OrderFailedScreen = () => {
  const router = useRouter();

  const handleGoHome = () => {
    // Navigate back to home
    router.push('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Failed Animation Container */}
        <View style={styles.animationContainer}>
          {/* Failed Circle */}
          <View style={styles.failedCircle}>
            <View style={styles.sadFace}>
              <View style={styles.eyes}>
                <View style={styles.eye} />
                <View style={styles.eye} />
              </View>
              <View style={styles.mouth} />
            </View>
          </View>
          
          {/* Decorative Elements */}
          <View style={[styles.decorativeElement, styles.dot1]} />
          <View style={[styles.decorativeElement, styles.dot2]} />
          <View style={[styles.decorativeElement, styles.line1]} />
          <View style={[styles.decorativeElement, styles.line2]} />
          <View style={[styles.decorativeElement, styles.plus1]} />
          <View style={[styles.decorativeElement, styles.plus2]} />
        </View>

        {/* Failed Message */}
        <Text style={styles.title}>Your Order Cancelled!</Text>
        <Text style={styles.message}>
          Your order #123456789 has been cancelled on October 18, 2023
        </Text>

        {/* Got It Button */}
        <TouchableOpacity 
          style={styles.gotItButton}
          onPress={handleGoHome}
        >
          <Text style={styles.gotItButtonText}>Got It!</Text>
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
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  animationContainer: {
    width: 200,
    height: 200,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  failedCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#F44336',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  sadFace: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eyes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 24,
    marginBottom: 8,
  },
  eye: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#F44336',
  },
  mouth: {
    width: 16,
    height: 16,
    borderBottomWidth: 3,
    borderBottomColor: '#F44336',
    borderRadius: 8,
    transform: [{ rotate: '180deg' }],
  },
  decorativeElement: {
    position: 'absolute',
    backgroundColor: '#F44336',
  },
  dot1: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2196F3',
    top: '20%',
    right: '25%',
  },
  dot2: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#F44336',
    bottom: '30%',
    left: '20%',
  },
  line1: {
    width: 20,
    height: 3,
    backgroundColor: '#F44336',
    transform: [{ rotate: '45deg' }],
    top: '40%',
    left: '15%',
  },
  line2: {
    width: 15,
    height: 3,
    backgroundColor: '#FF9800',
    transform: [{ rotate: '-45deg' }],
    bottom: '35%',
    right: '20%',
  },
  plus1: {
    width: 15,
    height: 3,
    backgroundColor: '#9C27B0',
    top: '25%',
    left: '30%',
  },
  plus2: {
    width: 3,
    height: 15,
    backgroundColor: '#9C27B0',
    top: '25%',
    left: '30%',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  message: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 20,
  },
  gotItButton: {
    backgroundColor: '#F44336',
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 32,
    width: '100%',
    alignItems: 'center',
  },
  gotItButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
});

export default OrderFailedScreen; 