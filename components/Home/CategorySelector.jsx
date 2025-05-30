import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const categories = [
  { id: 1, name: 'Grocery', icon: 'cart-outline' },
  { id: 2, name: 'Food', icon: 'fast-food-outline' },
  { id: 3, name: 'Stores', icon: 'storefront-outline' },
  { id: 4, name: 'Pharmacy', icon: 'medical-outline' },
  { id: 5, name: 'Electronics', icon: 'phone-portrait-outline' },
  { id: 6, name: 'Fashion', icon: 'shirt-outline' },
];

const CategorySelector = ({ activeCategory, onSelectCategory }) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabBar}
      >
        {categories.map((category) => {
          const isActive = activeCategory === category.name.toLowerCase();
          return (
            <TouchableOpacity
              key={category.id}
              style={[styles.tab, isActive && styles.activeTab]}
              onPress={() => onSelectCategory(category.name.toLowerCase())}
              activeOpacity={0.8}
            >
              <Ionicons
                name={category.icon}
                size={20}
                color={isActive ? '#ffffff' : '#666'}
                style={{ marginRight: 8 }}
              />
              <Text style={[styles.tabText, isActive && styles.activeTabText]}>{category.name}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 14,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 110,
    alignItems: 'center',
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 22,
    marginHorizontal: 4,
  },
  activeTab: {
    backgroundColor: '#FF5722',
    paddingVertical: 10,
  },
  tabText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#666',
  },
  activeTabText: {
    color: '#FFF',
  },
});

export default CategorySelector; 