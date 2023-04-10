import { TextInput ,View,StyleSheet, Text} from "react-native";
import { GlobalStyles } from "../constant/style";


function Input ({lable,textInputConfig,styles}){
    const inputStyle=[style.input]
    if(textInputConfig && textInputConfig.multiine)
      inputStyle.push(style.inputMultiline)
    return <View style={[style.inputContainer,styles]}>
    <Text style={style.lable}>{lable} </Text>
          <TextInput style={inputStyle} {...textInputConfig}/>
          </View>

}
export default Input;
const style=StyleSheet.create({
    inputContainer:{
   
    marginHorizontal:4,
    marginVertical:8,
    
    

    },
    lable:{
     fontSize:16,
     color:GlobalStyles.colors.primary100,
     marginBottom:4,
     
    },
    input:{
  backgroundColor:GlobalStyles.colors.primary100,
  padding:6,
  borderRadius:6,
  fontSize:18,
  color:GlobalStyles.colors.primary700
    },
    inputMultiline:{
        minHeight:100,
        textAlignVertical:'top'
    }
})