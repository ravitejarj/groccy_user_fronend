import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import SafeAreaWrapper from '@/components/Common/SafeAreaWrapper';

const CURRENT_ORDER_ITEMS = [
  {
    id: '1',
    name: 'Mantra Atta',
    price: 299,
    quantity: 1,
  },
  {
    id: '2',
    name: 'Reliance Fresh',
    price: 250,
    quantity: 1,
  },
  {
    id: '3',
    name: 'Dosa Junction',
    price: 199,
    quantity: 1,
  },
];

const PAST_ORDER_ITEMS = [
  {
    id: '1',
    name: 'Mantra Atta',
    price: 299,
    quantity: 1,
  },
  {
    id: '2',
    name: 'Reliance Fresh',
    price: 250,
    quantity: 1,
  },
  {
    id: '3',
    name: 'Dosa Junction',
    price: 199,
    quantity: 1,
  },
];

const OrderSummaryScreen = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('current');
  const orderItems = activeTab === 'current' ? CURRENT_ORDER_ITEMS : PAST_ORDER_ITEMS;
  const itemTotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 25;
  const tax = 25;
  const total = itemTotal + deliveryFee + tax;

  const renderOrderItem = (item) => (
    <TouchableOpacity key={item.id} style={styles.orderItem} onPress={() => router.push({ pathname: '/product', params: { name: item.name } })} activeOpacity={0.8}>
      <View style={styles.itemInfo}>
        <View style={styles.productImage}>
          <Image 
            source={require('@/assets/mobile-images/Product Details/product details.png')}
            style={styles.productImageStyle}
            resizeMode="contain"
          />
        </View>
        <View style={styles.itemDetails}>
          <Text style={styles.itemName}>{item.name}</Text>
          
          <Text style={styles.itemPrice}>${item.price}</Text>
        </View>
      </View>
      <View style={styles.quantityControl}>
        <TouchableOpacity style={styles.quantityButton}>
          <Text style={styles.quantityButtonText}>−</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{item.quantity}</Text>
        <TouchableOpacity style={styles.quantityButton}>
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaWrapper style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Big bazaar Order</Text>
      </View>
      <View style={styles.orderNumber}>
        <Text style={styles.orderNumberText}>Order Number: #123456</Text>
      </View>
      <ScrollView style={[styles.content, { backgroundColor: '#F6F6F6' }]} showsVerticalScrollIndicator={false}>
        <View style={styles.orderItems}>
          {orderItems.map(renderOrderItem)}
        </View>
        <View style={styles.infoCard}>
          <Ionicons name="location-outline" size={20} color="#FF5722" style={{ marginRight: 8 }} />
          <View>
            <Text style={styles.infoTitle}>Deliver to  → Home</Text>
            <Text style={styles.infoSubtitle}>221B Baker Street, London, United Kingdom</Text>
          </View>
        </View>
        <View style={styles.infoCard}>
          <Ionicons name="card-outline" size={20} color="#FF5722" style={{ marginRight: 8 }} />
          <View>
            <Text style={styles.infoTitle}>Payment card</Text>
            <Text style={styles.infoSubtitle}>Card last 4 digits: 1234</Text>
          </View>
        </View>
        <View style={styles.billSection}>
          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Item Total</Text>
            <Text style={styles.billValue}>${itemTotal}</Text>
          </View>
          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Delivery</Text>
            <Text style={styles.billValue}>${deliveryFee}</Text>
          </View>
          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Tax</Text>
            <Text style={styles.billValue}>${tax}</Text>
          </View>
          <View style={[styles.billRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalAmount}>${total}</Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.reorderButton}>
          <Text style={styles.reorderButtonText}>Reorder</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  header: {
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 100,
    marginHorizontal: 24,
    marginBottom: 12,
    marginTop: 8,
    alignSelf: 'center',
    padding: 4,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 100,
  },
  orderNumber:{
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
  },
  
  
  orderItems: {
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 0,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
  itemInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  productImage: {
    width: 48,
    height: 48,
    backgroundColor: '#FFF8F6',
    borderRadius: 8,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  productImageStyle: {
    width: '100%',
    height: '100%',
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
    marginTop: 18,
    marginBottom: 12,
  },
  
  itemPrice: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 18,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 4,
  },
  quantityButton: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 20,
    color: '#333',
    lineHeight: 20,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    paddingHorizontal: 12,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 12,
    marginTop: 8,
    marginBottom: 0,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  infoSubtitle: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  billSection: {
    marginHorizontal: 12,
    marginTop: 16,
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  billLabel: {
    fontSize: 14,
    color: '#666',
  },
  billValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  totalRow: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FF5722',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',

  },
  reorderButton: {
    backgroundColor: '#FF5722',
    borderRadius: 100,
    paddingVertical: 16,
    alignItems: 'center',
  },
  reorderButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
});

export default OrderSummaryScreen; 