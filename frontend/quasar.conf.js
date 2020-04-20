module.exports = function (ctx) {
  function getFromEnvOrDefault (key, value) {
    if (process.env[key]) {
      return JSON.stringify(process.env[key])
    }
    return JSON.stringify(value)
  }
  const API_URL = getFromEnvOrDefault('API_URL', 'http://localhost:9000')
  const TOKEN = getFromEnvOrDefault('TOKEN', '')

  return {
    boot: [
      'bus',
      'services'
    ],

    css: [
    ],

    extras: [
      'fontawesome-v5',
      'roboto-font',
      'material-icons'
    ],

    framework: {
      iconSet: 'fontawesome-v5',
      lang: 'en-us',
      all: false,

      components: [
        'QLayout',
        'QHeader',
        'QPageContainer',
        'QPage',
        'QBtn',
        'QCard',
        'QCardSection',
        'QCardActions',
        'QCircularProgress',
        'QSeparator',
        'QExpansionItem',
        'QDialog',
        'QToolbar',
        'QToolbarTitle',
        'QInput',
        'QIcon',
        'QLinearProgress',
        'QSpinner',
        'QForm'
      ],

      directives: [
        'Ripple',
        'ClosePopup'
      ],

      plugins: [
        'Notify',
        'Loading',
        'LocalStorage',
        'Dialog'
      ]
    },

    supportIE: false,

    htmlVariables: {
      buildDate: new Date().toISOString(),
      version: process.env.VERSION || '0.0.1'
    },

    build: {
      publicPath: process.env.PUBLIC_PATH || '/',
      env: {
        API_URL,
        TOKEN
      },
      scopeHoisting: true,
      vueRouterMode: 'history',
      extendWebpack (cfg) {
        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules|proto)/,
          options: {
            formatter: require('eslint').CLIEngine.getFormatter('stylish')
          }
        })
      }
    },

    devServer: {
      // https: true,
      port: 8080,
      open: false // opens browser window automatically
    },

    // animations: 'all', // --- includes all animations
    animations: [],

    ssr: {
      pwa: false
    },

    pwa: {
      // workboxPluginMode: 'InjectManifest',
      // workboxOptions: {}, // only for NON InjectManifest
      manifest: {
        // name: 'Quasar App',
        // short_name: 'Quasar App',
        // description: 'A Quasar Framework app',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#7f00ff',
        icons: [
          {
            'src': 'statics/icons/icon-128x128.png',
            'sizes': '128x128',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-192x192.png',
            'sizes': '192x192',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-256x256.png',
            'sizes': '256x256',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-384x384.png',
            'sizes': '384x384',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-512x512.png',
            'sizes': '512x512',
            'type': 'image/png'
          }
        ]
      }
    },

    cordova: {
    },

    electron: {
      extendWebpack (cfg) {
      },
      packager: {
      },
      builder: {
      }
    }
  }
}
