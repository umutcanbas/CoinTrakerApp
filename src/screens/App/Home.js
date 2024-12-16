import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import routes from '../../navigation/routes';

import TopMenu from '../../components/TopMenu';

import {getData} from '../../hooks/useFetchData';

const Home = ({navigation}) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const goSettings = () => {
    navigation.navigate(routes.OUTTAB_NAVIGATOR, {screen: routes.SETTINGS});
  };

  useEffect(() => {
    const fetchCoins = async () => {
      const newData = await getData(page);
      setData(prevData => [...prevData, ...newData]);

      if (newData.length < 25) {
        setHasMore(false);
      }
    };

    fetchCoins();
  }, [page]);

  const nextPage = () => setPage(prevPage => prevPage + 1);

  const renderItem = ({item}) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate(routes.OUTTAB_NAVIGATOR, {
          screen: routes.COINDETAIL,
          params: {item},
        })
      }>
      <View style={styles.itemContainer}>
        <Image source={{uri: item?.image}} style={styles.coinImage} />

        <View style={styles.infoContainer}>
          <Text style={styles.nameText}>
            {item.name} ({item?.symbol.toUpperCase()})
          </Text>

          <Text style={styles.priceText}>
            Price: ${item?.current_price.toLocaleString()}
          </Text>

          <Text style={styles.marketText}>
            Market Cap: ${item?.market_cap.toLocaleString()}
          </Text>

          <Text style={styles.changeText}>
            24h Change:{' '}
            <Text
              style={{
                color: item.price_change_percentage_24h < 0 ? 'red' : 'green',
              }}>
              {item?.price_change_percentage_24h.toFixed(2)}%
            </Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <TopMenu
        title="Coin Tracker"
        onPressRight={goSettings}
        rightIcon="Settings"
      />
      <FlatList
        data={data}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={renderItem}
        bounces={false}
        onEndReached={nextPage}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          hasMore && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="black" />
            </View>
          )
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2D4840',
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#e0e0e0e0',
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  coinImage: {
    width: 50,
    height: 50,
    marginRight: 15,
    borderRadius: 25,
  },
  infoContainer: {
    flex: 1,
  },
  nameText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'black',
  },
  priceText: {
    fontSize: 18,
    color: 'black',
    fontWeight: '600',
  },
  marketText: {
    fontSize: 14,
    color: 'black',
    fontWeight: '400',
  },
  changeText: {
    fontSize: 16,
    color: 'black',
    fontWeight: '800',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
