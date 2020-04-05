import React, { Component } from "react";
import {View, Text, TouchableOpacity, Image} from "react-native";
import {Container, Content, Header, Button, Left, Icon, Title, Body, CheckBox, Toast} from 'native-base'
import styles from '../../assets/style';

import i18n from "../../locale/i18n";
import axios from "axios";
import CONST from "../consts";
import Spinner from "react-native-loading-spinner-overlay";
import * as Animatable from "react-native-animatable";
import {connect} from "react-redux";
import {chooseLang} from "../actions";

class ViewSearch extends Component {
    constructor(props){
        super(props);
        this.state = {
            data            : this.props.navigation.state.params.data,
            case_type_id    : '',
            need_type_id    : '',
            min             : '',
            max             : '',
            casesSearch     : [],
        }
    }

    componentWillMount() {

        this.setState({spinner: true});

        axios({
            url         : CONST.url + 'filtration',
            method      : 'POST',
            data : {
                case_type_id          : this.props.navigation.state.params.data.case_type_id,
                need_type_id          : this.props.navigation.state.params.data.need_type_id,
                min                   : this.props.navigation.state.params.data.min,
                max                   : this.props.navigation.state.params.data.max,
                lang                  : this.props.lang
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
            }else {
                this.setState({
                    casesSearch                : response.data.data,
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
        })
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
                        <Title style={[styles.textRegular , styles.text_darkGreen, styles.textSize_20]}>{i18n.translate('research')}</Title>
                    </Body>
                </Header>

                <Content contentContainerStyle={styles.bgFullWidth} style={styles.contentView}>


                    {
                        this.state.casesSearch.map((Cases, i) => (
                            <Animatable.View animation="fadeInUp" easing="ease-out" key={i} delay={1000}>
                                <TouchableOpacity style={[styles.viewTabs, styles.rowGroup, styles.boxShadow, styles.bg_lightWhite, styles.Radius_15,styles.paddingHorizontal_10, styles.paddingVertical_10, styles.marginVertical_10, styles.marginHorizontal_20]}
                                                  onPress={() => this.props.navigation.navigate('DetailsCases', { id: Cases.id})}>
                                    <View style={[styles.overHidden, styles.flex_30, styles.flexCenter, styles.block]}>
                                        <Image style={[styles.iconImg]} source={require('../../assets/img/noun_leaf.png')}/>
                                        <Text style={[styles.text_gray, styles.textSize_16, styles.textRegular]}>
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
                                                    <Text style={[styles.text_turquoise, styles.textSize_16, styles.textRegular]}>
                                                        {i18n.translate('caseDet')}
                                                    </Text>
                                                    <View style={styles.overHidden}>
                                                        <Image style={[styles.smImage]} source={require('../../assets/img/awardg.png')}/>
                                                        <Text style={[styles.text_gray, styles.textSize_12, styles.textRegular]}>
                                                            ( { Cases.recommendations } )
                                                        </Text>
                                                    </View>
                                                </View>
                                                :
                                                <View/>
                                        }

                                        <View style={[styles.overHidden, styles.rowRight]}>
                                            <Text style={[styles.text_gray, styles.textSize_16, styles.textRegular, styles.flex_60, styles.textLeft]}>
                                                {i18n.translate('kindCases')} :
                                            </Text>
                                            <Text style={[styles.text_brown, styles.textSize_14, styles.textRegular, styles.flex_40, styles.textLeft]}>
                                                { Cases.caseType }
                                            </Text>
                                        </View>

                                        {
                                            (Cases.money !== null)

                                                ?
                                                <View style={[styles.overHidden, styles.rowRight]}>
                                                    <Text style={[styles.text_gray, styles.textSize_16, styles.textRegular, styles.flex_60, styles.textLeft]}>
                                                        {i18n.translate('monyCases')} :
                                                    </Text>
                                                    <Text style={[styles.text_brown, styles.textSize_14, styles.textRegular, styles.flex_40, styles.textLeft]}>
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
                                                    <Text style={[styles.text_gray, styles.textSize_16, styles.textRegular, styles.flex_60, styles.textLeft]}>
                                                        {i18n.translate('CoCases')} :
                                                    </Text>
                                                    <Text style={[styles.text_brown, styles.textSize_14, styles.textRegular, styles.flex_40, styles.textLeft]}>
                                                        { Cases.remainingAmount }
                                                    </Text>
                                                </View>
                                                :
                                                <View/>
                                        }

                                        <View style={[styles.overHidden, styles.rowRight]}>
                                            <Text style={[styles.text_gray, styles.textSize_16, styles.textRegular, styles.flex_60, styles.textLeft]}>
                                                {i18n.translate('needCases')} :
                                            </Text>
                                            <Text style={[styles.text_brown, styles.textSize_14, styles.textRegular, styles.flex_40, styles.textLeft]}>
                                                { Cases.needType }
                                            </Text>
                                        </View>

                                    </View>
                                    <Text style={[styles.arrLeft]}>
                                        <Icon style={[styles.text_turquoise, styles.textSize_22]} type="FontAwesome" name='long-arrow-left' />
                                    </Text>
                                </TouchableOpacity>
                            </Animatable.View>
                        ))
                    }

                </Content>
            </Container>

        );
    }
}

const mapStateToProps = ({ lang }) => {
    return {
        lang    : lang.lang
    };
};

export default connect(mapStateToProps, { chooseLang })(ViewSearch);