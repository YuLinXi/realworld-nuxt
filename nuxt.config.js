module.exports = {
  head: {
    title: 'Conduit',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    link: [
      { rel: 'stylesheet', href: '//cdn.jsdelivr.net/npm/ionicons@2.0.1/css/ionicons.min.css' },
      { rel: 'stylesheet', href: '/css/index.css' },
      { rel: 'stylesheet', href: '/css/main.css' },
      { rel: 'stylesheet', href: '/css/normalize.css' },
    ],
  },
  router: {
    middleware: 'authenticated'
  },
  modules: [
    '@nuxtjs/axios'
  ],
  plugins: [
    '@/plugins/axios'
  ]
}
