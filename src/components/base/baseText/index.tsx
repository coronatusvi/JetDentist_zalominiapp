import { PropsWithChildren } from "react";
import { classNames } from "../../../utils/common";

type CustomTextProps = {
    bold?: boolean;
    medium?: boolean;
    locale?: boolean;
    size?: number;
    className?: string; // for tailwindcss
    color?: string;
};

export const BaseText = (props: PropsWithChildren<CustomTextProps>) => {
    const { bold, locale, size, medium, children, className, color } = props;

    return (
        <span
            className={classNames(
                color ? color : "text-darkNight900",
                bold ? "font-bold" : "",
                medium ? "font-medium" : "",
                className || ""
            )}
            style={{ fontSize: size || 14 }}
        >
            {locale ? children : children}
        </span>
    );
}
