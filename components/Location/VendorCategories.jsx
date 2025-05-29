import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import SafeAreaWrapper from '@/components/Common/SafeAreaWrapper';

const CATEGORIES = [
  {
    id: 1,
    title: 'Cooking Essentials',
    items: [
      { id: 1, name: 'Oil', image: require('@/assets/mobile-images/Grocery products/Group 4534568.png') },
      { id: 2, name: 'Masalas', image: require('@/assets/mobile-images/Grocery products/Group 4534568.png') },
      { id: 3, name: 'Salt, Sugar', image: require('@/assets/mobile-images/Grocery products/Group 4534568.png') },
      { id: 4, name: 'Wheat & Soya', image: require('@/assets/mobile-images/Grocery products/Group 4534568.png') },
    ]
  },
  {
    id: 2,
    title: 'Dairy & Bakery',
    items: [
      { id: 1, name: 'Milk', image: require('@/assets/mobile-images/Grocery products/Group 4534568.png') },
      { id: 2, name: 'Bread', image: require('@/assets/mobile-images/Grocery products/Group 4534568.png') },
      { id: 3, name: 'Butter', image: require('@/assets/mobile-images/Grocery products/Group 4534568.png') },
      { id: 4, name: 'Cheese', image: require('@/assets/mobile-images/Grocery products/Group 4534568.png') },
    ]
  },
  {
    id: 3,
    title: 'Rice & Pulses',
    items: [
      { id: 1, name: 'Basmati Rice', image: require('@/assets/mobile-images/Grocery products/Group 4534568.png') },
      { id: 2, name: 'Brown Rice', image: require('@/assets/mobile-images/Grocery products/Group 4534568.png') },
      { id: 3, name: 'Toor Dal', image: require('@/assets/mobile-images/Grocery products/Group 4534568.png') },
      { id: 4, name: 'Moong Dal', image: require('@/assets/mobile-images/Grocery products/Group 4534568.png') },
    ]
  },
  {
    id: 4,
    title: 'Personal Care',
    items: [
      { id: 1, name: 'Soap', image: require('@/assets/mobile-images/Grocery products/Group 4534568.png') },
      { id: 2, name: 'Shampoo', image: require('@/assets/mobile-images/Grocery products/Group 4534568.png') },
      { id: 3, name: 'Toothpaste', image: require('@/assets/mobile-images/Grocery products/Group 4534568.png') },
      { id: 4, name: 'Face Wash', image: require('@/assets/mobile-images/Grocery products/Group 4534568.png') },
    ]
  },
  {
    id: 5,
    title: 'Snacks & Beverages',
    items: [
      { id: 1, name: 'Chips', image: require('@/assets/mobile-images/Grocery products/Group 4534568.png') },
      { id: 2, name: 'Biscuits', image: require('@/assets/mobile-images/Grocery products/Group 4534568.png') },
      { id: 3, name: 'Soft Drinks', image: require('@/assets/mobile-images/Grocery products/Group 4534568.png') },
      { id: 4, name: 'Tea & Coffee', image: require('@/assets/mobile-images/Grocery products/Group 4534568.png') },
    ]
  }
];

const VendorCategories = () => {
  const router = useRouter();
  const { store } = useLocalSearchParams();
  const [searchQuery, setSearchQuery] = useState('');

  const handleCategoryPress = (category, item) => {
    router.push({
      pathname: '/vendor',
      params: {
        store,
        category: category.title,
        subcategory: item.name
      }
    });
  };

  return (
    <SafeAreaWrapper style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.storeName}>{store || 'Patel Brothers'}</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder={`Search in ${store || 'Patel Brothers'}...`}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999"
          />
          {searchQuery ? (
            <TouchableOpacity 
              onPress={() => setSearchQuery('')}
              style={styles.clearButton}
            >
              <Ionicons name="close" size={16} color="#666" />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {CATEGORIES.map(category => (
          <View key={category.id} style={styles.categorySection}>
            <Text style={styles.categoryTitle}>{category.title}</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.itemsContainer}
            >
              {category.items.map(item => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.itemCard}
                  onPress={() => handleCategoryPress(category, item)}
                >
                  <Image
                    source={item.image}
                    style={styles.itemImage}
                    resizeMode="cover"
                  />
                  <Text style={styles.itemName}>{item.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        ))}
      </ScrollView>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 8,
  },
  storeName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    height: '100%',
    padding: 0,
  },
  clearButton: {
    padding: 4,
  },
  content: {
    flex: 1,
  },
  categorySection: {
    marginBottom: 24,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  itemsContainer: {
    paddingHorizontal: 12,
    gap: 12,
  },
  itemCard: {
    width: 100,
    alignItems: 'center',
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 16,
    backgroundColor: '#FFF8F6',
    marginBottom: 8,
  },
  itemName: {
    fontSize: 13,
    color: '#333',
    textAlign: 'center',
  },
});

export default VendorCategories; 