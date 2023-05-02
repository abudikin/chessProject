import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  Switch,
  Alert,
  Button, 
  Platform
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../firebase";
import { ref, set } from "firebase/database";
import { db } from "../firebase";
import DateTimePicker from '@react-native-community/datetimepicker';

const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [username, setName] = useState("");
  const navigation = useNavigation();
  const [isCoach, setIsCoach] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [birthday, setBirthday] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const toggleSwitch = () => setIsCoach((previousState) => !previousState);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("appNavigator");
      }
    });

    return unsubscribe;
  }, []);

  const handleSignUp = () => {
    if (password !== password2) {
      Alert.alert(
        "Пароли не совпадают",
        "Пожалуйста убедитесь что пароли совпадают"
      );
      return;
    }
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
    if (!isCoach) {
      set(ref(db, "users/" + username), {
        name: username,
        email: email,
      });
    } else {
      set(ref(db, "coaches/" + username), {
        name: username,
        email: email,
      });
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === "ios");
    setBirthday(selectedDate || birthday);
  };

  const handleShowDatePicker = () => {
    setShowDatePicker(true);
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
         <Text>Birthday: {birthday.toLocaleDateString()}</Text>
      <TouchableOpacity  onPress={handleShowDatePicker}>
        <Text>Select date</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={birthday}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
        <TextInput
          secureTextEntry={!showPassword}
          value={password}
          placeholder="Пароль"
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
        />
        <TextInput
          secureTextEntry={!showPassword}
          value={password2}
          placeholder="Пароль"
          onChangeText={(text) => setPassword2(text)}
          style={styles.input}
        />
        <View style={styles.switch}>
          <Text style={{ marginTop: 15 }}>Показать пароль</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={showPassword ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleShowPassword}
            value={showPassword}
          />
        </View>
      </View>
      <View style={styles.switch}>
        <Text style={{ marginTop: 15 }}>Зарегистрироваться как тренер</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isCoach ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isCoach}
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
      <Text style={{ marginTop: 10 }}>Или</Text>
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
    marginTop: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
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
  switch: {
    flexDirection: "row",
    gap: 10,
  },
});
