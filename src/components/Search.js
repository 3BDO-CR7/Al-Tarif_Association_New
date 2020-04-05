import React, { Component } from "react";
import {View, Text, TouchableOpacity} from "react-native";
import {Container, Content, Header, Button, Left, Icon, Title, Body, CheckBox, Right} from 'native-base'
import styles from '../../assets/style';

import {Slider} from "react-native";

import i18n from "../../locale/i18n";
import axios from "axios";
import CONST from "../consts";
import Spinner from "react-native-loading-spinner-overlay";
import {connect} from "react-redux";
import {chooseLang} from "../actions";

class Search extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedCases   : false,
            selectedNeed    : false,
            case_type_id    : '',
            need_type_id    : '',
            typeNeed        : [],
            typeCases       : [],
            max             : '',
            min             : '',
            value           : null,
        }
    }

    componentWillMount() {

        this.setState({spinner: true});

        axios({
            url         : CONST.url + 'feltrationRecords',
            method      : 'POST',
            data : {
                lang : this.props.lang
            }
        }).then(response => {

            this.setState({
                typeCases                   : response.data.data.caseTypes,
                typeNeed                    : response.data.data.needTypes,
                min                         : response.data.data.min,
                max                         : response.data.data.max,
                spinner                     : false,
            });

        }).catch(err => {
            this.setState({spinner : false});
        })
    }

    checked_caseTypes(id) {
        this.setState({
            selectedCases  : id,
        });
        this.state.case_type_id = id;

    }

    checked_needTypes(id) {
        this.setState({
            selectedNeed  : id,
        });
        this.state.need_type_id = id;
    }


    change(value){
        this.setState({value})
    }

    onSearch (){

        let data = {
            case_type_id    : this.state.case_type_id,
            need_type_id    : this.state.need_type_id,
            min             : this.state.min,
            max             : this.state.value,
        };

        this.props.navigation.navigate('ViewSearch', { data });

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
                        <Title style={[styles.textRegular , styles.text_darkGreen, styles.textSize_20]}>{i18n.translate('search')}</Title>
                    </Body>
                </Header>

                <Content contentContainerStyle={styles.bgFullWidth} style={styles.contentView}>

                    <View style={[styles.paddingHorizontal_15]}>

                        <Text style={[styles.textRegular , styles.text_gray, styles.textSize_18, styles.paddingHorizontal_10, styles.textLeft]}>
                            {i18n.translate('situation')} :
                        </Text>

                        {
                            this.state.typeCases.map((cases, i) => (
                                <TouchableOpacity
                                    style               = {[styles.rowRight, styles.paddingHorizontal_10, styles.marginVertical_5]}
                                    onPress             = {() => this.checked_caseTypes(cases.id)}
                                >
                                    <CheckBox
                                        style               = {[styles.checkBox, styles.Border, styles.bg_darkGreen]}
                                        color               = {styles.text_gray}
                                        selectedColor       = {styles.text_darkGreen}
                                        checked             = {this.state.selectedCases === cases.id}
                                        onPress             = {() => this.checked_caseTypes(cases.id)}
                                    />
                                    <Text style={[styles.textRegular , styles.text_darkGreen, styles.textSize_18, styles.paddingHorizontal_20]}>{ cases.name }</Text>
                                </TouchableOpacity>
                            ))
                        }

                    </View>

                    <View style={[styles.paddingHorizontal_15]}>

                        <Text style={[styles.textRegular , styles.text_gray, styles.textSize_18, styles.paddingHorizontal_10, styles.textLeft]}>
                            {i18n.translate('needCases')} :
                        </Text>

                        {
                            this.state.typeNeed.map((need, i) => (
                                <TouchableOpacity
                                    style               = {[styles.rowRight, styles.paddingHorizontal_10, styles.marginVertical_5]}
                                    onPress             = {() => this.checked_needTypes(need.id)}
                                >
                                    <CheckBox
                                        style               = {[styles.checkBox, styles.Border, styles.bg_darkGreen]}
                                        color               = {styles.text_gray}
                                        selectedColor       = {styles.text_darkGreen}
                                        checked             = {this.state.selectedNeed === need.id}
                                        onPress             = {() => this.checked_needTypes(need.id)}
                                    />
                                    <Text style={[styles.textRegular , styles.text_darkGreen, styles.textSize_18, styles.paddingHorizontal_20]}>{ need.name }</Text>
                                </TouchableOpacity>
                            ))
                        }

                    </View>

                    <Slider
                        step                        = {10}
                        maximumValue                = {Number(this.state.max)}
                        onValueChange               = {(value) => this.change(value)}
                        value                       = {this.state.value}
                        thumbTintColor              = {'#38973E'}
                        maximumTrackTintColor       = {"#38973E"}
                        minimumTrackTintColor       = {'#636363'}
                        style                       = {{width: '100%', height: 40, marginVertical : 20}}
                        // minimumValue                = {Number(this.state.min)}
                    />

                    <View style={[styles.rowGroup]}>
                        <Left><Text style={[styles.text_darkGreen]}>{this.state.min}</Text></Left>
                        <Text style={[styles.text_darkGreen]}>{this.state.value}</Text>
                        <Right><Text style={[styles.text_darkGreen]}>{this.state.max}</Text></Right>
                    </View>

                </Content>

                <TouchableOpacity style={[styles.clickLogin, styles.bg_darkGreen,styles.RadiusTop_5]} onPress = {() => this.onSearch()}>
                    <Text style={[styles.textRegular, styles.textSize_16, styles.text_White,styles.paddingVertical_5, styles.textCenter]}>{i18n.translate('search')}</Text>
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

export default connect(mapStateToProps, { chooseLang })(Search);