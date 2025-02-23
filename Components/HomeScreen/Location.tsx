import {
               View,
               Text,
               StyleSheet,
               Dimensions,
               TouchableOpacity,
               Modal,
               TextInput,
               Button,
             } from "react-native";
             import React, { useState } from "react";
             import EvilIcons from "@expo/vector-icons/EvilIcons";
             import Entypo from "@expo/vector-icons/Entypo";
             
             const SCREEN_HEIGHT = Dimensions.get("window").height;
             const SCREEN_WIDTH = Dimensions.get("window").width;
             
             const Location = () => {
               const [modalVisible, setModalVisible] = useState(false);
               const [location, setLocation] = useState("Berhampur, Odisha");
               const [manualLocation, setManualLocation] = useState("");
             
               const handleSetLocation = () => {
                 if (manualLocation.trim()) {
                   setLocation(manualLocation);
                   setManualLocation("");
                 }
                 setModalVisible(false);
               };
             
               const handleAutoLocation = () => {
                 // You can integrate a geolocation API here
                 setLocation("Auto-detected Location");
                 setModalVisible(false);
               };
             
               return (
                 <>
                   <TouchableOpacity style={styles.container} onPress={() => setModalVisible(true)}>
                     <EvilIcons name="location" size={27} color="black" />
                     <Text style={styles.Text}>{location}</Text>
                     <Entypo name="chevron-small-down" size={24} color="black" />
                   </TouchableOpacity>
             
                   <Modal animationType="slide" transparent={true} visible={modalVisible}>
                     <View style={styles.modalContainer}>
                       <View style={styles.modalContent}>
                         <Text style={styles.modalTitle}>Set Your Location</Text>
                         <TextInput
                           style={styles.input}
                           placeholder="Enter location manually"
                           value={manualLocation}
                           onChangeText={setManualLocation}
                         />
                         <View style={styles.buttonContainer}>
                           <Button title="Set Location" onPress={handleSetLocation} />
                           <Button title="Use Auto Location" onPress={handleAutoLocation} />
                           <Button title="Cancel" color="red" onPress={() => setModalVisible(false)} />
                         </View>
                       </View>
                     </View>
                   </Modal>
                 </>
               );
             };
             
             export default Location;
             
             const styles = StyleSheet.create({
               container: {
                 flexDirection: "row",
                 height: SCREEN_HEIGHT * 0.05,
                 alignItems: "center",
                 gap: SCREEN_HEIGHT * 0.003,
               },
               Text: {
                 fontSize: SCREEN_HEIGHT * 0.02,
                 color: "black",
                 fontWeight: "600",
               },
               modalContainer: {
                 flex: 1,
                 justifyContent: "center",
                 alignItems: "center",
                 backgroundColor: "rgba(0, 0, 0, 0.5)",
               },
               modalContent: {
                 width: SCREEN_WIDTH * 0.9,
                 padding: 20,
                 backgroundColor: "white",
                 borderRadius: 10,
                 elevation: 5,
               },
               modalTitle: {
                 fontSize: 20,
                 fontWeight: "bold",
                 marginBottom: 20,
               },
               input: {
                 height: 40,
                 borderColor: "#ccc",
                 borderWidth: 1,
                 marginBottom: 20,
                 paddingHorizontal: 10,
               },
               buttonContainer: {
                 gap: 10,
               },
             });
             
             // Now, clicking the location opens a modal where users can set location manually or use auto location! 🚀
             