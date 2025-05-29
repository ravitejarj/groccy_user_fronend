import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Dimensions,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import SafeAreaWrapper from '@/components/Common/SafeAreaWrapper';
import { Swipeable } from 'react-native-gesture-handler';

const DEMO_CART = [
  {
    id: '1',
    name: 'Mantra Atta',
    price: 299,
    quantity: 1,
    deliveryTime: '25 mins',
    image: null,
  },
  {
    id: '2',
    name: 'Reliance Fresh',
    price: 250,
    quantity: 1,
    deliveryTime: '30 mins',
    image: null,
  },
  {
    id: '3',
    name: 'Dosa Junction',
    price: 199,
    quantity: 1,
    deliveryTime: '15 mins',
    image: null,
  },
];

const { width } = Dimensions.get('window');

export default function CartScreen() {
  const router = useRouter();
  const [cart, setCart] = useState(DEMO_CART);
  const [promo, setPromo] = useState('');
  const [showCheckout, setShowCheckout] = useState(false);
  const [address, setAddress] = useState('101 S Burbank Drive 36117');
  const [phone, setPhone] = useState('98765 43210');
  const [countryCode, setCountryCode] = useState('+1');

  const handleDelete = (id) => {
    setCart((prev) => prev.filter(item => item.id !== id));
  };
  const handleAdd = (id) => {
    setCart((prev) => prev.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
  };
  const handleRemove = (id) => {
    setCart((prev) => prev.map(item => item.id === id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item));
  };

  const itemTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 25;
  const total = itemTotal + deliveryFee;

  const renderRightActions = (id) => (
    <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(id)}>
      <Ionicons name="trash" size={24} color="#FFF" />
    </TouchableOpacity>
  );

  const renderCartItem = ({ item }) => (
    <Swipeable renderRightActions={() => renderRightActions(item.id)}>
      <View style={styles.cartItem}>
        <View style={styles.productImage}>
          <Image 
            source={require('@/assets/mobile-images/Product Details/product details.png')}
            style={styles.productImageStyle}
            resizeMode="contain"
          />
        </View>
        <View style={styles.itemDetails}>
          <Text style={styles.itemName}>{item.name}</Text>
          <View style={styles.deliveryTimeRow}>
            <Ionicons name="time-outline" size={14} color="#666" />
            <Text style={styles.timeText}>{item.deliveryTime}</Text>
          </View>
          <Text style={styles.itemPrice}>${item.price}</Text>
        </View>
        <View style={styles.quantitySelector}>
          <TouchableOpacity onPress={() => handleRemove(item.id)} style={styles.qtyBtn}>
            <Ionicons name="remove" size={18} color="#FF5722" />
          </TouchableOpacity>
          <Text style={styles.qtyText}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => handleAdd(item.id)} style={styles.qtyBtn}>
            <Ionicons name="add" size={18} color="#FF5722" />
          </TouchableOpacity>
        </View>
      </View>
    </Swipeable>
  );

  // Empty cart screen
  if (cart.length === 0) {
    return (
      <SafeAreaWrapper style={{ flex: 1 }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 }}>
          <TouchableOpacity onPress={() => router.back()} style={{ alignSelf: 'flex-start', marginBottom: 24 }}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Ionicons name="cart-outline" size={64} color="#FF5722" style={{ marginBottom: 24 }} />
          <Text style={{ fontSize: 20, fontWeight: '700', color: '#222', marginBottom: 8 }}>My Cart</Text>
          <View style={{ alignItems: 'center', marginTop: 24 }}>
            <Ionicons name="cube-outline" size={80} color="#FFB184" style={{ marginBottom: 16 }} />
            <Text style={{ fontSize: 20, fontWeight: '600', color: '#333', marginBottom: 8 }}>Your cart is empty!</Text>
            <Text style={{ fontSize: 14, color: '#666', marginBottom: 24, textAlign: 'center' }}>
              Explore and add items to the cart to show here...
            </Text>
            <TouchableOpacity style={styles.checkoutBtn} onPress={() => router.push('/(tabs)')}>
              <Text style={styles.checkoutBtnText}>Explore</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaWrapper>
    );
  }

  return (
    <SafeAreaWrapper style={{ flex: 1 , paddingBottom: 0  }}>
      <FlatList
        ListHeaderComponent={
          <>
            <View style={styles.headerRow}>
              <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                <Ionicons name="arrow-back" size={24} color="#333" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>My Cart</Text>
            </View>
            <Text style={styles.totalItems}>Total Items ({cart.length})</Text>
          </>
        }
        data={cart}
        renderItem={renderCartItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.cartList}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          <>
            <View style={styles.promoRow}>
              <Ionicons name="pricetag-outline" size={20} color="#999" style={{ marginRight: 8 }} />
              <TextInput
                style={styles.promoInput}
                placeholder="Enter your promo code"
                value={promo}
                onChangeText={setPromo}
              />
              <TouchableOpacity style={styles.applyBtn}>
                <Text style={styles.applyBtnText}>Apply</Text>
              </TouchableOpacity>
            </View>
            {showCheckout && (
              <>
                {/* Delivery Section */}
                <View style={{ marginHorizontal: 16, marginBottom: 16, backgroundColor: '#FFF', borderRadius: 16, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 1 }}>
                  <Text style={{ fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 12 }}>Delivering To</Text>
                  <View style={{ backgroundColor: '#F5F5F5', borderRadius: 12, marginBottom: 12, overflow: 'hidden', height: 100, justifyContent: 'center', alignItems: 'center' }}>
                    {/* Placeholder for map */}
                    <Ionicons name="map-outline" size={60} color="#DDD" />
                  </View>
                  <Text style={{ fontSize: 13, color: '#666', marginBottom: 4 }}>Address</Text>
                  <TextInput style={{ backgroundColor: '#F5F5F5', borderRadius: 8, padding: 10, marginBottom: 12, fontSize: 15 }} value={address} onChangeText={setAddress} />
                  <Text style={{ fontSize: 13, color: '#666', marginBottom: 4 }}>Phone Number</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                    <View style={{ backgroundColor: '#F5F5F5', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8, marginRight: 8 }}>
                      <Text style={{ fontSize: 15, color: '#333' }}>{countryCode}</Text>
                    </View>
                    <TextInput style={{ backgroundColor: '#F5F5F5', borderRadius: 8, padding: 10, flex: 1, fontSize: 15 }} value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
                  </View>
                  <TouchableOpacity style={{ borderWidth: 1, borderColor: '#FF5722', borderRadius: 24, paddingVertical: 10, alignItems: 'center', marginTop: 4 }}>
                    <Text style={{ color: '#FF5722', fontWeight: '600', fontSize: 16 }}>Change</Text>
                  </TouchableOpacity>
                </View>
                {/* Payment Section */}
                <View style={{ backgroundColor: '#FFF', borderRadius: 16, marginHorizontal: 16, marginBottom: 16, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 1 }}>
                  <Text style={{ fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 12 }}>Payment Method</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                    <Ionicons name="card" size={32} color="#1976D2" style={{ marginRight: 12 }} />
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontSize: 15, fontWeight: '600', color: '#333' }}>Mastercard</Text>
                      <Text style={{ fontSize: 14, color: '#666' }}>**** **** **** 1234</Text>
                    </View>
                    <TouchableOpacity onPress={() => router.push('/payment-methods')}>
                      <Text style={{ color: '#FF5722', fontWeight: '600', fontSize: 15 }}>Change</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}
            <View style={styles.summaryBox}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Item Total</Text>
                <Text style={styles.summaryValue}>${itemTotal}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Delivery</Text>
                <Text style={styles.summaryValue}>${deliveryFee}</Text>
              </View>
              {showCheckout && (
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Tax</Text>
                  <Text style={styles.summaryValue}>$25</Text>
                </View>
              )}
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabelTotal}>Total</Text>
                <Text style={styles.summaryValueTotal}>${showCheckout ? (total + 25) : total}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.checkoutBtn} onPress={() => showCheckout ? router.push('/order-success') : setShowCheckout(true)}>
              <Text style={styles.checkoutBtnText}>{showCheckout ? 'Confirm Order' : 'Checkout'}</Text>
            </TouchableOpacity>
          </>
        }
      />
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingBottom: 0,
  },
  backBtn: {
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  totalItems: {
    fontSize: 14,
    color: '#666',
    marginLeft: 16,
    marginBottom: 8,
  },
  cartList: {
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginBottom: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  productImage: {
    width: 56,
    height: 56,
    backgroundColor: '#FFF8F6',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
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
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  deliveryTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  timeText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginLeft: 8,
  },
  qtyBtn: {
    padding: 4,
  },
  qtyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginHorizontal: 8,
  },
  deleteButton: {
    backgroundColor: '#F44336',
    justifyContent: 'center',
    alignItems: 'center',
    width: 56,
    height: '90%',
    borderRadius: 12,
    marginVertical: 6,
  },
  promoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    margin: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  promoInput: {
    flex: 1,
    fontSize: 15,
    color: '#333',
    padding: 0,
  },
  applyBtn: {
    backgroundColor: '#FF5722',
    borderRadius: 8,
    paddingHorizontal: 18,
    paddingVertical: 8,
    marginLeft: 8,
  },
  applyBtnText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 15,
  },
  summaryBox: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 15,
    color: '#666',
  },
  summaryValue: {
    fontSize: 15,
    color: '#333',
  },
  summaryLabelTotal: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
  summaryValueTotal: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FF5722',
  },
  checkoutBtn: {
    backgroundColor: '#FF5722',
    borderRadius: 24,
    margin: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  checkoutBtnText: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: '600',
  },
}); 