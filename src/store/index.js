import { createStore } from 'redux';
import rootRducer from '../reducers/index';

const store = createStore(rootRducer);

export default store;