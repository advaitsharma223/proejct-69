import { BarCodeScanner } from 'expo-barcode-scanner';
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Header } from 'react-native';

export default class ScanScreen extends React.Component {
  
    constructor() {
        super();
        this.state = {
            hasCameraPermissions: null,
            scanned: false,
            scannedData: '',
            buttonState: 'normal',
        }
    }

    getCameraPermissions = async () =>{
        const {status} = await Permissions.askAsync(Permissions.CAMERA);

        this.setState({
            hasCameraPermissions: status === "granted",
            buttonState: 'clicked',
            scanned: false
        })
    }
    
    handleBarCodeScanned = async({type, data})=> {
       this.setState({
           scanned: true,
           scannedData: data,
           buttonState: 'normal'
       })
        
    } 

    render() {
        const hasCameraPermissions = this.state.hasCameraPermissions;
        const scanned = this.state.scanned;
        const buttonState = this.state.buttonState;

        if(buttonState === 'clicked' && hasCameraPermissions) {
            return(
                <BarCodeScanner
                    onBarCodeScanned = {scanned?undefined: this.handleBarCodeScanned}
                />
            );
        }else if(buttonState === 'normal'){
            return(
                <View>
                    <View>
                        <Image/>
                        <Text style = {styles.title}>
                            Bar Code Scanner
                        </Text>
                    </View>
                    <Text style={styles.displayText}>
                        {hasCameraPermissions===true ? this.state.scannedData: "Request Camera Permission"}
                    </Text>
                    <TouchableOpacity
                        onPress={this.getCameraPermissions}
                        style= {styles.CameraButton} 
                        title = "Bar Code Scanner">
                        <Text style={styles.CameraButtonText}>Scan QR Code</Text>
                    </TouchableOpacity>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create ({
    CameraButton:{
        paddingTop:30,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: 'blue'
    },

    CameraButtonText:{
        color : 'black',
        justifyContent:'center',
        backgroundColor: 'blue'
    },
    
    title :{
        fontSize:45,
        fontWeight:'300',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom:50,
        paddingTop:30,
        paddingLeft:550,
        color : 'black'    
      },
})