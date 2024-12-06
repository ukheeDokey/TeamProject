import React from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useRouter } from 'expo-router';
import { useTheme } from '../../../hooks/ThemeContext';

export default function Login() {
  const router = useRouter();
  const { isDarkMode } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#151718' : '#FFFFFF' }]}>
      <View style={[styles.topSpace, { backgroundColor: isDarkMode ? '#151718' : '#FFFFFF' }]} />
      
      <View style={[styles.header, { backgroundColor: isDarkMode ? '#2C2C2C' : '#87CEEB' }]}>
        <Image source={require("../../../assets/images/mainicon/로그인 아이콘.png")} style={styles.headerIcon} />
        <Text style={[styles.headerText, { color: isDarkMode ? '#FFFFFF' : '#FFFFFF' }]}>로그인</Text>
      </View>

      <View style={styles.logoContainer}>
        <Image 
          source={require("../../../assets/images/menuicon/directions_subway.png")} 
          style={[styles.logo, { tintColor: isDarkMode ? '#FFFFFF' : undefined }]}
        />
        <Text style={[styles.logoText, { color: isDarkMode ? '#FFFFFF' : '#87CEEB' }]}>M.M.</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="ID"
          style={[styles.input, { 
            backgroundColor: isDarkMode ? '#2C2C2C' : '#F0F0F0',
            color: isDarkMode ? '#FFFFFF' : '#000000',
            borderColor: isDarkMode ? '#444444' : '#D3D3D3'
          }]}
          placeholderTextColor={isDarkMode ? '#888888' : '#A9A9A9'}
        />
        <TextInput
          placeholder="PASSWORD"
          secureTextEntry={true}
          style={[styles.input, { 
            backgroundColor: isDarkMode ? '#2C2C2C' : '#F0F0F0',
            color: isDarkMode ? '#FFFFFF' : '#000000',
            borderColor: isDarkMode ? '#444444' : '#D3D3D3'
          }]}
          placeholderTextColor={isDarkMode ? '#888888' : '#A9A9A9'}
        />
      </View>

      <TouchableOpacity style={[styles.loginButton, { backgroundColor: isDarkMode ? '#2C2C2C' : '#87CEEB' }]}>
        <Text style={styles.loginButtonText}>로그인</Text>
      </TouchableOpacity>

      <Text style={[styles.signupPrompt, { color: isDarkMode ? '#888888' : '#A9A9A9' }]}>
        회원이 아니신가요? 지금 M.M 가입하러 가기
      </Text>

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Image 
          source={require("../../../assets/images/mainicon/뒤로가기.png")} 
          style={[styles.backIcon, { tintColor: isDarkMode ? '#FFFFFF' : '#87CEEB' }]}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  topSpace: {
    height: 65, // 상단 여백
  },
  header: {
    width: "100%",
    backgroundColor: "#87CEEB",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingLeft: 15, // 좌측 여백 추가
  },
  headerIcon: {
    width: 55,
    height: 55,
    marginRight: 15, // 아이콘과 텍스트 사이 간격
  },
  headerText: {
    color: "white",
    fontSize: 26,
    fontWeight: "bold",
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  logoText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#87CEEB",
  },
  inputContainer: {
    width: "80%",
    marginTop: 20,
  },
  input: {
    backgroundColor: "#F0F0F0",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 20, // 입력 칸 사이의 간격
    borderColor: "#D3D3D3",
    borderWidth: 1,
  },
  loginButton: {
    width: "80%", // 버튼 너비를 입력 칸과 동일하게 설정
    backgroundColor: "#87CEEB",
    borderRadius: 25,
    paddingVertical: 15,
    marginTop: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  loginButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  signupPrompt: {
    color: "#A9A9A9",
    marginTop: 20,
    fontSize: 14,
  },
  backButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
  },
  backIcon: {
    width: 30,
    height: 30,
    tintColor: "#87CEEB",
  },
});