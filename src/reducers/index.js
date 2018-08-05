import { combineReducers } from 'redux';
import burgerReducer from './burgerReducer';
import ingredientReducer from './ingredientReducer';

const rootReducer = combineReducers({
    burgerReducer,
    ingredientReducer
});

export default rootReducer;