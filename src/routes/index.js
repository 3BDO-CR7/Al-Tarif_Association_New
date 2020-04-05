import React from "react";
import { createAppContainer , createSwitchNavigator } from "react-navigation";
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import {Dimensions, I18nManager} from "react-native";

import Home                     from "../components/Home";
import Language                 from "../components/Language";
import AboutApp                 from "../components/AboutApp";
import Login                    from "../components/Login";
import ChooseUser               from "../components/ChooseUser";
import ForgetPassword           from "../components/ForgetPassword";
import NewPassword              from "../components/NewPassword";
import Register                 from "../components/Register";
import ActiveAccount            from "../components/ActiveAccount";
import Terms                    from "../components/Terms";
import AckgmentAndUnder         from "../components/AckgmentAndUnder";
import Search                   from "../components/Search";
import ViewSearch               from "../components/ViewSearch";
import TheCases                 from "../components/TheCases";
import Payment                  from "../components/Payment";
import FormPayment              from "../components/FormPayment";
import SentMessage              from "../components/SentMessage";
import DetailsCases             from "../components/DetailsCases";
import Notification             from "../components/Notification";
import Setting                  from "../components/Setting";
import MyDonations              from "../components/MyDonations";
import MyInterests              from "../components/MyInterests";
import Contact                  from "../components/Contact";
import Suggest                  from "../components/Suggest";
import Profile                  from "../components/Profile";
import EditProfile              from "../components/EditProfile";
import ChangePassword           from "../components/ChangePassword";
import AddCases                 from "../components/AddCases";
import InitScreen               from "../components/InitScreen";
import MyCases                  from "../components/MyCases";
import OpenCamera               from "../components/OpenCamera";
import DetailsCasesUser         from "../components/DetailsCasesUser";
import DrawerCustomization      from "./DrawerCustomization";

const width = Dimensions.get('window').width;
const drawerCust = (props) => (<DrawerCustomization {...props} />);

const drawerNavigator = createDrawerNavigator({
    Home                : Home,
    MyCases             : MyCases,
    Setting             : Setting,
    MyDonations         : MyDonations,
    MyInterests         : MyInterests,
    Contact             : Contact,
    Terms               : Terms,
    Suggest             : Suggest,
    Profile             : Profile
},
    {
    initialRouteName    : 'Home',
    drawerPosition      : I18nManager.isRTL ?'right' : 'left',
    drawerOpenRoute     : 'DrawerOpen',
    drawerCloseRoute    : 'DrawerClose',
    gesturesEnabled     : false,
    drawerToggleRoute   : 'DrawerToggle',
    drawerWidth         : '70%',
    contentComponent    : drawerCust
});

const AppNavigator = createStackNavigator({
    InitScreen : {
        screen : InitScreen,
        navigationOptions: {
            header: null
        }
    },
    OpenCamera : {
        screen : OpenCamera,
        navigationOptions: {
            header: null
        }
    },
    DetailsCasesUser : {
        screen : DetailsCasesUser,
        navigationOptions: {
            header: null
        }
    },
    MyCases : {
        screen : MyCases,
        navigationOptions: {
            header: null
        }
    },
    Language : {
        screen : Language,
        navigationOptions: {
            header: null
        }
    },
    AddCases : {
        screen : AddCases,
        navigationOptions: {
            header: null
        }
    },
    SentMessage : {
        screen : SentMessage,
        navigationOptions: {
            header: null
        }
    },
    Setting : {
        screen : Setting,
        navigationOptions: {
            header: null
        }
    },
    EditProfile : {
        screen : EditProfile,
        navigationOptions: {
            header: null
        }
    },
    Register : {
        screen : Register,
        navigationOptions: {
            header: null
        }
    },
    Payment : {
        screen : Payment,
        navigationOptions: {
            header: null
        }
    },
    FormPayment : {
        screen : FormPayment,
        navigationOptions: {
            header: null
        }
    },
    MyDonations : {
        screen : MyDonations,
        navigationOptions: {
            header: null
        }
    },
    MyInterests : {
        screen : MyInterests,
        navigationOptions: {
            header: null
        }
    },
    Contact : {
        screen : Contact,
        navigationOptions: {
            header: null
        }
    },
    TheCases : {
        screen : TheCases,
        navigationOptions: {
            header: null
        }
    },
    Search : {
        screen : Search,
        navigationOptions: {
            header: null
        }
    },
    ViewSearch : {
        screen : ViewSearch,
        navigationOptions: {
            header: null
        }
    },
    Login : {
        screen : Login,
        navigationOptions: {
            header: null
        }
    },
    drawerNavigator: {
        screen: drawerNavigator,
        navigationOptions: {
            header: null
        }
    },
    Suggest : {
        screen : Suggest,
        navigationOptions: {
            header: null
        }
    },
    AckgmentAndUnder : {
        screen : AckgmentAndUnder,
        navigationOptions: {
            header: null
        }
    },
    Terms : {
        screen : Terms,
        navigationOptions: {
            header: null
        }
    },
    AboutApp : {
        screen : AboutApp,
        navigationOptions: {
            header: null
        }
    },
    Profile : {
        screen : Profile,
        navigationOptions: {
            header: null
        }
    },
    ChangePassword : {
        screen : ChangePassword,
        navigationOptions: {
            header: null
        }
    },
    Notification : {
        screen : Notification,
        navigationOptions: {
            header: null
        }
    },
    DetailsCases : {
        screen : DetailsCases,
        navigationOptions: {
            header: null
        }
    },
    ActiveAccount : {
        screen : ActiveAccount,
        navigationOptions: {
            header: null
        }
    },
    NewPassword : {
        screen : NewPassword,
        navigationOptions: {
            header: null
        }
    },
    ForgetPassword : {
        screen : ForgetPassword,
        navigationOptions: {
            header: null
        }
    },
    ChooseUser : {
        screen : ChooseUser,
        navigationOptions: {
            header: null
        }
    },

});

export default createAppContainer(AppNavigator);