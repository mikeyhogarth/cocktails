import throttle from "lodash/throttle";

function supportsLocalStorage() {
  try {
    localStorage.setItem("test", "test");
    localStorage.removeItem("test");
    return true;
  } catch (exception) {
    return false;
  }
}

export const persistStore = (store, saveables) => {
  if (!supportsLocalStorage()) return false;

  store.subscribe(
    throttle(() => {
      const saveableState = saveables.reduce((acc, saveable) => {
        acc[saveable] = store.getState()[saveable];
        return acc;
      }, {});

      const serializedState = JSON.stringify(saveableState);
      localStorage.setItem("state", serializedState);
    })
  );
};

export const loadPersistedState = () => {
  if (!supportsLocalStorage()) return {};

  const serializedState = localStorage.getItem("state");
  if (serializedState === null) {
    return undefined;
  }
  return JSON.parse(serializedState);
};
