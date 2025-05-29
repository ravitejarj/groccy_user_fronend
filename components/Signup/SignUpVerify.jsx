import React, { useState, useRef } from 'react';
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

const SignUpVerify = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const router = useRouter();
  const inputRefs = useRef([]);

  const handleOtpChange = (value, index) => {
    if (value.length > 1) {
      value = value[value.length - 1];
    }
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if value is entered
    if (value !== '' && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e, index) => {
    // Move to previous input on backspace if current input is empty
    if (e.nativeEvent.key === 'Backspace' && index > 0 && otp[index] === '') {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerify = () => {
    // Here you would typically verify the OTP with your backend
    // For now, we'll just navigate to login
    router.replace('/login');
  };

  const handleResendCode = () => {
    // Handle resend code logic here
  };

  return (
    <AuthBackground showBack={true} onBack={() => router.back()}>
      <View style={{ alignItems: 'center', marginBottom: 16 }}>
        <Ionicons name="cart" size={40} color="#FF5722" style={{ marginBottom: 8 }} />
      </View>
      <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 12, color: '#222' }}>
        Verify Your Account
      </Text>
      <Text style={{ fontSize: 15, color: '#666', textAlign: 'center', marginBottom: 32 }}>
        Enter the 6-digit code we sent you to quickly verify your mobile.
      </Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 32, paddingHorizontal: 10 }}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={ref => inputRefs.current[index] = ref}
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: '#E0E0E0',
              backgroundColor: '#FFF',
              fontSize: 20,
              textAlign: 'center',
              color: '#333',
              marginHorizontal: 3,
              left: -20,
            }}
            value={digit}
            onChangeText={(value) => handleOtpChange(value, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            keyboardType="numeric"
            maxLength={1}
            selectTextOnFocus
          />
        ))}
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
        onPress={handleVerify}
        disabled={!otp.every(digit => digit !== '')}
      >
        <Text style={{ color: '#FFF', fontSize: 18, fontWeight: '600' }}>Verify</Text>
      </TouchableOpacity>
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 0 }}>
        <Text style={{ color: '#666' }}>Did not receive OTP? </Text>
        <TouchableOpacity onPress={handleResendCode}>
          <Text style={{ color: '#FF5722', fontWeight: 'bold' }}>Resend code</Text>
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
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  otpInput: {
    width: 45,
    height: 50,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    fontSize: 20,
    textAlign: 'center',
    color: '#333',
  },
  verifyButton: {
    backgroundColor: '#FF5722',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  verifyButtonDisabled: {
    backgroundColor: '#FFE0D6',
  },
  verifyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  resendText: {
    color: '#666',
    fontSize: 14,
  },
  resendLink: {
    color: '#FF5722',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default SignUpVerify; 