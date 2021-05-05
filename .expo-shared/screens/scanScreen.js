import React from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class scanScreen extends  React.Component{
    constructor() {
        super();
        this.state = {
            hasCameraPermissions: null,
            scanned: false,
            scannedData: '',
            buttonState:'normal'
        }
    }

    getCameraPermissions = async () =>{
        const {status} = await Permissions.askAsync(Permissions.CAMERA);

        this.setStatus({
            hasCameraPermissions: status === "granted",
        })
    }
    handleBarCodeScanned = async({type, data})=> {
        this.setState({
            scanned: true,
            scannedData: data,
            buttonState:'normal'
        })
    }
}
