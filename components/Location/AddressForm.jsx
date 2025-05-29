import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const AddressForm = () => {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [form, setForm] = useState({
    street: params.street || params.address?.split(',')[1]?.trim() || '',
    apartment: '',
    city: params.city || params.address?.split(',')[2]?.trim() || '',
    state: params.state || params.address?.split(',')[3]?.trim() || '',
    zipCode: '',
    instructions: '',
  });

  const onSubmit = () => {
    const { street, city, state, zipCode } = form;
    if (!street || !city || !state || !zipCode) {
      Alert.alert('Missing Info', 'Please fill all required fields.');
      return;
    }

    console.log('Saved Address:', form);
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Delivery Address</Text>

        <CustomInput
          label="Street Address"
          placeholder="123 Main St"
          value={form.street}
          onChange={(v) => setForm({ ...form, street: v })}
        />

        <CustomInput
          label="Apt / Unit / Suite (optional)"
          placeholder="Apt 3B"
          value={form.apartment}
          onChange={(v) => setForm({ ...form, apartment: v })}
        />

        <CustomInput
          label="City"
          placeholder="City"
          value={form.city}
          onChange={(v) => setForm({ ...form, city: v })}
        />

        <CustomInput
          label="State"
          placeholder="State"
          value={form.state}
          onChange={(v) => setForm({ ...form, state: v })}
        />

        <CustomInput
          label="ZIP Code"
          placeholder="12345"
          keyboardType="numeric"
          value={form.zipCode}
          onChange={(v) => setForm({ ...form, zipCode: v })}
        />

        <TouchableOpacity style={styles.button} onPress={onSubmit}>
          <Text style={styles.btnText}>Save Address</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const CustomInput = ({ label, placeholder, value, onChange, keyboardType = 'default' }) => (
  <View style={styles.inputGroup}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={styles.input}
      value={value}
      placeholder={placeholder}
      placeholderTextColor="#999"
      keyboardType={keyboardType}
      onChangeText={onChange}
    />
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scroll: { padding: 20 },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#222',
    marginBottom: 20,
  },
  inputGroup: { marginBottom: 16 },
  label: { fontSize: 14, color: '#666', marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#FF6D00',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  btnText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});

export default AddressForm;
