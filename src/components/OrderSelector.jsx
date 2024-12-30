import React from 'react'
import { Picker } from '@react-native-picker/picker';

const OrderSelector = ({
  selectedSort,
  setSelectedSort,
  setOrderBy,
  setOrderDirection
}) => {

  const handlePickerChange = (itemValue) => {
    setSelectedSort(itemValue);
    
    switch(itemValue) {
      case 'highest':
        setOrderBy('RATING_AVERAGE');
        setOrderDirection('DESC');
        break;
      case 'lowest':
        setOrderBy('RATING_AVERAGE');
        setOrderDirection('ASC');
        break;
      case 'latest':
        setOrderBy('CREATED_AT');
        setOrderDirection('DESC');
        break;
    }
  };

  return (
    <Picker
        selectedValue={selectedSort}
        onValueChange={handlePickerChange}
      >
        <Picker.Item label="Latest Repositories" value="latest" />
        <Picker.Item label="Highest Rated Repositories" value="highest" />
        <Picker.Item label="Lowest Rated Repositories" value="lowest" />
    </Picker>
  )
}

export default OrderSelector
