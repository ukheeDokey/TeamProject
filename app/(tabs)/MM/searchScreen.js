import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  Platform,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../../hooks/ThemeContext';

// SVG 파일 임포트
{/*import LocationIcon from '../icons/location.svg';
import XIcon from '../icons/x.svg';
import StarIcon from '../icons/star.svg'; // 즐겨찾기 아이콘 */}

const initialRecentRecords = [
  { id: '1', station: '서울역', code: '410' },
  { id: '2', station: '강남역', code: '617' },
  { id: '3', station: '홍대입구역', code: '118' },
];

const initialFavoriteStations = [
  { id: '1', station: '여의도역', code: '211' },
  { id: '2', station: '인천역', code: '220' },
];

const SearchScreen = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState('');
  const [activeTab, setActiveTab] = useState('recent');
  const [recentRecords, setRecentRecords] = useState(initialRecentRecords);
  const [favoriteStations, setFavoriteStations] = useState(initialFavoriteStations);
  const { isDarkMode } = useTheme();

  const handleSearchChange = (text) => {
    setSearchText(text);
  };

  const clearSearchText = () => {
    setSearchText('');
  };

  const removeStation = (id) => {
    if (activeTab === 'recent') {
      setRecentRecords((prev) => prev.filter((item) => item.id !== id));
    } else {
      setFavoriteStations((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const removeFromFavorites = (id) => {
    setFavoriteStations((prev) => prev.filter((item) => item.id !== id));
  }; // 즐겨찾기 아이콘 클릭시 즐겨찾기 해제

  const clearAllRecords = () => {
    if (activeTab === 'recent') {
      setRecentRecords([]);
    } else {
      setFavoriteStations([]);
    }
  };

  const filteredRecords =
    activeTab === 'recent'
      ? recentRecords.filter((item) => item.station.includes(searchText))
      : favoriteStations.filter((item) => item.station.includes(searchText));

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#151718' : '#f9f9f9' }]}>
      <View style={[styles.searchContainer, { 
        backgroundColor: isDarkMode ? '#2C2C2C' : '#fff',
        borderColor: isDarkMode ? '#444444' : '#ccc'
      }]}>
        <TextInput
          style={[styles.searchInput, { color: isDarkMode ? '#FFFFFF' : '#000000' }]}
          placeholder="지하철 역 검색"
          placeholderTextColor={isDarkMode ? '#888888' : '#999999'}
          value={searchText}
          onChangeText={handleSearchChange}
        />
        <TouchableOpacity style={styles.clearButton} onPress={clearSearchText}>
          <Text style={[styles.clearButtonText, { color: isDarkMode ? '#888888' : '#999' }]}>X</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.tabContainer, { 
        borderColor: isDarkMode ? '#444444' : '#ccc',
        backgroundColor: isDarkMode ? '#2C2C2C' : '#F7F7F7'
      }]}>
        <TouchableOpacity
          onPress={() => setActiveTab('recent')}
          style={[styles.tabSection, { 
            backgroundColor: isDarkMode ? '#2C2C2C' : '#F7F7F7' 
          }]}
        >
          <Text
            style={[
              styles.tabText,
              {
                color: activeTab === 'recent' 
                  ? (isDarkMode ? '#FFFFFF' : 'rgba(0, 0, 0, 0.6)') 
                  : (isDarkMode ? '#888888' : 'rgba(0, 0, 0, 0.3)')
              },
            ]}
          >
            최근 기록
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab('favorites')}
          style={[styles.tabSection, { 
            backgroundColor: isDarkMode ? '#2C2C2C' : '#F7F7F7' 
          }]}
        >
          <Text
            style={[
              styles.tabText,
              {
                color: activeTab === 'favorites' 
                  ? (isDarkMode ? '#FFFFFF' : 'rgba(0, 0, 0, 0.6)') 
                  : (isDarkMode ? '#888888' : 'rgba(0, 0, 0, 0.3)')
              },
            ]}
          >
            즐겨찾기
          </Text>
        </TouchableOpacity>
      </View>

      <Image
        source={require('../../../assets/images/searchicon/div2.png')}
        style={[styles.banner, { width: 402, height: 52 }]}
        resizeMode="cover"
      />

      <TouchableOpacity style={styles.textClearButton} onPress={clearAllRecords}>
        <Text style={styles.textClearButtonText}>전체삭제</Text>
      </TouchableOpacity>

      <View style={styles.divider} />

      <FlatList
        data={filteredRecords}
        renderItem={({ item }) => (
          <View style={[styles.stationItem, { 
            borderBottomColor: isDarkMode ? '#444444' : '#ccc',
            backgroundColor: isDarkMode ? '#2C2C2C' : '#fff'
          }]}>
            <View style={styles.stationInfo}>
              <Image 
                source={activeTab === 'recent' 
                  ? require('../../../assets/images/searchicon/location_on.png')
                  : require('../../../assets/images/searchicon/staricon.png')
                }
                style={[styles.icon, { tintColor: isDarkMode ? '#FFFFFF' : undefined }]}
              />
              <Text style={[styles.stationCode, { color: isDarkMode ? '#87CEEB' : '#6200ea' }]}>
                {item.code}
              </Text>
              <Text style={[styles.stationName, { color: isDarkMode ? '#FFFFFF' : '#000' }]}>
                {item.station}
              </Text>
            </View>
            <TouchableOpacity style={[styles.deleteIcon, { 
              backgroundColor: isDarkMode ? '#444444' : '#f1f1f1'
            }]} onPress={() => removeStation(item.id)}>
              <Image
                source={require('../../../assets/images/searchicon/X.png')}
                style={[{ width: 16, height: 16 }, { tintColor: isDarkMode ? '#FFFFFF' : undefined }]}
              />
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />

<TouchableOpacity style={styles.backButton} onPress={router.back}>
        <Image
          source={require('../../../assets/images/mainicon/뒤로가기.png')}
          style={styles.backIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 20,
    backgroundColor: '#fff',
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: 'transparent',
    borderWidth: 0,
    backgroundColor: 'transparent',
  },
  clearButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  clearButtonText: {
    fontSize: 16,
    color: '#999',
  },
  tabContainer: {
    flexDirection: 'row',
    height: 50,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
  },
  tabSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  banner: {
    alignSelf: 'center',
    width: '100%',
    height: 52,
    marginBottom: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
  textClearButton: {
    alignItems: 'flex-end',
    marginBottom: 5,
    marginRight: 5,
  },
  textClearButtonText: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.4)',
  },
  list: {
    flex: 1,
  },
  stationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  stationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 15,
  },
  stationCode: {
    marginRight: 10,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#6200ea',
  },
  stationName: {
    fontSize: 12,
    color: '#000',
  },
  deleteIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 16,
    height: 16,
    borderRadius: 16,
    backgroundColor: '#f1f1f1',
  },
});

export default SearchScreen;