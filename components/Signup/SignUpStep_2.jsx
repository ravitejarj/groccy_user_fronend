import AuthBackground from '@/components/Common/AuthBackground';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { registerUser } from '../../services/auth';
import { ErrorText, FormInput } from './FromElements';
import styles from './styles';

const SignUpStep2 = () => {
  const router = useRouter();
  const params = useLocalSearchParams(); // firstName, lastName, email
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignup = async () => {
    setError('');

    // 🚫 Validation checks
    if (!phone || phone.length !== 10 || !/^\d{10}$/.test(phone)) {
      setError('Please enter a valid 10-digit phone number.');
      return;
    }
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);
    try {
      await registerUser({
        firstName: params.firstName,
        lastName: params.lastName,
        email: params.email,
        phone,
        password,
        role: 'customer',
      });
      router.push({ pathname: '/SignupStep_3', params: { phone } });
    } catch (err) {
      setError(err?.response?.data?.message || "Signup failed.");
    }
    setLoading(false);
  };

  return (
    <AuthBackground showBack={true} onBack={() => router.back()}>
      <View style={{ marginBottom: 16 }}>
        <FormInput
          label="Phone"
          value={phone}
          onChangeText={setPhone}
          placeholder="Phone"
          keyboardType="phone-pad"
        />
        <FormInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={handleSignup}
        disabled={!phone || !password || loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.buttonText}>Create Account</Text>
        )}
      </TouchableOpacity>
      <ErrorText error={error} />
    </AuthBackground>
  );
};

export default SignUpStep2;
