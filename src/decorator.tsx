import { addons, makeDecorator } from '@storybook/addons';
import { IThemeStore, BaseTheme } from './IThemeStore';
import { WithThemes } from './WithThemes';
import { PARAM_KEY } from 'shared';
import React from 'react';

export const withThemes = <T extends {} & BaseTheme>(themeStore: IThemeStore<T>) =>
    makeDecorator({
        name: 'withTheme',
        parameterName: PARAM_KEY,
        wrapper: (getStory, context, { options, parameters }) => {
            const channel = addons.getChannel();

            const startingTheme = themeStore[Object.keys(themeStore)[0]].themeName;

            return (
                <WithThemes theme={startingTheme} themeStore={themeStore} channel={channel}>
                    {getStory(context)}
                </WithThemes>
            );
        },
    });
