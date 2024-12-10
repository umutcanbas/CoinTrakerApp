import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

import TopMenu from '../../components/TopMenu';

import {useSelector} from 'react-redux';

import routes from '../../navigation/routes';

const Favorites = ({navigation}) => {
  const favoriteList = useSelector(state => state.slice.favoriteList);
  //console.log(JSON.stringify(favoriteList, null, 2));

  const goDetail = item => {
    navigation.navigate(routes.OUTTAB_NAVIGATOR, {
      screen: routes.COINDETAIL,
      params: {item},
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopMenu title="Favorites" onPressRight={()=>console.log('aaaa')} rightIcon='Settings' />
      <ScrollView style={styles.content} bounces={false}>
        {favoriteList.map((item, index) => (
          <TouchableOpacity
            style={styles.card}
            key={index}
            activeOpacity={0.6}
            onPress={() => goDetail(item)}>
            <View style={styles.imageContainer}>
              <Image source={{uri: item.image}} style={styles.image} />
            </View>

            <Text style={styles.name}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Favorites;

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
    marginHorizontal: 10,
    marginVertical: 20,
    padding: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginVertical: 10,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 27,
    color: 'black',
  },
});
