import React, { FC, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
declare type ButtonSize = 'lg' | 'sm';
declare type ButtonType = 'primary' | 'default' | 'danger' | 'link';
interface BaseButtonProps {
    className?: string;
    /** 设置Button的禁用 */
    disabled?: boolean;
    /** 设置Button的类型 */
    btnType?: ButtonType;
    /** 设置Button的尺寸 */
    size?: ButtonSize;
    children: React.ReactNode;
    href?: string;
}
declare type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLButtonElement>;
declare type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLAnchorElement>;
export declare type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;
/**
 *
 * The most commonly used button elements on the page, suitable for completing specific interactions
 * #### reference methods
 *
 * ~~~js
 * import { Button } from 'north-embankment-ui'
 * ~~~
 */
export declare const Button: FC<ButtonProps>;
export default Button;
