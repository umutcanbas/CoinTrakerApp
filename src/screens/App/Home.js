import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

import routes from '../../navigation/routes';

import TopMenu from '../../components/TopMenu';

import Plus from '../../assets/icons/add.svg';

import {getData} from '../../hooks/useFetch';

const Home = ({navigation}) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

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
          <Text style={styles?.nameText}>
            {item.name} ({item.symbol.toUpperCase()})
          </Text>

          <Text style={styles.priceText}>
            Price: ${item?.current_price.toLocaleString()}
          </Text>

          <Text style={styles.marketText}>
            Market Cap: ${item?.market_cap.toLocaleString()}
          </Text>

          <Text style={styles.changeText}>
            24h Change: {item?.price_change_percentage_24h.toFixed(2)}%
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <TopMenu title="Coin Tracker" />
      <FlatList
        data={data}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={renderItem}
        bounces={false}
        ListFooterComponent={
          hasMore && (
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={nextPage} style={styles.button}>
                <Plus width={50} height={50} />
              </TouchableOpacity>
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
    marginHorizontal: 5,
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
    color: 'green',
    fontWeight: '800',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'black',
  },
});

export default Home;
