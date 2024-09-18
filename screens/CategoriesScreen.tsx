import React from 'react';
import { FlatList, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CATEGORIES = [
  { id: '1', title: 'Bún Việt Nam', imageUrl: 'https://th.bing.com/th/id/OIP.1zLTwEeTGAeeXfyu-XxTVgHaE9?rs=1&pid=ImgDetMain' },
  { id: '2', title: 'Cơm Việt Nam', imageUrl: 'https://th.bing.com/th/id/OIP.9Mm9zV_rJo84yxqLk9cCZwHaE8?rs=1&pid=ImgDetMain' },
  { id: '3', title: 'Các món khác', imageUrl: 'https://th.bing.com/th/id/OIP.SXa3HiX6F3Icp30y27uvGgHaE8?rs=1&pid=ImgDetMain' },
  { id: '4', title: 'Tráng miệng', imageUrl: 'https://images2.thanhnien.vn/Uploaded/landt/2022_06_10/img-7941-copy-8837.jpg' },
  { id: 'm1', title: 'Bún bò huế', imageUrl: 'https://mcdn.coolmate.me/image/August2021/mon-an-sang-viet-nam-3.jpg' },
    { id: 'm2', title: 'Bún chả', imageUrl: 'https://mcdn.coolmate.me/image/August2021/mon-an-sang-viet-nam-2.jpg' },
    { id: 'm3', title: 'Bún riêu cua', imageUrl: 'https://mcdn.coolmate.me/image/August2021/mon-an-sang-viet-nam-5.jpg' },
    { id: 'm4', title: 'Bún mọc', imageUrl: 'https://mcdn.coolmate.me/image/August2021/mon-an-sang-viet-nam-6.jpg' },
];

const CategoriesScreen = () => {
  const navigation = useNavigation();

  const renderCategoryItem = (itemData: { item: { id: string; title: string; imageUrl: string } }) => {
    return (
      <TouchableOpacity
        style={styles.gridItem}
        onPress={() => navigation.navigate('Meals', { categoryId: itemData.item.id })}
      >
        <View style={styles.imageContainer}>
          <Image source={{ uri: itemData.item.imageUrl }} style={styles.image} />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{itemData.item.title}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={CATEGORIES}
      renderItem={renderCategoryItem}
      numColumns={1} // Hiển thị theo chiều dọc
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    marginVertical: 10, // Giảm khoảng cách theo chiều dọc
    marginHorizontal: 20, // Cân chỉnh khoảng cách theo chiều ngang
    height: 150,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'black',
    // width: '100%' đã được loại bỏ để tránh tràn
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  image: {
    width: '100%', // Đảm bảo hình ảnh chiếm toàn bộ chiều rộng
    height: 120,
    resizeMode: 'cover',
  },
  titleContainer: {
    backgroundColor: '#FFFFFF', // Nền màu tối để làm nổi bật văn bản
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'FFFFFF', // Đổi màu văn bản để dễ đọc hơn trên nền trắng
    textAlign: 'center',
  },
});

export default CategoriesScreen;
