import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FavoriteContextType {
  favoriteMeals: string[];
  toggleFavorite: (mealId: string) => void;
}

const FavoriteContext = createContext<FavoriteContextType | undefined>(undefined);

const FavoriteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [favoriteMeals, setFavoriteMeals] = useState<string[]>([]);
  
    useEffect(() => {
      const loadFavoriteMeals = async () => {
        try {
          const favoriteMealsStr = await AsyncStorage.getItem('favoriteMeals');
          const favoriteMealIds = favoriteMealsStr ? JSON.parse(favoriteMealsStr) : [];
          console.log('Loaded favorite meals:', favoriteMealIds); // Debug log
          setFavoriteMeals(favoriteMealIds);
        } catch (error) {
          console.error('Failed to load favorite meals.', error);
        }
      };
  
      loadFavoriteMeals();
    }, []);
  
    const toggleFavorite = async (mealId: string) => {
      try {
        let updatedFavoriteMeals = [...favoriteMeals];
        if (favoriteMeals.includes(mealId)) {
          updatedFavoriteMeals = updatedFavoriteMeals.filter(id => id !== mealId);
        } else {
          updatedFavoriteMeals.push(mealId);
        }
        await AsyncStorage.setItem('favoriteMeals', JSON.stringify(updatedFavoriteMeals));
        console.log('Updated favorite meals:', updatedFavoriteMeals); // Debug log
        setFavoriteMeals(updatedFavoriteMeals);
      } catch (error) {
        console.error('Failed to update favorite status.', error);
      }
    };
  
    return (
      <FavoriteContext.Provider value={{ favoriteMeals, toggleFavorite }}>
        {children}
      </FavoriteContext.Provider>
    );
  };
  