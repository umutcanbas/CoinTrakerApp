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
  KeyboardAvoidingView,
} from 'react-native';

import routes from '../../navigation/routes';
import TopMenu from '../../components/TopMenu';
import Search from '../../components/Search';

import {getData} from '../../hooks/useFetchData';
import {changeCurrency} from '../../hooks/useFetchCurrency';

import {useSelector} from 'react-redux';

const Home = ({navigation}) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [multiplier, setMultiplier] = useState();
  const [searchText, setSearchText] = useState('');

  const currentCurrency = useSelector(state => state.slice.currentCurrency);

  useEffect(() => {
    const fetchCurrency = async () => {
      try {
        const newMultiplier = await changeCurrency(currentCurrency);
        setMultiplier(newMultiplier.result);
      } catch (error) {
        console.log('fetchCurrency error ', error);
      }
    };

    fetchCurrency();
  }, [currentCurrency]);

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

  //Seacrh bar
  useEffect(() => {
    if (searchText === '') {
      setFilteredData(data);
    } else {
      const filtered = data.filter(item =>
        item.name.toLowerCase().startsWith(searchText.toLowerCase()),
      );
      setFilteredData(filtered);
      setHasMore(false);
    }
  }, [searchText, data]);

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
            Price: {(item?.current_price * multiplier).toLocaleString()}{' '}
            {currentCurrency}
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
      <KeyboardAvoidingView>
        <TopMenu
          title="Coin Tracker"
          onPressRight={goSettings}
          rightIcon="Settings"
        />

        <FlatList
          data={filteredData}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={renderItem}
          bounces={false}
          onEndReached={nextPage}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            filteredData.length > 0 &&
            hasMore && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="black" />
              </View>
            )
          }
          ListHeaderComponent={
            <Search
              placeholder="Search Coins..."
              onChangeText={text => setSearchText(text)}
              value={searchText}
            />
          }
          ListEmptyComponent={
            filteredData.length === 0 &&
            !hasMore && (
              <View style={styles.emptyContaier}>
                <Text style={styles.emptyContaierText}>No coin found!</Text>
              </View>
            )
          }
        />
      </KeyboardAvoidingView>
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
  emptyContaier: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 220,
  },
  emptyContaierText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 35,
    fontStyle: 'italic',
  },
});

export default Home;
