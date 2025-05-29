import AuthBackground from '@/components/Common/AuthBackground';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { verifyOtp } from '../../services/auth';
import { ErrorText, FormInput } from './FromElements';
import styles from './styles';

const SignUpVerify = () => {
  const router = useRouter();
  const params = useLocalSearchParams(); // expects phone
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);

  const handleVerify = async () => {
    setError('');
    setLoading(true);
    try {
      await verifyOtp({ phone: params.phone, otp });
      router.replace('/set-location');
    } catch (err) {
      setError(err?.response?.data?.message || "Invalid OTP. Please try again.");
    }
    setLoading(false);
  };

  const handleResendOtp = async () => {
    setResending(true);
    setResendDisabled(true);

    // 🔁 Replace this with real resend API later
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // simulate API delay
      // await resendOtp({ phone: params.phone });
    } catch (err) {
      setError("Failed to resend OTP. Try again.");
    }

    setResending(false);
    setTimeout(() => setResendDisabled(false), 15000); // 15 seconds cooldown
  };

  return (
    <AuthBackground showBack={true} onBack={() => router.back()}>
      <View style={{ marginBottom: 16 }}>
        <Text style={{ color: '#222', fontSize: 20, fontWeight: 'bold', marginBottom: 8 }}>
          Verify your account
        </Text>
        <Text style={{ color: '#888', fontSize: 14, marginBottom: 18 }}>
          Enter the OTP sent to your phone to complete signup.
        </Text>
        <FormInput
          label="OTP"
          value={otp}
          onChangeText={setOtp}
          placeholder="Enter OTP"
          keyboardType="number-pad"
          maxLength={6}
          textAlign="center"
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleVerify}
        disabled={!otp || loading}
      >
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>

      <ErrorText error={error} />

      <TouchableOpacity
        onPress={handleResendOtp}
        disabled={resending || resendDisabled}
        style={{ marginTop: 14 }}
      >
        <Text style={{
          textAlign: 'center',
          color: resendDisabled ? '#aaa' : '#FF5722',
          fontWeight: 'bold'
        }}>
          {resending ? 'Resending...' : 'Resend OTP'}
        </Text>
      </TouchableOpacity>
    </AuthBackground>
  );
};

export default SignUpVerify;
