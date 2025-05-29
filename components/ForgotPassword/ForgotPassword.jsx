import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AuthBackground from '@/components/Common/AuthBackground';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleSubmit = () => {
    // Handle password reset logic here when needed
    router.push('/verify-otp');
  };

  return (
    <AuthBackground showBack={true} onBack={() => router.back()}>
      <View style={{ alignItems: 'center', marginBottom: 16 }}>
        <Ionicons name="cart" size={40} color="#FF5722" style={{ marginBottom: 8 }} />
      </View>
      <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 24, color: '#222' }}>
        Forgot Your Password?
      </Text>
      <View style={{ marginBottom: 16 }}>
        <Text style={{ color: '#888', fontSize: 14, marginBottom: 6 }}>Mail/Phone</Text>
        <TextInput
          style={{
            backgroundColor: '#FFF',
            borderRadius: 10,
            paddingHorizontal: 15,
            height: 48,
            fontSize: 16,
            marginBottom: 16,
            borderColor: '#E0E0E0',
            borderWidth: 1,
          }}
          placeholder="example@gmail.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
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
      >
        <Text style={{ color: '#FFF', fontSize: 18, fontWeight: '600' }}>Send Reset Link</Text>
      </TouchableOpacity>
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 0 }}>
        <Text style={{ color: '#666' }}>Back to </Text>
        <TouchableOpacity onPress={() => router.push('/login')}>
          <Text style={{ color: '#FF5722', fontWeight: 'bold' }}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </AuthBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  keyboardAvoidView: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 24,
  },
  backButton: {
    marginBottom: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    fontSize: 32,
    color: '#FF5722',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cartIconWrapper: {
    marginTop: 8,
  },
  title: {
    fontSize: 24,
    color: '#333',
    fontWeight: '600',
    marginBottom: 32,
  },
  form: {
    gap: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  resetButton: {
    backgroundColor: '#FF5722',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  resetButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  signInPrompt: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  signInText: {
    color: '#666',
    fontSize: 14,
  },
  signInLink: {
    color: '#FF5722',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default ForgotPassword; 