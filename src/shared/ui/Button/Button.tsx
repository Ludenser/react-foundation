import { classNames } from 'shared/lib/classNames/classNames';
import { FC, ButtonHTMLAttributes } from 'react';
import cls from './Button.module.scss';

export const enum ButtonTheme {
    CLEAR = 'clear',
    OUTLINE = 'outline',
    BACKGROUND = 'background',
    BACKGROUND_INVERTED = 'backgroundInverted',
}

export const enum ButtonSize {
    M = 'size_m',
    L = 'size_l',
    XL = 'size_xl',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    theme?: ButtonTheme;
    square?: boolean;
    size?: ButtonSize;
    shadow?: boolean;
    hover?: boolean;
}

export const Button: FC<ButtonProps> = (props) => {
    const {
        className,
        children,
        theme,
        square,
        size,
        shadow,
        hover,
        ...otherProps
    } = props;

    const mods = {
        [cls.square]: square,
        [cls.shadow]: shadow,
        [cls.hover]: hover,
    };

    const additional = [
        className,
        cls[theme],
        cls[size],
    ];

    return (
        <button
            type="button"
            className={classNames(cls.Button, mods, additional)}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...otherProps}
        >
            {children}
        </button>
    );
};
