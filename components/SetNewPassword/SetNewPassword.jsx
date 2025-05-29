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
  Modal,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AuthBackground from '@/components/Common/AuthBackground';

const SetNewPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = () => {
    if (password === confirmPassword) {
      setShowSuccess(true);
    }
  };

  return (
    <AuthBackground showBack={true} onBack={() => router.back()}>
      <View style={{ alignItems: 'center', marginBottom: 0 }}>
        <Ionicons name="cart" size={40} color="#FF5722" style={{ marginBottom: 8 }} />
      </View>
      <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 16, color: '#222' }}>
        Set New Password
      </Text>
      <View style={{ marginBottom: 16 }}>
        <Text style={{ color: '#888', fontSize: 14, marginBottom: 6 }}>New Password</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderRadius: 10, marginBottom: 16, borderColor: '#E0E0E0', borderWidth: 1 }}>
          <TextInput
            style={{ flex: 1, height: 48, fontSize: 16, paddingHorizontal: 15, borderRadius: 10 }}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            placeholder="••••••••"
            autoCapitalize="none"
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={{ paddingHorizontal: 10 }}
          >
            <Ionicons name={showPassword ? 'eye' : 'eye-off'} size={22} color="#888" />
          </TouchableOpacity>
        </View>
        <Text style={{ color: '#888', fontSize: 14, marginBottom: 6 }}>Confirm Password</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderRadius: 10, marginBottom: 24, borderColor: '#E0E0E0', borderWidth: 1 }}>
          <TextInput
            style={{ flex: 1, height: 48, fontSize: 16, paddingHorizontal: 15, borderRadius: 10 }}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
            placeholder="••••••••"
            autoCapitalize="none"
          />
          <TouchableOpacity
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            style={{ paddingHorizontal: 10 }}
          >
            <Ionicons name={showConfirmPassword ? 'eye' : 'eye-off'} size={22} color="#888" />
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
        onPress={handleSubmit}
        disabled={!password || !confirmPassword}
      >
        <Text style={{ color: '#FFF', fontSize: 18, fontWeight: '600' }}>Changed Password</Text>
      </TouchableOpacity>
      <Modal
        visible={showSuccess}
        transparent
        animationType="fade"
        onRequestClose={() => setShowSuccess(false)}
      >
        <AuthBackground>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 }}>
            <View style={{ backgroundColor: '#FFF', borderRadius: 24, padding: 32, alignItems: 'center', width: '100%' }}>
              <Image
                source={require('@/assets/mobile-images/auth/Illustration Success.png')}
                style={{ width: 120, height: 120, marginBottom: 24 }}
                resizeMode="contain"
              />
              <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 12, color: '#222' }}>
                Password Changed
              </Text>
              <Text style={{ fontSize: 15, color: '#666', textAlign: 'center', marginBottom: 32 }}>
                Password changed successfully, you can login again with a new password
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: '#FF5722',
                  borderRadius: 32,
                  height: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                }}
                onPress={() => {
                  setShowSuccess(false);
                  router.push('/login');
                }}
              >
                <Text style={{ color: '#FFF', fontSize: 18, fontWeight: '600' }}>Password Updated</Text>
              </TouchableOpacity>
            </View>
          </View>
        </AuthBackground>
      </Modal>
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
    textAlign: 'center',
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
  passwordContainer: {
    position: 'relative',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    paddingRight: 50,
  },
  eyeIcon: {
    position: 'absolute',
    right: 12,
    top: '50%',
    transform: [{ translateY: -12 }],
  },
  submitButton: {
    backgroundColor: '#FF5722',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonDisabled: {
    backgroundColor: '#FFE0D6',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SetNewPassword; 