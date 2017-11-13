
import themes from '../common/themes';

const appReducer = (state = {
    theme: themes.DARK_THEME,
}, action) => {
    switch (action.type) {
        case "CHANGE_THEME":
            state = {
                ...state,
                theme: action.payload                          
            };
            break;                        
        default:
            break;
    }
    return state;
};

export default appReducer;