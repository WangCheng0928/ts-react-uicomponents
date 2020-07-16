import { InputHTMLAttributes, ReactElement, FC, ChangeEvent } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
declare type InputSize = 'lg' | 'sm';
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
    /**是否禁用Input */
    disabled?: boolean;
    /**设置 input大小，支持lg或者是sm */
    size?: InputSize;
    /**添加图标，在右侧悬浮添加一个图标，用于提示 */
    icon?: IconProp;
    /**添加前缀 用于配置一些固定组合 */
    pretend?: string | ReactElement;
    /** 添加后缀 用于配置一些固定组合 */
    append?: string | ReactElement;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}
/**
 * Input 输入框 通过鼠标或键盘输入内容， 是最基本的表单组件
 * ~~~js
 *  引用方式
 *  import { Input } from 'north-embankment-ui'
 * ~~~
 * 支持 HTMLInput的所有基本属性
 */
export declare const Input: FC<InputProps>;
export default Input;
