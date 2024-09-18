import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Meal {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  ingredients: string[];
  steps: string[];
}

type RootStackParamList = {
  MealDetail: { mealId: string };
};

type MealDetailRouteProp = RouteProp<RootStackParamList, 'MealDetail'>;

const MEALS: Record<string, Meal[]> = {
  '1': [
    {
      id: 'm1', title: 'Bún bò huế', imageUrl: 'https://mcdn.coolmate.me/image/August2021/mon-an-sang-viet-nam-3.jpg',
      description: '',
      ingredients: [],
      steps: []
    },
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



const MealDetailScreen: React.FC = () => {
  const route = useRoute<MealDetailRouteProp>();
  const { mealId } = route.params;

  let meal: Meal | undefined;
  for (const key in MEALS) {
    const categoryMeals = MEALS[key];
    meal = categoryMeals.find((m) => m.id === mealId);
    if (meal) break;
  }

  const [rating, setRating] = useState<number>(0);

  useEffect(() => {
    const loadRating = async () => {
      try {
        const savedRating = await AsyncStorage.getItem(`rating_${mealId}`);
        if (savedRating) {
          setRating(Number(savedRating));
        }
      } catch (error) {
        console.error('Failed to load rating.', error);
      }
    };

    loadRating();
  }, [mealId]);

  const handleRating = async (newRating: number) => {
    // Nếu người dùng nhấn vào ngôi sao đã chọn, ta sẽ cho phép hủy chọn
    const updatedRating = rating === newRating ? 0 : newRating;
    setRating(updatedRating);
    try {
      await AsyncStorage.setItem(`rating_${mealId}`, updatedRating.toString());
    } catch (error) {
      console.error('Failed to save rating.', error);
    }
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => (
      <TouchableOpacity key={index} onPress={() => handleRating(index + 1)}>
        <Icon
          name={index < rating ? 'star' : 'star-outline'}
          size={30}
          color={index < rating ? 'yellow' : 'gray'}
        />
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.screen}>
        {meal ? (
          <>
            <Image source={{ uri: meal.imageUrl }} style={styles.image} />
            <Text style={styles.title}>{meal.title}</Text>
            <Text style={styles.description}>{meal.description}</Text>

            <Text style={styles.sectionTitle}>Ingredients:</Text>
            {meal.ingredients.map((ingredient, index) => (
              <Text key={index} style={styles.ingredient}>
                {ingredient}
              </Text>
            ))}

            <Text style={styles.sectionTitle}>Steps:</Text>
            {meal.steps.map((step, index) => (
              <Text key={index} style={styles.step}>
                {`${index + 1}. ${step}`}
              </Text>
            ))}

            <View style={styles.ratingContainer}>
              <Text style={styles.sectionTitle}>Rate this meal:</Text>
              <View style={styles.starsContainer}>{renderStars()}</View>
            </View>
          </>
        ) : (
          <Text>Meal not found</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screen: {
    padding: 20,
    paddingBottom: 40,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  ingredient: {
    fontSize: 16,
    marginVertical: 2,
  },
  step: {
    fontSize: 16,
    marginVertical: 2,
  },
  ratingContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
});

export default MealDetailScreen;
