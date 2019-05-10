"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (content) {
  var loaderOpts = _loaderUtils2.default.getOptions(this) || {};

  var cb = this.async();

  Promise.resolve(String(content)).then((0, _reactSvgCore.optimize)(loaderOpts.svgo)).then((0, _reactSvgCore.transform)({ jsx: loaderOpts.jsx })).then(function (result) {
    return cb(null, result.code);
  }).catch(function (err) {
    return cb(err);
  });
};

var _loaderUtils = require("loader-utils");

var _loaderUtils2 = _interopRequireDefault(_loaderUtils);

var _reactSvgCore = require("react-svg-core");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports["default"];