import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type Category = {
  id: string;
  title: string;
  imageUrl: string;
};

type Meal = {
  id: string;
  title: string;
  imageUrl: string;
};

type RootStackParamList = {
  MealsScreen: { categoryId: string };
  MealDetail: { mealId: string };
};

const CATEGORIES: Category[] = [
  { id: '1', title: 'Bún Việt Nam', imageUrl: 'https://th.bing.com/th/id/OIP.1zLTwEeTGAeeXfyu-XxTVgHaE9?rs=1&pid=ImgDetMain' },
  { id: '2', title: 'Cơm Việt Nam', imageUrl: 'https://th.bing.com/th/id/OIP.9Mm9zV_rJo84yxqLk9cCZwHaE8?rs=1&pid=ImgDetMain' },
  { id: '3', title: 'Các món khác', imageUrl: 'https://th.bing.com/th/id/OIP.SXa3HiX6F3Icp30y27uvGgHaE8?rs=1&pid=ImgDetMain' },
  { id: '4', title: 'Tráng miệng', imageUrl: 'https://images2.thanhnien.vn/Uploaded/landt/2022_06_10/img-7941-copy-8837.jpg' },
];

const MEALS: Record<string, Meal[]> = {
  '1': [
    { id: 'm1', title: 'Bún bò huế', imageUrl: 'https://mcdn.coolmate.me/image/August2021/mon-an-sang-viet-nam-3.jpg' },
    { id: 'm2', title: 'Bún chả', imageUrl: 'https://mcdn.coolmate.me/image/August2021/mon-an-sang-viet-nam-2.jpg' },
    { id: 'm3', title: 'Bún riêu cua', imageUrl: 'https://mcdn.coolmate.me/image/August2021/mon-an-sang-viet-nam-5.jpg' },
    { id: 'm4', title: 'Bún mọc', imageUrl: 'https://mcdn.coolmate.me/image/August2021/mon-an-sang-viet-nam-6.jpg' },
  ],
  '2': [
    { id: 'm5', title: 'Cơm gà', imageUrl: 'https://th.bing.com/th/id/R.0957d347341f86d9bd777e483ecada52?rik=%2b6kDs9s3Q2Dxkg&pid=ImgRaw&r=0' },
    { id: 'm6', title: 'Cơm tấm', imageUrl: 'https://th.bing.com/th/id/OIP.8z53M_jG9LcdebseHjSOuwHaEK?rs=1&pid=ImgDetMain' },
    { id: 'm7', title: 'Cơm chiên dương châu', imageUrl: 'https://i0.wp.com/www.altasiatisk.no/wp-content/uploads/2021/04/IMG_0178-scaled.jpg?resize=1000%2C667&ssl=1' },
    { id: 'm8', title: 'Cơm bò xào', imageUrl: 'https://th.bing.com/th/id/R.ded7a3d0fa968b726b8b455d370808af?rik=QP1X02zF%2fYQqAg&riu=http%3a%2f%2fmonviet88.com%2fwp-content%2fuploads%2f2016%2f02%2fcom-thit-bo-xao.jpg&ehk=NDimi%2fFFPYeO%2fSpzfNDXE9BMWJ5eBr6mhTt18HFc%2fcg%3d&risl=&pid=ImgRaw&r=0' },
  ],
  '3': [
    { id: 'm9', title: 'Bánh mì', imageUrl: 'https://th.bing.com/th/id/OIP.IxSQxenayDYM2oZcHwj7PgHaEo?rs=1&pid=ImgDetMain' },
    { id: 'm10', title: 'Xôi mặn', imageUrl: 'https://i.ytimg.com/vi/_ZWvMnyMxk8/maxresdefault.jpg' },
    { id: 'm11', title: 'Cá viên chiên', imageUrl: 'https://th.bing.com/th/id/R.0f73429ec23de45b043cba0161474e06?rik=XCVZZbwt5z%2bMUQ&pid=ImgRaw&r=0' },
    { id: 'm12', title: 'Bánh bao', imageUrl: 'https://th.bing.com/th/id/R.77480af1b2d2f48c7b49b893fe186127?rik=K%2bOekpLpxjoW9A&pid=ImgRaw&r=0' },
  ],
  '4': [
    { id: 'm13', title: 'Bún bò huế', imageUrl: 'https://mcdn.coolmate.me/image/August2021/mon-an-sang-viet-nam-3.jpg' },
    { id: 'm14', title: 'Bún chả', imageUrl: 'https://mcdn.coolmate.me/image/August2021/mon-an-sang-viet-nam-2.jpg' },
    { id: 'm15', title: 'Bún riêu cua', imageUrl: 'https://mcdn.coolmate.me/image/August2021/mon-an-sang-viet-nam-5.jpg' },
    { id: 'm16', title: 'Bún mọc', imageUrl: 'https://mcdn.coolmate.me/image/August2021/mon-an-sang-viet-nam-6.jpg' },
  ],
};

const MealsScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'MealsScreen'>>();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { categoryId } = route.params;

  const selectedCategory = CATEGORIES.find(cat => cat.id === categoryId);

  const meals = MEALS[categoryId] || [];

  const renderMealItem = ({ item }: { item: Meal }) => {
    return (
      <TouchableOpacity
        style={styles.mealItem}
        onPress={() => navigation.navigate('MealDetail', { mealId: item.id })}
      >
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
        <Text style={styles.title}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.categoryTitle}>{selectedCategory?.title}</Text>
      
      <FlatList
        data={meals}
        keyExtractor={(item) => item.id}
        renderItem={renderMealItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
  },
  categoryTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  mealItem: {
    marginBottom: 15,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 200,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default MealsScreen;
