import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
const router = require('expo-router').useRouter();

const FOOD_ITEMS = [
  {
    id: '1',
    name: 'Biryani',
    rating: 4.5,
    price: '$15',
    deliveryTime: '30-40 min',
  },
  {
    id: '2',
    name: 'Curry',
    rating: 4.2,
    price: '$12',
    deliveryTime: '25-35 min',
  },
];

const RESTAURANT_VENDORS = [
  {
    id: '1',
    name: 'Biryani Palace',
    cuisine: 'Hyderabadi Cuisine',
    location: 'Iselin, NJ',
    rating: 4.6,
    time: '35 mins',
    image: require('@/assets/mobile-images/Restaurant Vendor/restaurant vendor image.png'),
  },
  {
    id: '2',
    name: 'Masala Wok',
    cuisine: 'North Indian',
    location: 'Edison, NJ',
    rating: 4.3,
    time: '20 mins',
    image: require('@/assets/mobile-images/Restaurant Vendor/restaurant vendor image.png'),
  },
  {
    id: '3',
    name: 'Tandoori Nights',
    cuisine: 'Punjabi Cuisine',
    location: 'Jersey City, NJ',
    rating: 4.5,
    time: '30 mins',
    image: require('@/assets/mobile-images/Restaurant Vendor/restaurant vendor image.png'),
  },
  {
    id: '4',
    name: 'Spice Villa',
    cuisine: 'South Indian',
    location: 'Newark, NJ',
    rating: 4.4,
    time: '25 mins',
    image: require('@/assets/mobile-images/Restaurant Vendor/restaurant vendor image.png'),
  },
  {
    id: '5',
    name: 'Bombay Bites',
    cuisine: 'Street Food',
    location: 'Hoboken, NJ',
    rating: 4.2,
    time: '28 mins',
    image: require('@/assets/mobile-images/Restaurant Vendor/restaurant vendor image.png'),
  },
  {
    id: '6',
    name: 'Curry House',
    cuisine: 'Indian',
    location: 'Princeton, NJ',
    rating: 4.1,
    time: '32 mins',
    image: require('@/assets/mobile-images/Restaurant Vendor/restaurant vendor image.png'),
  },
  {
    id: '7',
    name: 'Royal Kitchen',
    cuisine: 'Mughlai',
    location: 'Trenton, NJ',
    rating: 4.7,
    time: '40 mins',
    image: require('@/assets/mobile-images/Restaurant Vendor/restaurant vendor image.png'),
  },
  {
    id: '8',
    name: 'Urban Dhaba',
    cuisine: 'Dhaba Style',
    location: 'Paterson, NJ',
    rating: 4.0,
    time: '22 mins',
    image: require('@/assets/mobile-images/Restaurant Vendor/restaurant vendor image.png'),
  },
];

const CARD_GAP = 8;
const CARD_WIDTH = (Dimensions.get('window').width - 12 * 2 - CARD_GAP) / 2; // 16px padding on both sides + 16px gap between

const FoodList = () => {
  const renderFoodItem = (item) => (
    <TouchableOpacity key={item.id} style={styles.foodItem} onPress={() => router.push({ pathname: 'location/restaurantsubcategories', params: { name: item.name } })} activeOpacity={0.8}>
      <View style={styles.imageContainer}>
        <View style={styles.imagePlaceholder}>
          <Ionicons name="restaurant" size={32} color="#FF5722" />
        </View>
      </View>
      <View style={styles.foodInfo}>
        <Text style={styles.foodName}>{item.name}</Text>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={16} color="#FFB300" />
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.priceText}>{item.price}</Text>
          <View style={styles.deliveryTime}>
            <Ionicons name="time-outline" size={14} color="#666" />
            <Text style={styles.timeText}>{item.deliveryTime}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderRestaurantVendor = ({ item: vendor }) => (
    <TouchableOpacity key={vendor.id} style={[styles.vendorCard, { width: CARD_WIDTH }]} onPress={() => router.push({ pathname: '/restaurantScreen1', params: { store: vendor.name } })}>
      <Image source={vendor.image} style={styles.vendorImage} resizeMode="cover" />
      <View style={styles.vendorInfo}>
        <Text style={styles.vendorName}>{vendor.name}</Text>
        <View style={styles.vendorRatingRow}>
          <Ionicons name="star" size={18} color="#FFB300" style={{ marginRight: 2 }} />
          <Text style={styles.vendorRating}>{vendor.rating}</Text>
        </View>
        <Text style={styles.vendorCuisine}>{vendor.cuisine}</Text>
        <View style={styles.vendorDetailsRow}>
          <Ionicons name="location-outline" size={16} color="#B0B0B0" style={{ marginRight: 4 }} />
          <Text style={styles.vendorLocation}>{vendor.location}</Text>
          <Ionicons name="time-outline" size={16} color="#B0B0B0" style={{ marginLeft: 16, marginRight: 4 }} />
          <Text style={styles.vendorTime}>{vendor.time}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Near of you</Text>
        <TouchableOpacity>
          <Text style={styles.viewMore}>View More</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={RESTAURANT_VENDORS}
        renderItem={renderRestaurantVendor}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.gridRow}
        contentContainerStyle={{ gap: 16 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'transparent',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  viewMore: {
    fontSize: 14,
    color: '#666',
  },

  foodItem: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 12,
    
    elevation: 2,
  },
  imageContainer: {
    marginRight: 12,
  },
  imagePlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: '#FFF8F6',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  foodInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  foodName: {
    fontSize: 11,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  ratingText: {
    fontSize: 13,
    color: '#666',
    marginLeft: 4,
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF5722',
  },
  deliveryTime: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 11,
    color: '#666',
    marginLeft: 4,
  },
  gridRow: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  vendorCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    marginBottom: 0,
    padding: 0,
    paddingBottom: 10,
    overflow: 'hidden',
    minWidth: 0,
  },
  vendorImage: {
    width: '100%',
    height: 140,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  vendorInfo: {
    padding: 8,
  },
  vendorName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#222',
    marginBottom: 4,
  },
  vendorRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  vendorRating: {
    fontSize: 16,
    color: '#888',
    marginLeft: 2,
    fontWeight: '500',
  },
  vendorCuisine: {
    fontSize: 15,
    color: '#999',
    marginBottom: 8,
  },
  vendorDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  vendorLocation: {
    fontSize: 11,
    color: '#B0B0B0',
    marginRight: 8,
  },
  vendorTime: {
    fontSize: 11,
    color: '#B0B0B0',
  },
});

export default FoodList; 