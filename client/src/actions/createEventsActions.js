
import axios from 'axios';

export const add_article = (message) => {
    return dispatch => {
      return axios.post('/api/article', message);
    }
};

