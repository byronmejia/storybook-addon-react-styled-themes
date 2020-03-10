import React, { FunctionComponent, useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import Channel from '@storybook/channels';
import { IThemeStore } from 'IThemeStore';
import { SET_CONFIG_ID } from 'shared';

export interface WithThemesProps {
    channel: Channel;
    theme: string;
    themeStore: IThemeStore<any>;
}

export const WithThemes: FunctionComponent<WithThemesProps> = ({
    children,
    channel,
    theme: newTheme,
    themeStore,
}) => {
    const [theme, setTheme] = useState(newTheme);
    const handleNewTheme = (anotherTheme: string) => setTheme(anotherTheme);

    useEffect(() => {
        channel.emit(SET_CONFIG_ID, themeStore);
        channel.on(SET_CONFIG_ID, handleNewTheme);
        return () => {
            channel.removeListener(SET_CONFIG_ID, handleNewTheme);
        };
    }, [children]);

    return <ThemeProvider theme={themeStore[theme] ?? {}}>{children}</ThemeProvider>;
};
