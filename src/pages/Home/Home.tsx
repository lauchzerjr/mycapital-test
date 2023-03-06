import React from 'react';
import { Text, View } from 'react-native';

// import * as S from './Search.styles';

export function Home() {
  return (
    <View style={{flex: 1, backgroundColor: '#262626', justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{color: 'white'}}>HOME</Text>
    </View>
  );
}