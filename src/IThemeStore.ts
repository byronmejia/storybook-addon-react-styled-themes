export interface BaseTheme {
    themeName: string;
}

export interface IThemeStore<T extends BaseTheme> {
    [key: string]: T;
}
