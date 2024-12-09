import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TopMenu from '../../components/TopMenu'

const CoinDetail = ({route , navigation}) => {
const data = route.params?.item

  return (
    <SafeAreaView>
      <TopMenu title={data.name} onPressLeft={()=> navigation.goBack()} />
      <Text>CoinDetail</Text>
    </SafeAreaView>
  )
}

export default CoinDetail

const styles = StyleSheet.create({})