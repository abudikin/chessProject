import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../firebase";
import { ref, set } from "firebase/database";
import { db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setName] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("appNavigator");
      }
    });

    return unsubscribe;
  }, []);

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Registered with:", user.email);
        addData();
      })
      .catch((error) => alert(error.message));
  };
  
  const addData = () => {
    set(ref(db, "users/" + username), {
      name: username,
      email: email,
    });
  };
  
  return (
    <View
      style={styles.container}
      behavior="padding"
    >
      <View style={styles.inputContainer}>
        <TextInput
          value={username}
          placeholder="Полное имя"
          style={styles.input}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          value={email}
          placeholder="email"
          style={styles.input}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          secureTextEntry
          value={password}
          placeholder="Пароль"
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleSignUp}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Зарегистрироваться</Text>
        </TouchableOpacity>
      </View>
      <Text style={{ marginTop: 30 }}>Или</Text>
      <View style={styles.buttonIconGroup}>
        <TouchableOpacity>
          <Image source={require("../assets/icons/google.png")} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require("../assets/icons/apple.png")} />
        </TouchableOpacity>
      </View>
      <View style={styles.link}>
        <Text>Уже есть аккаунт?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("loginScreen")}>
          <Text>Залогиниться</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUpScreen;

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
  buttonIconGroup: {
    flex: 1,
    flexDirection: "row",
    gap: 18,
    marginTop: 10,
  },
  link: {
    flex: 1,
    flexDirection: "row",
    gap: 10,
  },
});
