import { View,Text,StyleSheet,Alert} from "react-native";
import Input from "./input";
import { GlobalStyles } from "../constant/style";
import { useState } from "react";
import Buttons from "../constant/ui/Buttons";
import { ProgressViewIOSComponent } from "react-native";

function ExpenseForm ({onCancle,submitButtonLable,onsubmit,defaultValue}){
    
    const [inputValue,setInpurValue]=useState({
        amount:{
       value: defaultValue? defaultValue.amount.toString() : '',
       isValid:!!defaultValue
        },
        date:{
           value: defaultValue? defaultValue.date.toISOString().slice(0,10):'',
           isValid:!!defaultValue
    },
        description:{
            value:defaultValue?defaultValue.description:'',
            isValid:!!defaultValue
}
    })
    function inputChangeHandler(inputIdentifier,enteredValue){
        setInpurValue((currentValue)=>{
            return{
            ...currentValue,
            [inputIdentifier]:{value:enteredValue,isValid:true}
            }
        })
    }
    function submitHandler(){
        console.log('submit called')
        const expenseData={
          amount:+inputValue.amount.value,
          date: new Date(inputValue.date.value),
          description:inputValue.description.value
        }
        const amountIsValid=isNaN|(expenseData.amount)&& expenseData.amount>0
        const dateIsVAlid=expenseData.date.toString() !== 'Invalid Date'
        const descriptionIsVAlid=expenseData.description.trim().length>0
        if(!amountIsValid || !dateIsVAlid||!descriptionIsVAlid){
            // Alert.alert('invalid input Please check your input')
            setInpurValue((currInput)=>{
                return{
                    amount:{}
                }
            })
            return;
        }
       
        onsubmit(expenseData)
    }

    return <View style={style.form}>
        <Text style={style.title}>Your Expense</Text>
        <View style={style.inputRow} >
        <Input  styles={style.rowInput} lable='Amount' textInputConfig={{
            keyboardType:'decimal-pad',
            onChangeText:inputChangeHandler.bind(this,'amount'),
            value:inputValue.amount.value,
        }} />
        <Input styles={style.rowInput}  lable='Date' textInputConfig={{
            placeholder:'YYYY-MM-DD',
            maxLength:10,
            onChangeText:inputChangeHandler.bind(this,'date'),
            value:inputValue.date.value
        }} />
        </View>
        <Input lable="Description" textInputConfig={{
            multiine:true,
            autoCorreect:false,
            onChangeText:inputChangeHandler.bind(this,'description'),
            value:inputValue.description.value

        }}/>
        <View style={style.buttons}>
            <Buttons  style={style.button} mode='flat'onPress={onCancle}>cancle</Buttons>
            <Buttons   onPress={submitHandler}>{submitButtonLable}</Buttons>
        </View>

    </View>
}
export default ExpenseForm;
const style =StyleSheet.create({
    form:{
  marginTop:80
    },
    inputRow:{
  flexDirection:'row',
  justifyContent:'space-between',
  

    },
    rowInput:{
        flex:1,
    },
    title:{
        fontSize:24,
        fontWeight:'bold',
        color:GlobalStyles.colors.primary100,
        marginVertical:24,
        textAlign:'center'
    },
    buttons:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
      },
      button:{
        minWidth:120,
        marginHorizontal:8,
         }
})