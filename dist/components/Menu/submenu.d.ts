import { FC } from 'react';
export interface ISubmenuProps {
    /**submenu的menuItem */
    index?: string;
    /**设置submenu的className */
    className?: string;
    /** 设置submenu的名称 */
    title?: string;
}
/** SubMenu组件和Menu组件一起使用，作为其子组件
 * #### reference methods
 * ~~~
 * import { SubMenu } from 'north-embankment-ui'
 * ~~~
 */
export declare const SubMenu: FC<ISubmenuProps>;
export default SubMenu;
