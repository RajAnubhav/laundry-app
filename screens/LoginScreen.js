import { StyleSheet, Text, View, SafeAreaView, KeyboardAvoidingView, TextInput, Pressable, ActivityIndicator, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const saveData = async () =>{
    try{
      await AsyncStorage.setItem('DATA', data);
    }catch(e){
      // save error
    }
  }

  useEffect(() => {
    setLoading(true);
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (!authUser) {
        setLoading(false);
      }
      if (authUser) {
        navigation.navigate("Home");
      }
    });
    return unsubscribe;
  }, [])

  const login = () => {
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      // console.log("user credential", userCredential);
      const user = userCredential.user;
      // console.log("user details", user)
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

      {loading ? (
        <View style={{alignItems: "center", justifyContent: "center", flexDirection: "row", flex: 1}}>
          <Text style={{marginRight: 10}}>Loading...</Text>
          <ActivityIndicator size="large" color={"red"} />
        </View>
      ) : (
        <KeyboardAvoidingView>
          <View style={{ justifyContent: "center", alignItems: "center", marginTop: 100 }}>
            <Text style={{ fontSize: 20, color: "#662d91", fontWeight: "bold" }}>Sign In</Text>
            <Text style={{ fontSize: 18, marginTop: 8, fontWeight: "600" }}>Sign In to your account</Text>
          </View>

          <View style={{ marginTop: 50 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialCommunityIcons name="email-outline" size={24} color="black" />
              <TextInput
                placeholder="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
                placeholderTextColor={"black"}
                style={{
                  fontSize: email ? 18 : 18,
                  borderBottomWidth: 1,
                  borderBottomColor: "gray",
                  marginLeft: 13,
                  width: 300,
                  marginVertical: 20
                }}
              />
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="key-outline" size={24} color="black" />
              <TextInput
                placeholder="Password"
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
                placeholderTextColor={"black"}
                style={{
                  fontSize: password ? 18 : 18,
                  borderBottomWidth: 1,
                  borderBottomColor: "gray",
                  marginLeft: 13,
                  width: 300,
                  marginVertical: 20
                }}
              />
            </View>

            <Pressable
              onPress={login}
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
              <Text 
                style={{ 
                  fontSize: 18, 
                  textAlign: "center", 
                  color: "white" 
                }}
              >
                Login
              </Text>
            </Pressable>
            <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 30 }}>
              <Text style={{ fontSize: 17, color: "gray" }}>Don't have an account?</Text>
              <Pressable
                onPress={() => navigation.navigate("Register")}
              >
                <Text style={{ fontSize: 17, paddingLeft: 7, fontWeight: "500", color: "#662d91" }}>Sign Up</Text>
              </Pressable>
            </View>

          </View>

        </KeyboardAvoidingView>
      )}

    </SafeAreaView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({})