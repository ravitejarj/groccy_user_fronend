import { Link } from 'expo-router';
import { Text, View } from 'react-native';

export default function Onboarding() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome Screens (Steps 1, 2, 3)</Text>
      <Link href="/Login">Go to Login</Link>
    </View>
  );
}
