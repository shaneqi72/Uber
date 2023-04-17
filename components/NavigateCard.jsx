import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from '@env';
import { useDispatch } from 'react-redux';
import { setDestination } from '../slices/navSlice';
import { useNavigation } from '@react-navigation/native';
import NavFavourites from './NavFavourites';
import { Icon } from '@rneui/themed';

const NavigateCard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <Text style={tw`text-center py-5 text-xl`}>Good Morning, Shane</Text>
      <View style={tw`border-t border-gray-200 flex-shrink`}>
        <View>
          <GooglePlacesAutocomplete
            placeholder="Where to?"
            styles={toInputBoxStyles}
            enablePoweredByContainer={false}
            fetchDetails={true}
            query={{ key: GOOGLE_MAPS_APIKEY, language: 'en' }}
            onPress={(data, details = null) => {
              dispatch(setDestination({ location: details.geometry.location, description: data.description }));
              navigation.navigate('RideOptionsCard');
            }}
            returnKeyType={'research'}
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={400}
          />
        </View>
        <NavFavourites />

        <View style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`}>
          <TouchableOpacity
            onPress={() => navigation.navigate('RideOptionsCard')}
            style={tw`flex flex-row justify-between bg-black w-24 px-4 rounded-full py-3`}
          >
            <Icon name="car" type="font-awesome" color="white" size={16} />
            <Text style={tw`text-white text-center`}>Rides</Text>
          </TouchableOpacity>

          <TouchableOpacity style={tw`flex flex-row justify-between w-24 px-4 rounded-full py-3`}>
            <Icon name="fast-food-outline" type="ionicon" color="black" size={16} />
            <Text style={tw`text-center`}>Eats</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NavigateCard;

const toInputBoxStyles = StyleSheet.create({
  container: {
    flex: 0,
    backgroundColor: 'white',
    paddingTop: 20,
  },
  textInput: {
    backgroundColor: '#DDDDDF',
    borderRadius: 0,
    fontSize: 18,
  },
  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
});
