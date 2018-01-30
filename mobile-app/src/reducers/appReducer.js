import Time from '../common/time';
import themes from '../common/themes';

const appReducer = (state = {
    theme: themes.DARK_THEME,
    timeFormat: Time.TIME_FORMAT_12,
}, action) => {
    switch (action.type) {
        case "CHANGE_THEME":
            state = {
                ...state,
                theme: action.payload                          
            };
            break;
      case "CHANGE_TIME_FORMAT":
          state = {
            ...state,
            timeFormat: action.payload,
          };
        default:
            break;
    }
    return state;
};

export default appReducer;