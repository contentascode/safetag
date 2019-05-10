"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (babel) {
  var t = babel.types;

  var createClass = function createClass(className) {
    return t.logicalExpression("||", t.memberExpression(
    /* object   = */t.identifier("styles"),
    /* property = */t.stringLiteral(className),
    /* computed = */true), t.stringLiteral(className));
  };

  var attrVisitor = {
    JSXAttribute(path) {
      var name = path.get("name");
      var value = path.get("value");

      if (name.isJSXNamespacedName()) {
        // converts
        // <svg xmlns:xlink="asdf">
        // to
        // <svg xmlnsXlink="asdf">
        name.replaceWith(t.jSXIdentifier((0, _camelize.namespaceToCamel)(path.node.name.namespace.name, path.node.name.name.name)));
      } else if (name.isJSXIdentifier()) {
        if (name.node.name === "class") {
          // converts
          // <tag class="blah blah1"/>
          // to
          // <tag className="blah blah1"/>
          name.replaceWith(t.jSXIdentifier("className"));

          // converts
          // className="foo bar"
          // to
          // className={(styles["foo"] || "foo") + " " + (styles["bar"] || "bar")}
          var classes = value.node.value.split(/\s/);

          if (classes.length > 0) {
            var expr = createClass(classes[0]);
            for (var i = 1; i < classes.length; i++) {
              expr = t.binaryExpression("+",
              // (props.styles["foo"] || "foo") + " "
              t.binaryExpression("+", expr, t.stringLiteral(" ")),
              // (props.styles["bar"] || "bar")
              createClass(classes[i]));
            }
            value.replaceWith(t.jSXExpressionContainer(expr));
          }
        }

        // converts
        // <tag style="text-align: center; width: 50px">
        // to
        // <tag style={{textAlign: 'center', width: '50px'}}>
        if (name.node.name === "style") {
          var csso = (0, _cssToObj2.default)(value.node.value);
          var properties = Object.keys(csso).map(function (prop) {
            return t.objectProperty(t.identifier((0, _camelize.hyphenToCamel)(prop)), t.stringLiteral(csso[prop]));
          });
          value.replaceWith(t.jSXExpressionContainer(t.objectExpression(properties)));
        }

        // converts
        // <svg stroke-width="5" data-x="0" aria-label="foo">
        // to
        // <svg strokeWidth="5" data-x="0" aria-label="foo">
        if (!/^(data-|aria-)/.test(name.node.name)) {
          name.replaceWith(t.jSXIdentifier((0, _camelize.hyphenToCamel)(path.node.name.name)));
        }
      }
    }
  };

  // returns
  // export default (props) => ${input_svg_node}
  var getExport = function getExport(svg) {
    return t.exportDefaultDeclaration(t.arrowFunctionExpression([t.objectPattern([t.objectProperty(t.identifier("styles"), t.assignmentPattern(t.identifier("styles"), t.objectExpression([])), false, true), t.restProperty(t.identifier("props"))])], svg));
  };

  // converts
  // <svg>
  // to
  // <svg {this.props}>
  // after passing through attributes visitors
  var svgVisitor = {
    JSXOpeningElement(path) {
      if (path.node.name.name.toLowerCase() === "svg") {
        // add spread props
        path.node.attributes.push(t.jSXSpreadAttribute(t.identifier("props")));
      }
    }
  };

  // converts
  // <svg/>
  // to
  // import React from 'react';
  // export default props => <svg {...props}/>;
  // after passing through other visitors
  var svgExpressionVisitor = {
    ExpressionStatement(path) {
      if (!path.get("expression").isJSXElement()) return;
      if (path.get("expression.openingElement.name").node.name !== "svg") return;
      path.replaceWith(getExport(path.get("expression").node));
    }
  };

  var programVisitor = {
    Program(path) {
      // add import react statement
      path.node.body.unshift(t.importDeclaration([t.importDefaultSpecifier(t.identifier("React"))], t.stringLiteral("react")));
    }
  };

  return {
    visitor: Object.assign({}, programVisitor, svgExpressionVisitor, svgVisitor, attrVisitor)
  };
};

var _cssToObj = require("./css-to-obj");

var _cssToObj2 = _interopRequireDefault(_cssToObj);

var _camelize = require("./camelize");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports["default"];