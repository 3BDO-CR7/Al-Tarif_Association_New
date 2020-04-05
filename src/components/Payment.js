import React, { Component } from "react";
import {View, Text, TouchableOpacity, Image} from "react-native";
import {Container, Content, Header, Button, Left, Icon, Title, Body, CheckBox, Toast} from 'native-base'
import styles from '../../assets/style';


import i18n from "../../locale/i18n";

class Payment extends Component {
    constructor(props){
        super(props);
        this.state = {
            checked         : true,
            bank_id         : '',
            case_id         : '',
        }
    }

    componentWillMount() {


    }

    selectBankId(id) {
        this.setState({
            checked  : id,
        });
        this.state.bank_id = id;
    }

    goFormBank(){

        if(this.state.bank_id === '' || this.state.bank_id === null || this.state.bank_id !== 1){

            Toast.show({
                text            : i18n.translate('selectpay'),
                duration        : 2000,
                type            : "danger",
                textStyle       : {
                    color           : "white",
                    fontFamily      : 'cairo',
                    textAlign       : 'center'
                }
            });

        }else {
            this.props.navigation.navigate('FormPayment', { bank_id : this.state.bank_id, case_id : this.props.navigation.state.params.case_id});
        }

    }

    render() {

        return (

            <Container>

                <Header style={styles.headerView}>
                    <Left style={styles.leftIcon}>
                        <Button style={styles.Button} transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon style={[styles.text_darkGreen, styles.textSize_22]} type="AntDesign" name='arrowright' />
                        </Button>
                    </Left>
                    <Body style={styles.bodyText}>
                        <Title style={[styles.textRegular , styles.text_darkGreen, styles.textSize_20]}>{i18n.translate('methodspay')}</Title>
                    </Body>
                </Header>

                <Content contentContainerStyle={styles.bgFullWidth} style={styles.contentView}>

                    <TouchableOpacity
                        style               = {[styles.rowGroup, styles.paddingHorizontal_10, styles.marginVertical_5]}
                        onPress             = {() => this.selectBankId(1)}
                    >
                        <View style={[styles.overHidden, styles.rowRight]}>
                            <CheckBox
                                style               = {[styles.checkBox, styles.Border, styles.bg_darkGreen]}
                                color               = {styles.text_gray}
                                selectedColor       = {styles.text_darkGreen}
                                checked             = {this.state.checked === 1}
                            />
                            <Text style={[styles.textRegular , styles.text_darkGreen, styles.textSize_18, styles.paddingHorizontal_20]}>
                                {i18n.translate('banktransfer')}
                            </Text>
                        </View>
                        <View style={styles.overHidden}>
                            <Image style={[styles.iconBank]} source={require('../../assets/img/bank.png')}/>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style               = {[styles.rowGroup, styles.paddingHorizontal_10, styles.marginVertical_5]}
                        onPress             = {() => this.selectBankId(2)}
                    >
                        <View style={[styles.overHidden, styles.rowRight]}>
                            <CheckBox
                                style               = {[styles.checkBox, styles.Border, styles.bg_darkGreen]}
                                color               = {styles.text_gray}
                                selectedColor       = {styles.text_darkGreen}
                                checked             = {this.state.checked === 2}
                            />
                            <Text style={[styles.textRegular , styles.text_darkGreen, styles.textSize_18, styles.paddingHorizontal_20]}>
                                {i18n.translate('visa')}
                            </Text>
                        </View>
                        <View style={styles.overHidden}>
                            <Image style={[styles.iconBank]} source={require('../../assets/img/visa.png')}/>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style               = {[styles.rowGroup, styles.paddingHorizontal_10, styles.marginVertical_5]}
                        onPress             = {() => this.selectBankId(3)}
                    >
                        <View style={[styles.overHidden, styles.rowRight]}>
                            <CheckBox
                                style               = {[styles.checkBox, styles.Border, styles.bg_darkGreen]}
                                color               = {styles.text_gray}
                                selectedColor       = {styles.text_darkGreen}
                                checked             = {this.state.checked === 3}
                            />
                            <Text style={[styles.textRegular , styles.text_darkGreen, styles.textSize_18, styles.paddingHorizontal_20]}>
                                {i18n.translate('master')}
                            </Text>
                        </View>
                        <View style={styles.overHidden}>
                            <Image style={[styles.iconBank]} source={require('../../assets/img/master.png')}/>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style               = {[styles.rowGroup, styles.paddingHorizontal_10, styles.marginVertical_5]}
                        onPress             = {() => this.selectBankId(4)}
                    >
                        <View style={[styles.overHidden, styles.rowRight]}>
                            <CheckBox
                                style               = {[styles.checkBox, styles.Border, styles.bg_darkGreen]}
                                color               = {styles.text_gray}
                                selectedColor       = {styles.text_darkGreen}
                                checked             = {this.state.checked === 4}
                            />
                            <Text style={[styles.textRegular , styles.text_darkGreen, styles.textSize_18, styles.paddingHorizontal_20]}>
                                {i18n.translate('sadad')}
                            </Text>
                        </View>
                        <View style={styles.overHidden}>
                            <Image style={[styles.iconBank]} source={require('../../assets/img/sadad.png')}/>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style               = {[styles.rowGroup, styles.paddingHorizontal_10, styles.marginVertical_5]}
                        onPress             = {() => this.selectBankId(5)}
                    >
                        <View style={[styles.overHidden, styles.rowRight]}>
                            <CheckBox
                                style               = {[styles.checkBox, styles.Border, styles.bg_darkGreen]}
                                color               = {styles.text_gray}
                                selectedColor       = {styles.text_darkGreen}
                                checked             = {this.state.checked === 5}
                            />
                            <Text style={[styles.textRegular , styles.text_darkGreen, styles.textSize_18, styles.paddingHorizontal_20]}>
                                {i18n.translate('mada')}
                            </Text>
                        </View>
                        <View style={styles.overHidden}>
                            <Image style={[styles.iconBank]} source={require('../../assets/img/mada.png')}/>
                        </View>
                    </TouchableOpacity>

                </Content>

                <TouchableOpacity style={[styles.clickLogin, styles.bg_darkGreen,styles.RadiusTop_5]} onPress = {() => this.goFormBank()}>
                    <Text style={[styles.textRegular, styles.textSize_18, styles.text_White,styles.paddingVertical_5, styles.textCenter]}>{i18n.translate('payoff')}</Text>
                </TouchableOpacity>

            </Container>

        );
    }
}

export default Payment;