import React, { FunctionComponent } from 'react';
import { ThemeProvider } from 'styled-components';

export interface WithThemesProps {}

export const WithThemes: FunctionComponent<WithThemesProps> = ({ children }) => {
    return <ThemeProvider theme={{}}>{children}</ThemeProvider>;
};
