(function() {
  'use strict';

  var globals = typeof window === 'undefined' ? global : window;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = ({}).hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = null;
    hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = window;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("index.static.jade", function(exports, require, module) {
var __templateData = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

var jade_indent = [];
buf.push("<!DOCTYPE html>\n<head>\n  <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\n  <title>BitcoinZebra</title>\n  <meta name=\"viewport\" content=\"width=device-width\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no\">\n  <link rel=\"stylesheet\" href=\"stylesheets/app.css\">\n  <link rel=\"icon\" href=\"images/favicon.png\">\n  <script src=\"javascripts/vendor.js\"></script>\n  <script src=\"javascripts/app.js\"></script>\n  <script>\n    require('scripts/initialize');\n    \n  </script>\n</head>\n<body>\n  <div class=\"arts\">\n    <div class=\"art-1\"></div>\n    <div class=\"art-2\"></div>\n    <div class=\"art-3\"></div>\n    <div class=\"art-4\"></div>\n    <div class=\"art-5\"></div>\n    <div class=\"art-6\"></div>\n    <div class=\"art-7\"></div>\n    <div class=\"art-8\"></div>\n    <div class=\"art-9\"></div>\n    <div class=\"art-10\"></div>\n    <div class=\"art-11\"></div>\n    <div class=\"art-12\"></div>\n    <div class=\"art-13\"></div>\n  </div>\n  <div class=\"nav\">\n    <div class=\"nav-close\"></div>\n    <div class=\"nav-inner\">\n      <div class=\"nav-list\">\n        <div class=\"nav-listItem\"><a href=\"#\">Bio</a></div>\n        <div class=\"nav-listItem\"><a href=\"#\">Projects</a></div>\n        <div class=\"nav-listItem\"><a href=\"#\">Press</a></div>\n        <div class=\"nav-listItem\"><a href=\"#\">Gallery</a></div>\n        <div class=\"nav-listItem\"><a href=\"#\">Contact</a></div>\n      </div>\n      <div class=\"socials\">Follow<a href=\"#\"><img src=\"../images/pinterest.svg\"></a><a href=\"#\"><img src=\"../images/instagram.svg\"></a></div>\n    </div>\n  </div>\n  <div class=\"nav-toggle\">Menu</div>\n  <div class=\"bubbles\">\n    <div class=\"bubble-xs bubble-1\">\n      <div class=\"bg\"></div>\n    </div>\n    <div class=\"bubble-s bubble-2\">\n      <div class=\"bg\"></div>\n    </div>\n    <div class=\"bubble-m bubble-3\">\n      <div class=\"bubble-inner\">\n        <div class=\"title\">‘Wise Sons’ Jewish Deli Outpost at the CJM’</div>\n        <div class=\"subtitle\">SAN FRANCISCO EATER</div>\n      </div>\n    </div>\n    <div class=\"bubble-m bubble-4\">\n      <div class=\"bubble-inner\">\n        <div class=\"title\">‘Alternative Apparel Makes A Splash on Abbott Kinney’</div>\n        <div class=\"subtitle\">REFINERY 29</div>\n      </div>\n    </div>\n    <div class=\"bubble-l bubble-5\">\n      <div class=\"bg\"></div>\n      <div class=\"bubble-inner\">\n        <div class=\"title\">Junk Food Clothing</div>\n        <div class=\"subtitle\">VENICE BEACH, CA</div>\n      </div>\n    </div>\n  </div>\n  <div class=\"footer\"></div>\n</body>");;return buf.join("");
};
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');


//# sourceMappingURL=templates.js.map