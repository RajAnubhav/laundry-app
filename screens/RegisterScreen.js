import { StyleSheet, Text, View, SafeAreaView, KeyboardAvoidingView, Pressable, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

const RegisterScreen = () => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const navigation = useNavigation();

  const register = () =>{
    if(email === "" || password === "" || phone ===""){
      Alert.alert(
        "Invalid Details",
        "Please fill all the details",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      );
    }
    createUserWithEmailAndPassword(auth, email, password).then((userCredential)=>{
      console.log("user credential", userCredential);
      const user = userCredential._tokenResponse.email;
      const myUserUid = auth.currentUser.uid;

      setDoc(doc(db, "users", `${myUserUid}`), {
        email: user,
        phone:phone,
      })
    })
  }

  return (
    <SafeAreaView 
      style={{
        flex: 1, 
        backgroundColor: "white", 
        alignItems: "center", 
        padding: 10
      }}
    >
      <KeyboardAvoidingView>
        <View style={{justifyContent: "center", alignItems: "center", marginTop: 100}}>
            <Text style={{fontSize: 20, color: "#662d91", fontWeight: "bold"}}>Sign Up</Text>
            <Text style={{fontSize: 18, marginTop: 8, fontWeight: "600"}}>Create an account</Text>
          </View>

          <View style={{marginTop: 50}}>
          <View style={{flexDirection: "row", alignItems: "center"}}>
            <MaterialCommunityIcons name="email-outline" size={24} color="black" />
            <TextInput 
              placeholder="Email" 
              value={email}
              onChangeText={(text)=>setEmail(text)}
              placeholderTextColor={"black"} 
              style={{
                fontSize: email ? 18:18,
                borderBottomWidth: 1, 
                borderBottomColor: "gray", 
                marginLeft:13, 
                width: 300, 
                marginVertical: 20
              }} 
            />
          </View>
          <View style={{flexDirection: "row", alignItems: "center"}}>
            <Ionicons name="key-outline" size={24} color="black" />
            <TextInput 
              placeholder="Password" 
              value={password}
              onChangeText={(text)=>setPassword(text)}
              secureTextEntry={true}
              placeholderTextColor={"black"} 
              style={{
                fontSize: password ? 18:18,
                borderBottomWidth: 1, 
                borderBottomColor: "gray", 
                marginLeft:13, 
                width: 300, 
                marginVertical: 20
              }} 
            />
          </View>
          <View style={{flexDirection: "row", alignItems: "center"}}>
            <Feather name="phone" size={24} color="black" />
            <TextInput 
              placeholder="Phone No" 
              value={phone}
              onChangeText={(text)=>setPhone(text)}
              placeholderTextColor={"black"} 
              style={{
                fontSize: password ? 18:18,
                borderBottomWidth: 1, 
                borderBottomColor: "gray", 
                marginLeft:13, 
                width: 300, 
                marginVertical: 20
              }} 
            />
          </View>

          <Pressable 
            onPress={register}
            style={{
              width: 200, 
              backgroundColor: "#318CE7", 
              padding: 15, 
              marginTop: 60, 
              borderRadius: 7,
              marginLeft: "auto", 
              marginRight: "auto"
            }}
          >
            <Text style={{fontSize: 18, textAlign: "center", color: "white"}}>Register</Text>
          </Pressable>
          <View style={{flexDirection: "row", justifyContent: "center", marginTop: 30}}>
            <Text style={{fontSize: 17, color:"gray"}}>Already have an account?</Text>
            <Pressable
              onPress={()=>navigation.goBack()}
            >
              <Text style={{fontSize: 17, paddingLeft: 7, fontWeight: "500", color:"#662d91"}}>Sign In</Text>
            </Pressable>
          </View>

        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({})