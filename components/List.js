import {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {baseUrl} from '../utils/variables';
import {ListItem} from './ListItem';

const List = () => {
  const [mediaArray, setMediaArrary] = useState([]);

  const loadMedia = async () => {
    try {
      const response = await fetch(baseUrl + 'media');
      const json = await response.json();
      const media = await Promise.all(
        json.map(async (file) => {
          const fileResponse = await fetch(baseUrl + 'media/' + file.file_id);
          return await fileResponse.json();
        })
      );

      setMediaArrary(media);
    } catch (error) {
      console.error('List Component: ', error);
    }
  };

  useEffect(() => {
    loadMedia();
  }, []);

  return (
    <FlatList
      data={mediaArray}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => <ListItem singleMedia={item} />}
    />
  );
};

export {List};
