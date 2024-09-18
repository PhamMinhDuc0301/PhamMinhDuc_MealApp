import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';

const FAVORITE_MEALS = [
    { id: 'm1', title: 'Bún bò huế', imageUrl: 'https://mcdn.coolmate.me/image/August2021/mon-an-sang-viet-nam-3.jpg' },
    { id: 'm2', title: 'Bún chả', imageUrl: 'https://mcdn.coolmate.me/image/August2021/mon-an-sang-viet-nam-2.jpg' },
    { id: 'm3', title: 'Bún riêu cua', imageUrl: 'https://mcdn.coolmate.me/image/August2021/mon-an-sang-viet-nam-5.jpg' },
    { id: 'm4', title: 'Bún mọc', imageUrl: 'https://mcdn.coolmate.me/image/August2021/mon-an-sang-viet-nam-6.jpg' },
    { id: 'm9', title: 'Bánh mì', imageUrl: 'https://th.bing.com/th/id/OIP.IxSQxenayDYM2oZcHwj7PgHaEo?rs=1&pid=ImgDetMain' },
    { id: 'm10', title: 'Xôi mặn', imageUrl: 'https://i.ytimg.com/vi/_ZWvMnyMxk8/maxresdefault.jpg' },
    { id: 'm11', title: 'Cá viên chiên', imageUrl: 'https://th.bing.com/th/id/R.0f73429ec23de45b043cba0161474e06?rik=XCVZZbwt5z%2bMUQ&pid=ImgRaw&r=0' },
    { id: 'm12', title: 'Bánh bao', imageUrl: 'https://th.bing.com/th/id/R.77480af1b2d2f48c7b49b893fe186127?rik=K%2bOekpLpxjoW9A&pid=ImgRaw&r=0' },


  ]

const FavoritesScreen = () => {
  const renderFavoriteItem = (itemData: { item: { id: string; title: string; imageUrl: string } }) => {
    return (
      <View style={styles.favoriteItem}>
        <Image source={{ uri: itemData.item.imageUrl }} style={styles.image} />
        <Text style={styles.title}>{itemData.item.title}</Text>
      </View>
    );
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.headerTitle}>Your Favorite Meals</Text>
      <FlatList
        data={FAVORITE_MEALS}
        keyExtractor={(item) => item.id}
        renderItem={renderFavoriteItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  favoriteItem: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default FavoritesScreen;
