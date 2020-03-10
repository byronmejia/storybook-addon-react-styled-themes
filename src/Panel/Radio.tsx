import React from 'react';
import { styled } from '@storybook/theming';

const RadiosWrapper = styled.div(() => ({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    '> * + *': {
        marginLeft: 10,
    },
}));

const RadioLabel = styled.label({
    padding: '3px 0 3px 5px',
    lineHeight: '18px',
    display: 'inline-block',
});

export interface RadioSettings {
    options: string[];
    active: string;
    onChange: (newValue: string) => void;
}

export const Radio: React.FC<RadioSettings> = ({ options, active, onChange }) => {
    return (
        <RadiosWrapper>
            {options.map(value => (
                <div key={value}>
                    <input
                        type="radio"
                        id={value}
                        name={value}
                        checked={value === active}
                        onChange={() => onChange(value)}
                    />
                    <RadioLabel htmlFor={value}>{value}</RadioLabel>
                </div>
            ))}
        </RadiosWrapper>
    );
};
