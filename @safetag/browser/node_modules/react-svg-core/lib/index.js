"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.optimize = optimize;
exports.transform = transform;

var _svgo = require("svgo");

var _svgo2 = _interopRequireDefault(_svgo);

var _babelCore = require("babel-core");

var _babelPluginReactSvg = require("babel-plugin-react-svg");

var _babelPluginReactSvg2 = _interopRequireDefault(_babelPluginReactSvg);

var _svgo3 = require("./svgo");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// SVGO Optimize
function optimize() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  (0, _svgo3.validateAndFix)(opts);
  var svgo = new _svgo2.default(opts);

  return function (content) {
    return new Promise(function (resolve, reject) {
      return svgo.optimize(content, function (_ref) {
        var error = _ref.error,
            data = _ref.data;
        return error ? reject(error) : resolve(data);
      });
    });
  };
}

// Babel Transform
function transform() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref2$jsx = _ref2.jsx,
      jsx = _ref2$jsx === undefined ? false : _ref2$jsx;

  return function (content) {
    return (0, _babelCore.transform)(content, {
      babelrc: false,
      presets: [jsx ? void 0 : "react"].filter(Boolean),
      plugins: ["syntax-jsx", "transform-object-rest-spread", _babelPluginReactSvg2.default]
    });
  };
}