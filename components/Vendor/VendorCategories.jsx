import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text, TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import CategoryBox from './CategoryBox';

const DUMMY_IMAGE = require('@/assets/mobile-images/Grocery products/Group 4534568.png');

const CATEGORIES = [
  {
    id: 1,
    title: 'Grocery & Kitchen',
    items: [
      { id: 1, name: 'Vegetables & Fruits', image: DUMMY_IMAGE },
      { id: 2, name: 'Atta, Rice & Dal', image: DUMMY_IMAGE },
      { id: 3, name: 'Oil, Ghee & Masala', image: DUMMY_IMAGE },
      { id: 4, name: 'Dairy, Bread & Eggs', image: DUMMY_IMAGE },
      { id: 5, name: 'Bakery & Biscuits', image: DUMMY_IMAGE },
      { id: 6, name: 'Dry Fruits & Cereals', image: DUMMY_IMAGE },
      { id: 7, name: 'Chicken, Meat & Fish', image: DUMMY_IMAGE },
      { id: 8, name: 'Kitchenware & Appliances', image: DUMMY_IMAGE },
    ]
  },
  {
    id: 2,
    title: 'Snacks & Drinks',
    items: [
      { id: 1, name: 'Chips & Namkeen', image: DUMMY_IMAGE },
      { id: 2, name: 'Sweets & Chocolates', image: DUMMY_IMAGE },
      { id: 3, name: 'Drinks & Juices', image: DUMMY_IMAGE },
      { id: 4, name: 'Tea, Coffee & Milk Drinks', image: DUMMY_IMAGE },
      { id: 5, name: 'Instant & Frozen', image: DUMMY_IMAGE },
      { id: 6, name: 'Sauces & Spreads', image: DUMMY_IMAGE },
      { id: 7, name: 'Cigarettes & Lighters', image: DUMMY_IMAGE },
      { id: 8, name: 'Ice Creams & Desserts', image: DUMMY_IMAGE },
    ]
  },
];

const CARD_MARGIN = 11;
const CARDS_PER_ROW = 4;

export default function VendorCategories() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [searchQuery, setSearchQuery] = useState('');

  const handleCategoryPress = (category, item) => {
    router.push({
      pathname: '/vendor',
      params: {
        store: params.store,
        category: category.title,
        subcategory: item.name,
      },
    });
  };

  const filteredCategories = searchQuery
    ? CATEGORIES.map(category => ({
        ...category,
        items: (category.items || []).filter(item =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      })).filter(category => category.items.length > 0)
    : CATEGORIES;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#222" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{params.store || 'Patel Brothers'}</Text>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#bbb" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder={`Search in ${params.store || 'Patel Brothers'}...`}
          placeholderTextColor="#bbb"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery !== '' && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close" size={18} color="#bbb" style={{ marginLeft: 8 }} />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {filteredCategories.map(category => (
          <View key={category.id}>
            <Text style={styles.sectionTitle}>{category.title}</Text>
            <View style={styles.grid}>
              {category.items.map((item, index) => (
                <TouchableOpacity
                  key={item.id}
                  activeOpacity={0.8}
                  onPress={() => handleCategoryPress(category, item)}
                  style={{
                    marginLeft: index % CARDS_PER_ROW === 0 ? CARD_MARGIN : 0,
                    marginRight: CARD_MARGIN,
                    marginBottom: CARD_MARGIN,
                  }}
                >
                  <CategoryBox image={item.image} label={item.name} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
        <View style={{ height: 16 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 8,
    backgroundColor: '#fff',
  },
  backButton: {
    paddingRight: 8,
    paddingVertical: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#222',
    marginLeft: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 14,
    marginVertical: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#f6f6f6',
    borderRadius: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#222',
  },
  content: {
    paddingBottom: 10,
  },
  sectionTitle: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#262626',
    marginTop: 16,
    marginLeft: 18,
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: 0,
  },
});
