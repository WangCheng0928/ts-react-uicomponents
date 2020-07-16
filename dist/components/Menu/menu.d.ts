import React, { FC, CSSProperties } from 'react';
export declare type MenuMode = 'vertical' | 'horizontal';
declare type SelectCallback = (selectIndex: string) => void;
export interface MenuProps {
    /**设置菜单className */
    className?: string;
    /**设置菜单默认选中的menuItem */
    defaultIndex?: string;
    /** 设置菜单排列方式 */
    mode?: MenuMode;
    /**给菜单添加样式 */
    style?: CSSProperties;
    /**回调函数callback */
    onSelected?: SelectCallback;
    /**当设置此参数后，纵向submenu默认打开 */
    defaultOpenSubMenus?: string[];
}
interface IMenuContext {
    index?: string;
    onSelect?: SelectCallback;
    mode?: MenuMode;
    defaultOpenSubMenus?: string[];
}
export declare const MenuContext: React.Context<IMenuContext>;
/** Menu组件常用的组件之一,和MenuItem,SubMenu搭配使用
 * #### reference methods
 * ~~~
 * import { Menu } from 'north-embankment-ui'
 * ~~~
 *
 */
export declare const Menu: FC<MenuProps>;
export default Menu;
