import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import SafeAreaWrapper from '@/components/Common/SafeAreaWrapper';

export default function OrderSuccess() {
  const router = useRouter();
  return (
    <SafeAreaWrapper style={styles.container}>
      <View style={styles.iconBox}>
        <Ionicons name="checkmark-circle" size={80} color="#4CAF50" />
        {/* Confetti (static for now) */}
        <Ionicons name="sparkles-outline" size={32} color="#4CAF50" style={styles.confetti} />
      </View>
      <Text style={styles.title}>Order Confirmed !</Text>
      <Text style={styles.desc}>Your order #123456789 has been placed successfully on October 18, 2023</Text>
      <TouchableOpacity style={styles.trackBtn} onPress={() => router.push('/order-track')}>
        <Text style={styles.trackBtnText}>Track My Order</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.gotItBtn} onPress={() => router.push('/(tabs)')}>
        <Text style={styles.gotItBtnText}>Got it!</Text>
      </TouchableOpacity>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF', padding: 24 },
  iconBox: { alignItems: 'center', marginBottom: 24 },
  confetti: { position: 'absolute', top: 0, right: -24 },
  title: { fontSize: 20, fontWeight: '700', color: '#222', marginBottom: 8, textAlign: 'center' },
  desc: { fontSize: 15, color: '#333', marginBottom: 24, textAlign: 'center' },
  trackBtn: { marginBottom: 16 },
  trackBtnText: { color: '#4CAF50', fontWeight: '600', fontSize: 16, textAlign: 'center' },
  gotItBtn: { backgroundColor: '#4CAF50', borderRadius: 24, paddingVertical: 14, paddingHorizontal: 32, marginTop: 16, width: '100%' },
  gotItBtnText: { color: '#FFF', fontSize: 17, fontWeight: '600', textAlign: 'center' },
}); 