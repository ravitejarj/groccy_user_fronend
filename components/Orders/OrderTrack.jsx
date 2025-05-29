import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import SafeAreaWrapper from '@/components/Common/SafeAreaWrapper';
import BottomTabBar from '@/components/Navigation/BottomTabBar';

export default function OrderTrack() {
  const router = useRouter();
  return (
    <SafeAreaWrapper style={styles.safeArea}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order Tracking</Text>
        <TouchableOpacity onPress={() => router.push('/help')} style={styles.supportBtn}>
          <Text style={styles.supportText}>Contact Support</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.mapContainer}>
        {/* Map placeholder */}
        <View style={styles.map} />
      </View>
      <View style={styles.card}>
        <View style={styles.statusHeader}>
          <View>
            <Text style={styles.statusTitle}>Out for delivery</Text>
            <Text style={styles.arrivalTime}>Arriving at 11:45</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.codeLabel}>Your code</Text>
            <Text style={styles.codeNumber}>1869</Text>
          </View>
        </View>
        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBarBg}>
            <View style={styles.progressBarFill} />
          </View>
          <View style={styles.progressSteps}>
            <View style={styles.progressStep}>
              <Ionicons name="checkmark-circle" size={22} color="#FF5722" />
              <Text style={styles.stepLabelActive}>Confirmed</Text>
            </View>
            <View style={styles.progressStep}>
              <Ionicons name="cube" size={22} color="#FF5722" />
              <Text style={styles.stepLabelActive}>Picking Items</Text>
            </View>
            <View style={styles.progressStep}>
              <Ionicons name="bicycle" size={22} color="#FF5722" />
              <Text style={styles.stepLabelActive}>Out for delivery</Text>
            </View>
            <View style={styles.progressStep}>
              <Ionicons name="cube-outline" size={22} color="#BDBDBD" />
              <Text style={styles.stepLabel}>Delivered</Text>
            </View>
          </View>
        </View>
        {/* Delivery Person */}
        <View style={styles.deliveryPersonRow}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={28} color="#FF5722" />
          </View>
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={styles.personName}>Raviteja Kalavena</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.comingText}>Coming to you</Text>
              <Ionicons name="star" size={14} color="#FFB300" style={{ marginLeft: 8 }} />
              <Text style={styles.ratingText}>4.8</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="call" size={20} color="#333" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bottomNav}>
        <BottomTabBar />
      </View>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F7F7F7' },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: 'transparent',
  },
  backBtn: { marginRight: 8, padding: 4 },
  headerTitle: { fontSize: 18, fontWeight: '600', color: '#222', flex: 1, textAlign: 'center' },
  supportBtn: { padding: 4 },
  supportText: { color: '#999', fontWeight: '500', fontSize: 13 },
  mapContainer: {
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 18,
    overflow: 'hidden',
    height: 160,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
    backgroundColor: '#E1E1E1',
    borderRadius: 18,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 18,
    marginHorizontal: 16,
    marginTop: 16,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  statusTitle: { fontSize: 16, fontWeight: '600', color: '#FF5722', marginBottom: 2 },
  arrivalTime: { fontSize: 13, color: '#666' },
  codeLabel: { fontSize: 12, color: '#999', marginBottom: 2 },
  codeNumber: { fontSize: 16, fontWeight: '700', color: '#222' },
  progressContainer: { marginBottom: 18 },
  progressBarBg: {
    height: 4,
    backgroundColor: '#F5F5F5',
    borderRadius: 2,
    marginBottom: 12,
    width: '100%',
    position: 'relative',
  },
  progressBarFill: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: 4,
    width: '75%', // 3 of 4 steps complete
    backgroundColor: '#FF5722',
    borderRadius: 2,
  },
  progressSteps: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  progressStep: { alignItems: 'center', width: 70 },
  stepLabel: { fontSize: 11, color: '#BDBDBD', marginTop: 2, textAlign: 'center' },
  stepLabelActive: { fontSize: 11, color: '#FF5722', marginTop: 2, textAlign: 'center', fontWeight: '600' },
  deliveryPersonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FFF3E9',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFD6B8',
  },
  personName: { fontWeight: '600', color: '#222', fontSize: 15 },
  comingText: { color: '#666', fontSize: 12 },
  ratingText: { color: '#222', fontWeight: '600', fontSize: 12, marginLeft: 2 },
  iconBtn: {
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    padding: 8,
    marginLeft: 8,
  },
  bottomNav: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
  },
}); 