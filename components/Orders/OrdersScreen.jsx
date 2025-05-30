import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import SafeAreaWrapper from '@/components/Common/SafeAreaWrapper';

const CURRENT_ORDERS = [
  {
    id: '1',
    storeName: 'Big Bazaar',
    productName: 'Fortune Atta-5kg',
    date: 'April 19, 2025',
    price: '$280',
    status: 'On Deliver'
  },
  {
    id: '2',
    storeName: 'Fresh Basket',
    productName: 'Aashirvaad Salt-1kg',
    date: 'April 18, 2025',
    price: '$32',
    status: 'On Deliver'
  },
  {
    id: '3',
    storeName: 'Taza Mart',
    productName: 'Amul Butter-500g',
    date: 'March 19, 2025',
    price: '$240',
    status: 'On Deliver'
  },
];

const PAST_ORDERS = [
  {
    id: '4',
    storeName: 'Big Bazaar',
    productName: 'Fortune Atta-5kg',
    date: 'April 10, 2025',
    price: '$280',
    status: 'Delivered'
  },
  {
    id: '5',
    storeName: 'Fresh Basket',
    productName: 'Aashirvaad Salt-1kg',
    date: 'April 5, 2025',
    price: '$32',
    status: 'Cancelled'
  },
  {
    id: '6',
    storeName: 'Taza Mart',
    productName: 'Amul Butter-500g',
    date: 'March 28, 2025',
    price: '$240',
    status: 'Delivered'
  },
];

const OrdersScreen = () => {
  const [activeTab, setActiveTab] = useState('current');
  const router = useRouter();

  const handleOrderPress = (order) => {
    router.push('/order-summary');
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Delivered':
        return {
          container: { backgroundColor: '#E8F5E9', borderColor: '#66D575', borderWidth: 1 },
          text: { color: '#4CAF50' }
        };
      case 'Cancelled':
        return {
          container: { backgroundColor: '#FFEBEE', borderColor: '#FF3D00', borderWidth: 1 },
          text: { color: '#F44336' }
        };
      default:
        return {
          container: { backgroundColor: '#E8F5E9', borderColor: '#66D575', borderWidth: 1 },
          text: { color: '#4CAF50' }
        };
    }
  };

  const renderOrderItem = ({ item }) => {
    const statusStyle = getStatusStyle(item.status);
    
    return (
      <TouchableOpacity 
        style={styles.orderCard}
        onPress={() => handleOrderPress(item)}
      >
        <View style={styles.orderImageContainer}>
          <View style={styles.imageContainer}>
            <Image 
              source={require('@/assets/mobile-images/Product Details/product details.png')}
              style={styles.productImage}
              resizeMode="contain"
            />
          </View>
        </View>
        <View style={styles.orderInfo}>
          <View style={styles.orderHeader}>
            <View>
              <Text style={styles.storeName}>{item.storeName}</Text>
              <Text style={styles.productName}>{item.productName}</Text>
            </View>
            <View style={[styles.statusContainer, statusStyle.container]}>
              <Text style={[styles.statusText, statusStyle.text]}>{item.status}</Text>
            </View>
          </View>
          <View style={styles.orderFooter}>
            <View style={styles.dateContainer}>
              <Ionicons name="calendar-outline" size={16} color="#666" />
              <Text style={styles.dateText}>{item.date}</Text>
            </View>
            <Text style={styles.priceText}>{item.price}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaWrapper style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Orders</Text>
      </View>

      <View style={styles.tabPillContainer}>
        <TouchableOpacity
          style={[styles.tabPill, activeTab === 'current' && styles.activeTabPill]}
          onPress={() => setActiveTab('current')}
        >
          <Text style={[styles.tabPillText, activeTab === 'current' && styles.activeTabPillText]}>Current Order</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabPill, activeTab === 'past' && styles.activeTabPill]}
          onPress={() => setActiveTab('past')}
        >
          <Text style={[styles.tabPillText, activeTab === 'past' && styles.activeTabPillText]}>Past Orders</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={activeTab === 'current' ? CURRENT_ORDERS : PAST_ORDERS}
        renderItem={renderOrderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.ordersList}
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: '#F6F6F6' }}
      />
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  header: {
    padding: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    alignSelf: 'center',
  },
  tabPillContainer: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 100,
    marginHorizontal: 16,
    marginBottom: 16,
    marginTop: 8,
    alignSelf: 'center',
    padding: 4,
  },
  tabPill: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 100,
    backgroundColor: 'transparent',
  },
  activeTabPill: {
    backgroundColor: '#111',
  },
  tabPillText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#111',
  },
  activeTabPillText: {
    color: '#FFF',
    fontWeight: '400',
  },
  ordersList: {
    padding: 16,
    paddingTop: 0,
  },
  orderCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginBottom: 16,
    padding: 12,
   
  },
  orderImageContainer: {
    marginRight: 12,
  },
  imageContainer: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF8F6',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  orderInfo: {
    flex: 1,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  storeName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  productName: {
    fontSize: 14,
    color: '#666',
  },
  statusContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 100,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  priceText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
});

export default OrdersScreen; 