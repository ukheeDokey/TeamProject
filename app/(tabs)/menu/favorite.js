import React, { useState, useEffect } from "react";
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from 'expo-router';
import { useTheme } from '../../../hooks/ThemeContext';

const initialData = [
  { id: "1", type: "location", label: "121" },
  { id: "2", type: "location", label: "706" },
  { id: "3", type: "location", label: "617" },
  { id: "4", type: "location", label: "215" },
  { id: "5", type: "subway", label: "601 -> 307" },
  { id: "6", type: "subway", label: "123 -> 904" },
];

export default function BookMark() {
  const router = useRouter();
  const { isDarkMode } = useTheme();
  const [data, setData] = useState([]);

  // 앱 실행 시 초기 데이터 로드
  useEffect(() => {
    setData(initialData);
  }, []);

  // 항목 삭제 함수
  const handleRemoveItem = (id) => {
    console.log("Removing item with id:", id); // 디버깅 로그
    setData((prevData) => prevData.filter((item) => item.id !== id));
  };

  // 각 리스트 항목 렌더링
  const renderItem = ({ item }) => (
    <View style={[styles.itemContainer, { 
      borderBottomColor: isDarkMode ? '#333333' : '#E0E0E0',
      backgroundColor: isDarkMode ? '#151718' : '#F8F8F8'
    }]}>
      <Image
        source={
          item.type === "location"
            ? require("../../../assets/images/menuicon/location_on.png")
            : require("../../../assets/images/menuicon/directions_subway.png")
        }
        style={[styles.icon, { tintColor: isDarkMode ? '#FFFFFF' : undefined }]}
      />
      <Text style={[styles.label, { color: isDarkMode ? '#FFFFFF' : '#333' }]}>{item.label}</Text>
      <TouchableOpacity onPress={() => handleRemoveItem(item.id)} style={{ padding: 10 }}>
        <Image 
          source={require("../../../assets/images/menuicon/star_filled.png")} 
          style={[styles.bookmarkIcon, { tintColor: isDarkMode ? '#FFFFFF' : undefined }]}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#151718' : '#F8F8F8' }]}>
      <View style={[styles.topSpace, { backgroundColor: isDarkMode ? '#151718' : '#F8F8F8' }]} />
      
      <View style={[styles.banner, { backgroundColor: isDarkMode ? '#2C2C2C' : '#87CEEB' }]}>
        <Image source={require("../../../assets/images/mainicon/즐겨찾기 아이콘.png")} style={styles.bannerIcon} />
        <Text style={[styles.bannerText, { color: isDarkMode ? '#FFFFFF' : '#FFFFFF' }]}>즐겨찾기</Text>
      </View>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />

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
    backgroundColor: "#F8F8F8",
  },
  topSpace: {
    height: 65, // 상단 여백
    backgroundColor: "#F8F8F8",
  },
  banner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#87CEEB", // 상단 배너 배경색
    paddingVertical: 20,
    paddingLeft: 15,
  },
  bannerIcon: {
    width: 45,
    height: 45,
    marginRight: 15,
  },
  bannerText: {
    fontSize: 26,
    color: "white",
    fontWeight: "bold",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  label: {
    flex: 1,
    fontSize: 22,
    color: "#333",
  },
  bookmarkIcon: {
    width: 40,
    height: 40,
  },
  backButton: {
    position: "absolute",
    bottom: 15, // 하단 여백
    left: 15, // 왼쪽 여백
    padding: 10,
    borderRadius: 30, // 버튼 둥글게 유지
    backgroundColor: "transparent", // 배경색 제거
    shadowColor: "transparent", // 그림자 제거
    elevation: 0, // 안드로이드 그림자 제거
  },
  backIcon: {
    width: 40, // 뒤로가기 아이콘 크기
    height: 40,
    tintColor: "#87CEEB", // 아이콘 색상 유지
  },
});