import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity} from "react-native";
import {Container, Content} from 'native-base';
import { DrawerItems } from 'react-navigation-drawer';

import styles from "../../assets/style";
import COLORS from '../../src/consts/colors'
import i18n from "../../locale/i18n";
import {connect} from "react-redux";
import {logout, tempAuth} from "../actions";

class DrawerCustomization extends Component {
    constructor(props){
        super(props);
        this.state={
            user: [],
        }
    }

    filterItems(item){
        return item.routeName !== 'MyDonations' && item.routeName !== 'MyInterests' && item.routeName !== 'Setting' && item.routeName !== 'MyCases';
    }

    logout(){
        this.props.navigation.closeDrawer();
        this.props.navigation.navigate('Login');
        this.props.logout(this.props.user.token);
        this.props.tempAuth();
    }

    render() {

        let { user } = this.props;
        if ( user == null )
            user = {
                avatar      : 'https://korbaah.com/images/users/default.png',
                name        : i18n.translate('guest'),
            };

        return (
            <Container>
                <Content contentContainerStyle={styles.bgFullWidth}>

                    <View style={styles.blockUser}>

                        <View style={[styles.viewUser, styles.flexCenter]}>
                            <Image source={{ uri: user.avatar }} style={[styles.icoImage, styles.Radius_50,styles.marginVertical_5]}/>
                            <TouchableOpacity style={styles.nameUser} onPress={() => this.props.navigation.navigate('profile')}>
                                <Text style={[styles.textRegular, styles.textSize_14]}>{ user.name }</Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                    <DrawerItems {...this.props}
                         onItemPress={
                             (route, focused) => {
                                 if (route.route.key === 'logout') {
                                     this.logout()
                                 }else if (route.route.key === 'Terms') {
                                     this.props.navigation.navigate('Terms',{
                                         type : 'Terms'
                                     })
                                 }else {
                                     this.props.navigation.navigate(route.route.key);
                                 }
                             }
                         }

                         items                          = {this.props.auth !== null ? this.props.items : this.props.items.filter((item) =>  this.filterItems(item) ) }
                         activeBackgroundColor          = {styles.bg_lightGreen}
                         inactiveBackgroundColor        = 'transparent'
                         activeLabelStyle               = {COLORS.red}
                         labelStyle                     = {styles.drawerLabel}
                         iconContainerStyle             = {styles.drawerIcon}
                         itemStyle                      = {[styles.drawerItemStyle, styles.paddingHorizontal_20, styles.marginVertical_10]}
                         itemsContainerStyle            = {styles.drawerContainer}
                    />

                </Content>

                {
                    (this.props.auth == null || this.props.user == null) ?

                    <TouchableOpacity style={[styles.clickLogin, styles.bg_darkGreen,styles.RadiusTop_5]} onPress={() => this.props.navigation.navigate('Login')}>
                        <Text style={[styles.textRegular, styles.textSize_16, styles.text_White,styles.paddingVertical_5, styles.textCenter]}>{i18n.translate('login')}</Text>
                    </TouchableOpacity>

                    :

                    <TouchableOpacity style={[styles.clickLogin, styles.bg_darkGreen,styles.RadiusTop_5]} onPress={() => this.logout()}>
                        <Text style={[styles.textRegular, styles.textSize_16, styles.text_White,styles.paddingVertical_5, styles.textCenter]}>{i18n.translate('logout')}</Text>
                    </TouchableOpacity>

                }

            </Container>
        );
    }
}

const mapStateToProps = ({ auth, profile }) => {
    return {
        auth    : auth.user,
        user    : profile.user
    };
};

export default connect(mapStateToProps, { logout, tempAuth })(DrawerCustomization);