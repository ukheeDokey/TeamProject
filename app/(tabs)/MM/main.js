import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Animated,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import { useRouter } from 'expo-router';
import SubwayMap from './SubwayMap';
import { stationCoordinates } from './location';
import { ReactNativeZoomableView } from '@openspacelabs/react-native-zoomable-view';
import { useTheme } from '../../../hooks/ThemeContext';


const { width } = Dimensions.get('window'); // 화면 너비를 가져옴

const MainScreen = () => {
  const router = useRouter();
  const { isDarkMode } = useTheme();
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-width)).current; // 초기 위치를 화면 왼쪽으로 설정
  const [selectedStation, setSelectedStation] = useState(null);

  // stationCoordinates의 키를 배열로 변환
  const stationIds = Object.keys(stationCoordinates);

  const openMenu = () => {
    setIsModalVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0, // 화면 내 위치
      duration: 300, // 애니메이션 시간 (ms)
      useNativeDriver: true, // 네이티브 드라이버 사용
    }).start();
  };

  const closeMenu = () => {
    Animated.timing(slideAnim, {
      toValue: -width, // 화면 밖으로 이동
      duration: 300,
      useNativeDriver: true,
    }).start(() => setIsModalVisible(false));
  };

  const handleMenuNavigation = (route) => {
    closeMenu(); // 메뉴를 닫고
    router.push(`/menu/${route}`); // 해당 경로로 이동
  };

  const handleSearch = () => {
    if (stationIds.includes(searchText)) {
      const coordinates = stationCoordinates[searchText];
      if (coordinates) {
        setPopupPosition({
          top: coordinates.top,
          left: coordinates.left,
          station: searchText
        });
        setPopupVisible(true);
      } else {
        alert('해당 역의 좌표를 찾을 수 없습니다.');
      }
    } else {
      alert('찾으시는 역이 없습니다.');
    }
    setSearchText('');
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={[
        styles.container,
        { backgroundColor: isDarkMode ? '#151718' : '#ffffff' }
      ]}>
        {/* 상단 검색 바 */}
        <View style={styles.searchBar}>
          <TouchableOpacity style={styles.menuButton} onPress={openMenu}>
            <Image
              source={require('../../../assets/images/mainicon/Leading-icon.png')}
              style={styles.menuIcon}
            />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            value={searchText}
            onChangeText={setSearchText}
            placeholder="역명 검색 · 즐겨찾기"
            placeholderTextColor="#999"
            keyboardType="default"
            onSubmitEditing={handleSearch}
          />
          <TouchableOpacity
            style={styles.searchButton}
            onPress={handleSearch}
          >
            <Image
              source={require('../../../assets/images/mainicon/Trailing-Elements.png')}
              style={styles.searchIcon}
            />
          </TouchableOpacity>
        </View>

        {/* 중앙 지하철 이미지 */}
        <ReactNativeZoomableView style={styles.mapContainer}>
          <SubwayMap
            popupPosition={popupPosition}
            popupVisible={popupVisible}
            setPopupVisible={setPopupVisible}
            setPopupPosition={setPopupPosition}
            selectedStation={selectedStation}
          />
        </ReactNativeZoomableView>

        {/* 검색 아이콘 */}
        <TouchableOpacity
          style={styles.searchIconContainer}
          onPress={() => router.push('/MM/searchResult')}
        >
          <Image
            source={require('../../../assets/images/mainicon/search.png')}
            style={styles.floatingSearchIcon}
          />
        </TouchableOpacity>

        {/* 하단 광고 배너 */}
        <View style={styles.bannerContainer}>
          <Image
            source={require('../../../assets/images/mainicon/광고사진.png')}
            style={styles.bannerImage}
          />
        </View>
      </View>

      {/* 좌측 슬라이드 메뉴 */}
      {isModalVisible && (
        <TouchableWithoutFeedback onPress={closeMenu}>
          <View style={[
            styles.overlay,
            { backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0.5)' }
          ]}>
            <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
              <Animated.View
                style={[
                  styles.modalMenu,
                  { 
                    transform: [{ translateX: slideAnim }],
                    backgroundColor: isDarkMode ? '#151718' : '#FFFFFF'
                  },
                ]}
              >
                <View style={[
                  styles.modalHeader,
                  { backgroundColor: isDarkMode ? '#3A4A5A' : '#4FBFE5' }
                ]}>
                  <Image
                    source={require('../../../assets/images/mainicon/KakaoTalk_20241113_171601246.png')}
                    style={styles.modalLogo}
                  />
                </View>
                <View style={styles.modalItems}>
                  <TouchableOpacity
                    style={[
                      styles.menuItem,
                      { backgroundColor: isDarkMode ? '#151718' : 'white' }
                    ]}
                    onPress={() => handleMenuNavigation('login')}
                  >
                    <Image
                      source={require('../../../assets/images/mainicon/로그인 아이콘.png')}
                      style={[styles.icon, { tintColor: isDarkMode ? '#FFFFFF' : undefined }]}
                    />
                    <Text style={[styles.menuText, { color: isDarkMode ? '#FFFFFF' : '#333333' }]}>로그인</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.menuItem,
                      { backgroundColor: isDarkMode ? '#151718' : 'white' }
                    ]}
                    onPress={() => handleMenuNavigation('favorite')}
                  >
                    <Image
                      source={require('../../../assets/images/mainicon/즐겨찾기 아이콘.png')}
                      style={[styles.icon, { tintColor: isDarkMode ? '#FFFFFF' : undefined }]}
                    />
                    <Text style={[styles.menuText, { color: isDarkMode ? '#FFFFFF' : '#333333' }]}>즐겨찾기</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.menuItem,
                      { backgroundColor: isDarkMode ? '#151718' : 'white' }
                    ]}
                    onPress={() => handleMenuNavigation('terms')}
                  >
                   <Image
                      source={require('../../../assets/images/mainicon/이용약관 아이콘.png')}
                      style={[styles.icon, { tintColor: isDarkMode ? '#FFFFFF' : undefined }]}
                      /> 
                    <Text style={[styles.menuText, { color: isDarkMode ? '#FFFFFF' : '#333333' }]}>이용약관</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.menuItem,
                      { backgroundColor: isDarkMode ? '#151718' : 'white' }
                    ]}
                    onPress={() => handleMenuNavigation('settings')}
                  >
                    <Image
                      source={require('../../../assets/images/mainicon/설정 아이콘.png')}
                      style={[styles.icon, { tintColor: isDarkMode ? '#FFFFFF' : undefined }]}
                    />
                    <Text style={[styles.menuText, { color: isDarkMode ? '#FFFFFF' : '#333333' }]}>설정</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity 
                  style={[
                    styles.closeButton,
                    { backgroundColor: isDarkMode ? '#151718' : '#ffffff' }
                  ]} 
                  onPress={closeMenu}
                >
                  <Text style={[
                    styles.closeButtonText,
                    { color: isDarkMode ? '#FFFFFF' : '#4FBFE5' }
                  ]}>←</Text>
                </TouchableOpacity>
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBar: {
    height: 56,
    borderRadius: 28,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECE6F0',
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 20,
    paddingHorizontal: 10,
  },
  menuButton: {
    marginRight: 10,
  },
  menuIcon: {
    width: 48,
    height: 48,
    resizeMode: 'contain',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 8,
    paddingVertical: 8,
  },
  mapContainer: {
    flex: 1,
  },
  mapImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  bannerContainer: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  modalMenu: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: '80%',
    backgroundColor: '#FFFFFF',
    zIndex: 1000,
    paddingVertical: 20,
    paddingHorizontal: 10,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 20, // 상태바 침범 방지
  },
  modalHeader: {
    width: '100%', // 가로를 화면에 가득차게 설정
    height: 100, // 높이를 고정하여 디자인에 맞춤
    flexDirection: 'row', // 로고와 텍스트를 같은 행에 배치
    alignItems: 'center', // 세로 중앙 정렬
    paddingLeft: 10, // 왼쪽 여백 추가
  },
  modalLogo: {
    width: 100, // 로고 크기
    height: 100,
    resizeMode: 'contain', // 이미지 비율 유지
  },
  modalItems: {
    marginTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  menuText:{
    fontSize: 18,
    color: '#333333',
  },
  closeButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    borderRadius: 30,
    padding: 10,
  },
  closeButtonText: {
    color: '#4FBFE5',
    fontSize: 40,
  },
  searchIconContainer: {
    position: 'absolute',
    right: 20,
    bottom: 80,
    backgroundColor: '#ffffff',
    borderRadius: 30,
    padding: 0,
    zIndex: 1,
  },
  floatingSearchIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  icon: {
    width: 50,
    height: 50,
    marginRight: 20,
  },
  overlay: {
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)', // 반투명 배경
  zIndex: 999, 
  }
});

export default MainScreen;
