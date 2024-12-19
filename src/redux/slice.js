import {createSlice} from '@reduxjs/toolkit';
import {MMKV} from 'react-native-mmkv';

const storage = new MMKV();

const isLogged = storage.getBoolean('isLogged');

const favoriteListStorage = storage.getString('favoriteList');
const favoriteList = favoriteListStorage && JSON.parse(favoriteListStorage);

const currentCurrencyValue = storage.getString('currentCurrency');
const currentCurrency = JSON.parse(currentCurrencyValue) || 'USD';

const initialState = {
  isLogged: isLogged || false,
  favoriteList: favoriteList || [],
  currentCurrency,
};

const slice = createSlice({
  name: 'slice',
  initialState,
  reducers: {
    login: state => {
      state.isLogged = true;
      storage.set('isLogged', state.isLogged);
    },
    logout: state => {
      state.isLogged = false;
      storage.set('isLogged', state.isLogged);
    },
    clearFavorites: state => {
      state.favoriteList = [];
      storage.set('favoriteList', JSON.stringify(state.favoriteList));
    },
    changeFavoriteList: (state, action) => {
      const coin = action.payload;

      const isFavorite = state.favoriteList.find(item => item.id === coin.id);

      if (isFavorite) {
        state.favoriteList = state.favoriteList.filter(
          item => item.id !== coin.id,
        );
      } else {
        state.favoriteList.push(coin);
      }

      storage.set('favoriteList', JSON.stringify(state.favoriteList));
    },
    changeCurrency: (state, action) => {
      state.currentCurrency = action.payload;

      storage.set('currentCurrency', JSON.stringify(state.currentCurrency));
    },
  },
});

export const {
  login,
  logout,
  addFavorite,
  clearFavorites,
  changeFavoriteList,
  changeCurrency,
} = slice.actions;

export default slice.reducer;
