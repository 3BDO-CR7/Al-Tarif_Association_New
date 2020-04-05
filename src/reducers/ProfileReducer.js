const INIT_STATE = { user: null };


export default ( state = INIT_STATE, action ) => {
    switch (action.type) {
        case ('profile_data'):
            return ({ user: action.data });
        case ('updateProfile'):
            return ({ user: action.data });
        case ('logout'):
            return ({ user: null });
        default :
            return state;
    }}
