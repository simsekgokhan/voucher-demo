
import themes from '../common/themes';

export function setLiteTheme() {
    return {
        type: "CHANGE_THEME",
        payload: themes.LITE_THEME, 
    };
}

export function setHourFormat(timeFormat) {
    return {
        type: 'CHANGE_TIME_FORMAT',
        payload: timeFormat,
    }
}

export function setDarkTheme() {
    return {
        type: "CHANGE_THEME",
        payload: themes.DARK_THEME, 
    };
}