module.exports = {
  files: {
    javascripts: {
      joinTo: {
        'javascripts/vendor.js': /^(?!app)/,
        'javascripts/app.js': /^app/
      },
      order: {
        before: [
          'bower_components/dist/jquery.js'
        ]
      }
    },
    stylesheets: {
      joinTo: 'stylesheets/app.css'
    },
    templates: {
      joinTo: 'javascripts/templates.js'
    }
  },

  plugins: {
    jade: {
      pretty: true
    },
    static_jade: {
      extension: ".static.jade",
      asset:      "app/assets"
    },
    postcss: {
      processors: [
        require('autoprefixer')(['> 1%', 'last 8 versions', 'ie 9'])
      ]
    },
    babel: {presets: ['es2015', 'stage-0']}
  }
};