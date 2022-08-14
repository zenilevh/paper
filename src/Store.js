import { createStore } from 'easy-peasy';
import models from './Models';

const store = createStore(
    models
);

export default store;