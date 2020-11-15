export default function ({ $axios, redirect, store }) {
  $axios.defaults.baseURL = 'https://conduit.productionready.io/api';

  $axios.onRequest(config => {
    const user = store.state.user;
    if (user && user.token) {
      config.headers['Authorization'] = `Token ${user.token}`;
    } else {
      delete config.headers['Authorization'];
    }
  })

  $axios.onResponse(res => {
    return res.data;
  })

  $axios.onError(error => {
    const code = + error.response.status;
    if (code === 401) {
      store.commit('setUser', null);
      redirect('/login');
      return
    }
    throw error.response.data.errors;
  })
}
