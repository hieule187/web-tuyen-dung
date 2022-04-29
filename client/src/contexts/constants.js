export const apiUrl =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:5000/api'
    : 'https://server-fastjob.herokuapp.com/api';

export const LOCAL_STORAGE_TOKEN_NAME = 'Fast_Job';

export const SET_AUTH = 'SET_AUTH';
