import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import SafeAreaWrapper from '@/components/Common/SafeAreaWrapper';

const ADDRESS_TYPES = ['Home', 'Work', 'Other'];

const AddressUpdate = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    house: '',
    street: '',
    city: '',
    state: '',
    addressType: 'Home',
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Save address and navigate to main home screen
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaWrapper style={{ flex: 1, backgroundColor: '#F7F7F7' }}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Edit My Address</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <Text style={styles.label}>House / Flat No.</Text>
          <TextInput
            style={styles.input}
            value={formData.house}
            onChangeText={v => handleChange('house', v)}
            placeholder="01, Lake View Apartments"
          />
          <Text style={styles.label}>Street / Area / Locality</Text>
          <TextInput
            style={styles.input}
            value={formData.street}
            onChangeText={v => handleChange('street', v)}
            placeholder="Carter Road, Bandra West"
          />
          <Text style={styles.label}>City</Text>
          <TextInput
            style={styles.input}
            value={formData.city}
            onChangeText={v => handleChange('city', v)}
            placeholder="Mumbai"
          />
          <Text style={styles.label}>State</Text>
          <TextInput
            style={styles.input}
            value={formData.state}
            onChangeText={v => handleChange('state', v)}
            placeholder="Maharashtra"
          />
        </View>
        <View style={styles.card}>
          <Text style={styles.label}>Address Type</Text>
          {ADDRESS_TYPES.map(type => (
            <TouchableOpacity
              key={type}
              style={styles.radioRow}
              onPress={() => handleChange('addressType', type)}
              activeOpacity={0.8}
            >
              <Text style={styles.radioLabel}>{type}</Text>
              <View style={styles.radioOuter}>
                {formData.addressType === type && <View style={styles.radioInner} />}
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity
          style={styles.saveBtn}
          onPress={handleSave}
          disabled={!(formData.house && formData.street && formData.city && formData.state)}
        >
          <Text style={styles.saveBtnText}>Save Address</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'transparent',
  },
  backButton: {
    marginRight: 8,
    padding: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
    flex: 1,
    textAlign: 'center',
    marginRight: 32,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 18,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  label: {
    color: '#888',
    fontSize: 13,
    marginBottom: 6,
    marginTop: 10,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#F7F7F7',
    borderRadius: 10,
    padding: 14,
    fontSize: 15,
    color: '#222',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#EEE',
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  radioLabel: {
    flex: 1,
    color: '#222',
    fontSize: 15,
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#FF5722',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FF5722',
  },
  saveBtn: {
    backgroundColor: '#FF5722',
    borderRadius: 22,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 24,
  },
  saveBtnText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 17,
  },
});

export default AddressUpdate; 