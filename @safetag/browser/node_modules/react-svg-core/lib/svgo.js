"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateAndFix = validateAndFix;

var _lodash = require("lodash.isplainobject");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var essentialPlugins = ["removeDoctype", "removeComments", "removeStyleElement"];

// validates svgo opts
// to contain minimal set of plugins that will strip some stuff
// for the babylon JSX parser to work

function validateAndFix() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (!(0, _lodash2.default)(opts)) throw new Error("Expected options.svgo to be Object.");

  if (opts.plugins === void 0) opts.plugins = [];

  if (!Array.isArray(opts.plugins)) throw new Error("Expected options.svgo.plugins to be an array");

  if (opts.plugins.length === 0) {
    opts.plugins = [].concat(essentialPlugins).map(function (p) {
      return { [p]: true };
    });
  }

  var state = new Map();
  // mark all essential plugins as disabled
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = essentialPlugins[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var p = _step.value;

      state.set(p, false);
    }

    // parse through input plugins and mark enabled ones
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = opts.plugins[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var plugin = _step2.value;

      if ((0, _lodash2.default)(plugin)) {
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          for (var _iterator4 = Object.keys(plugin)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var pluginName = _step4.value;

            if (essentialPlugins.indexOf(pluginName) > -1) {
              // enable the plugin in-place if it's an essential plugin
              plugin[pluginName] = true;
              state.set(pluginName, true);
            }
          }
        } catch (err) {
          _didIteratorError4 = true;
          _iteratorError4 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion4 && _iterator4.return) {
              _iterator4.return();
            }
          } finally {
            if (_didIteratorError4) {
              throw _iteratorError4;
            }
          }
        }
      } else if (typeof plugin === "string") {
        state.set(plugin, true);
      } else {
        throw new TypeError("Expected SVGO plugin to be of type String or Object. Got " + typeof plugin);
      }
    }

    // add missing plugins
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = essentialPlugins[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var _p = _step3.value;

      if (!state.get(_p)) {
        opts.plugins.push(_p);
      }
    }

    // convert strings to objects to match the form svgo accepts
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3.return) {
        _iterator3.return();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  for (var i = 0; i < opts.plugins.length; i++) {
    if (typeof opts.plugins[i] === "string") {
      opts.plugins[i] = { [opts.plugins[i]]: true };
    }
  }
}