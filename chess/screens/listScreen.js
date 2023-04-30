import React, { useState } from 'react';
import { FlatList, Text, View } from 'react-native';

const MyList = () => {
  const [data, setData] = useState([
    { id: '1', text: 'Item 1' },
    { id: '2', text: 'Item 2' },
    { id: '3', text: 'Item 3' },
  ]);

  const renderItem = ({ item }) => {
    return (
      <View>
        <Text>{item.text}</Text>
      </View>
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

export default MyList;