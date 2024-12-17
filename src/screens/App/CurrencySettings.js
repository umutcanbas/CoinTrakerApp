import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import TopMenu from '../../components/TopMenu';

import {getAllCurrencies} from '../../hooks/useFetchCurrency';

import {useDispatch, useSelector} from 'react-redux';
import {changeCurrency} from '../../redux/slice';

const CurrencySettings = ({navigation}) => {
  const [currencies, setCurrencies] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState(null);

  const dispatch = useDispatch();

  const currentCurrencySave = useSelector(state => state.slice.currentCurrency);

  useEffect(() => {
    setSelectedCurrency(currentCurrencySave);
  }, [currentCurrencySave]);

  useEffect(() => {
    getCurrencies();
  }, []);

  const getCurrencies = async () => {
    const data = await getAllCurrencies();
    const mappedCurrencies = Object.entries(data.currencies).map(
      ([code, name]) => {
        return {code, name};
      },
    );
    setCurrencies(mappedCurrencies);
  };

  const handleChooseCurrency = code => {
    setSelectedCurrency(code);
  };

  const handleSaveCurrency = selectedCurrency => {
    dispatch(changeCurrency(selectedCurrency));
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => handleChooseCurrency(item.code)}>
      <View style={styles.itemTextContainer}>
        <Text ellipsizeMode="tail" numberOfLines={1} style={styles.itemText}>
          {item.name} ({item.code})
        </Text>
        <View
          style={[
            styles.itemButton,
            selectedCurrency === item.code && styles.selectedButton,
          ]}></View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <TopMenu
        title="Currency Settings"
        onPressLeft={() => navigation.goBack()}
      />

      <FlatList data={currencies} renderItem={renderItem} bounces={false} />
      {selectedCurrency === currentCurrencySave ? null : (
        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => handleSaveCurrency(selectedCurrency)}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default CurrencySettings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2D4840',
  },
  itemContainer: {
    backgroundColor: '#e0e0e0e0',
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  itemTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    width: '90%',
  },
  itemButton: {
    backgroundColor: 'white',
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
  },
  selectedButton: {
    backgroundColor: 'black',
  },
  saveButton: {
    backgroundColor: 'white',
    padding: 15,
    margin: 8,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
