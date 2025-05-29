import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import SafeAreaWrapper from '@/components/Common/SafeAreaWrapper';

const notifications = [
  {
    id: 1,
    title: 'Order Successful',
    message: 'Order #SP-20223900 has been placed successfully.',
    time: '09:35, 10/05/2024',
    type: 'success',
    isToday: true,
  },
  {
    id: 2,
    title: 'Get 20% Discount Code',
    message: 'Get discount codes from sharing with friends.',
    time: '12:20, 10/05/2024',
    type: 'offer',
    isToday: true,
  },
  {
    id: 3,
    title: 'Get 10% Discount Code',
    message: 'Holiday discount code',
    time: '11:18, 10/05/2024',
    type: 'offer',
    isToday: true,
  },
  {
    id: 4,
    title: 'Order Received',
    message: 'Order #SP-20223900 has been delivered successfully.',
    time: '10:15, 10/05/2024',
    type: 'success',
    isToday: true,
  },
  {
    id: 5,
    title: 'Order on the Way',
    message: 'Your delivery driver is on the way with your order.',
    time: '10:10, 10/05/2024',
    type: 'delivery',
    isToday: true,
  },
  {
    id: 6,
    title: 'Your Order is Confirmed',
    message: 'Your order #SP-20223900 has been confirmed.',
    time: '09:39, 10/05/2024',
    type: 'success',
    isToday: true,
  },
  {
    id: 7,
    title: 'Order Successful',
    message: 'Order #SP-20223900 has been placed successfully.',
    time: '09:35, 10/05/2024',
    type: 'success',
    isYesterday: true,
  },
];

const NotificationItem = ({ notification }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />;
      case 'offer':
        return <Ionicons name="gift" size={24} color="#FFC107" />;
      case 'delivery':
        return <Ionicons name="bicycle" size={24} color="#2196F3" />;
      default:
        return <Ionicons name="notifications" size={24} color="#9E9E9E" />;
    }
  };

  return (
    <TouchableOpacity style={styles.notificationItem}>
      <View style={styles.iconContainer}>
        {getIcon(notification.type)}
      </View>
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{notification.title}</Text>
        <Text style={styles.notificationMessage}>{notification.message}</Text>
        <Text style={styles.notificationTime}>{notification.time}</Text>
      </View>
      {notification.type === 'offer' && (
        <View style={styles.unreadDot} />
      )}
    </TouchableOpacity>
  );
};

const NotificationScreen = () => {
  const router = useRouter();

  const handleGoHome = () => {
    router.push('/(tabs)');
  };

  return (
    <SafeAreaWrapper style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Notifications</Text>
        </View>

        <ScrollView style={styles.notificationList} contentContainerStyle={{ flexGrow: 1 }}>
          <Text style={styles.sectionTitle}>Today</Text>
          {notifications
            .filter(n => n.isToday)
            .map(notification => (
              <NotificationItem 
                key={notification.id} 
                notification={notification} 
              />
            ))
          }

          <Text style={styles.sectionTitle}>Yesterday</Text>
          {notifications
            .filter(n => n.isYesterday)
            .map(notification => (
              <NotificationItem 
                key={notification.id} 
                notification={notification} 
              />
            ))
          }
        </ScrollView>

        <View style={styles.bottomContainer}>
          <TouchableOpacity 
            style={styles.homeButton}
            onPress={handleGoHome}
          >
            <Text style={styles.homeButtonText}>Goto Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  notificationList: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF5722',
  },
  bottomContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  homeButton: {
    backgroundColor: '#FF5722',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  homeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
});

export default NotificationScreen; 