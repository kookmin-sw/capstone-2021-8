import { observable } from 'mobx';

const createStore = () => {
  const appStore = {
    screenClass: observable.box(window.screen.width > 750 ? 'xl' : 'xs'),

    alertModalVisibility: observable.box(false),
    alertModalContent: observable.box(''),

    // Set screen class
    changeScreenClass(data) {
      appStore.screenClass.set(data);
    },

    changeAlertModalVisibility(data) {
      appStore.alertModalVisibility.set(data);
    },
    changeAlertModalContent(data) {
      appStore.alertModalContent.set(data);
    },
  };

  return appStore;
};

const store = createStore();
export default store;
