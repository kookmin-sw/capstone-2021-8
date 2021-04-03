import { observable } from 'mobx';

const createStore = () => {
  const appStore = {
    screenClass: observable.box(window.screen.width > 750 ? 'xl' : 'xs'),

    // Set screen class
    changeScreenClass(data) {
      appStore.screenClass.set(data);
    },
  };

  return appStore;
};

const store = createStore();
export default store;
