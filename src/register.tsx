import React from 'react';
import addons from '@storybook/addons';
import { ADDON_ID, PANEL_ID } from './shared';
import { Panel } from './Panel/Panel';

addons.register(ADDON_ID, api => {
    addons.addPanel(PANEL_ID, {
        title: 'Theme',
        render: ({ active, key }) => (
            <Panel channel={addons.getChannel()} key={key} active={active} api={api} />
        ),
    });
});
