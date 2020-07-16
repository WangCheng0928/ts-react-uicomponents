import React, { useContext } from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu';
/** MenuItem组件和Menu组件一起使用，作为其子组件
 * #### reference methods
 * ~~~
 * import { MenuItem } from 'north-embankment-ui'
 * ~~~
 */
export var MenuItem = function (props) {
    var index = props.index, disabled = props.disabled, className = props.className, style = props.style, children = props.children;
    var context = useContext(MenuContext);
    var classes = classNames('menu-item', className, {
        'is-disabled': disabled,
        'is-actived': context.index === index,
    });
    var handleClick = function () {
        console.log(1);
        if (context.onSelect && !disabled && typeof index === 'string') {
            console.log(2);
            context.onSelect(index);
        }
        // alert(index)
    };
    return (React.createElement("li", { className: classes, style: style, onClick: handleClick }, children));
};
MenuItem.defaultProps = {
    disabled: false,
};
// we can use "displayName" on component to change its component tag on dev tools
MenuItem.displayName = 'MenuItem';
export default MenuItem;
