import axios from "axios";
import CONST from "../consts";
import {AsyncStorage} from "react-native";
import {Toast} from "native-base";


export const register = (data, props) => {
	return (dispatch) => {

		AsyncStorage.getItem('deviceID').then(device_id => {
		   console.log('deviceID is ', data.token);
			axios({
				url: CONST.url + 'register',
				method: 'POST',
				data: {
					name			: data.fullName,
					email			: data.email,
					phone			: data.phone,
					password		: data.password,
					national_id		: data.NationalNnm,
					lang			: data.lang,
					device_id       : data.token
				}
			}).then(response => {
				dispatch({type: 'register', payload: response.data});
				if (response.data.success === true){
                    // props.navigation.navigate('Login');
                    props.navigation.navigate('ActiveAccount', {
						code			: response.data.data.code,
						user_id			: response.data.data.user_id,
						phone			: data.fullName,
						password		: data.password,
						deviceId		: device_id
					});
				}
				Toast.show({
					text        	: response.data.message,
					type			: response.data.success === true ? "success" : "danger",
					duration    	: 3000,
					textStyle   	: {
						color       	: "white",
						fontFamily  	: 'cairo',
						textAlign   	: 'center'
					}
				});

			})
		  })
	}
};
