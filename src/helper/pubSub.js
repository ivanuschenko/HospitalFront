const pubSub = {
  on(event, callback) { //subscriber
    document.addEventListener(event, (e) => callback(e.detail));
  },
  dispatch(event, data) { //publisher
    document.dispatchEvent(new CustomEvent(event, { detail: data }));
  },
  remove(event, callback) { //unsibcriber
    document.removeEventListener(event, callback);
  },
};

export default pubSub;
