import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity} from "react-native";
import {Container, Content,} from 'native-base';
import styles from '../../assets/style';

import i18n from "../../locale/i18n";
import * as Animatable from 'react-native-animatable';

import { connect } from 'react-redux';
import { chooseLang } from '../actions';

class Language extends Component {
    constructor(props){
        super(props);
        this.state          = {};
        this.onChooseLang   = this.onChooseLang.bind(this)
    }

    onChooseLang(lang) {
        console.log(lang);
        this.props.chooseLang(lang);
        this.props.navigation.navigate('ChooseUser');
    };

    render() {

        return (
            <Container>
                <Content contentContainerStyle={styles.bgFullWidth}>

                    <View style={[ styles.viewLang, styles.flexCenter, styles.windowWidth ]}>

                        <View style={styles.overHidden}>
                            <Animatable.View animation="fadeInDown" easing="ease-out" delay={500}>
                                <Image style={[styles.sizeImage , styles.marginVertical_15]} source={require('../../assets/img/logo.png')}/>
                            </Animatable.View>
                        </View>

                        <Text style={[styles.textRegular , styles.textSize_20, styles.marginVertical_15]}>{i18n.translate('language')}</Text>

                        <View style={[styles.viewBox , styles.rowGroup]}>

                            <Animatable.View animation="fadeIn" easing="ease-out" delay={600}>
                                <TouchableOpacity
                                    onPress     = {() => this.onChooseLang('ar')}
                                    style       = {[ styles.clickLang, styles.flexCenter, styles.Radius_50, styles.marginHorizontal_10, styles.marginVertical_10]}>
                                    <Text style = {[styles.textRegular , styles.textSize_18]}>العربيه</Text>
                                </TouchableOpacity>
                            </Animatable.View>

                            <Animatable.View animation="fadeIn" easing="ease-out" delay={700}>
                                <TouchableOpacity
                                    onPress     = {() => this.onChooseLang('en')}
                                    style       = {[ styles.clickLang, styles.flexCenter, styles.Radius_50, styles.marginHorizontal_10, styles.marginVertical_10]}>
                                    <Text style = {[styles.textRegular , styles.textSize_18]}>English</Text>
                                </TouchableOpacity>
                            </Animatable.View>

                        </View>

                    </View>

                </Content>

            </Container>

        );
    }
}

// export default Language;

const mapStateToProps = ({ lang }) => {
    return {
        lang    : lang.lang
    };
};

export default connect(mapStateToProps, { chooseLang })(Language);