import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";

export default function EnterScreen() {
  const navigation = useNavigation();

  return (
      <ImageBackground
        source={require("../assets/fundo.jpg")}
        style={styles.container}
        resizeMode="cover"
      >
        <View style={styles.containerLogo}>
          <Animatable.Image
            animation="fadeInRight"
            delay={800}
            source={require("../assets/logo.png")}
            style={{ width: "100%" , height:'30%', marginRight: 15}}
            resizeMode="contain"
          />
        </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("List")}
          >
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
      </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E2DBD5",
    flexDirection: "column",
    height:'100%',
    width: "100%",
  },
  containerLogo: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    position: "absolute",
    backgroundColor: "#E2DBD5",
    borderRadius: 6,
    border: '1px solid #028074',
    paddingVertical: 8,
    width: "60%",
    alignSelf: "center",
    bottom: "5%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "#028074",
    fontWeight: "bold",
  },
});
