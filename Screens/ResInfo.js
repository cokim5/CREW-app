import { signOut } from '@firebase/auth'
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/core'
import React, { useEffect, useState, FC, useCallback, useMemo, useRef } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Image, Dimensions, TextInput, ImageBackground, FlatList } from 'react-native'
import { auth } from '../firebase'
import { getDatabase, ref, set, get, child, onValue, push } from "firebase/database";
import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import { getStorage, getDownloadURL, ref as sRef } from "firebase/storage";
import { SimpleLineIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AppLoading from 'expo-app-loading';
import { Foundation } from '@expo/vector-icons';
import { Rating } from 'react-native-ratings';
import BottomSheet from 'reanimated-bottom-sheet';
import * as WebBrowser from 'expo-web-browser';
import { Linking } from 'react-native';
import LoadingAnimation from '../components/LoadingAnimation'

// import { BottomModalProvider, useBottomModal } from 'react-native-bottom-modal'
import {
  useFonts,
  Nunito_200ExtraLight,
  Nunito_300Light,
  Nunito_400Regular,
  Nunito_500Medium,
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
  Nunito_900Black,
  Nunito_200ExtraLight_Italic,
  Nunito_300Light_Italic,
  Nunito_400Regular_Italic,
  Nunito_500Medium_Italic,
  Nunito_600SemiBold_Italic,
  Nunito_700Bold_Italic,
  Nunito_800ExtraBold_Italic,
  Nunito_900Black_Italic,
} from '@expo-google-fonts/nunito';

// const onItemClick = (item) => {
//   navigation.navigate("ResInfo", {
//     name : item.RESTAURANT,
//     fsr : item.FSR,
//     address: item.ADDRESS,
//     location: item.LOCATION,
//     type: item.TYPE,
//     price: item.PRICE,
//     popular: item.POPULAR,
//     recommendation: item.RECOMMENDATION,
//     monday: item.M,
//     tuesday: item.T,
//     wednesday: item.W,
//     thursday: item.TH,
//     friday: item.F,
//     saturday: item.S,
//     sunday: item.SU,
//     tea: item.TEA,
//   });
// }
const ResInfo = () => {
  const storage = getStorage();
  let [fontsLoaded] = useFonts({
    Nunito_200ExtraLight,
    Nunito_300Light,
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
    Nunito_900Black,
    Nunito_200ExtraLight_Italic,
    Nunito_300Light_Italic,
    Nunito_400Regular_Italic,
    Nunito_500Medium_Italic,
    Nunito_600SemiBold_Italic,
    Nunito_700Bold_Italic,
    Nunito_800ExtraBold_Italic,
    Nunito_900Black_Italic,
  });

  const navigation = useNavigation();


  //   const[resname, setresName] = useState(item);
  const [visible, setVisible] = useState(false);
  const [refreshPage, setRefreshPage] = useState(0);
  const route = useRoute();
  const resname = route.params.name;
  const fsr = route.params.fsr;
  const address = route.params.address;
  const location = route.params.location;
  const latitude = route.params.latitude;
  const longitude = route.params.longitude;
  const type = route.params.type;
  const typeUpper = type.toUpperCase();
  const price = route.params.price;
  const popular = route.params.popular;
  const recommendation = route.params.recommendation;
  const monday = route.params.monday;
  const tuesday = route.params.tuesday;
  const wednesday = route.params.wednesday;
  const thursday = route.params.thursday;
  const friday = route.params.friday;
  const saturday = route.params.saturday;
  const sunday = route.params.sunday;
  const tea = route.params.tea;
  const phone = route.params.phone;
  const [personName, setPersonName] = useState("");
  const phoneUrl = 'tel:' + phone;
  const [day, setDay] = useState("");
  const snapPoints = useMemo(() => ['25%', '50%'], []);
  const isFocused = useIsFocused();
  const [revs, setRevs] = useState([]);
  const [imageUrl, setImageUrl] = useState(undefined);
  const imagesRef = sRef(storage, 'images/' + resname + '.jpg');
  const [web, setWeb] = useState(null);
  const locationUrl = 'maps:0,0?q=' + resname + '@' + latitude + ',' + longitude;
  const [imagesLoaded, setImagesLoaded] = useState(false);


  const db = getDatabase();

  useEffect(() => {
    if (isFocused) {
      renderScreen();

    }
  }, [isFocused])

  const renderScreen = () => {
    getDownloadURL(imagesRef)
      .then((url) => {
        console.log(url)
        setImageUrl(url);
      }).catch((error) => {
        console.log(error)
      });

    let today = new Date();
    let dayOf = today.getDay();
    if (dayOf = 1) {
      setDay(monday);
    } else if (dayOf = 2) {
      setDay(tuesday);
    } else if (dayOf = 3) {
      setDay(wednesday);
    } else if (dayOf = 4) {
      setDay(thursday);
    } else if (dayOf = 5) {
      setDay(friday);
    } else if (dayOf = 6) {
      setDay(saturday);
    } else if (dayOf = 7) {
      setDay(sunday);
    }

    try {
      var userId = getAuth().currentUser.uid;
      const nameRef = ref(db, 'users/' + userId + '/personalInfo');
      onValue(nameRef, (snapshot) => {
        const data = snapshot.val();
        // setPersonName(data.name);
      });

    } catch (error) {
      console.log(error);
    }
  }

  const openWebsite = async () => {
    var str = resname.replaceAll(" ", "+");
    var link = 'https://www.google.com/search?q=' + str;
    console.log(link);
    let result = await WebBrowser.openBrowserAsync(link);
    setWeb[result];
  }

  const [revTitle, setrevTitle] = useState("")
  const [rev, setRev] = useState("")
  const renderContent = () => {

    return (
      <View
        style={{
          backgroundColor: 'white',
          padding: 16,
          height: 250,
          borderRadius: 30,
          flexDirection: 'row'
        }}
      >
        <View style={{
          flexDirection: 'column',
          marginTop: '1%',
          marginLeft: '2%'
        }}>
          <View style={styles.lineContainer}>
            <View style={{ flex: 1, height: 1, backgroundColor: 'gray' }} />
          </View>
          <TextInput
            placeholder="Body... (MAX: 200)"
            fontSize={12}
            multiline={true}
            value={rev}
            onChangeText={text => { setRev(text) }}
            maxLength={200}
            style={{
              marginTop: '2%',
              fontFamily: 'Nunito_400Regular',
              width: 350
            }}
          />
        </View>

        <View style={{
          width: '25%',
          flexDirection: 'column',
          // justifyContent: 'flex-end'
        }}>

        </View>
      </View>
    )
  }

  const sheetRef = React.useRef(null);

  const goBack = () => {
    navigation.goBack();
  }

  const renderList = (item) => {
    return (
      ({ item }) => (
        <View elevation={5} style={styles.secSt}>
          <View style={styles.header}>
            <Ionicons name="md-person-circle-outline" size={50} color="#B8B6B6" />
            <View style={styles.TandU}>
              <Text style={styles.headerTextt}>{item.Title}</Text>
              <Text style={styles.userText}>{item.Name}</Text>
            </View>

          </View>
          <Text
            style={{
              marginTop: '5%',
              marginBottom: '20%',
              marginLeft: '3%',
              fontSize: 11,
              color: 'black',
            }}
          >{item.Review}</Text>
        </View>
      )
    )
  }

  // const displayReviews = (reviews) => {
  //   let i = 0;
  //   setRevs(reviews);
  //   try {
  //   const resRef = ref(db, 'restaurants/' + resname);
  //   onValue(resRef, (snapshot) => {
  //     snapshot.forEach((childSnapshot) => {
  //       const childKey = childSnapshot.key;
  //       const childData = childSnapshot.val();
  //       childData["id"] = i;
  //       i = i+ 1;
  //       reviews.push(childData);
  //     });
  //     setRevs(reviews)
  //   }, {
  //     // onlyOnce: true
  //   });
  // } catch (error) {
  //   console.log(error)
  // }
  // }

  if (!fontsLoaded) {
    return <AppLoading />
  } else {
    return (
      <View>
        {imagesLoaded ? null : 
        <View style={styles.animation}>
          <LoadingAnimation />
        </View>}


        <ScrollView contentContainerStyle={styles.container}>
          <ImageBackground
            style={{ width: '100%', height: 300, resizeMode: 'cover' }}
            source={{ uri: imageUrl }}
            onLoad={() => setImagesLoaded(true)}
          >
            <View style={styles.Top}>
              {imagesLoaded ? <TouchableOpacity
                onPress={goBack}
                style={{ marginLeft: '5%' }}
              // style={styles.backButton}
              >
                <Ionicons name="md-chevron-back" size={40} color="black" />
              </TouchableOpacity> : null}
              {/* <TouchableOpacity
                onPress={goBack}
                style={{marginLeft: '5%'}}
                // style={styles.backButton}
            >
                <Ionicons name="md-chevron-back" size={40} color="black" />
        </TouchableOpacity> */}

            </View>
          </ImageBackground>
          <View style={styles.info}>
            <View style={styles.name}>
              <Text style={{ fontSize: 24, fontWeight: 'bold', fontFamily: 'Nunito_700Bold' }}>{resname}</Text>
              <View style={styles.eachView}>
                <Ionicons name="location-outline" size={27} color="#ffbc42" />
                <Text style={{ marginLeft: '5%', marginTop: '2.7%', fontSize: 12, fontFamily: 'Nunito_600SemiBold' }}>{address}</Text>
              </View>
              <View style={styles.eachView}>
                <AntDesign name="clockcircleo" size={22} color="#ffbc42" style={{ marginLeft: '1%' }} />
                <Text style={styles.text}> Hours Today: {day}</Text>
              </View>
              <View style={styles.eachView}>
                <FontAwesome5 name="smile-beam" size={22} color="#ffbc42" style={{ marginLeft: '1%' }} />
                <Text style={styles.text}> Food Safety Rating: {fsr}</Text>
              </View>
            </View>
            <View style={styles.rating}>
              <View style={styles.bookmark}>
                <View style={{
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <Foundation name="bookmark" size={80} color="#ffbc42" style={{ transform: [{ rotate: '90deg' }] }} />
                  <Text style={{ position: 'absolute', fontSize: 10, fontFamily: 'Nunito_600SemiBold' }}>{price}</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.insider}>
            <View style={{ alignItems: 'center' }}>
              <Text
                style={{
                  marginBottom: '1%',
                  marginTop: '2%',
                  fontWeight: 'bold',
                  fontSize: 15,
                  fontFamily: 'Nunito_700Bold'
                }}
              >CREW!'s Special Insider Tea:</Text>
            </View>
            <View>
              <Text style={{ fontStyle: 'italic', marginTop: '1.5%', fontSize: 13, fontFamily: 'Nunito_600SemiBold_Italic' }}><Text style={{ fontStyle: 'italic', textDecorationLine: 'underline' }}>One liner:</Text> "{tea}"</Text>
              <Text style={{ fontStyle: 'italic', marginTop: '1.5%', fontSize: 13, fontFamily: 'Nunito_600SemiBold_Italic' }}><Text style={{ fontStyle: 'italic', textDecorationLine: 'underline' }}>Popular:</Text> {popular}</Text>
              <Text style={{ fontStyle: 'italic', marginTop: '1.5%', fontSize: 13, fontFamily: 'Nunito_600SemiBold_Italic' }}><Text style={{ fontStyle: 'italic', textDecorationLine: 'underline' }}>Our Recommendation:</Text> {recommendation}</Text>
            </View>
          </View>
          <View style={styles.buttons}>
            <View style={styles.eachButton}>
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderColor: '#ffbc42',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 40,
                  height: 40,
                  backgroundColor: '#ffbc42',
                  borderRadius: 50,
                }}
                onPress={() => {
                  Linking.openURL(phoneUrl)
                  console.log(phoneUrl)
                  console.log(phone)
                }}
              >
                <FontAwesome name="phone" size={20} color="black" />
              </TouchableOpacity>
              <Text style={{ fontFamily: 'Nunito_400Regular', fontSize: 10, marginTop: '20%' }}>Call</Text>
            </View>
            <View style={styles.eachButton}>
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderColor: '#ffbc42',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 40,
                  height: 40,
                  backgroundColor: '#ffbc42',
                  borderRadius: 50,
                }}
                onPress={() => { Linking.openURL(locationUrl) }}
              >
                <Ionicons name="map-sharp" size={20} color="black" />
              </TouchableOpacity>
              <Text style={{ fontFamily: 'Nunito_400Regular', fontSize: 10, marginTop: '20%' }}>Visit</Text>
            </View>
            <View style={styles.eachButton}>
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderColor: '#ffbc42',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 40,
                  height: 40,
                  backgroundColor: '#ffbc42',
                  borderRadius: 50,
                }}
                onPress={openWebsite}
              >
                <MaterialCommunityIcons name="web" size={20} color="black" />
              </TouchableOpacity>
              <Text style={{ fontFamily: 'Nunito_400Regular', fontSize: 10, marginTop: '20%' }}>Website</Text>
            </View>
          </View>
          {/* <View style={styles.reviewSec}>
            <TouchableOpacity
              style={styles.review}
            > */}

          {/* <Text style={{
                fontFamily: 'Nunito_700Bold',
                fontSize: 11,
              }}>Reviews</Text>
            </TouchableOpacity>
       </View> */}
          <View style={styles.hours}>
            <Text style={{
              fontFamily: 'Nunito_700Bold',
              fontSize: 15,
              marginBottom: '2%'
            }}>Hours during the week:</Text>
            <View style={styles.hourList}>
              <Text style={styles.hourText}>Monday:                 {monday}</Text>
              <Text style={styles.hourText}>Tuesday:                 {tuesday}</Text>
              <Text style={styles.hourText}>Wednesday:           {wednesday}</Text>
              <Text style={styles.hourText}>Thursday:               {thursday}</Text>
              <Text style={styles.hourText}>Friday:                     {friday}</Text>
              <Text style={styles.hourText}>Saturday:                {saturday}</Text>
              <Text style={styles.hourText}>Sunday:                   {sunday}</Text>
            </View>
          </View>
          {/* <View style={styles.writeReview}>
         <Text 
          style= {{
            fontFamily: 'Nunito_700Bold',
            fontSize: 13,
            marginLeft: '5%'
            // marginBottom: '2%'
          }}
         >Upload your own review</Text>
          <TouchableOpacity
            style={styles.secSt}
            onPress={() => sheetRef.current.snapTo(0)}
          >
              <View style={styles.header}>
              <Ionicons name="md-person-circle-outline" size={50} color="#B8B6B6" />
              <View style={styles.TandU}>
                <Text style={styles.headerText}>Enter a title</Text>
                <Text style={styles.userText}>{personName}</Text>
              </View>
              
              </View> */}
          {/* <Rating
                type='custom'
                ratingImage={STAR_IMAGE}
                ratingColor='#3498db'
                ratingBackgroundColor='#c8c7c8'
                count={5}
                defaultRating={0}
                unSelectedColor="#BDC3C7"
                imageSize={30}
                style={{ paddingVertical: 10 }}
              /> */}
          {/* <Text
                style={{
                  marginTop: '4%',
                  marginLeft:'3%',
                  fontSize: 11,
                  color: 'gray',
                }}
              >Type here!</Text>
          </TouchableOpacity>
       </View> */}
          {/* <View style={styles.reviewList}>
         <Text 
          style= {{
            fontFamily: 'Nunito_700Bold',
            fontSize: 13,
            marginLeft: '5%'
            // marginBottom: '2%'
          }}
         >View others reviews</Text>
         <FlatList 
                data={revs} 
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={renderList()}
            />

       </View> */}
          {/* <View style={{marginTop: '10%'}}>
            <Text>Restaurant Name: {resname}</Text>
            <Text>Food Safety Rating: {fsr}</Text>
            <Text>Address: {address}</Text>
            <Text>Location: {location}</Text>
            <Text>Type: {typeUpper}</Text>
            <Text>Price Range: {price}</Text>
            <Text>Popular Food: {popular}</Text>
            <Text>Recommendation: {recommendation}</Text>
            <Text>Hours:</Text>
            <Text>Monday: {monday}</Text>
            <Text>Tuesday: {tuesday}</Text>
            <Text>Wednesday: {wednesday}</Text>
            <Text>Thursday: {thursday}</Text>
            <Text>Friday: {friday}</Text>
            <Text>Saturday: {saturday}</Text>
            <Text>Sunday: {sunday}</Text>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <Text>One Line Tea: {tea}</Text>
        </View>
        <View style={{marginTop: '10%'}}>
        <TextInput
            placeholder="Add review"
            style={styles.input}
            fontSize= {15}
            value={review}
            onChangeText={text => {setReview(text)}}
         />
        </View>
        <TouchableOpacity
                    onPress={addInfo}
                    style={styles.button}
                >
                    <Text style={styles.buttonTextL}>add review</Text>
         </TouchableOpacity>
         <TouchableOpacity
                    onPress={displayReviews}
                    style={styles.button}
                >
                    <Text style={styles.buttonTextL}>display review</Text>
         </TouchableOpacity> */}
        </ScrollView>
        {/* <BottomSheet
        ref={sheetRef}
        snapPoints={[250, 250, 0]}
        borderRadius={10}
        renderContent={renderContent}
      /> */}
      </View>
    )
  }
}

export default ResInfo

const styles = StyleSheet.create({
  animation: {
    width: '60%',
    height: '65%',
    alignSelf: 'center',
    marginRight: '100%'

  },

  hours: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '10%',
    marginTop: '7%',
  },
  bookmark: {
    flexDirection: 'column',
    marginTop: '5%',
    justifyContent: 'center',
  },
  hourList: {

  },
  hourText: {
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 12,
    marginTop: '4%',
  },

  reviewSec: {
    marginTop: '8%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '8%',
  },
  review: {

    // marginHorizontal: 10,
    padding: 6,
    borderColor: '#ffbc42',
    borderRadius: 30,
    borderWidth: 2,

    // alignItems:'center',
    // justifyContent: 'center',
    // flex: 1,
    shadowColor: 'rgba(0,0,0, 0.6)',
    shadowOffset: { height: 3.5, },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    backgroundColor: '#ffbc42',



  },
  writeReview: {
    width: '85%'
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:'black'
  },
  eachButton: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  eachView: {
    flexDirection: 'row',
    marginTop: '3%'
  },
  buttons: {
    marginTop: '9%',
    width: '100%',
    justifyContent: 'space-evenly',
    flexDirection: 'row'
  },
  insider: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: '5%',
    width: '73%',
    //  backgroundColor: 'blue'
  },
  text: {
    marginLeft: '5%',
    marginTop: '0.5%',
    fontSize: 12,
    fontFamily: 'Nunito_600SemiBold'
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  name: {
    width: '70%',
    marginLeft: '5%',
    marginTop: '5%'
  },
  rating: {
    // width: '25%',
    height: '50%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',

  },


  Top: {
    // height: '50%',
    width: '80%',
    marginTop: '12%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    // backgroundColor:'blue',
  },
  input: {
    // marginHorizontal: 10,
    marginLeft: '3%',
    padding: 5,
    borderColor: 'white',
    borderRadius: 5,
    borderWidth: 2,
    width: '80%'
    // alignItems:'center',
    // justifyContent: 'center',
    // flex: 1,fgfg
  },
  button: {
    width: '100%',
    padding: '2%',
    borderRadius: 40,
    alignItems: 'center',
    backgroundColor: '#36649E',
    marginBottom: '2%',
    borderStyle: 'solid',
    borderColor: '#36649E',
    borderWidth: 1,
    marginTop: '15%'
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonText: {
    color: '#36649E',
    fontWeight: '700',
    fontSize: 16,
  },
  secSt: {
    marginTop: '3%',
    marginHorizontal: 10,
    // marginTop: 24,
    padding: 10,
    borderColor: '#AAA9A9',
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 10,
    // alignItems:'center',
    // justifyContent: 'center',
    // flex: 1,
    shadowColor: 'rgba(0,0,0, 0.6)',
    shadowOffset: { height: 3.5, },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    backgroundColor: 'white',
    // width: 350,
    // marginBottom: '20%'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  TandU: {
    flexDirection: 'column',
    marginLeft: '4%',
    // backgroundColor: 'black',
    justifyContent: 'center'
  },

  headerText: {
    fontSize: 15,
    //  fontWeight: '600'
    color: 'gray',
  },
  headerTextt: {
    fontSize: 15,
    //  fontWeight: '600'
    color: 'black',
  },
  userText: {
    marginTop: '4%',
    fontSize: 10,
    color: 'gray',
  },
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // flex: 1,
    width: '100%',
    marginTop: '3%',
    marginBottom: '1%',
    opacity: 0.5,

  },
  reviewList: {
    width: '85%',
    marginTop: '5%',
    marginBottom: '20%'
  }

})
