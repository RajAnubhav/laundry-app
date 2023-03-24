import { StyleSheet, Text, View, SafeAreaView, Pressable, Image } from 'react-native'
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

      <Image
        style={{
          width: 300,
          height: 300,
          marginTop: 35,
        }}

        source={{
          uri: "https://cdn-icons-png.flaticon.com/512/1154/1154471.png?w=740&t=st=1679638965~exp=1679639565~hmac=29df3c0bcb5568a583818d91828f1a7217d5e1984daa7718bd652faf257405ec"
        }}
      />

      <Pressable style={{marginVertical: 30, alignItems: "center"}}>
        <Text style={{fontSize: 30, fontWeight: "600", color: "#27ba9e"}}>Welcome</Text>
        <Text style={{fontWeight: "300", fontSize: 25}}>{user.email}</Text>
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