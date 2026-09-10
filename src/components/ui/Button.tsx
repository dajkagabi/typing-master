import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary';
    children: React.ReactNode;
}

/** Újrahasznosítható, két vizuális változattal rendelkező gombkomponens. */
export const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    children,
    className = '',
    ...props
}) => {
    /** Közös méretezési, fókusz- és animációs stílusok. */
    const baseStyles = 'px-4 py-2 rounded-lg font-medium transition-colors duration-200 focus:outline-none cursor-pointer';

    /** A kiválasztott változat színei. */
    const variantStyles =
        variant === 'primary'
            ? 'bg-primary hover:bg-primary-hover text-white shadow-sm'
            : 'bg-secondary hover:bg-secondary-hover text-text-main';

    return (
        <button className={`${baseStyles} ${variantStyles} ${className}`} {...props}>
            {children}
        </button>
    );
};