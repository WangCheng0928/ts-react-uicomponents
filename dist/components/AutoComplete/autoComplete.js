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
import React, { useState, useEffect, useRef, } from 'react';
import Input from '../Input/input';
import classNames from 'classnames';
import Icon from '../Icon/icon';
import useDebounce from '../../hooks/useDebounce';
import useClickOutside from '../../hooks/useClickOutside';
/** AutoComplete组件用于根据用户的输入匹配相应的选项
 * #### reference methods
 * ~~~
 * import { AutoComplete } from 'north-embankment-ui'
 * ~~~
 *
 */
export var AutoComplete = function (props) {
    var fetchSuggestions = props.fetchSuggestions, onSelect = props.onSelect, value = props.value, renderOption = props.renderOption, restProps = __rest(props
    //我们需要实时拿到用户的输入值，存到当前的state中，然后作出相应的逻辑
    , ["fetchSuggestions", "onSelect", "value", "renderOption"]);
    //我们需要实时拿到用户的输入值，存到当前的state中，然后作出相应的逻辑
    var _a = useState(value), inputValue = _a[0], setInputValue = _a[1];
    //用户（使用组件的人）将自定义的筛选函数传过来，我们将值inputvalue传给函数，将得到的结果进行封装显示，
    // 所以需要这个state来存储用户自定义函数返回的结果。
    var _b = useState([]), suggestions = _b[0], setSuggestions = _b[1];
    var _c = useState(false), loading = _c[0], setLoading = _c[1];
    var _d = useState(-1), highlightIndex = _d[0], setHighlightIndex = _d[1];
    var debouncedValue = useDebounce(inputValue, 500);
    var triggerSearch = useRef(false);
    var componentRef = useRef(null);
    useClickOutside(componentRef, function () {
        setSuggestions([]);
    });
    useEffect(function () {
        if (debouncedValue && triggerSearch.current) {
            var results = fetchSuggestions(debouncedValue);
            if (results instanceof Promise) {
                console.log('triggered');
                setLoading(true);
                results
                    .then(function (data) {
                    setLoading(false);
                    setSuggestions(data);
                })
                    .catch(function (e) {
                    setLoading(false);
                    setSuggestions([{ value: '请求超时' }]);
                });
            }
            else {
                setSuggestions(results);
            }
        }
        else {
            setSuggestions([]);
        }
        setHighlightIndex(-1);
    }, [fetchSuggestions, debouncedValue]);
    var highlight = function (index) {
        if (index < 0)
            index = 0;
        if (index >= suggestions.length) {
            index = suggestions.length - 1;
        }
        setHighlightIndex(index);
    };
    var handleKeyDown = function (e) {
        switch (e.keyCode) {
            //回车键
            case 13:
                if (suggestions[highlightIndex])
                    handleSelect(suggestions[highlightIndex]);
                break;
            //上
            case 38:
                highlight(highlightIndex - 1);
                break;
            //下
            case 40:
                highlight(highlightIndex + 1);
                break;
            //esc
            case 27:
                setSuggestions([]);
                break;
            default:
                break;
        }
    };
    var handleChange = function (e) {
        var value = e.target.value.trim();
        setInputValue(value);
        triggerSearch.current = true;
    };
    var handleSelect = function (item) {
        setInputValue(item.value);
        setSuggestions([]);
        if (onSelect) {
            onSelect(item);
        }
        triggerSearch.current = false;
    };
    var renderTemplate = function (item) {
        return renderOption ? renderOption(item) : item.value;
    };
    var generateDropDown = function () {
        return (React.createElement("ul", { className: "suggestions" }, suggestions.map(function (item, index) {
            var cnames = classNames('suggestion-item', {
                'item-highlighted': index === highlightIndex,
            });
            return (React.createElement("li", { key: index, className: cnames, onClick: function () { return handleSelect(item); } }, renderTemplate(item)));
        })));
    };
    return (React.createElement("div", { className: "auto-complete", ref: componentRef },
        React.createElement(Input, __assign({ value: inputValue }, restProps, { onKeyDown: handleKeyDown, onChange: handleChange })),
        loading && (React.createElement("ul", null,
            React.createElement(Icon, { icon: "spinner", spin: true }))),
        suggestions.length > 0 && generateDropDown()));
};
export default AutoComplete;
