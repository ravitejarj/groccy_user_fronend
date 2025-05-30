import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import SafeAreaWrapper from '@/components/Common/SafeAreaWrapper';

const AddCardScreen = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nameOnCard: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddCard = () => {
    // Handle card addition logic here
    router.back();
  };

  return (
    <SafeAreaWrapper>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Credit/Debit Card</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Name on card</Text>
          <TextInput
            style={styles.input}
            value={formData.nameOnCard}
            onChangeText={(text) => handleInputChange('nameOnCard', text)}
            placeholder="373 1234567 008"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Card Number</Text>
          <TextInput
            style={styles.input}
            value={formData.cardNumber}
            onChangeText={(text) => handleInputChange('cardNumber', text)}
            placeholder="James Anderson"
            placeholderTextColor="#999"
            keyboardType="number-pad"
            maxLength={19}
          />
        </View>

        <View style={styles.row}>
          <View style={[styles.formGroup, styles.halfWidth]}>
            <Text style={styles.label}>Expiry (MM/YY)</Text>
            <TextInput
              style={styles.input}
              value={formData.expiryDate}
              onChangeText={(text) => handleInputChange('expiryDate', text)}
              placeholder="08/24"
              placeholderTextColor="#999"
              keyboardType="number-pad"
              maxLength={5}
            />
          </View>

          <View style={[styles.formGroup, styles.halfWidth]}>
            <Text style={styles.label}>CVV</Text>
            <TextInput
              style={styles.input}
              value={formData.cvv}
              onChangeText={(text) => handleInputChange('cvv', text)}
              placeholder="123"
              placeholderTextColor="#999"
              keyboardType="number-pad"
              maxLength={3}
              secureTextEntry
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={handleAddCard}
        >
          <Text style={styles.addButtonText}>Add Card Detail</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    padding: 4,
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  formGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 14,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  addButton: {
    backgroundColor: '#FF5722',
    borderRadius: 32,
    paddingVertical: 16,
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
});

export default AddCardScreen; 