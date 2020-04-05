import React, { Component } from "react";
import {View, Text, } from "react-native";
import {Container, Content, Header, Button, Left, Icon, Title, Body, Right} from 'native-base'
import styles from '../../assets/style';

import i18n from "../../locale/i18n";
import Spinner from 'react-native-loading-spinner-overlay';

import axios from "axios";
import CONST from "../consts";
import {connect} from "react-redux";
import {chooseLang} from "../actions";

class AckgmentAndUnder extends Component {
    constructor(props){
        super(props);
        this.state = {
            spinner         : false,
            infoText        : '',
        }
    }

    componentWillMount() {

        this.setState({spinner: true});

        axios({
            url         : CONST.url + 'edorsement',
            method      : 'POST',
            data : {
                lang : this.props.lang
            }
        }).then(response => {

            this.setState({
                infoText            : response.data.data.edorsement,
                spinner             : false
            });

        }).catch(err => {
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
                        <Title style={[styles.textRegular , styles.text_darkGreen, styles.textSize_20]}>{i18n.translate('Acknow')}</Title>
                    </Body>
                </Header>

                <Content contentContainerStyle={styles.bgFullWidth} style={styles.contentView}>

                    <View style={styles.viewItem}>

                        <View style={[styles.viewAbout , styles.paddingHorizontal_15, styles.marginVertical_15]}>

                            <Text style={[styles.textRegular , styles.text_gray, styles.textSize_18, styles.textLeft, styles.marginVertical_10 ]}>
                                { this.state.infoText }
                            </Text>

                        </View>

                    </View>

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

export default connect(mapStateToProps, { chooseLang })(AckgmentAndUnder);