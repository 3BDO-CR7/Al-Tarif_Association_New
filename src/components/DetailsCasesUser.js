import React, { Component } from "react";
import {View, Text, TouchableOpacity, Image, Share} from "react-native";
import {Container, Content, Header, Button, Left, Icon, Title, Body, Right, Toast} from 'native-base'
import styles from '../../assets/style';


import i18n from "../../locale/i18n";
import axios from "axios";
import CONST from "../consts";
import Spinner from "react-native-loading-spinner-overlay";
import {connect} from "react-redux";
import {chooseLang, profile, userLogin} from "../actions";
import {NavigationEvents} from "react-navigation";

class DetailsCasesUser extends Component {
    constructor(props){
        super(props);
        this.state = {
            spinner                     : false,
            id                          : '',
            name                        : '',
            national_id                 : '',
            birthday                    : '',
            phone                       : '',
            email                       : '',
            income                      : '',
            have_handicapped            : '',
            handicapped_number          : '',
            handicapped_type            : '',
            have_maid                   : '',
            maid_number                 : '',
            have_workers                : '',
            workers_number              : '',
            have_commerical_record      : '',
            commerical_record_number    : '',
            family_number               : '',
            city_id                     : '',
            quarter_id                  : '',
            healthStatus                : '',
            LivingType                  : '',
            socialStatus                : '',
            Nationality                 : '',
            national_id_image           : '',
            family_notebook             : '',
            electricity_bill            : '',
            lease                       : '',
            debt_proof                  : '',
            handicapped_proof           : '',
            type                        : '',
            status                      : '',
            date                        : ''
        }
    }

    componentWillMount() {

        this.setState({spinner: true});

        axios({
            url         : CONST.url + 'userSingleCase',
            method      : 'POST',
            headers     : this.props.user ? {Authorization: this.props.user.token} :  null,
            data : {
                id              : this.props.navigation.state.params.id,
                lang            : this.props.lang,
            }
        }).then(response => {

            this.setState({
                id                          : response.data.data.id,
                name                        : response.data.data.name,
                national_id                 : response.data.data.national_id,
                birthday                    : response.data.data.birthday,
                phone                       : response.data.data.phone,
                email                       : response.data.data.email,
                income                      : response.data.data.income,
                have_handicapped            : response.data.data.have_handicapped,
                handicapped_number          : response.data.data.handicapped_number,
                handicapped_type            : response.data.data.handicapped_type,
                have_maid                   : response.data.data.have_maid,
                maid_number                 : response.data.data.maid_number,
                have_workers                : response.data.data.have_workers,
                workers_number              : response.data.data.workers_number,
                have_commerical_record      : response.data.data.have_commerical_record,
                commerical_record_number    : response.data.data.commerical_record_number,
                family_number               : response.data.data.family_number,
                city_id                     : response.data.data.city_id,
                quarter_id                  : response.data.data.quarter_id,
                healthStatus                : response.data.data.healthStatus,
                LivingType                  : response.data.data.LivingType,
                socialStatus                : response.data.data.socialStatus,
                Nationality                 : response.data.data.Nationality,
                national_id_image           : response.data.data.national_id_image,
                family_notebook             : response.data.data.family_notebook,
                electricity_bill            : response.data.data.electricity_bill,
                lease                       : response.data.data.lease,
                debt_proof                  : response.data.data.debt_proof,
                handicapped_proof           : response.data.data.handicapped_proof,
                type                        : response.data.data.type,
                status                      : response.data.data.status,
                date                        : response.data.data.date,
                spinner                     : false
            });

        }).catch(err => {
            Toast.show({
                text        : i18n.translate('tryagain'),
                duration    : 2000,
                type        : "danger",
                textStyle   : {
                    color       : "white",
                    fontFamily  : 'cairo',
                    textAlign   : 'center'
                }
            });
            console.log(err);
            this.setState({spinner : false});
        });

    }

    onFocus(){
        this.componentWillMount();
    }


    render() {

        const id = this.props.navigation.state.params.id;

        return (

            <Container>

                <NavigationEvents onWillFocus={() => this.onFocus()} />

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
                        <Title style={[styles.textRegular , styles.text_darkGreen, styles.textSize_20]}>{i18n.translate('caseDet')}</Title>
                    </Body>
                </Header>

                <Content contentContainerStyle={styles.bgFullWidth} style={styles.contentView}>

                    <View style={[styles.overHidden, styles.flex_30, styles.flexCenter, styles.block]}>
                        <Image style={[styles.iconImg]} source={require('../../assets/img/noun_leaf.png')}/>
                        <Text style={[styles.text_gray, styles.textSize_16, styles.textRegular]}>
                            {i18n.translate('numCases')}
                        </Text>
                        <Text style={[styles.text_darkGreen, styles.textSize_30, styles.textRegular]}>
                            { this.state.id }
                        </Text>
                    </View>

                    <View style={[styles.overHidden]}>
                        <View style={[styles.overHidden, styles.rowGroup,styles.paddingHorizontal_10,styles.paddingVertical_10,styles.bg_lightWhite]}>
                            <Text style={[styles.text_gray, styles.textSize_14, styles.textRegular, styles.textLeft]}>
                                {i18n.translate('nameCases')} :
                            </Text>
                            <Text style={[styles.text_brown, styles.textSize_14, styles.textRegular, styles.textLeft]}>
                                { this.state.name }
                            </Text>
                        </View>
                        <View style={[styles.overHidden, styles.rowGroup,styles.paddingHorizontal_10,styles.paddingVertical_10]}>
                            <Text style={[styles.text_gray, styles.textSize_14, styles.textRegular, styles.textLeft]}>
                                {i18n.translate('civil')} :
                            </Text>
                            <Text style={[styles.text_brown, styles.textSize_14, styles.textRegular, styles.textLeft]}>
                                { this.state.national_id }
                            </Text>
                        </View>
                        <View style={[styles.overHidden, styles.rowGroup,styles.paddingHorizontal_10,styles.paddingVertical_10,styles.bg_lightWhite]}>
                            <Text style={[styles.text_gray, styles.textSize_14, styles.textRegular, styles.textLeft]}>
                                {i18n.translate('Date')} :
                            </Text>
                            <Text style={[styles.text_brown, styles.textSize_14, styles.textRegular, styles.textLeft]}>
                                { this.state.birthday }
                            </Text>
                        </View>
                        <View style={[styles.overHidden, styles.rowGroup,styles.paddingHorizontal_10,styles.paddingVertical_10]}>
                            <Text style={[styles.text_gray, styles.textSize_14, styles.textRegular, styles.textLeft]}>
                                {i18n.translate('phone')} :
                            </Text>
                            <Text style={[styles.text_brown, styles.textSize_14, styles.textRegular, styles.textLeft]}>
                                { this.state.phone }
                            </Text>
                        </View>
                        <View style={[styles.overHidden, styles.rowGroup,styles.paddingHorizontal_10,styles.paddingVertical_10,styles.bg_lightWhite]}>
                            <Text style={[styles.text_gray, styles.textSize_14, styles.textRegular, styles.textLeft]}>
                                {i18n.translate('email')} :
                            </Text>
                            <Text style={[styles.text_brown, styles.textSize_14, styles.textRegular, styles.textLeft]}>
                                { this.state.email }
                            </Text>
                        </View>
                        <View style={[styles.overHidden, styles.rowGroup,styles.paddingHorizontal_10,styles.paddingVertical_10]}>
                            <Text style={[styles.text_gray, styles.textSize_14, styles.textRegular, styles.textLeft]}>
                                {i18n.translate('Monthly')} :
                            </Text>
                            <Text style={[styles.text_brown, styles.textSize_14, styles.textRegular, styles.textLeft]}>
                                { this.state.income }
                            </Text>
                        </View>
                        <View style={[styles.overHidden, styles.rowGroup,styles.paddingHorizontal_10,styles.paddingVertical_10,styles.bg_lightWhite]}>
                            <Text style={[styles.text_gray, styles.textSize_14, styles.textRegular, styles.textLeft]}>
                                {i18n.translate('choosemarit')} :
                            </Text>
                            <Text style={[styles.text_brown, styles.textSize_14, styles.textRegular, styles.textLeft]}>
                                { this.state.have_handicapped }
                            </Text>
                        </View>
                        <View style={[styles.overHidden, styles.rowGroup,styles.paddingHorizontal_10,styles.paddingVertical_10]}>
                            <Text style={[styles.text_gray, styles.textSize_14, styles.textRegular, styles.textLeft]}>
                                {i18n.translate('num')} :
                            </Text>
                            <Text style={[styles.text_brown, styles.textSize_14, styles.textRegular, styles.textLeft]}>
                                { this.state.handicapped_number }
                            </Text>
                        </View>
                        <View style={[styles.overHidden, styles.rowGroup,styles.paddingHorizontal_10,styles.paddingVertical_10,styles.bg_lightWhite]}>
                            <Text style={[styles.text_gray, styles.textSize_14, styles.textRegular, styles.textLeft]}>
                                {i18n.translate('disability')} :
                            </Text>
                            <Text style={[styles.text_brown, styles.textSize_14, styles.textRegular, styles.textLeft]}>
                                { this.state.handicapped_type }
                            </Text>
                        </View>
                        <View style={[styles.overHidden, styles.rowGroup,styles.paddingHorizontal_10,styles.paddingVertical_10]}>
                            <Text style={[styles.text_gray, styles.textSize_14, styles.textRegular, styles.textLeft]}>
                                {i18n.translate('doserver')} :
                            </Text>
                            <Text style={[styles.text_brown, styles.textSize_14, styles.textRegular, styles.textLeft]}>
                                { this.state.have_maid }
                            </Text>
                        </View>
                        <View style={[styles.overHidden, styles.rowGroup,styles.paddingHorizontal_10,styles.paddingVertical_10,styles.bg_lightWhite]}>
                            <Text style={[styles.text_gray, styles.textSize_14, styles.textRegular, styles.textLeft]}>
                                {i18n.translate('doser')} :
                            </Text>
                            <Text style={[styles.text_brown, styles.textSize_14, styles.textRegular, styles.textLeft]}>
                                { this.state.maid_number }
                            </Text>
                        </View>
                        <View style={[styles.overHidden, styles.rowGroup,styles.paddingHorizontal_10,styles.paddingVertical_10]}>
                            <Text style={[styles.text_gray, styles.textSize_14, styles.textRegular, styles.textLeft]}>
                                {i18n.translate('labor')} :
                            </Text>
                            <Text style={[styles.text_brown, styles.textSize_14, styles.textRegular, styles.textLeft]}>
                                { this.state.have_workers }
                            </Text>
                        </View>
                        <View style={[styles.overHidden, styles.rowGroup,styles.paddingHorizontal_10,styles.paddingVertical_10,styles.bg_lightWhite]}>
                            <Text style={[styles.text_gray, styles.textSize_14, styles.textRegular, styles.textLeft]}>
                                {i18n.translate('laor')} :
                            </Text>
                            <Text style={[styles.text_brown, styles.textSize_14, styles.textRegular, styles.textLeft]}>
                                { this.state.workers_number }
                            </Text>
                        </View>
                        <View style={[styles.overHidden, styles.rowGroup,styles.paddingHorizontal_10,styles.paddingVertical_10]}>
                            <Text style={[styles.text_gray, styles.textSize_14, styles.textRegular, styles.textLeft]}>
                                {i18n.translate('commercial')} :
                            </Text>
                            <Text style={[styles.text_brown, styles.textSize_14, styles.textRegular, styles.textLeft]}>
                                { this.state.have_commerical_record }
                            </Text>
                        </View>
                        <View style={[styles.overHidden, styles.rowGroup,styles.paddingHorizontal_10,styles.paddingVertical_10,styles.bg_lightWhite]}>
                            <Text style={[styles.text_gray, styles.textSize_14, styles.textRegular, styles.textLeft]}>
                                {i18n.translate('corcial')} :
                            </Text>
                            <Text style={[styles.text_brown, styles.textSize_14, styles.textRegular, styles.textLeft]}>
                                { this.state.commerical_record_number }
                            </Text>
                        </View>
                        <View style={[styles.overHidden, styles.rowGroup,styles.paddingHorizontal_10,styles.paddingVertical_10]}>
                            <Text style={[styles.text_gray, styles.textSize_14, styles.textRegular, styles.textLeft]}>
                                {i18n.translate('members')} :
                            </Text>
                            <Text style={[styles.text_brown, styles.textSize_14, styles.textRegular, styles.textLeft]}>
                                { this.state.family_number }
                            </Text>
                        </View>
                        <View style={[styles.overHidden, styles.rowGroup,styles.paddingHorizontal_10,styles.paddingVertical_10,styles.bg_lightWhite]}>
                            <Text style={[styles.text_gray, styles.textSize_14, styles.textRegular, styles.textLeft]}>
                                {i18n.translate('city')} :
                            </Text>
                            <Text style={[styles.text_brown, styles.textSize_14, styles.textRegular, styles.textLeft]}>
                                { this.state.city_id }
                            </Text>
                        </View>
                        <View style={[styles.overHidden, styles.rowGroup,styles.paddingHorizontal_10,styles.paddingVertical_10]}>
                            <Text style={[styles.text_gray, styles.textSize_14, styles.textRegular, styles.textLeft]}>
                                {i18n.translate('Neighbor')} :
                            </Text>
                            <Text style={[styles.text_brown, styles.textSize_14, styles.textRegular, styles.textLeft]}>
                                { this.state.quarter_id }
                            </Text>
                        </View>
                        <View style={[styles.overHidden, styles.rowGroup,styles.paddingHorizontal_10,styles.paddingVertical_10,styles.bg_lightWhite]}>
                            <Text style={[styles.text_gray, styles.textSize_14, styles.textRegular, styles.textLeft]}>
                                {i18n.translate('healthstatus')} :
                            </Text>
                            <Text style={[styles.text_brown, styles.textSize_14, styles.textRegular, styles.textLeft]}>
                                { this.state.healthStatus }
                            </Text>
                        </View>
                        <View style={[styles.overHidden, styles.rowGroup,styles.paddingHorizontal_10,styles.paddingVertical_10]}>
                            <Text style={[styles.text_gray, styles.textSize_14, styles.textRegular, styles.textLeft]}>
                                {i18n.translate('living')} :
                            </Text>
                            <Text style={[styles.text_brown, styles.textSize_14, styles.textRegular, styles.textLeft]}>
                                { this.state.LivingType }
                            </Text>
                        </View>
                        <View style={[styles.overHidden, styles.rowGroup,styles.paddingHorizontal_10,styles.paddingVertical_10,styles.bg_lightWhite]}>
                            <Text style={[styles.text_gray, styles.textSize_14, styles.textRegular, styles.textLeft]}>
                                {i18n.translate('Social')} :
                            </Text>
                            <Text style={[styles.text_brown, styles.textSize_14, styles.textRegular, styles.textLeft]}>
                                { this.state.socialStatus }
                            </Text>
                        </View>
                        <View style={[styles.overHidden, styles.rowGroup,styles.paddingHorizontal_10,styles.paddingVertical_10]}>
                            <Text style={[styles.text_gray, styles.textSize_14, styles.textRegular, styles.textLeft]}>
                                {i18n.translate('Nationality')} :
                            </Text>
                            <Text style={[styles.text_brown, styles.textSize_14, styles.textRegular, styles.textLeft]}>
                                { this.state.Nationality }
                            </Text>
                        </View>
                        <View style={[styles.overHidden, styles.rowGroup,styles.paddingHorizontal_10,styles.paddingVertical_10,styles.bg_lightWhite]}>
                            <Text style={[styles.text_gray, styles.textSize_14, styles.textRegular, styles.textLeft]}>
                                {i18n.translate('Condsi')} :
                            </Text>
                            <Text style={[styles.text_brown, styles.textSize_14, styles.textRegular, styles.textLeft]}>
                                { this.state.type }
                            </Text>
                        </View>
                        <View style={[styles.overHidden, styles.rowGroup,styles.paddingHorizontal_10,styles.paddingVertical_10]}>
                            <Text style={[styles.text_gray, styles.textSize_14, styles.textRegular, styles.textLeft]}>
                                {i18n.translate('Date')} :
                            </Text>
                            <Text style={[styles.text_brown, styles.textSize_14, styles.textRegular, styles.textLeft]}>
                                { this.state.date }
                            </Text>
                        </View>

                        <View style={[styles.overHidden, styles.rowGroup, styles.marginVertical_15]}>
                            <View style={[styles.overHidden, styles.flex_30]}>
                                <View style={[styles.flexCenter, styles.marginVertical_5]}>
                                    <Text style={[styles.text_gray, styles.textSize_14, styles.textRegular]}>
                                        {i18n.translate('picture')}
                                    </Text>
                                </View>
                                <View style={[styles.icImg, styles.flexCenter]}>
                                    <Image style={[styles.icImg, styles.flexCenter, styles.Radius_5]} source={{ uri: this.state.national_id_image }}/>
                                </View>
                            </View>
                            <View style={[styles.overHidden, styles.flex_30]}>
                                <View style={[styles.flexCenter, styles.marginVertical_5]}>
                                    <Text style={[styles.text_gray, styles.textSize_14, styles.textRegular]}>
                                        {i18n.translate('FamiBoo')}
                                    </Text>
                                </View>
                                <View style={[styles.icImg, styles.flexCenter]}>
                                    <Image style={[styles.icImg, styles.flexCenter, styles.Radius_5]} source={{ uri: this.state.family_notebook }}/>
                                </View>
                            </View>
                            <View style={[styles.overHidden, styles.flex_30]}>
                                <View style={[styles.flexCenter, styles.marginVertical_5]}>
                                    <Text style={[styles.text_gray, styles.textSize_14, styles.textRegular]}>
                                        {i18n.translate('bill')}
                                    </Text>
                                </View>
                                <View style={[styles.icImg, styles.flexCenter]}>
                                    <Image style={[styles.icImg, styles.flexCenter, styles.Radius_5]} source={{ uri: this.state.electricity_bill }}/>
                                </View>
                            </View>
                        </View>
                        <View style={[styles.overHidden, styles.rowGroup, styles.marginVertical_15]}>
                            <View style={[styles.overHidden, styles.flex_30]}>
                                <View style={[styles.flexCenter, styles.marginVertical_5]}>
                                    <Text style={[styles.text_gray, styles.textSize_14, styles.textRegular]}>
                                        {i18n.translate('lease')}
                                    </Text>
                                </View>
                                <View style={[styles.icImg, styles.flexCenter]}>
                                    <Image style={[styles.icImg, styles.flexCenter, styles.Radius_5]} source={{ uri: this.state.lease }}/>
                                </View>
                            </View>
                            <View style={[styles.overHidden, styles.flex_30]}>
                                <View style={[styles.flexCenter, styles.marginVertical_5]}>
                                    <Text style={[styles.text_gray, styles.textSize_14, styles.textRegular]}>
                                        {i18n.translate('Proreligion')}
                                    </Text>
                                </View>
                                <View style={[styles.icImg, styles.flexCenter]}>
                                    <Image style={[styles.icImg, styles.flexCenter, styles.Radius_5]} source={{ uri: this.state.debt_proof }}/>
                                </View>
                            </View>
                            <View style={[styles.overHidden, styles.flex_30]}>
                                <View style={[ styles.flexCenter, styles.marginVertical_5]}>
                                    <Text style={[styles.text_gray, styles.textSize_14, styles.textRegular]}>
                                        {i18n.translate('Proof')}
                                    </Text>
                                </View>
                                <View style={[styles.icImg, styles.flexCenter]}>
                                    <Image style={[styles.icImg, styles.flexCenter, styles.Radius_5]} source={{ uri: this.state.handicapped_proof }}/>
                                </View>
                            </View>
                        </View>


                    </View>

                </Content>

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
export default connect(mapStateToProps, { userLogin, profile, chooseLang })(DetailsCasesUser);