import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { ListingGeo } from '@/interfaces/listingGeo';
import { useRouter } from 'expo-router';

interface Props {
    listings: any;
}

const INITIAL_REGION = {
    latitude: 37.33,
    longitude: -122,
    latitudeDelta: 9,
    longitudeDelta: 9,
}

const ListingsMap = ({ listings }: Props) => {
    // click marker to view listings details
    const router = useRouter();

    const onMarkerSelected = (item: ListingGeo) => {
        router.push(`/listing/${item.properties.id}`);
    };
  return (
    <View style={styles.container}>
        <MapView 
            style={StyleSheet.absoluteFill} 
            provider={PROVIDER_GOOGLE}
            showsUserLocation 
            showsMyLocationButton 
            initialRegion={INITIAL_REGION}
        >
            {listings.features.map((item: ListingGeo) => (
                <Marker 
                    key={item.properties.id}
                    onPress={() => onMarkerSelected(item)}
                    coordinate={{
                        latitude: +item.properties.latitude,
                        longitude: +item.properties.longitude
                    }} 
                >
                    <View style={styles.marker}>
                        <Text style={styles.markerText}>₦{item.properties.price},000</Text>
                    </View>
                </Marker>
            ))}
        </MapView>
    </View>
  );
};

export default ListingsMap;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    marker: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        padding: 6,
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: {
            width: 1,
            height: 10,
        },
    },
    markerText: {
        fontSize: 14,
        fontFamily: 'mon-sb',
    }
});