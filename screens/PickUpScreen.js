import { 
  StyleSheet, 
  Text, 
  SafeAreaView, 
  TextInput, 
  Pressable, 
  ScrollView,
  View,
} from 'react-native'
import React, { useState } from 'react'
import HorizontalDatepicker from '@awrminkhodaei/react-native-horizontal-datepicker'
import { useSelector } from 'react-redux';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PickUpScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  const total = cart.map((item)=>item.quantity * item.price).reduce((curr, prev)=>curr+prev, 0);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState([]);
  const [delivery, setDelivery] = useState([]);
  const deliveryTime = [
    {
      id: "0",
      name: "2-3 Days",
    },
    {
      id: "1",
      name: "3-4 Days",
    },
    {
      id: "2",
      name: "4-5 Days",
    },
    {
      id: "3",
      name: "5-6 Days",
    },
    {
      id: "4",
      name: "Tommorrow",
    },
  ];

  const arrivingTime = [
    {
      id: "0",
      time: "8:00 AM",
    },
    {
      id: "1",
      time: "9:00 AM",
    },
    {
      id: "2",
      time: "10:00 AM",
    },
    {
      id: "3",
      time: "2:00 PM",
    },
    {
      id: "4",
      time: "3:00 PM",
    },
    {
      id: "5",
      time: "4:00 PM",
    },
  ];

  const navigation = useNavigation();

  const proceedToCart = () =>{
    if(!selectedDate || !selectedTime || !delivery){
      Alert.alert(
        "Empty or invalid",
        "Please select all the fields",
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
    if(selectedDate && selectedTime && delivery){
      navigation.replace("Cart",{
        selectedTime: selectedTime,
        no_Of_days: delivery,
        // pickUpDate: selectedDate,
      })
    }
  }

  return (
    <>
      <SafeAreaView style={{ marginTop: 35 }}>
        <Text style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }}>Enter Address</Text>
        <TextInput
          style={{
            padding: 40,
            borderColor: "gray",
            borderWidth: 0.7,
            paddingVertical: 80,
            borderRadius: 9,
            margin: 10,
          }}
        />
        <Text style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }}>
          Pick Up Date
        </Text>
        <HorizontalDatepicker
          mode="gregorian"
          startDate={new Date('2023-03-23')}
          endDate={new Date('2023-03-31')}
          initialSelectedDate={new Date('2020-08-22')}
          onSelectedDateChange={(date) => setSelectedDate(date)}
          selectedItemWidth={170}
          unselectedItemWidth={38}
          itemHeight={38}
          itemRadius={10}
          selectedItemTextStyle={styles.selectedItemTextStyle}
          unselectedItemTextStyle={styles.selectedItemTextStyle}
          selectedItemBackgroundColor="#088F8F"
          unselectedItemBackgroundColor="#ececec"
          flatListContainerStyle={styles.flatListContainerStyle}
        />

        {/* Select Time */}
        <Text style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }}>
          Select Time
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {arrivingTime.map((item, index) => (
            <Pressable
              onPress={() => setSelectedTime(item.time)}
              style={
                selectedTime.includes(item.time) ? {
                  margin: 10,
                  borderRadius: 7,
                  padding: 15,
                  borderColor: "#088F8F",
                  borderWidth: 2,
                } : {
                  margin: 10,
                  borderRadius: 7,
                  padding: 15,
                  borderColor: "gray",
                  borderWidth: 0.7
                }}
              key={index}>
              <Text>{item.time}</Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Select Date */}
        <Text style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }}>
          Delivery Date
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {deliveryTime.map((item, index) => (
            <Pressable
              onPress={() => setDelivery(item.name)}
              style={
                delivery.includes(item.name) ? {
                  margin: 10,
                  borderRadius: 7,
                  padding: 15,
                  borderColor: "#088F8F",
                  borderWidth: 2,
                } : {
                  margin: 10,
                  borderRadius: 7,
                  padding: 15,
                  borderColor: "gray",
                  borderWidth: 0.7
                }}
              key={index}>
              <Text>{item.name}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </SafeAreaView>

      {
        total === 0 ? (
          null
        ) : (
          <Pressable
            style={{
              backgroundColor: "#088F8F",
              padding: 10,
              marginTop: "auto",
              margin: 15,
              borderRadius: 7,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text style={{ fontSize: 15, fontWeight: "500", color: "white" }}>{cart.length} items |  ₹{total}</Text>
              <Text style={{ fontSize: 14, fontWeight: "400", color: "white", marginVertical: 6 }}>Extra charges might apply</Text>
            </View>
            <Pressable onPress={proceedToCart}>
              <Text style={{ fontSize: 17, fontWeight: "600", color: "white" }}>Proceed to Cart</Text>
            </Pressable>
          </Pressable>
        )
      }
    </>
  )
}

export default PickUpScreen

const styles = StyleSheet.create({})