import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity} from "react-native";
import {Container, Content, Header, Button, Left, Icon, Title, Body, Right, Form, Item, Input} from 'native-base'
import styles from '../../assets/style';

import i18n from "../../locale/i18n";
import Tabs from './Tabs';
import {connect} from "react-redux";
import {chooseLang, profile, userLogin} from "../actions";
import {NavigationEvents} from "react-navigation";

class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    static navigationOptions = () => ({
        drawerLabel : () => null,
    });


    componentWillMount() {
        console.log('fuck token', this.props.user);
       // this.props.profile(this.props.user.token);
    }

    onFocus(){
     //   this.componentWillMount()
    }

    render() {

        let { user } = this.props;
        if ( user == null )
            user = {
                avatar      : '../../assets/img/profile.png',
                name        : i18n.translate('guest'),
                phone       : ''
            };

        return (

            <Container>

                <NavigationEvents onWillFocus={() => this.onFocus()} />

                <Header style={styles.headerView}>
                    <Left style={styles.leftIcon}>
                        <Button style={styles.Button} transparent onPress={() => { this.props.navigation.openDrawer()} }>
                            <Icon style={[styles.text_darkGreen, styles.textSize_22]} type="Entypo" name='grid' />
                        </Button>
                    </Left>
                    <Body style={styles.bodyText}>
                        <Title style={[styles.textRegular , styles.text_darkGreen, styles.textSize_20]}>{i18n.translate('profile')}</Title>
                    </Body>
                    <Right style={styles.rightIcon}>
                        <Button style={styles.Button} transparent onPress={() => this.props.navigation.navigate('Notification')}>
                            <Icon style={[styles.text_darkGreen, styles.textSize_22]} type="MaterialIcons" name='notifications' />
                        </Button>
                    </Right>
                </Header>

                <Content contentContainerStyle={styles.bgFullWidth} style={styles.contentView}>

                    <View style={[styles.overHidden]}>
                        <View style={[styles.overHidden]}>
                            <Image style={[styles.minImage , styles.marginVertical_15, styles.flexCenter, styles.Radius_10]} source={{ uri: user.avatar }}/>
                        </View>
                        <View style={[styles.overHidden, styles.rowCenter]}>
                            <Text style={[styles.text_darkGreen, styles.textSize_20, styles.textRegular]}>
                                { user.name }
                            </Text>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('EditProfile')}>
                                <Icon style={[styles.text_gray, styles.textSize_22, styles.marginHorizontal_15]} type="AntDesign" name='edit' />
                            </TouchableOpacity>
                        </View>
                    </View>


                    <Form style={[styles.formValdition, styles.Width_90, styles.flexCenter, styles.marginVertical_25]}>


                        <View style={[styles.overHidden]}>
                            <Text style={[styles.text_gray, styles.textSize_14, styles.textRegular, styles.textLeft, styles.paddingHorizontal_10]}>
                                {i18n.translate('phone')}
                            </Text>
                            <Item floatingLabel style={styles.item}>
                                <Input
                                    placeholder             = {i18n.translate('phone')}
                                    style                   = {[styles.input, styles.Radius_40, styles.height_50]}
                                    keyboardType            = {'number-pad'}
                                    placeholderTextColor    = {styles.text_gray}
                                    onChangeText            = {(phone) => this.setState({phone})}
                                    value                   = { user.phone }
                                    disabled
                                />
                            </Item>
                        </View>

                        <View style={[styles.overHidden]}>
                            <Text style={[styles.text_gray, styles.textSize_14, styles.textRegular, styles.textLeft, styles.paddingHorizontal_10]}>
                                {i18n.translate('email')}
                            </Text>
                            <Item floatingLabel style={styles.item}>
                                <Input
                                    placeholder             = {i18n.translate('email')}
                                    style                   = {[styles.input, styles.Radius_40, styles.height_50]}
                                    keyboardType            = {'number-pad'}
                                    placeholderTextColor    = {styles.text_gray}
                                    onChangeText            = {(phone) => this.setState({phone})}
                                    value                   = { this.props.user.email }
                                    disabled
                                />
                            </Item>
                        </View>

                        <View style={[styles.overHidden]}>
                            <Text style={[styles.text_gray, styles.textSize_14, styles.textRegular, styles.textLeft, styles.paddingHorizontal_10]}>
                                {i18n.translate('natNumber')}
                            </Text>
                            <Item floatingLabel style={styles.item}>
                                <Input
                                    placeholder             = {i18n.translate('natNumber')}
                                    style                   = {[styles.input, styles.Radius_40, styles.height_50]}
                                    keyboardType            = {'number-pad'}
                                    placeholderTextColor    = {styles.text_gray}
                                    onChangeText            = {(phone) => this.setState({phone})}
                                    value                   = { this.props.user.national_id }
                                    disabled
                                />
                            </Item>
                        </View>
                    </Form>

                    <TouchableOpacity style={[styles.marginHorizontal_15, styles.paddingVertical_15]} onPress={() => this.props.navigation.navigate('ChangePassword')}>
                        <Text style={[styles.text_darkGreen, styles.textSize_20, styles.marginHorizontal_15, styles.textRegular, styles.textCenter]}>
                            {i18n.translate('changepass')}
                        </Text>
                    </TouchableOpacity>

                </Content>

                <Tabs routeName="Profile"  navigation={this.props.navigation}/>
            </Container>

        );
    }
}

const mapStateToProps = ({ auth, profile, lang }) => {
    return {
        auth        : auth.user,
        user        : profile.user,
        lang        : lang.lang
    };
};
export default connect(mapStateToProps, { userLogin, profile, chooseLang })(Profile);