import { FC, ReactElement } from 'react';
import { InputProps } from '../Input/input';
interface DataSourceObject {
    value: string;
}
export declare type DataSourceType<T = {}> = T & DataSourceObject;
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    /**用户自定义匹配函数，传入一个string，返回一个数组 */
    fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
    /**设置选择下来匹配项的回调 */
    onSelect?: (item: DataSourceType) => void;
    /**设置下拉框item的显示模版 */
    renderOption?: (item: DataSourceType) => ReactElement | null;
}
/** AutoComplete组件用于根据用户的输入匹配相应的选项
 * #### reference methods
 * ~~~
 * import { AutoComplete } from 'north-embankment-ui'
 * ~~~
 *
 */
export declare const AutoComplete: FC<AutoCompleteProps>;
export default AutoComplete;
