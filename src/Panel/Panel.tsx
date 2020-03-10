import React, { useEffect, useState } from 'react';
import { ScrollArea } from '@storybook/components';
import { styled } from '@storybook/theming';
import Channel from '@storybook/channels';
import { API } from '@storybook/api';
import { IThemeStore } from 'IThemeStore';
import { SET_THEME_ID, SET_CONFIG_ID } from 'shared';
import { Radio } from './Radio';

export interface PanelProps {
    active: boolean;
    channel: Channel;
    api: API;
}

const PanelWrapper = styled(({ children, className }) => (
    <ScrollArea horizontal vertical className={className}>
        {children}
    </ScrollArea>
))({
    height: '100%',
    width: '100%',
});

const QUERY_PARAM_INPUT_THEME = 'themeProvided';

export const Panel: React.FunctionComponent<PanelProps> = ({ channel, active, api }) => {
    const [themes, setThemes] = useState<Array<string>>([]);
    const [activeTheme, setActiveTheme] = useState<string | undefined>(undefined);

    const handleThemeChange = (theme: string) => {
        setActiveTheme(theme);
        api.setQueryParams({ [QUERY_PARAM_INPUT_THEME]: theme });
        channel.emit(SET_THEME_ID, theme);
    };

    const setConfig = (config: IThemeStore<any>) => {
        const newThemes = Object.values(config).map(([key, theme]) => theme.themeName);
        setThemes(newThemes);

        const currentTheme = api.getQueryParam(QUERY_PARAM_INPUT_THEME);
        if (currentTheme && newThemes.includes(currentTheme)) {
            handleThemeChange(currentTheme);
        } else {
            handleThemeChange(newThemes[0]);
        }
    };

    useEffect(() => {
        channel.on(SET_CONFIG_ID, setConfig);
        return () => {
            channel.removeListener(SET_CONFIG_ID, setConfig);
        };
    }, []);

    if (!active) {
        return null;
    }

    return (
        <PanelWrapper>
            <Radio active={activeTheme || ''} options={themes} onChange={handleThemeChange} />
        </PanelWrapper>
    );
};
