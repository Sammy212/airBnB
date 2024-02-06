import { View, Image, Text, Platform, FlatList, ListRenderItem, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { defaultStyles } from '@/constants/Styles';
import { Link } from 'expo-router';
import { Listing } from '@/interfaces/listing';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  listings: any[];
  category: string;
}

const Listings = ({ listings: items, category }: Props) => {
  const [loading, setLoading] = useState(false);
  const listRef = useRef<FlatList>(null);

  // setLoading(true);

  useEffect(() => {
    console.log('RELOAD LISTINGS: ', items.length);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 200);
    
  }, [category]);

  
  // Shorten the length of the name
  const truncateString = (str: string, maxLength: number): string => {
    if (str.length > maxLength) {
      return str.slice(0, maxLength) + '..'; // Truncate and add ellipsis
    } else {
      return str;
    }
  };

  const renderRow: ListRenderItem<Listing> = ({ item }) => (
    

    <Link href={`/listing/${item.id}`} asChild>
      <TouchableOpacity>
        <View style={styles.listing}>
          {/* listing image */}
          <Image source={{uri: item.medium_url}} style={styles.image}/>
          <TouchableOpacity style={styles.likeBtn}>
            <Ionicons name='heart-outline' size={24} color={'#000'}/> 
          </TouchableOpacity>

          {/* listing infomation */}
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{ fontFamily: 'mon-sb', fontSize: 16 }}>{truncateString(item.name, 26)}</Text>
            {/* Rating */}
            <View style={{flexDirection: 'row', gap: 4 }}>
              <Ionicons name='star' size={16}/>
              <Text style={{ fontFamily: 'mon-sb' }}>{item.review_scores_rating /20}</Text>
            </View>
          </View>
          {/* Listing Type */}
          <Text style={{ fontFamily: 'mon' }}>{item.room_type}</Text>
          {/* Price */}
          <View style={{ flexDirection: 'row', gap: 5 }}>
            <Text style={{ fontFamily: 'mon-sb' }}>₦{item.price},000</Text>
            <Text style={{ fontFamily: 'mon' }}>night</Text>
          </View>
        </View>

      </TouchableOpacity>
    </Link>
  )

  return (
    <View style={defaultStyles.container}>
      <FlatList
        ref={listRef}
        renderItem={renderRow}
        data={loading ? [] : items}
      />
    </View>
  )
};

const styles = StyleSheet.create({
  listing: {
    padding: 16,
    gap: 10,
    marginVertical: 16,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 16,
  },
  likeBtn: {
    position: 'absolute',
    right: 30,
    top: 30
  },
})


export default Listings;

