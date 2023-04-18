import  {View,StyleSheet,Text, Button} from 'react-native';
import { GlobalStyles } from './style';
function ErrorOverlay({message,onConfirm}){
    return <View style={style.container} >
        <Text style={[style.text,style.title]}  >An error occurred!</Text>
        <Text style={style.text}>{message}</Text>
        {/* <Button onPress={onConfirm} >Okay</Button> */}

    </View>
}
export default ErrorOverlay;
const style=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        padding:24,
        backgroundColor:GlobalStyles.colors.primary700,

    }, text:{
        textAlign:'center',
        marginBottom:8,
    },
    title:{
     fontSize:20,
     fontWeight:'bold',
    },
   
})