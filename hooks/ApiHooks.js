import {useContext, useEffect, useState} from 'react';
import {MainContext} from '../contexts/MainContext';
import {appId, baseUrl} from '../utils/variables';

const doFetch = async (url, options) => {
  const response = await fetch(url, options);
  const json = response.json();

  if (!response.ok) {
    const messge = json.error ? `${json.message}: ${json.error}` : json.message;
    throw new Error(messge || response.statusText);
  }

  return json;
};

const useMedia = () => {
  const [mediaArray, setMediaArrary] = useState([]);
  const {update} = useContext(MainContext);

  const loadMedia = async () => {
    try {
      // const response = await fetch(baseUrl + 'media');
      // const json = await response.json();

      const json = await useTag().getFilesByTag(appId);

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
    // load media when update state changes in main context
    // by adding update state to the array below
  }, [update]);

  const postMedia = async (fileData, token) => {
    const options = {
      method: 'POST',
      headers: {
        'x-access-token': token,
        'Content-Type': 'multipart/form-data',
      },
      body: fileData,
    };

    try {
      return await doFetch(baseUrl + 'media', options);
    } catch (error) {
      throw new Error('postUpload: ', error.message);
    }
  };

  return {mediaArray, postMedia};
};

const useAuthentication = () => {
  const postLogin = async (userCredentials) => {
    // user credentials format: {username: 'someUsername', password: 'somePassword'}
    const options = {
      // TODO: add method, headers and body for sending json data with POST
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userCredentials),
    };

    try {
      // TODO: use fetch to send request to login endpoint and return the result as json, handle errors with try/catch and response.ok
      const loginResult = await doFetch(baseUrl + 'login', options);
      return loginResult;
    } catch (error) {
      throw new Error('postLogin: ', error.message);
    }
  };

  return {postLogin};
};

const useUser = () => {
  const getUserByToken = async (token) => {
    const options = {
      method: 'GET',
      headers: {'x-access-token': token},
    };
    try {
      return await doFetch(baseUrl + 'users/user', options);
    } catch (error) {
      throw new Error('getUserByToken: ' + error.message);
    }
  };

  const postUser = async (userData) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    };

    try {
      const loginResult = await doFetch(baseUrl + 'users', options);
      return loginResult;
    } catch (error) {
      throw new Error('postUser: ', error.message);
    }
  };

  const checkUserName = async (userName) => {
    try {
      const result = await doFetch(baseUrl + 'users/username/' + userName);
      return result.available;
    } catch (error) {
      throw new Error('checkUserName: ' + error.message);
    }
  };

  return {getUserByToken, postUser, checkUserName};
};

const useTag = () => {
  const getFilesByTag = async (tag) => {
    try {
      return await doFetch(baseUrl + 'tags/' + tag);
    } catch (error) {
      throw new Error('getFilesByTag, ' + error.message);
    }
  };

  const postTags = async (data, token) => {
    const options = {
      method: 'POST',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    try {
      return await doFetch(baseUrl + 'tags', options);
    } catch (error) {
      throw new Error('postTag: ', error.message);
    }
  };

  return {getFilesByTag, postTags};
};

export {useMedia, useAuthentication, useUser, useTag};
