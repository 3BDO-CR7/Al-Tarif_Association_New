import React, { Component } from "react";
import {Button, Icon, Footer, FooterTab, Toast} from 'native-base'
import styles from '../../assets/style';
import i18n from "../../locale/i18n";
import {connect} from "react-redux";
import {chooseLang, profile, userLogin} from "../actions";

class Tabs extends Component {
    constructor(props){
        super(props);
        this.state = {
            pageName        : this.props.routeName,
        }
    }

    chickUser(page){

        if(this.props.auth == null || this.props.user == null){

            this.props.navigation.navigate('Login');

            Toast.show({
                text            : i18n.translate('chickLogin'),
                duration        : 2000,
                type            : "danger",
                textStyle       : {
                    color         : "white",
                    fontFamily    : 'cairo',
                    textAlign     : 'center'
                }
            });

        }else{

            this.props.navigation.navigate(page, { id: null });

        }

    }

    render() {

        return (

            <Footer style={styles.view_Footer}>
                <FooterTab style={[styles.footer_Tab]}>
                    <Button onPress={() => this.props.navigation.navigate('Home')}>
                        <Icon style={{color : this.state.pageName === 'Home'? '#38973E' : '#ddd'}} type="Ionicons" name="home" />
                    </Button>
                    <Button onPress={() => this.chickUser('AddCases')}>
                        <Icon style={{color : this.state.pageName === 'AddCases'? '#38973E' : '#ddd'}} type="AntDesign" name='pluscircle' />
                    </Button>
                    <Button onPress={() => this.chickUser('Profile')}>
                        <Icon style={{color : this.state.pageName === 'Profile'? '#38973E' : '#ddd'}} type="FontAwesome5" name='user-alt' />
                    </Button>
                </FooterTab>
            </Footer>

        );
    }
}

const mapStateToProps = ({ auth, profile, lang }) => {
    return {
        auth: auth.user,
        user: profile.user,
        lang: lang.lang
    };
};
export default connect(mapStateToProps, {userLogin, profile, chooseLang})(Tabs);