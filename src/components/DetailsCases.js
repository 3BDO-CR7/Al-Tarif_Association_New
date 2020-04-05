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

class DetailsCases extends Component {
    constructor(props){
        super(props);
        this.state = {
            spinner                 : false,
            is_Favourite            : false,
            is_Recommend            : false,
            need_indensity          : '',
            case_id                 : '',
            is_donation             : 1,
            caseType                : '',
            family_number           : '',
            have_handicapped        : '',
            livingType              : '',
            needType                : '',
            money                   : '',
            coverageRatio           : '',
            remainingAmount         : '',
            description             : '',
            completed               : '',
        }
    }

    componentWillMount() {
        this.setState({spinner: true});
        axios({
            url         : CONST.url + 'caseDetails',
            method      : 'POST',
            headers     : this.props.user ? {Authorization: this.props.user.token} :  null,
            data : {
                case_id         : this.props.navigation.state.params.id,
                lang            : this.props.lang,
            }
        }).then(response => {
            axios({
                url         : CONST.url + 'stop-donation',
                method      : 'POST',
                data     : {
                    lang : this.props.lang
                }
            }).then(response => {
                this.setState({
                    is_donation                : response.data.data,
                });
            }).catch(err => {
                this.setState({spinner : false});
            })

            this.setState({
                case_id                 : response.data.data.id,
                need_indensity          : response.data.data.need_indensity,
                caseType                : response.data.data.caseType,
                family_number           : response.data.data.family_number,
                have_handicapped        : response.data.data.have_handicapped,
                livingType              : response.data.data.livingType,
                needType                : response.data.data.needType,
                money                   : response.data.data.money,
                coverageRatio           : response.data.data.coverageRatio,
                remainingAmount         : response.data.data.remainingAmount,
                description             : response.data.data.description,
                completed               : response.data.data.completed,
                spinner                 : false
            });

            let Favorite    = response.data.data.isfav;
            let Recommend   = response.data.data.isRecommendation;

            if(Favorite === 0){
                this.setState({is_Favourite: false});
            }else{
                this.setState({is_Favourite: true});
            }

            if(Recommend === 0){
                this.setState({is_Recommend: false});
            }else {
                this.setState({is_Recommend: true});
            }

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

    clickFav(){

        this.setState({spinner: true});

        this.setState({is_Favourite : !this.state.is_Favourite});

        if (this.props.auth == null || this.props.user == null){

            this.props.navigation.navigate('Login');

        } else{

            axios({
                url       : CONST.url + 'favCase',
                method    : 'POST',
                data      : {
                    token           : this.props.auth.data.token,
                    case_id         : this.props.navigation.state.params.id,
                    lang            : this.props.lang,
                }
            }).then(response => {

                Toast.show({
                    text            : response.data.message,
                    duration        : 2000,
                    type            : "success",
                    textStyle  : {
                        color       : "white",
                        fontFamily  : 'cairo' ,
                        textAlign   : 'center'
                    }
                });

                this.setState({spinner : false});

            }).catch(err => {

                Toast.show({
                    text        : i18n.translate('tryagain'),
                    duration    : 2000,
                    type        : "danger",
                    textStyle   : {
                        color       : "white",
                        fontFamily  : 'CairoRegular',
                        textAlign   : 'center'
                    }
                });

                console.log(err);
                this.setState({spinner : false});
            });

        }

    }

    clickRecommend(){

        this.setState({is_Recommend : !this.state.is_Recommend});

        this.setState({spinner: true});

        if (this.props.auth == null || this.props.user == null){

            this.props.navigation.navigate('Login');

        }
        else{
            axios({
                url       : CONST.url + 'recommendCase',
                method    : 'POST',
                data      : {
                    token           : this.props.auth.data.token,
                    case_id         : this.props.navigation.state.params.id,
                    lang            : this.props.lang,
                }
            }).then(response => {

                Toast.show({
                    text            : response.data.message,
                    duration        : 2000,
                    type            : "success",
                    textStyle  : {
                        color       : "white",
                        fontFamily  : 'cairo' ,
                        textAlign   : 'center'
                    }
                });

                this.setState({spinner : false});


            }).catch(err => {

                Toast.show({
                    text        : i18n.translate('tryagain'),
                    duration    : 2000,
                    type        : "danger",
                    textStyle   : {
                        color       : "white",
                        fontFamily  : 'CairoRegular',
                        textAlign   : 'center'
                    }
                });

                console.log(err);
                this.setState({spinner : false});
            });

        }

    }

    onShare = async (id) => {
        try {
            const result = await Share.share({
                message: `http://s.ll.sa/tariif`,
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {

                } else {

                }
            } else if (result.action === Share.dismissedAction) {

            }
        } catch (error) {
            alert(error.message);
        }
    };


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
                    <Right style={styles.rightIcon}>
                        <Button style={styles.Button} transparent onPress={() => this.onShare(this.state.case_id)}>
                            <Icon style={[styles.text_gray, styles.textSize_18]} type="AntDesign" name='sharealt' />
                        </Button>
                        <Button style={styles.Button} transparent onPress={() => this.clickRecommend()}>
                            <Image style={[styles.smImage]} source={(this.state.is_Recommend === true) ? require('../../assets/img/awardg.png') : require('../../assets/img/awardb.png')}/>
                        </Button>
                        <Button style={styles.Button} transparent onPress={() => this.clickFav()}>
                            <Icon style={[styles.text_gray, styles.textSize_18]}  type="FontAwesome" name={(this.state.is_Favourite ===  true)? 'bookmark' : 'bookmark-o'}/>
                        </Button>
                    </Right>
                </Header>

                <Content contentContainerStyle={styles.bgFullWidth} style={styles.contentView}>

                    <View style={[styles.overHidden, styles.flex_30, styles.flexCenter, styles.block]}>
                        <Image style={[styles.iconImg]} source={require('../../assets/img/noun_leaf.png')}/>
                        <Text style={[styles.text_gray, styles.textSize_16, styles.textRegular]}>
                            {i18n.translate('numCases')}
                        </Text>
                        <Text style={[styles.text_darkGreen, styles.textSize_30, styles.textRegular]}>
                            { id }
                        </Text>
                    </View>

                    <View style={[styles.rowCenter, styles.Radius_60,styles.marginHorizontal_15,styles.marginVertical_20]}>
                        <View style={[styles.bg_red,styles.flex_25]}>
                            {
                                (this.state.need_indensity === 0)

                                    ?
                                    <View style={[styles.overHidden, styles.iconDown]}>
                                        <Icon style={[styles.text_gray, styles.textSize_18]} type="AntDesign" name='caretdown' />
                                    </View>
                                    :
                                    <View/>
                            }
                            <Text style={[styles.text_White, styles.textSize_12, styles.textRegular,styles.textCenter]}>
                                {i18n.translate('Verycritical')}
                            </Text>
                        </View>
                        <View style={[styles.bg_orange,styles.flex_25]}>
                            {
                                (this.state.need_indensity === 1)

                                    ?
                                    <View style={[styles.overHidden, styles.iconDown]}>
                                        <Icon style={[styles.text_gray, styles.textSize_18]} type="AntDesign" name='caretdown' />
                                    </View>
                                    :
                                    <View/>
                            }
                            <Text style={[styles.text_White, styles.textSize_12, styles.textRegular,styles.textCenter]}>
                                {i18n.translate('Critical')}
                            </Text>
                        </View>
                        <View style={[styles.bg_yellow,styles.flex_25]}>
                            {
                                (this.state.need_indensity === 2)

                                    ?
                                    <View style={[styles.overHidden, styles.iconDown]}>
                                        <Icon style={[styles.text_gray, styles.textSize_18]} type="AntDesign" name='caretdown' />
                                    </View>
                                    :
                                    <View/>
                            }
                            <Text style={[styles.text_gray, styles.textSize_12, styles.textRegular,styles.textCenter]}>
                                {i18n.translate('needy')}
                            </Text>
                        </View>
                        <View style={[styles.bg_darkGreen,styles.flex_25]}>
                            {
                                (this.state.need_indensity === 3)

                                    ?
                                    <View style={[styles.overHidden, styles.iconDown]}>
                                        <Icon style={[styles.text_gray, styles.textSize_18]} type="AntDesign" name='caretdown' />
                                    </View>
                                    :
                                    <View/>
                            }
                            <Text style={[styles.text_White, styles.textSize_12, styles.textRegular,styles.textCenter]}>
                                {i18n.translate('Normal')}
                            </Text>
                        </View>
                    </View>

                    <View style={[styles.overHidden]}>
                        <View style={[styles.overHidden, styles.rowGroup,styles.paddingHorizontal_10,styles.paddingVertical_10,styles.bg_lightWhite]}>
                            <Text style={[styles.text_gray, styles.textSize_16, styles.textRegular, styles.textLeft]}>
                                {i18n.translate('situation')} :
                            </Text>
                            <Text style={[styles.text_brown, styles.textSize_16, styles.textRegular, styles.textLeft]}>
                                { this.state.caseType }
                            </Text>
                        </View>
                        <View style={[styles.overHidden, styles.rowGroup,styles.paddingHorizontal_10,styles.paddingVertical_10]}>
                            <Text style={[styles.text_gray, styles.textSize_16, styles.textRegular, styles.textLeft]}>
                                {i18n.translate('numivid')} :
                            </Text>
                            <Text style={[styles.text_brown, styles.textSize_16, styles.textRegular, styles.textLeft]}>
                                { this.state.family_number }
                            </Text>
                        </View>
                        <View style={[styles.overHidden, styles.rowGroup,styles.paddingHorizontal_10,styles.paddingVertical_10,styles.bg_lightWhite]}>
                            <Text style={[styles.text_gray, styles.textSize_16, styles.textRegular, styles.textLeft]}>
                                {i18n.translate('Handicapped')} :
                            </Text>
                            <Text style={[styles.text_brown, styles.textSize_16, styles.textRegular, styles.textLeft]}>
                                { this.state.have_handicapped }
                            </Text>
                        </View>
                        <View style={[styles.overHidden, styles.rowGroup,styles.paddingHorizontal_10,styles.paddingVertical_10]}>
                            <Text style={[styles.text_gray, styles.textSize_16, styles.textRegular, styles.textLeft]}>
                                {i18n.translate('Living')} :
                            </Text>
                            <Text style={[styles.text_brown, styles.textSize_16, styles.textRegular, styles.textLeft]}>
                                { this.state.livingType }
                            </Text>
                        </View>
                        <View style={[styles.overHidden, styles.rowGroup,styles.paddingHorizontal_10,styles.paddingVertical_10,styles.bg_lightWhite]}>
                            <Text style={[styles.text_gray, styles.textSize_16, styles.textRegular, styles.textLeft]}>
                                {i18n.translate('Need')} :
                            </Text>
                            <Text style={[styles.text_brown, styles.textSize_16, styles.textRegular, styles.textLeft]}>
                                { this.state.needType }
                            </Text>
                        </View>
                        <View style={[styles.overHidden, styles.rowGroup,styles.paddingHorizontal_10,styles.paddingVertical_10]}>
                            <Text style={[styles.text_gray, styles.textSize_16, styles.textRegular, styles.textLeft]}>
                                {i18n.translate('amrequired')} :
                            </Text>
                            <Text style={[styles.text_brown, styles.textSize_16, styles.textRegular, styles.textLeft]}>
                                { this.state.money }
                            </Text>
                        </View>
                        <View style={[styles.overHidden, styles.rowGroup,styles.paddingHorizontal_10,styles.paddingVertical_10,styles.bg_lightWhite]}>
                            <Text style={[styles.text_gray, styles.textSize_16, styles.textRegular, styles.textLeft]}>
                                {i18n.translate('ratio')} :
                            </Text>
                        </View>

                        <View style={[styles.bg_lightWhite , styles.Width_90 , styles.Radius_40, styles.height_20, styles.marginVertical_20, styles.SelfCenter]}>
                            <View style={[styles.bg_darkGreen, styles.Radius_40, styles.height_20 , { width: JSON.stringify(this.state.coverageRatio ? this.state.coverageRatio : 0) + '%' }]}>
                                <Text style={[styles.text_White , styles.textLeft, styles.paddingHorizontal_10, styles.textRegular, styles.textRatio, styles.textSize_12]}>
                                    { this.state.coverageRatio ? this.state.coverageRatio : 0 } %
                                </Text>
                            </View>
                        </View>

                        {
                            (this.state.completed === 0)

                                ?
                                <View style={[styles.overHidden, styles.rowGroup,styles.paddingHorizontal_10,styles.paddingVertical_10,styles.bg_lightWhite]}>
                                    <Text style={[styles.text_gray, styles.textSize_16, styles.textRegular, styles.textLeft]}>
                                        {i18n.translate('amount')} :
                                    </Text>
                                    <Text style={[styles.text_brown, styles.textSize_16, styles.textRegular, styles.textLeft]}>
                                        { this.state.remainingAmount }
                                    </Text>
                                </View>
                                :
                                <View/>
                        }
                    </View>
                    <View style={[styles.overHidden, styles.marginVertical_10, styles.marginHorizontal_10]}>
                        <Text style={[styles.text_gray, styles.textSize_16, styles.textRegular, styles.textLeft]}>{i18n.translate('Dessituation')}</Text>
                        <Text style={[styles.text_darkGreen, styles.textSize_16, styles.textRegular, styles.textLeft]}>
                            { this.state.description }
                        </Text>
                    </View>
                </Content>

                {
                    (this.state.completed === 0 && this.state.is_donation === 1)

                        ?
                        <TouchableOpacity style={[styles.clickLogin, styles.bg_darkGreen,styles.RadiusTop_5]} onPress={() => this.props.navigation.navigate('Payment', {case_id : this.state.case_id})}>
                            <Text style={[styles.textRegular, styles.textSize_18, styles.text_White,styles.paddingVertical_5, styles.textCenter]}>{i18n.translate('donation')}</Text>
                        </TouchableOpacity>
                        :
                        <View/>
                }

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
export default connect(mapStateToProps, { userLogin, profile, chooseLang })(DetailsCases);