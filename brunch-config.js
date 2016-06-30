module.exports = {
  files: {
    javascripts: {
      joinTo: {
        'javascripts/vendor.js': /^(?!app)/,
        'javascripts/app.js': /^app/
      },
      order: {
        before: [
          'bower_components/jquery/dist/jquery.js',
          'bower_components/gsap/src/uncompressed/TweenMax.js',
          'bower_components/velocity/velocity.js',
          'bower_components/scrollmagic/scrollmagic/uncompressed/ScrollMagic.js',
          'vendor/animation.velocity.js',
          'vendor/animation.gsap.js',
          'vendor/debug.addIndicators.js',
          'vendor/jquery.ScrollMagic.js',
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