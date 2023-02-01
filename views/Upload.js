import {Button, Card, Input} from '@rneui/themed';
import PropTypes from 'prop-types';
import {Controller, useForm} from 'react-hook-form';
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {useContext, useState} from 'react';
import {useMedia} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../contexts/MainContext';

const Upload = ({navigation}) => {
  const [mediaFile, setMediaFile] = useState({});
  const [loading, setLoading] = useState(false);
  const {postMedia} = useMedia();
  const {update, setUpdate} = useContext(MainContext);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
    },
    mode: 'onBlur',
  });

  const uploadFile = async (data) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);

    const fileName = mediaFile.uri.split('/').pop();
    let fileExt = fileName.split('.').pop();
    if (fileExt === 'jpg') fileExt = 'jpeg';
    const mimeType = mediaFile.type + '/' + fileExt;

    formData.append('file', {
      uri: mediaFile.uri,
      name: fileName,
      type: mimeType,
    });

    console.log('form data: ', formData);

    try {
      const result = await postMedia(
        formData,
        await AsyncStorage.getItem('userToken')
      );
      console.log('upload result: ', result);

      Alert.alert('Uploaded', 'File id: ' + result.file_id, [
        {
          text: 'OK',
          onPress: () => {
            console.log('OK Pressed');
            // TODO: update 'update' state in context
            setUpdate(!update);
            // TODO: navigate to home page
          },
        },
      ]);
    } catch (error) {
      console.error('file upload failed: ', error);
    } finally {
      setLoading(false);
    }
  };

  const pickFile = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    console.log(result);

    if (!result.canceled) {
      setMediaFile(result.assets[0]);
    }
  };

  return (
    <ScrollView>
      <TouchableOpacity
        onPress={() => Keyboard.dismiss()}
        style={{flex: 1}}
        activeOpacity={1}
      >
        <Card>
          <Card.Image onPress={pickFile} source={{uri: mediaFile.uri}} />
          <Controller
            control={control}
            rules={{
              required: {value: true, message: 'This is required.'},
              minLength: {
                value: 3,
                message: 'Title min length is 3 characters.',
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                placeholder="Title"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                autoCapitalize="none"
                errorMessage={errors.title && errors.title.message}
              />
            )}
            name="title"
          />

          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                placeholder="Description"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="description"
          />
          <Button
            disabled={!mediaFile.uri}
            title="UPLOAD"
            onPress={handleSubmit(uploadFile)}
          />
          {loading && <ActivityIndicator size="large" />}
        </Card>
      </TouchableOpacity>
    </ScrollView>
  );
};

Upload.propTypes = {
  navigation: PropTypes.object,
};

export default Upload;
