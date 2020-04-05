import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity} from "react-native";
import {Container, Content, Header, Button, Left, Icon, Title, Body, Form, Item, Input, Toast} from 'native-base'
import styles from '../../assets/style';

import i18n from "../../locale/i18n";
import {connect} from "react-redux";
import {chooseLang, profile, updateProfile} from "../actions";
import * as ImagePicker from 'expo-image-picker';
import Spinner from "react-native-loading-spinner-overlay";

class EditProfile extends Component {
    constructor(props){
        super(props);
        this.state = {
            name            : this.props.user.name,
            phone           : this.props.user.phone,
            email           : this.props.user.email,
            national_id     : this.props.user.national_id,
            image           : null,
            base64          : null,
            spinner         : false
        }
    }

    _pickImage    = async () => {

        let result  = await ImagePicker.launchImageLibraryAsync({
            allowsEditing   : true,
            base64          : true,
            aspect          : [4, 3],
        });

        this.setState({base64: result.base64});

        if (!result.cancelled) {
            this.setState({ image: result.uri , base64:result.base64});
        }

    };

    validate = () => {

        let isError     = false;
        let msg         = '';

        if (this.state.phone.name <= 0 || this.state.name.length < 4) {
            isError     = true;
            msg         = i18n.translate('Full');
        }else if (this.state.national_id.length <= 0){
            isError     = true;
            msg         = i18n.translate('IDnumber');
        }else if (this.state.phone.length <= 0){
            isError     = true;
            msg         = i18n.translate('namereq');
        }else if(this.state.phone.length !== 10){
            isError     = true;
            msg         = i18n.translate('aggnumber');
        }else if (this.state.email.length <= 0 || this.state.email.indexOf("@") === -1 || this.state.email.indexOf(".") === -1){
            isError     = true;
            msg         = i18n.translate('entermail');
        }

        if (msg !== ''){
            Toast.show({
                text          : msg,
                duration      : 2000,
                type          : "danger",
                textStyle     : {
                    color           : "white",
                    fontFamily      : 'cairo',
                    textAlign       : 'center',
                }
            });
        }
        return isError;
    };

    onUpdateProfile (){

        const err = this.validate();

        if (!err){

            this.setState({ spinner: true });

            const data = {
                name            : this.state.name,
                phone           : this.state.phone,
                image           : this.state.base64,
                email           : this.state.email,
                national_id     : this.state.national_id,
                device_id       : null,
                lang            : this.props.lang,
                token           : this.props.user.token
            };

            this.props.updateProfile(data);

            setTimeout(()=> {
                this.setState({spinner : false});
                Toast.show({
                    text        : i18n.translate('plzWait'),
                    type        : "success",
                    duration    : 3000,
                    textStyle       : {
                        color           : "white",
                        fontFamily      : 'cairo',
                        textAlign       : 'center',
                    }
                });
                this.props.navigation.navigate('Profile');
            } , 2000);

        }else {

            this.setState({ spinner: false });

        }

    }

    render() {

        let { image } = this.state;

        let { user } = this.props;
        if ( user == null )
            user = {
                avatar      : '../../assets/img/profile.png',
                name        : i18n.translate('guest'),
            };

        return (

            <Container>
                <Spinner
                    visible           = { this.state.spinner }
                />
                <Header style={styles.headerView}>
                    <Left style={styles.leftIcon}>
                        <Button style={styles.Button} transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon style={[styles.text_darkGreen, styles.textSize_22]} type="AntDesign" name='arrowright' />
                        </Button>
                    </Left>
                    <Body style={styles.bodyText}>
                        <Title style={[styles.textRegular , styles.text_darkGreen, styles.textSize_20]}>{i18n.translate('editdata')}</Title>
                    </Body>
                </Header>

                <Content contentContainerStyle={styles.bgFullWidth} style={styles.contentView}>

                    <View style={[styles.minImage, styles.flexCenter,styles.marginVertical_15]}>
                        <View style={[styles.uploadImg, styles.minImage, styles.flexCenter]}>
                            {image != null?
                                <Image source={{ uri: image }} style={[styles.minImage, styles.Radius_10]} />
                                :
                                <Image source={{ uri: user.avatar }} style={[styles.minImage, styles.Radius_10]} />
                            }
                            <TouchableOpacity style={[styles.openGallery, styles.flexCenter, styles.Radius_10]} onPress={this._pickImage}>
                                <Icon style={[styles.text_darkGreen, styles.textSize_20]} type="Entypo" name='image' />
                            </TouchableOpacity>
                        </View>
                    </View>


                    <Form style={[styles.formValdition, styles.Width_90, styles.flexCenter, styles.marginVertical_25]}>

                        <View style={[styles.overHidden]}>
                            <Text style={[styles.text_gray, styles.textSize_14, styles.textRegular, styles.textLeft, styles.paddingHorizontal_10]}>
                                {i18n.translate('userName')}
                            </Text>
                            <Item floatingLabel style={styles.item}>
                                <Input
                                    placeholder             = {i18n.translate('userName')}
                                    style                   = {[styles.input, styles.Radius_40, styles.height_50]}
                                    onChangeText            = {(name) => this.setState({name})}
                                    value                   = { this.state.name }
                                />
                            </Item>
                        </View>

                        <View style={[styles.overHidden]}>
                            <Text style={[styles.text_gray, styles.textSize_14, styles.textRegular, styles.textLeft, styles.paddingHorizontal_10]}>
                                {i18n.translate('phone')}
                            </Text>
                            <Item floatingLabel style={styles.item}>
                                <Input
                                    placeholder             = {i18n.translate('phone')}
                                    style                   = {[styles.input, styles.Radius_40, styles.height_50]}
                                    keyboardType            = {'number-pad'}
                                    onChangeText            = {(phone) => this.setState({phone})}
                                    maxLength               = {10}
                                    value                   = { this.state.phone }
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
                                    keyboardType            = {'email-address'}
                                    onChangeText            = {(email) => this.setState({email})}
                                    value                   = { this.state.email }
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
                                    onChangeText            = {(national_id) => this.setState({national_id})}
                                    value                   = { this.state.national_id }
                                />
                            </Item>
                        </View>
                    </Form>

                </Content>

                <TouchableOpacity style={[styles.clickLogin, styles.bg_darkGreen,styles.RadiusTop_5]} onPress={() => this.onUpdateProfile()}>
                    <Text style={[styles.textRegular, styles.textSize_18, styles.text_White,styles.paddingVertical_5, styles.textCenter]}>{i18n.translate('save')}</Text>
                </TouchableOpacity>

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
export default connect(mapStateToProps, { updateProfile, profile, chooseLang })(EditProfile);
