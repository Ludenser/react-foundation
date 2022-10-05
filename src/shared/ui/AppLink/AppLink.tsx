import { classNames } from 'shared/lib/classNames/classNames';
import { FC } from 'react';
import { Link, LinkProps, useLocation } from 'react-router-dom';
import cls from './AppLink.module.scss';

export const enum AppLinkTheme {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    RED = 'red',
}

interface AppLinkProps extends LinkProps {
    className?: string;
    theme?: AppLinkTheme;
    current?: boolean;
}

export const AppLink: FC<AppLinkProps> = (props) => {
    const location = useLocation();
    const {
        to,
        className,
        children,
        theme = AppLinkTheme.PRIMARY,
        current,
        ...otherProps
    } = props;

    const mods = {
        [cls.current]: current && location.pathname === to,
    };

    return (
        <Link
            to={to}
            className={classNames(cls.AppLink, mods, [className, cls[theme]])}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...otherProps}
        >
            {children}
        </Link>
    );
};
