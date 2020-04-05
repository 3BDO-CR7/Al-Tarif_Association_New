import React, { Component } from "react";
import {View, Text, TouchableOpacity} from "react-native";
import {Container, Content, Icon} from 'native-base'
import styles from '../../assets/style';
import {connect} from "react-redux";
import {chooseLang, profile, userLogin} from "../actions";

import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';

class OpenCamera extends Component {
    constructor(props){
        super(props);
        this.state = {
            imageBrowserOpen: false,
            cameraBrowserOpenPE: false,
            Base64: [],
            images: [],
            base_64: [],
            photos: [],
            hasCameraPermission: null,
            namePage: this.props.navigation.state.params.namePage,
        }
    }

    async componentWillMount() {
        this.setState({cameraBrowserOpenPE: true});
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });

    }

    componentDidMount() {
        this.getPermissionAsync();
    }

    getPermissionAsync = async () => {

        await Permissions.askAsync(Permissions.CAMERA);
        const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
        }
    };
    snap = async () => {
        if (this.camera) {
            let photo = await this.camera.takePictureAsync({
                base64              : true,
                quality             : 0.5
            });
            let localUri = photo.uri;
            if (this.state.namePage === 'FormPayment'){
                this.props.navigation.navigate('FormPayment', {photo : photo.base64,uri : photo.uri});
            } else {
                this.props.navigation.navigate('AddCases', {photo : photo.base64, image : localUri, type : this.props.navigation.state.params.key});
            }
        }
    };

    render() {
        return (
            <Container>
                <Content contentContainerStyle={styles.bgFullWidth} style={styles.contentView}>
                    {
                        (this.state.hasCameraPermission && this.state.cameraBrowserOpenPE === true) ?
                            <View style={[styles.Width_100, styles.bgFullWidth, styles.height_full]}>
                                <Camera style={[styles.Width_100, styles.bgFullWidth, styles.height_full]} type={this.state.type} ref={ref => {this.camera = ref;}}>

                                </Camera>
                            </View>
                            :
                            <View/>
                    }
                    <View style={[styles.overHidden, styles.rowGroup, styles.paddingVertical_15, styles.paddingHorizontal_15, styles.blockFix, styles.Width_100]}>
                        <TouchableOpacity style={[styles.clickBtn, styles.Radius_60]} onPress={() => this.snap()}>
                            <Text style={[styles.textRegular, styles.textSize_18, styles.text_White,styles.paddingVertical_5, styles.textCenter]}>
                                <Icon style={[styles.text_White]} type="AntDesign" name='check' />
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.clickBtn, styles.Radius_60]} onPress={() => this.props.navigation.goBack()}>
                            <Text style={[styles.textRegular, styles.textSize_18, styles.text_White,styles.paddingVertical_5, styles.textCenter]}>
                                <Icon style={[styles.text_White]} type="AntDesign" name='close' />
                            </Text>
                        </TouchableOpacity>
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
export default connect(mapStateToProps, { userLogin, profile, chooseLang })(OpenCamera);