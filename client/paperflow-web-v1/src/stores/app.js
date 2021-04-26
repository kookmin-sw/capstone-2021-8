import { observable } from 'mobx';
import history from '../utils/history';

const createStore = () => {
  const appStore = {
    screenClass: observable.box(window.screen.width > 750 ? 'xl' : 'xs'),
    currentMainMenu: observable.box(''),

    alertModalVisibility: observable.box(false),
    alertModalContent: observable.box(''),

    // Set screen class
    changeScreenClass(data) {
      appStore.screenClass.set(data);
    },

    changeMainMenu(data) {
      appStore.currentMainMenu.set(data);
      history.push(data);
    },

    changeAlertModalVisibility(data) {
      appStore.alertModalVisibility.set(data);
    },
    changeAlertModalContent(data) {
      appStore.alertModalContent.set(data);
      appStore.alertModalVisibility.set(!!data);
    },
  };

  return appStore;
};

const store = createStore();
export default store;
