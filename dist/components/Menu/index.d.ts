import { FC } from 'react';
import { MenuProps } from './menu';
import { ISubmenuProps } from './submenu';
import { MenuItemProps } from './menuItem';
export declare type IMenuComponent = FC<MenuProps> & {
    Item: FC<MenuItemProps>;
    SubMenu: FC<ISubmenuProps>;
};
declare const TransMenu: IMenuComponent;
export default TransMenu;
