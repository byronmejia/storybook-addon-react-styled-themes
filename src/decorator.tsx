import { addons, makeDecorator } from '@storybook/addons';
import { IThemeStore } from './IThemeStore';
import { WithThemes } from './WithThemes';
import { PARAM_KEY } from 'shared';
import React from 'react';

export const withThemes = <T extends {}>(themeStore: IThemeStore<T>) =>
    makeDecorator({
        name: 'withTheme',
        parameterName: PARAM_KEY,
        wrapper: (getStory, context, { options, parameters }) => {
            return <WithThemes>{getStory(context)}</WithThemes>;
        },
    });
