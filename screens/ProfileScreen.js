import { StyleSheet, Text, View, SafeAreaView, Pressable } from 'react-native'
import React from 'react'
import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase';

const ProfileScreen = () => {
  const user = auth.currentUser;
  const navigation = useNavigation();
  const signOutUser = () =>{
    signOut(auth).then(()=>{
      console.log("Sign out\n");
      navigation.replace("Login");
    }).catch(err=>{
      console.log(err);
    })
  }

  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center", marginTop: 35}}>
      <Pressable style={{marginVertical: 10, alignItems: "center"}}>
        <Text style={{fontSize: 20, }}>Welcome</Text>
        <Text style={{fontWeight: "600", fontSize: 25}}>{user.email}</Text>
      </Pressable>
      
      <Pressable 
        onPress={signOutUser}
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
                <Text style={{ fontSize: 17, textAlign:"center", fontWeight: "500", color: "white" }}>Sign Out</Text>
              </Pressable>
    </SafeAreaView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})