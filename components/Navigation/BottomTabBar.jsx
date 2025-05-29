import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';

const tabs = [
  {
    name: 'Home',
    icon: 'home-outline',
    activeIcon: 'home',
    path: '/',
  },
  {
    name: 'Orders',
    icon: 'receipt-outline',
    activeIcon: 'receipt',
    path: '/orders',
  },
  {
    name: 'Cart',
    icon: 'cart-outline',
    activeIcon: 'cart',
    path: '/cart',
  },
  {
    name: 'Profile',
    icon: 'person-outline',
    activeIcon: 'person',
    path: '/profile',
  },
];

export default function BottomTabBar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = pathname === tab.path;
        return (
          <TouchableOpacity
            key={tab.name}
            style={styles.tab}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              router.push(tab.path);
            }}
          >
            {isActive ? (
              <View style={styles.activePill}>
                <View style={styles.activeIconCircle}>
                  <Ionicons
                    name={tab.activeIcon}
                    size={24}
                    color={'#FFF'}
                  />
                </View>
                <Text style={styles.activeLabel}>{tab.name === 'Orders' ? 'Order' : tab.name}</Text>
              </View>
            ) : (
              <Ionicons
                name={tab.icon}
                size={24}
                color={'#757575'}
              />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingBottom: 32,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    paddingHorizontal: 20,
    borderRadius: 16,
    elevation: 2,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,

  },
  activePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    borderRadius: 24,
    paddingTop:0,
    marginTop:0,
    paddingRight: 16,
  },
  activeIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 90,
    backgroundColor: '#FF460A',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  activeLabel: {
    color: '#222',
    fontWeight: '500',
    fontSize: 14,
  },
}); 