import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import SafeAreaWrapper from '@/components/Common/SafeAreaWrapper';

const OrderSuccessScreen = () => {
  const router = useRouter();

  const handleTrackOrder = () => {
    // Navigate to order tracking
    router.push('/order-track');
  };

  const handleGoHome = () => {
    // Navigate back to home
    router.push('/(tabs)');
  };

  return (
    <SafeAreaWrapper>
      <View style={styles.content}>
        {/* Success Animation Container */}
        <View style={styles.animationContainer}>
          {/* Checkmark Circle */}
          <View style={styles.checkCircle}>
            <Ionicons name="checkmark" size={40} color="#4CAF50" />
          </View>
          
          {/* Decorative Elements */}
          <View style={[styles.decorativeElement, styles.dot1]} />
          <View style={[styles.decorativeElement, styles.dot2]} />
          <View style={[styles.decorativeElement, styles.line1]} />
          <View style={[styles.decorativeElement, styles.line2]} />
          <View style={[styles.decorativeElement, styles.plus1]} />
          <View style={[styles.decorativeElement, styles.plus2]} />
        </View>

        {/* Success Message */}
        <Text style={styles.title}>Order Confirmed!</Text>
        <Text style={styles.message}>
          Your order #123456789 has been placed successfully on October 18, 2023
        </Text>

        {/* Track Order Button */}
        <TouchableOpacity 
          style={styles.trackButton}
          onPress={handleTrackOrder}
        >
          <Text style={styles.trackButtonText}>Track My Order</Text>
        </TouchableOpacity>

        {/* Got It Button */}
        <TouchableOpacity 
          style={styles.gotItButton}
          onPress={handleGoHome}
        >
          <Text style={styles.gotItButtonText}>Got It!</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
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
  checkCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  decorativeElement: {
    position: 'absolute',
    backgroundColor: '#4CAF50',
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
    backgroundColor: '#FF5722',
    bottom: '30%',
    left: '20%',
  },
  line1: {
    width: 20,
    height: 3,
    backgroundColor: '#4CAF50',
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
  trackButton: {
    marginBottom: 16,
  },
  trackButtonText: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: '500',
  },
  gotItButton: {
    backgroundColor: '#4CAF50',
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

export default OrderSuccessScreen; 