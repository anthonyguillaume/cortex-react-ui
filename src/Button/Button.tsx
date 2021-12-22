import React from 'react';

export interface ButtonProps {
    label: string;
}

const Button: React.FC<ButtonProps> = (props: ButtonProps) => (
    <button type="button">{props.label}</button>
);

export default Button;