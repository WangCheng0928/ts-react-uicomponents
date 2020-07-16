var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from 'react';
import classNames from 'classnames';
import Icon from '../Icon/icon';
/**
 * Input 输入框 通过鼠标或键盘输入内容， 是最基本的表单组件
 * ~~~js
 *  引用方式
 *  import { Input } from 'north-embankment-ui'
 * ~~~
 * 支持 HTMLInput的所有基本属性
 */
export var Input = function (props) {
    var _a;
    //取出各种属性
    var disabled = props.disabled, size = props.size, icon = props.icon, pretend = props.pretend, append = props.append, style = props.style, children = props.children, restProps = __rest(props
    //根据属性得到className
    , ["disabled", "size", "icon", "pretend", "append", "style", "children"]);
    //根据属性得到className
    var classes = classNames('input', (_a = {},
        _a["input-size-" + size] = size,
        _a['is-disabled'] = disabled,
        _a['input-group'] = pretend || append,
        _a['input-group-append'] = !!append,
        _a['input-group-pretend'] = !!pretend,
        _a));
    var fixControllValue = function (value) {
        if (typeof value === 'undefined' || value === null) {
            return '';
        }
        return value;
    };
    if ('value' in props) {
        delete restProps.defaultValue;
        restProps.value = fixControllValue(props.value);
    }
    return (
    //根据属性判断是否要添加特定的节点
    React.createElement("div", { className: classes, style: style },
        pretend && React.createElement("div", { className: "input-group-pretend" }, pretend),
        icon && (React.createElement("div", { className: "icon-wrapper" },
            React.createElement(Icon, { icon: icon }))),
        React.createElement("input", __assign({ className: "input-inner", disabled: disabled }, restProps), children),
        append && React.createElement("div", { className: "input-group-append" }, append)));
};
Input.defaultProps = {
    disabled: false,
};
export default Input;
