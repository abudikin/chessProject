import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { auth } from "../firebase";


const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("appNavigator");
      }
    });

    return unsubscribe;
  }, []);

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged in with:", user.email);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View
      style={styles.container}
      behavior="padding"
    >
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Пароль"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleLogin}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Залогиниться</Text>
        </TouchableOpacity>
      </View>
      <Text style={{marginTop:30}}>
        или
      </Text>
      <View style = {styles.buttonIconGroup}>
        <TouchableOpacity>
          <Image
            source={require("../assets/icons/google.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require("../assets/icons/apple.png")}
          />
        </TouchableOpacity>
      </View>
      <View style = {styles.link}>
        <Text>
          Еще нет аккаунта?
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("SignUpScreen")}>
          <Text>Регистрация</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("PasswordResetScreen")}>
          <Text>Я забыл свой пароль</Text>
        </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "#C7C7C7",
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 40,
    borderRadius: 5,
    
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  butonOutlineText: {
    color: "#0782f9",
    fontWeight: "700",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#0782f9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782f9",
    borderWidth: 2,
  },
  buttonIconGroup:{
    flex: 1,
    flexDirection: "row",
    gap: 18,
    marginTop:10,
  },
  link:{
    flex: 1,
    flexDirection: "row",
    gap: 10,
  },
});
