import axios from 'axios';

const instance = axios.create({
    baseURL: "https://burger-admin.firebaseio.com/"
});

export default instance;