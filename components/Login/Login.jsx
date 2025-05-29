import AuthBackground from '@/components/Common/AuthBackground';
import { loginUser } from '@/services/auth';
import { Ionicons } from '@expo/vector-icons';
import * as Google from 'expo-auth-session/providers/google';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

// ✅ Email validation function
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: 'your-client-id.apps.googleusercontent.com',
    iosClientId: 'your-client-id.apps.googleusercontent.com',
    androidClientId: 'your-client-id.apps.googleusercontent.com',
    webClientId: 'your-client-id.apps.googleusercontent.com',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      fetch('http://localhost:5000/auth/google/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: authentication.accessToken }),
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            router.push('/(tabs)');
          } else {
            setError(data.message || 'Unknown error');
          }
        })
        .catch(err => {
          setError(err.message || 'An error occurred');
        });
    }
  }, [response]);

  const handleSubmit = async () => {
    setError('');

    // 🛡️ Input validation
    if (!email || !isValidEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    try {
      const data = await loginUser({ email, password });
      router.push('/(tabs)');
    } catch (err) {
      setError(err.message || "Login failed");
    }
    setLoading(false);
  };

  return (
    <AuthBackground showBack={true} onBack={() => router.back()}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome Back!</Text>
          <Text style={styles.subtitle}>Sign in to continue</Text>
        </View>
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={20} color="#666" />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
          </View>
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="#666" />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#999"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity 
              style={styles.showPasswordButton}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons 
                name={showPassword ? "eye" : "eye-off"} 
                size={24} 
                color="#666"
              />
            </TouchableOpacity>
          </View>
          {error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : null}
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleSubmit}
            activeOpacity={0.8}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.loginButtonText}>Login</Text>
            )}
          </TouchableOpacity>
          <View style={styles.rowBetween}>
            <View style={{ flex: 1, height: 1, backgroundColor: '#eee' }} />
            <Text style={{ marginHorizontal: 8, color: '#888' }}>or login with</Text>
            <View style={{ flex: 1, height: 1, backgroundColor: '#eee' }} />
          </View>
          <TouchableOpacity
            style={styles.googleButton}
            onPress={() => promptAsync()}
            activeOpacity={0.8}
            disabled={!request}
          >
            <Ionicons name="logo-google" size={22} color="#EA4335" style={{ marginRight: 8 }} />
            <Text style={styles.googleButtonText}>Google</Text>
          </TouchableOpacity>
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/signup')}>
              <Text style={styles.signupLink}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </AuthBackground>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 0,
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    top: 0,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  form: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  input: {
    flex: 1,
    height: 50,
    marginLeft: 10,
    fontSize: 16,
  },
  showPasswordButton: {
    position: 'absolute',
    right: 12,
    top: '25%',
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 18,
  },
  loginButton: {
    backgroundColor: '#FF5722',
    borderRadius: 24,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 18,
    marginTop: 4,
    width: '100%',
  },
  loginButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signupText: {
    color: '#666',
  },
  signupLink: {
    color: '#FF5722',
    fontWeight: 'bold',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#eee',
    paddingVertical: 12,
    marginBottom: 10,
    marginTop: 0,
    width: '100%',
  },
  googleButtonText: {
    color: '#222',
    fontSize: 16,
    fontWeight: '500',
  },
  errorText: {
    color: '#e53935',
    backgroundColor: '#fff0f0',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 7,
    marginBottom: 6,
    marginTop: -5,
    fontSize: 15,
    alignSelf: 'flex-start',
  },
});

export default Login;
