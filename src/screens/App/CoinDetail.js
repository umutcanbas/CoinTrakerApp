import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';

import TopMenu from '../../components/TopMenu';

import {useDispatch, useSelector} from 'react-redux';

import {changeFavoriteList} from '../../redux/slice';

const CoinDetail = ({route, navigation}) => {
  const data = route.params?.item;

  const dispatch = useDispatch();

  const favoriteList = useSelector(state => state.slice.favoriteList);

  const isfavorite = favoriteList.find(item => item.id === data.id);

  const addFavorite = data => {
    if (!data) {
      console.error('DATA NOT FOUND!');
      return;
    }
    dispatch(changeFavoriteList(data));
  };

  const infoData = [
    {
      label: 'Current Price',
      value: data.current_price.toLocaleString(),
    },
    {label: '24h High', value: data.high_24h.toLocaleString()},
    {label: '24h Low', value: data.low_24h.toLocaleString()},
    {label: '24h Price Change', value: data.price_change_24h.toFixed(2)},
    {
      label: '24h Price Change %',
      value: data.price_change_percentage_24h.toFixed(3),
    },
  ];
  return (
    <SafeAreaView style={styles.container}>
      <TopMenu
        title={data.name}
        onPressLeft={() => navigation.goBack()}
        onPressRight={() => addFavorite(data)}
        rightIcon={isfavorite ? 'HeartRed' : 'Heart'}
      />

      <View style={styles.innerContainer}>
        <View style={styles.imageContainer}>
          <Image source={{uri: data.image}} style={{width: 100, height: 100}} />
        </View>
        {infoData.map((item, index) => (
          <View style={styles.card} key={index}>
            <Text style={styles.text}>{item.label}</Text>
            <Text
              style={[styles.money, {color: item.value < 0 ? 'red' : 'green'}]}>
              {item.value}
            </Text>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default CoinDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2D4840',
  },
  innerContainer: {
    margin: 10,
    flex: 1,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#e0e0e0e0',
    height: 75,
    borderRadius: 10,
    borderWidth: 0.5,
    margin: 10,
    padding: 10,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 27,
    color: 'black',
  },
  money: {
    fontWeight: 'bold',
    fontSize: 27,
    color: 'white',
  },
});
