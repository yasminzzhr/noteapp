import * as React from 'react';

import TodoApp from './TodoApp';

// Import Redux
import store from '../redux/store';
import { Provider } from 'react-redux';

const Menu = () => {
  return (
    <Provider store={store}>
      <TodoApp/>
    </Provider>
  );
}
export default Menu;

