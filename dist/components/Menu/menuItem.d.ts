import React, { FC } from 'react';
export interface MenuItemProps {
    /**设置menuItem是否可用 */
    disabled?: boolean;
    /**munuItem的索引 */
    index?: string;
    /**设置menuItem的className */
    className?: string;
    /**设置menuItem的样式 */
    style?: React.CSSProperties;
}
/** MenuItem组件和Menu组件一起使用，作为其子组件
 * #### reference methods
 * ~~~
 * import { MenuItem } from 'north-embankment-ui'
 * ~~~
 */
export declare const MenuItem: FC<MenuItemProps>;
export default MenuItem;
