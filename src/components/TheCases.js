import React, { Component } from "react";
import {View, Text, TouchableOpacity, Image} from "react-native";
import {Container, Content, Header, Button, Left, Icon, Title, Body, Right, Toast} from 'native-base'
import styles from '../../assets/style';


import i18n from "../../locale/i18n";
import axios from "axios";
import CONST from "../consts";
import * as Animatable from "react-native-animatable";
import Spinner from "react-native-loading-spinner-overlay";
import {connect} from "react-redux";
import {chooseLang} from "../actions";

class TheCases extends Component {
    constructor(props){
        super(props);
        this.state = {
            spinner         : false,
            theCases        : [],
            active          : true,
        }
    }

    componentWillMount() {
        this.setState({spinner: true});

        axios({
            url         : CONST.url + 'Cases',
            method      : 'POST',
            data : {
                lang        : this.props.lang,
                status      : 1,
            }
        }).then(response => {

            let Cases = response.data.data;

            if(Cases.length === 0){
                Toast.show({
                    text            : i18n.translate('noCases'),
                    duration        : 2000,
                    type            : "danger",
                    textStyle       : {
                        color           : "white",
                        fontFamily      : 'cairo',
                        textAlign       : 'center'
                    }
                });
                this.setState({theCases : []});
            }else {
                this.setState({
                    theCases                : response.data.data,
                });
            }

            this.setState({spinner : false});

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

    Cases(status){

        this.setState({spinner: true, active: status ? true : false});

        axios({
            url         : CONST.url + 'Cases',
            method      : 'POST',
            data : {
                lang        : this.props.lang,
                status      : status
            }
        }).then(response => {

            let Cases = response.data.data;

            if(Cases.length === 0){
                Toast.show({
                    text            : i18n.translate('noCases'),
                    duration        : 2000,
                    type            : "danger",
                    textStyle       : {
                        color           : "white",
                        fontFamily      : 'cairo',
                        textAlign       : 'center'
                    }
                });
                this.setState({theCases : []});
            }else {
                this.setState({theCases : response.data.data,});
            }

            this.setState({spinner : false});

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

    render() {

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
                        <Title style={[styles.textRegular , styles.text_darkGreen, styles.textSize_20]}>{i18n.translate('Cases')}</Title>
                    </Body>
                    <Right style={styles.rightIcon}>
                        <Button style={styles.Button} transparent onPress={() => this.props.navigation.navigate('Search')}>
                            <Icon style={[styles.text_darkGreen, styles.textSize_18]} type="MaterialCommunityIcons" name='filter' />
                        </Button>
                    </Right>
                </Header>

                <Content contentContainerStyle={styles.bgFullWidth} style={styles.contentView}>

                    <View style={[styles.rowCenter , styles.Border, styles.Radius_60, styles.Width_80, styles.paddingVertical_5, styles.paddingHorizontal_5]}>
                        <TouchableOpacity style={ this.state.active ? [styles.flex_50, styles.bg_darkGreen, styles.Radius_40] : [styles.flex_50]} onPress={() => this.Cases(1)}>
                            <Text style={ this.state.active ? [styles.text_White, styles.textSize_18, styles.textRegular, styles.textCenter] : [styles.text_darkGreen, styles.textSize_18, styles.textRegular, styles.textCenter]}>
                                {i18n.translate('Completed')}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={ this.state.active ? [styles.flex_50] : [styles.flex_50, styles.bg_darkGreen, styles.Radius_40]} onPress={() => this.Cases(0)}>
                            <Text style={ this.state.active ? [styles.text_darkGreen, styles.textSize_18, styles.textRegular, styles.textCenter] : [styles.text_White, styles.textSize_18, styles.textRegular, styles.textCenter]}>
                                {i18n.translate('noCompleted')}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {
                        this.state.theCases.map((Cases, i) => (
                            <Animatable.View animation="fadeInUp" easing="ease-out" key={i} delay={500}>
                                <TouchableOpacity
                                    style={[styles.viewTabs, styles.rowGroup, styles.boxShadow, styles.bg_lightWhite, styles.Radius_15,styles.paddingHorizontal_10, styles.paddingVertical_10, styles.marginVertical_10, styles.marginHorizontal_20]}
                                    onPress={() => this.props.navigation.navigate('DetailsCases', { id: Cases.id })}
                                >
                                    <View style={[styles.overHidden, styles.flex_30, styles.flexCenter, styles.block]}>
                                        <Image style={[styles.iconImg]} source={require('../../assets/img/noun_leaf.png')}/>
                                        <Text style={[styles.text_gray, styles.textSize_14, styles.textRegular]}>
                                            {i18n.translate('numCases')}
                                        </Text>
                                        <Text style={[styles.text_gray, styles.textSize_14, styles.textRegular]}>
                                            { Cases.id }
                                        </Text>
                                    </View>

                                    <View style={styles.borderView}></View>

                                    <View style={[styles.overHidden, styles.flex_70, styles.paddingHorizontal_10]}>

                                        {
                                            (Cases.status === 0)

                                                ?
                                                <View style={[styles.overHidden, styles.rowGroup]}>
                                                    <Text style={[styles.text_turquoise, styles.textSize_14, styles.textRegular, styles.flex_90]}>
                                                        {i18n.translate('caseDet')} :
                                                    </Text>
                                                    <View style={[styles.overHidden, styles.flex_10]}>
                                                        <Image style={[styles.favImage, styles.SelfCenter]} source={Cases.isRecommendation === 1 ? require('../../assets/img/awardg.png') : require('../../assets/img/awardb.png')}/>
                                                        <Text style={[styles.text_gray, styles.textSize_12, styles.textRegular, styles.textCenter]}>
                                                            ({ Cases.recommendations })
                                                        </Text>
                                                    </View>
                                                </View>
                                                :
                                                <View/>
                                        }

                                        <View style={[styles.overHidden, styles.rowRight]}>
                                            <Text style={[styles.text_gray, styles.textSize_14, styles.textRegular, styles.flex_60, styles.textLeft]}>
                                                {i18n.translate('kindCases')} :
                                            </Text>
                                            <Text style={[styles.text_brown, styles.textSize_12, styles.textRegular, styles.flex_40, styles.textLeft]}>
                                                { Cases.caseType }
                                            </Text>
                                        </View>

                                        {
                                            (Cases.money !== null)

                                                ?
                                                <View style={[styles.overHidden, styles.rowRight]}>
                                                    <Text style={[styles.text_gray, styles.textSize_14, styles.textRegular, styles.flex_60, styles.textLeft]}>
                                                        {i18n.translate('monyCases')} :
                                                    </Text>
                                                    <Text style={[styles.text_brown, styles.textSize_12, styles.textRegular, styles.flex_40, styles.textLeft]}>
                                                        { Cases.money }
                                                    </Text>
                                                </View>
                                                :
                                                <View/>
                                        }

                                        {
                                            (Cases.remainingAmount !== null)

                                                ?
                                                <View style={[styles.overHidden, styles.rowRight]}>
                                                    <Text style={[styles.text_gray, styles.textSize_14, styles.textRegular, styles.flex_60, styles.textLeft]}>
                                                        {i18n.translate('CoCases')} :
                                                    </Text>
                                                    <Text style={[styles.text_brown, styles.textSize_12, styles.textRegular, styles.flex_40, styles.textLeft]}>
                                                        { Cases.remainingAmount }
                                                    </Text>
                                                </View>
                                                :
                                                <View/>
                                        }

                                        <View style={[styles.overHidden, styles.rowRight]}>
                                            <Text style={[styles.text_gray, styles.textSize_14, styles.textRegular, styles.flex_60, styles.textLeft]}>
                                                {i18n.translate('needCases')} :
                                            </Text>
                                            <Text style={[styles.text_brown, styles.textSize_12, styles.textRegular, styles.flex_40, styles.textLeft]}>
                                                { Cases.needType }
                                            </Text>
                                        </View>

                                        {
                                            (Cases.status === 1)

                                                ?
                                                <View style={[styles.overHidden, styles.rowRight]}>
                                                    <Text style={[styles.text_gray, styles.textSize_14, styles.textRegular, styles.flex_60, styles.textLeft]}>
                                                        {i18n.translate('Condsi')} :
                                                    </Text>
                                                    <Text style={[styles.text_brown, styles.textSize_12, styles.textRegular, styles.flex_40, styles.textLeft]}>
                                                        {i18n.translate('Completed')}
                                                    </Text>
                                                </View>
                                                :
                                                <View/>
                                        }

                                    </View>
                                    <Text style={[styles.arrLeft]}>
                                        <Icon style={[styles.text_turquoise, styles.textSize_22]} type="FontAwesome" name='long-arrow-left' />
                                    </Text>
                                </TouchableOpacity>
                            </Animatable.View>
                        ))
                    }

                </Content>

                <TouchableOpacity
                    style       = {[styles.bg_darkGreen, styles.Radius_60, styles.flexCenter, styles.addcases]}
                    onPress     = {() => this.props.navigation.navigate('AddCases', {type : null})}
                >
                    <Text>
                        <Icon style={[styles.text_White, styles.textSize_22]} type="AntDesign" name='plus' />
                    </Text>
                </TouchableOpacity>

            </Container>

        );
    }
}

const mapStateToProps = ({ lang }) => {
    return {
        lang    : lang.lang
    };
};

export default connect(mapStateToProps, { chooseLang })(TheCases);