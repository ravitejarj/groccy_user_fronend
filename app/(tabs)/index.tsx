import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import SafeAreaWrapper from '@/components/Common/SafeAreaWrapper';
import HomeHeader from '@/components/Home/HomeHeader';
import SearchBar from '@/components/Home/SearchBar';
import PromoBanner from '@/components/Home/PromoBanner';
import CategorySelector from '@/components/Home/CategorySelector';
import GroceryStoreList from '@/components/Home/GroceryStoreList';
import FoodList from '@/components/Home/FoodList';

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState('grocery');

  const renderCategoryContent = () => {
    switch (activeCategory) {
      case 'grocery':
        return (
          <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1, backgroundColor: '#F6F6F6' }}>
            <GroceryStoreList />
          </ScrollView>
        );
      case 'food':
        return <FoodList />;
      case 'stores':
        return (
          <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1, backgroundColor: '#F6F6F6' }}>
            <View style={{ padding: 32, alignItems: 'center', justifyContent: 'center' }}>
              <View style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: '#F5F5F5',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 16,
              }}>
                {/* Placeholder icon */}
              </View>
              <View>
                <View style={{ alignItems: 'center' }}>
                  <View style={{ height: 24 }} />
                  <View style={{ width: 120, height: 16, backgroundColor: '#EEE', borderRadius: 8 }} />
                </View>
                <View style={{ height: 8 }} />
                <View style={{ width: 180, height: 12, backgroundColor: '#EEE', borderRadius: 6 }} />
              </View>
              <View style={{ alignItems: 'center', marginTop: 16 }}>
                <View style={{ width: 200, height: 16, backgroundColor: '#EEE', borderRadius: 8 }} />
                <View style={{ height: 8 }} />
                <View style={{ width: 160, height: 12, backgroundColor: '#EEE', borderRadius: 6 }} />
              </View>
            </View>
          </ScrollView>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaWrapper style={{ flex: 1, backgroundColor: '#F6F6F6', marginBottom: 0, paddingBottom: 0 }}>
      <HomeHeader />
      <View style={{ height: 0 }} />
      <SearchBar />
      <View style={{ height: 0 }} />
      <PromoBanner />
      <CategorySelector activeCategory={activeCategory} onSelectCategory={setActiveCategory} />
      {renderCategoryContent()}
    </SafeAreaWrapper>
  );
}
