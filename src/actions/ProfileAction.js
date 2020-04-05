import axios from 'axios';
import CONST from '../consts'
import {Toast} from "native-base";
import {AsyncStorage} from "react-native";


export const profile = (token) => {
    return (dispatch) => {
        axios({
            method      : 'POST',
            url         : CONST.url + 'UserData',
            headers     : { Authorization: "Bearer " + token}
        }).then(response => {
            const data = response.data.data;
            dispatch({type: 'profile_data', data});
            console.log('UserData ===', data);
        })
    }
};


export const updateProfile = (data) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'UpdateProfile',
            method      : 'POST',
            headers     : { Authorization: data.token },
            data: {
                name                : data.name,
                phone               : data.phone,
                avatar              : data.image,
                email               : data.email,
                national_id         : data.national_id,
                lang                : data.lang,
            }}).then(response => {

            if (response.data.key === 1) {
                const data = response.data.data;
                dispatch({type: 'profile_data', data});
            }

            console.log('data', response.data.data);

            Toast.show({
                text        : response.data.msg,
                type        : response.data.key === 1 ? "success" : "danger",
                duration    : 3000,
                textStyle       : {
                    color           : "white",
                    fontFamily      : 'cairo',
                    textAlign       : 'center',
                }
            });

        }).catch(() => {
            Toast.show({
                text        : 'لم يتم التعديل بعد , الرجاء المحاوله مره اخري',
                type        : "danger",
                duration    : 3000,
                textStyle       : {
                    color           : "white",
                    fontFamily      : 'cairo',
                    textAlign       : 'center',
                }
            });
        })
    }
}

export const logout = (token) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'Logout',
            method      : 'POST',
            headers     : {Authorization: token },
        }).then(response => {
                AsyncStorage.multiRemove(['token', 'auth', 'profile']);
                dispatch({type: 'logout'});
            }
        )
    }
}

