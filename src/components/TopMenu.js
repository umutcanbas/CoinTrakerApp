import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';

import BackIcon from '../assets/icons/back.svg';

const TopMenu = ({onPressLeft, title, onPressRight, leftIcon = 'Back'}) => {
  const icons = {
    Back: <BackIcon width={28} height={28} />,
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        {onPressLeft && (
          <TouchableOpacity
            onPress={onPressLeft}
            style={styles.button}
            activeOpacity={0.8}>
            {icons[leftIcon]}
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.title}>{title}</Text>
      <View style={[styles.buttonContainer, styles.rightButtonContainer]}>
        {onPressRight && (
          <TouchableOpacity
            onPress={onPressRight}
            style={styles.button}
            activeOpacity={0.8}>
            {icons[rightIcon]}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default TopMenu;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderBottomWidth: 0.8,
    borderBottomColor: 'grey',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  rightButtonContainer: {
    alignItems: 'flex-end',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 27,
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
  },
});