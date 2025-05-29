import { View, Text } from 'react-native';
import { Link } from 'expo-router';

export default function Onboarding() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome Screens (Steps 1, 2, 3)</Text>
      <Link href="/login">Go to Login</Link>
    </View>
  );
} 