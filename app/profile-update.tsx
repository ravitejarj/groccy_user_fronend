import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import SafeAreaWrapper from '@/components/Common/SafeAreaWrapper';

export default function ProfileUpdate() {
  const router = useRouter();
  const [avatar, setAvatar] = useState('https://randomuser.me/api/portraits/men/32.jpg');
  const [name, setName] = useState('Ravi Teja');
  const [email, setEmail] = useState('example@gmail.com');
  const [countryCode, setCountryCode] = useState('+1');
  const [phone, setPhone] = useState('22 1234 5678');

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setAvatar(result.assets[0].uri);
    }
  };

  const handleUpdate = () => {
    // Save profile changes (API integration here)
    router.back();
  };

  return (
    <SafeAreaWrapper style={{ flex: 1, backgroundColor: '#F7F7F7' }}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Edit Profile</Text>
      </View>
      <View style={styles.avatarContainer}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
        <TouchableOpacity style={styles.editAvatarBtn} onPress={pickImage}>
          <Ionicons name="create-outline" size={18} color="#333" />
        </TouchableOpacity>
      </View>
      <View style={styles.formCard}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Full Name"
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Text style={styles.label}>Phone Number</Text>
        <View style={styles.phoneRow}>
          <View style={styles.countryCodeBox}>
            <Text style={styles.countryCodeText}>{countryCode}</Text>
          </View>
          <TextInput
            style={styles.phoneInput}
            value={phone}
            onChangeText={setPhone}
            placeholder="22 1234 5678"
            keyboardType="phone-pad"
          />
        </View>
      </View>
      <TouchableOpacity style={styles.updateBtn} onPress={handleUpdate}>
        <Text style={styles.updateBtnText}>Update</Text>
      </TouchableOpacity>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'transparent',
  },
  backBtn: {
    marginRight: 8,
    padding: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
    flex: 1,
    textAlign: 'center',
    marginRight: 32,
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 18,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#EEE',
  },
  editAvatarBtn: {
    position: 'absolute',
    right: 110 / 2 - 24,
    bottom: 0,
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 8,
    borderWidth: 1,
    borderColor: '#EEE',
    elevation: 2,
  },
  formCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 18,
    marginHorizontal: 16,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  label: {
    color: '#888',
    fontSize: 13,
    marginBottom: 6,
    marginTop: 10,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#F7F7F7',
    borderRadius: 10,
    padding: 14,
    fontSize: 15,
    color: '#222',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#EEE',
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  countryCodeBox: {
    backgroundColor: '#F7F7F7',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#EEE',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 8,
  },
  countryCodeText: {
    fontSize: 15,
    color: '#222',
  },
  phoneInput: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#EEE',
    padding: 14,
    fontSize: 15,
    color: '#222',
  },
  updateBtn: {
    backgroundColor: '#FF5722',
    borderRadius: 22,
    paddingVertical: 16,
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 24,
  },
  updateBtnText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 17,
  },
}); 