import AuthBackground from '@/components/Common/AuthBackground';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { FormInput } from './FromElements';
import styles from './styles';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleSubmit = () => {
    if (firstName && lastName && email) {
      router.push({ pathname: '/signup-step2', params: { firstName, lastName, email } });
    }
  };

  return (
    <AuthBackground showBack={true} onBack={() => router.back()}>
      <View style={styles.iconHeader}>
        <Ionicons name="cart" size={40} color="#FF5722" style={{ marginBottom: 8 }} />
        <Text style={styles.title}>Let's Get You Started</Text>
      </View>
      <View style={{ marginBottom: 16 }}>
        <FormInput
          label="First Name"
          value={firstName}
          onChangeText={setFirstName}
          placeholder="First Name"
          autoCapitalize="words"
        />
        <FormInput
          label="Last Name"
          value={lastName}
          onChangeText={setLastName}
          placeholder="Last Name"
          autoCapitalize="words"
        />
        <FormInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="example@gmail.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
        disabled={!firstName || !lastName || !email}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
      <View style={styles.divider}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>or login with</Text>
        <View style={styles.dividerLine} />
      </View>
      {/* Add your social login buttons here if needed */}
      <View style={styles.footer}>
        <Text style={{ color: '#666' }}>Already have an account? </Text>
        <TouchableOpacity onPress={() => router.push('/login')}>
          <Text style={styles.link}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </AuthBackground>
  );
};

export default Signup;