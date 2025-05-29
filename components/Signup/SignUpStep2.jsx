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
import DropDownPicker from 'react-native-dropdown-picker';

const countryCodes = ['+1', '+91', '+44']; // Add more as needed

const SignUpStep2 = () => {
  const [open, setOpen] = useState(false);
  const [countryCode, setCountryCode] = useState('+1');
  const [countryItems, setCountryItems] = useState([
    { label: '+1', value: '+1' },
    { label: '+91', value: '+91' },
    { label: '+44', value: '+44' },
    // Add more country codes as needed
  ]);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSignUp = () => {
    if (phone && password) {
      router.push('/signup-verify');
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
        <Text style={{ color: '#888', fontSize: 14, marginBottom: 6 }}>Phone Number</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
          <DropDownPicker
            open={open}
            value={countryCode}
            items={countryItems}
            setOpen={setOpen}
            setValue={setCountryCode}
            setItems={setCountryItems}
            containerStyle={{ width: 78, zIndex: 10 }}
            style={{
              borderTopLeftRadius: 14,
              borderBottomLeftRadius: 14,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              borderColor: '#E0E0E0',
              height: 48,
              backgroundColor: '#FFF',
            }}
            dropDownContainerStyle={{
              borderTopLeftRadius: 14,
              borderBottomLeftRadius: 14,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              borderColor: '#E0E0E0',
              backgroundColor: '#FFF',
              zIndex: 1000,
            }}
            textStyle={{ fontSize: 16, color: '#222' }}
            showArrowIcon={true}
            showTickIcon={false}
            listMode="SCROLLVIEW"
          />
          <TextInput
            style={{
              flex: 1,
              height: 48,
              fontSize: 16,
              paddingHorizontal: 15,
              borderTopRightRadius: 14,
              borderBottomRightRadius: 14,
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              borderColor: '#E0E0E0',
              borderWidth: 1,
              borderLeftWidth: 0,
              backgroundColor: '#FFF',
            }}
            value={phone}
            onChangeText={setPhone}
            placeholder="22 1234 5678"
            placeholderTextColor="#999"
            keyboardType="phone-pad"
            maxLength={15}
          />
        </View>
        <Text style={{ color: '#888', fontSize: 14, marginBottom: 6 }}>Password</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#F5F5F5', borderRadius: 10, marginBottom: 16 }}>
          <TextInput
            style={{ flex: 1, height: 48, fontSize: 16, paddingHorizontal: 15 }}
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            placeholderTextColor="#999"
            secureTextEntry={!showPassword}
            autoCapitalize="none"
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={{ paddingHorizontal: 10 }}
          >
            <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={22} color="#888" />
          </TouchableOpacity>
        </View>
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
        onPress={handleSignUp}
        disabled={!phone || !password}
      >
        <Text style={{ color: '#FFF', fontSize: 18, fontWeight: '600' }}>Sign Up</Text>
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
  passwordContainer: {
    position: 'relative',
  },
  eyeIcon: {
    position: 'absolute',
    right: 12,
    top: '50%',
    transform: [{ translateY: -12 }],
  },
  signUpButton: {
    backgroundColor: '#FF5722',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  signUpButtonDisabled: {
    backgroundColor: '#FFE0D6',
  },
  signUpButtonText: {
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

export default SignUpStep2; 