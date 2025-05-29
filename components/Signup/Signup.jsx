import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AuthBackground from '@/components/Common/AuthBackground';

const Signup = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleSubmit = () => {
    if (fullName && email) {
      router.push('/signup-step2');
    }
  };

  return (
    <AuthBackground showBack={true} onBack={() => router.back()}>
      <View style={{ alignItems: 'center', marginBottom: 16 }}>
        <Ionicons name="cart" size={40} color="#FF5722" style={{ marginBottom: 8 }} />
        <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 24, color: '#222' }}>
          Let's Get You Started
        </Text>
      </View>
      <View style={{ marginBottom: 16 }}>
        <Text style={{ color: '#888', fontSize: 14, marginBottom: 6 }}>Full Name</Text>
        <TextInput
          style={{
            backgroundColor: '#F5F5F5',
            borderRadius: 10,
            paddingHorizontal: 15,
            height: 48,
            fontSize: 16,
            marginBottom: 16,
          }}
          value={fullName}
          onChangeText={setFullName}
          placeholder="Full Name"
          placeholderTextColor="#999"
        />
        <Text style={{ color: '#888', fontSize: 14, marginBottom: 6 }}>Email</Text>
        <TextInput
          style={{
            backgroundColor: '#F5F5F5',
            borderRadius: 10,
            paddingHorizontal: 15,
            height: 48,
            fontSize: 16,
            marginBottom: 16,
          }}
          value={email}
          onChangeText={setEmail}
          placeholder="example@gmail.com"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: '#FF5722',
          borderRadius: 32,
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 20,
        }}
        onPress={handleSubmit}
        disabled={!fullName || !email}
      >
        <Text style={{ color: '#FFF', fontSize: 18, fontWeight: '600' }}>Continue</Text>
      </TouchableOpacity>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 16 }}>
        <View style={{ flex: 1, height: 1, backgroundColor: '#eee' }} />
        <Text style={{ marginHorizontal: 8, color: '#888' }}>or login with</Text>
        <View style={{ flex: 1, height: 1, backgroundColor: '#eee' }} />
      </View>
      {/* Add your social login buttons here if needed */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
        <Text style={{ color: '#666' }}>Already have an account? </Text>
        <TouchableOpacity onPress={() => router.push('/login')}>
          <Text style={{ color: '#FF5722', fontWeight: 'bold' }}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </AuthBackground>
  );
};

export default Signup; 