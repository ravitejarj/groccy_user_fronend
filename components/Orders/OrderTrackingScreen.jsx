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

const OrderTrackingScreen = () => {
  const router = useRouter();

  const handleContactSupport = () => {
    // Handle contact support action
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order Tracking</Text>
        <TouchableOpacity onPress={handleContactSupport} style={styles.supportButton}>
          <Text style={styles.supportText}>Contact Support</Text>
        </TouchableOpacity>
      </View>

      {/* Map View */}
      <View style={styles.mapContainer}>
        <View style={styles.map} />
      </View>

      {/* Delivery Status Card */}
      <View style={styles.deliveryCard}>
        <View style={styles.statusHeader}>
          <View>
            <Text style={styles.statusTitle}>Out for delivery</Text>
            <Text style={styles.arrivalTime}>Arriving at 11:45</Text>
          </View>
          <View>
            <Text style={styles.codeLabel}>Your code</Text>
            <Text style={styles.codeNumber}>1869</Text>
          </View>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={styles.progressFilled} />
          </View>
          <View style={styles.progressSteps}>
            <View style={styles.progressStep}>
              <Ionicons name="checkmark-circle" size={24} color="#FF5722" />
              <Text style={styles.stepLabel}>Confirmed</Text>
            </View>
            <View style={styles.progressStep}>
              <Ionicons name="restaurant" size={24} color="#FF5722" />
              <Text style={styles.stepLabel}>Picking items</Text>
            </View>
            <View style={styles.progressStep}>
              <Ionicons name="bicycle" size={24} color="#999" />
              <Text style={styles.stepLabel}>On the way</Text>
            </View>
            <View style={styles.progressStep}>
              <Ionicons name="location" size={24} color="#999" />
              <Text style={styles.stepLabel}>Delivered</Text>
            </View>
          </View>
        </View>

        {/* Delivery Person Info */}
        <View style={styles.deliveryPerson}>
          <View style={styles.personInfo}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={24} color="#999" />
            </View>
            <View style={styles.personDetails}>
              <Text style={styles.personName}>Raviteja Kalavena</Text>
              <View style={styles.ratingContainer}>
                <Text style={styles.comingText}>Coming to you</Text>
                <View style={styles.rating}>
                  <Ionicons name="star" size={12} color="#FFB300" />
                  <Text style={styles.ratingText}>4.8</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.contactButtons}>
            <TouchableOpacity style={styles.contactButton}>
              <Ionicons name="time" size={20} color="#333" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.contactButton}>
              <Ionicons name="call" size={20} color="#333" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  supportButton: {
    padding: 4,
  },
  supportText: {
    fontSize: 14,
    color: '#666',
  },
  mapContainer: {
    height: 300,
    backgroundColor: '#F5F5F5',
  },
  map: {
    width: '100%',
    height: '100%',
    backgroundColor: '#E1E1E1',
  },
  deliveryCard: {
    flex: 1,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  arrivalTime: {
    fontSize: 14,
    color: '#666',
  },
  codeLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'right',
    marginBottom: 4,
  },
  codeNumber: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    textAlign: 'right',
  },
  progressContainer: {
    marginBottom: 24,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#F5F5F5',
    borderRadius: 2,
    marginBottom: 16,
  },
  progressFilled: {
    width: '50%',
    height: '100%',
    backgroundColor: '#FF5722',
    borderRadius: 2,
  },
  progressSteps: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressStep: {
    alignItems: 'center',
    width: '25%',
  },
  stepLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    textAlign: 'center',
  },
  deliveryPerson: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  personInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  personDetails: {
    flex: 1,
  },
  personName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  comingText: {
    fontSize: 14,
    color: '#666',
    marginRight: 8,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8E1',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  ratingText: {
    fontSize: 12,
    color: '#FFB300',
    marginLeft: 2,
    fontWeight: '500',
  },
  contactButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
});

export default OrderTrackingScreen; 