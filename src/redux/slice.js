import {createSlice} from '@reduxjs/toolkit';
import {MMKV} from 'react-native-mmkv';

const storage = new MMKV();

const isLogged = storage.getBoolean('isLogged');

const favoriteListStorage = storage.getString('favoriteList');
const favoriteList = favoriteListStorage && JSON.parse(favoriteListStorage);

const currentCurrency = storage.getString('currentCurrency');

const initialState = {
  isLogged: isLogged || false,
  favoriteList: favoriteList || [],
  currentCurrency : currentCurrency || 'USD',
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
      const place = action.payload;

      if (!place || !place.id) {
        console.error('Geçersiz place:', place);
        return;
      }

      const isFavorite = state.favoriteList.find(item => item.id === place.id);

      if (isFavorite) {
        state.favoriteList = state.favoriteList.filter(
          item => item.id !== place.id,
        );
      } else {
        state.favoriteList.push(place);
      }

      storage.set('favoriteList', JSON.stringify(state.favoriteList));
    },
    changeCurrency: (state, action) => {
      if (typeof action.payload === 'string') {
        state.currentCurrency = action.payload;
      } else {
        console.error('Invalid currency type:', typeof action.payload);
      }
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