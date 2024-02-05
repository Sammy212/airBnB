import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import React, { useRef, useState } from 'react';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import * as Haptics from 'expo-haptics';


// Category Data
const categories = [
    {
      name: 'Tiny homes',
      icon: 'home',
    },
    {
      name: 'Cabins',
      icon: 'house-siding',
    },
    {
      name: 'Trending',
      icon: 'local-fire-department',
    },
    {
      name: 'Play',
      icon: 'videogame-asset',
    },
    {
      name: 'City',
      icon: 'apartment',
    },
    {
      name: 'Beachfront',
      icon: 'beach-access',
    },
    {
      name: 'Countryside',
      icon: 'nature-people',
    },
];

interface Props {
  onCategoryChanged: (category: string) => void
}

const ExploreHeader = ({ onCategoryChanged }: Props) => {
  const scrollRef = useRef<ScrollView>(null);
  
  // Tract active|selected categories
  const itemsRef = useRef<Array<TouchableOpacity | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const selectCategory = (index: number) => {
    const selected = itemsRef.current[index];
    setActiveIndex(index);

    selected?.measure((x) => {
      scrollRef.current?.scrollTo({ x: x -16, y: 0, animated: true });
    })

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onCategoryChanged(categories[index].name)
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }} >
        <View style={styles.container}>
            <View style={styles.actionRow}>
                <Link href={'/(modals)/booking'} asChild>
                    <TouchableOpacity style={styles.searchBtn}>
                      <Ionicons name='search' size={24}/>
                      <View>
                        <Text style={{ fontFamily: 'mon-sb' }}>Where to?</Text>
                        <Text style={{ fontFamily: 'mon', color: Colors.grey }}>Anywhere Any week</Text>
                      </View>
                    </TouchableOpacity>
                </Link>

                <TouchableOpacity style={styles.filterBtn}>
                    <Ionicons name='options-outline' size={24} />
                </TouchableOpacity>
            </View>

            <ScrollView 
              ref={scrollRef}
              horizontal={true} 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.mainCat} 
              // need more research why contentContainerStyle rather than default style
            >
              { categories.map((item, index) => (
                <TouchableOpacity 
                  key={index}
                  onPress={() => selectCategory(index)}
                  ref={(el) => itemsRef.current[index] = el}
                  style={activeIndex === index ? styles.categoriesBtnActive : styles.categoriesBtn}
                >
                  <MaterialIcons 
                    size={24} 
                    name={item.icon as any} 
                    color={activeIndex === index ? '#000' : Colors.grey}
                  />
                  <Text 
                    style={activeIndex === index ? styles.categoryTextActive : styles.categoryText}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
        </View>
    </SafeAreaView>
  );
};


// Styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: 130,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 16,
    gap: 10,
  },
  filterBtn: {
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.grey,
    borderRadius: 24,
  },
  searchBtn: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    gap: 10,
    padding: 7,
    alignItems: 'center',
    flex: 1,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#c2c2c2',
    borderRadius: 30,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
  mainCat: {
    alignItems: 'center',
    gap: 30,
    paddingHorizontal: 16,
  },
  categoryText: {
    fontSize: 14,
    fontFamily: 'mon-sb',
    color: Colors.grey,
  },
  categoryTextActive: {
    fontSize: 14,
    fontFamily: 'mon-sb',
    color: '#000',
  },
  categoriesBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 8,
  },
  categoriesBtnActive: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 8,
    borderBottomColor: '#000',
    borderBottomWidth: 2,
  },
});


export default ExploreHeader