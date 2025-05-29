import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import SafeAreaWrapper from '@/components/Common/SafeAreaWrapper';

export default function ProfileScreen() {
  const router = useRouter();
  const [logoutVisible, setLogoutVisible] = useState(false);

  return (
    <SafeAreaWrapper style={{ flex: 1, backgroundColor: '#F7F7F7' }}>
      {/* Profile Card */}
      <View style={styles.profileCard}>
        <Image source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }} style={styles.avatar} />
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>Ravi Teja</Text>
          <Text style={styles.email}>ravi.teja@email.com</Text>
        </View>
        <TouchableOpacity style={styles.editBtn} onPress={() => router.push('../profile-update')}>
          <Ionicons name="create-outline" size={18} color="#333" />
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
      </View>

      {/* Settings Card */}
      <View style={[styles.card]}>
        <Text style={styles.cardTitle}>Settings</Text>
        <TouchableOpacity style={styles.cardRow} onPress={() => router.push('../address-update')}>
          <Ionicons name="location-outline" size={20} color="#333" style={styles.icon} />
          <Text style={styles.cardText}>My Address</Text>
          <Ionicons name="chevron-forward" size={18} color="#999" style={styles.chevron} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.cardRow} onPress={() => router.push('../orders')}>
          <Ionicons name="receipt-outline" size={20} color="#333" style={styles.icon} />
          <Text style={styles.cardText}>My Orders</Text>
          <Ionicons name="chevron-forward" size={18} color="#999" style={styles.chevron} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.cardRow}>
          <Ionicons name="language-outline" size={20} color="#333" style={styles.icon} />
          <Text style={styles.cardText}>Language</Text>
          <Ionicons name="chevron-forward" size={18} color="#999" style={styles.chevron} />
        </TouchableOpacity>
      </View>

      {/* Support Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Support</Text>
        <TouchableOpacity style={styles.cardRow} onPress={() => router.push('../help')}>
          <Ionicons name="help-circle-outline" size={20} color="#333" style={styles.icon} />
          <Text style={styles.cardText}>Help & Support</Text>
          <Ionicons name="chevron-forward" size={18} color="#999" style={styles.chevron} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.cardRow} onPress={() => router.push('../faq')}>
          <Ionicons name="information-circle-outline" size={20} color="#333" style={styles.icon} />
          <Text style={styles.cardText}>FAQ</Text>
          <Ionicons name="chevron-forward" size={18} color="#999" style={styles.chevron} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.cardRow} onPress={() => setLogoutVisible(true)}>
          <Ionicons name="log-out-outline" size={20} color="#333" style={styles.icon} />
          <Text style={styles.cardText}>Log out</Text>
        </TouchableOpacity>
      </View>

      {/* Logout Modal */}
      <Modal visible={logoutVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.logoutModal}>
            <Text style={styles.logoutTitle}>Logout</Text>
            <Text style={styles.logoutMsg}>Are you sure you want to logout from{"\n"}this account?</Text>
            <View style={styles.logoutActions}>
              <TouchableOpacity onPress={() => setLogoutVisible(false)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.yesBtn} onPress={() => { setLogoutVisible(false); router.replace('/login'); }}>
                <Text style={styles.yesText}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F7F7', padding: 16 },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 16,
    marginBottom: 24,
    marginTop: 40,
    marginHorizontal: 20,
    
  },
  avatar: { width: 56, height: 56, borderRadius: 28, marginRight: 16 },
  name: { fontWeight: '600', fontSize: 17, color: '#222' },
  email: { color: '#888', fontSize: 13, marginTop: 2 },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginLeft: 8,
  },
  editText: { color: '#333', fontWeight: '500', fontSize: 13, marginLeft: 4 },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 16,
    marginBottom: 24,
    marginHorizontal: 20,
    
  },
  cardTitle: { fontWeight: '600', color: '#888', fontSize: 13, marginBottom: 10 },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomColor: '#F2F2F2',
  },
  cardText: { flex: 1, color: '#222', fontSize: 15, marginLeft: 8 },
  icon: { width: 28 },
  chevron: { marginLeft: 'auto' },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.18)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutModal: {
    backgroundColor: '#FFF',
    borderRadius: 28,
    padding: 28,
    width: 320,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  logoutTitle: { fontWeight: '700', fontSize: 22, color: '#222', marginBottom: 10 },
  logoutMsg: { color: '#444', fontSize: 15, textAlign: 'center', marginBottom: 22 },
  logoutActions: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  cancelText: { color: '#888', fontWeight: '600', fontSize: 16, marginRight: 32 },
  yesBtn: { backgroundColor: '#FF5722', borderRadius: 22, paddingHorizontal: 32, paddingVertical: 10 },
  yesText: { color: '#FFF', fontWeight: '600', fontSize: 16 },
}); 