import React, { useState, useEffect, } from 'react';
import classNames from 'classnames';
export var MenuContext = React.createContext({ index: '0' });
/** Menu组件常用的组件之一,和MenuItem,SubMenu搭配使用
 * #### reference methods
 * ~~~
 * import { Menu } from 'north-embankment-ui'
 * ~~~
 *
 */
export var Menu = function (props) {
    var className = props.className, mode = props.mode, style = props.style, defaultIndex = props.defaultIndex, children = props.children, onSelected = props.onSelected, defaultOpenSubMenus = props.defaultOpenSubMenus;
    var _a = useState(defaultIndex), currentIndex = _a[0], setCurrent = _a[1];
    var classes = classNames('menu', className, {
        'menu-vertical': mode === 'vertical',
        'menu-horizontal': mode !== 'vertical',
    });
    useEffect(function () {
        var _a;
        console.log((_a = children) === null || _a === void 0 ? void 0 : _a.toString());
    });
    var handleClick = function (index) {
        console.log(3);
        setCurrent(index);
        if (onSelected) {
            console.log(4);
            onSelected(index);
        }
    };
    var MenuContextProps = {
        index: currentIndex ? currentIndex : '0',
        onSelect: handleClick,
        mode: mode,
        defaultOpenSubMenus: defaultOpenSubMenus,
    };
    var renderChildren = function () {
        return React.Children.map(children, function (child, index) {
            var childElement = child;
            var displayName = childElement.type.displayName;
            if (displayName === 'MenuItem' || displayName === 'SubMenu') {
                return React.cloneElement(childElement, { index: index.toString() });
            }
            else {
                console.error('warning: menu has a child which is not menuItem component');
            }
        });
    };
    return (React.createElement("ul", { className: classes, style: style, "data-testid": "test-menu" },
        React.createElement(MenuContext.Provider, { value: MenuContextProps }, renderChildren())));
};
Menu.defaultProps = {
    defaultIndex: '0',
    mode: 'horizontal',
    defaultOpenSubMenus: [],
};
export default Menu;
