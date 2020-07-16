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
import React, { useContext, useState, } from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu';
import Icon from '../Icon/icon';
import Transition from '../Transition/transition';
/** SubMenu组件和Menu组件一起使用，作为其子组件
 * #### reference methods
 * ~~~
 * import { SubMenu } from 'north-embankment-ui'
 * ~~~
 */
export var SubMenu = function (props) {
    var context = useContext(MenuContext);
    var index = props.index, title = props.title, className = props.className, children = props.children;
    var openedSubMenu = context.defaultOpenSubMenus;
    var isOpened = index && context.mode === 'vertical' ? openedSubMenu.includes(index) : false;
    var _a = useState(isOpened), menuOpen = _a[0], setOpen = _a[1];
    var classes = classNames('menu-item submenu-item', className, {
        'is-actived': context.index === index,
        'is-opened': menuOpen,
        'is-vertical': context.mode === 'vertical',
    });
    //设置鼠标点击事件触发
    var handleClick = function (e) {
        e.preventDefault();
        setOpen(!menuOpen);
    };
    var timer;
    var handleHover = function (e, toggle) {
        clearTimeout(timer);
        e.preventDefault();
        timer = setTimeout(function () {
            setOpen(toggle);
        }, 300);
    };
    var clickEvents = context.mode === 'vertical' ? { onClick: handleClick } : {};
    var hoverEvents = context.mode !== 'vertical'
        ? {
            onMouseEnter: function (e) {
                handleHover(e, true);
            },
            onMouseLeave: function (e) {
                handleHover(e, false);
            },
        }
        : {};
    var renderChildren = function () {
        var subMenuClass = classNames('submenu', {
            'menu-opened': menuOpen,
        });
        var childrenComponent = React.Children.map(children, function (child, i) {
            var childElement = child;
            if (childElement.type.displayName === 'MenuItem') {
                return React.cloneElement(childElement, { index: index + "-" + i });
            }
            else {
                console.error('warning: submenu has a child which is not menuItem component');
            }
        });
        return (React.createElement(Transition, { show: menuOpen, classNames: "zoom-in-top" },
            React.createElement("ul", { className: subMenuClass }, childrenComponent)));
    };
    return (React.createElement("li", __assign({ key: index, className: classes }, hoverEvents),
        React.createElement("div", __assign({ className: "submenu-title" }, clickEvents),
            title,
            React.createElement(Icon, { theme: "dark", icon: "angle-down", className: "arrow-icon" })),
        renderChildren()));
};
SubMenu.displayName = 'SubMenu';
export default SubMenu;
