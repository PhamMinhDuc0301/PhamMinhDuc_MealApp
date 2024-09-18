import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, Button } from 'react-native';

const SettingsScreen = () => {
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(false);
  const [language, setLanguage] = useState('English');

  const toggleNotifications = () => setIsNotificationsEnabled((previousState) => !previousState);
  const toggleDarkMode = () => setIsDarkModeEnabled((previousState) => !previousState);
  const changeLanguage = (lang: React.SetStateAction<string>) => setLanguage(lang);
  const resetAppData = () => {
    alert('App data has been reset!');
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Settings</Text>
      
      <View style={styles.settingItem}>
        <Text>Dark Mode</Text>
        <Switch
          value={isDarkModeEnabled}
          onValueChange={toggleDarkMode}
        />
      </View>
      
      <View style={styles.settingItem}>
        <Text>Language</Text>
        <Button
          title={language}
          onPress={() => changeLanguage(language === 'English' ? 'Spanish' : 'English')}
        />
      </View>

      <View style={styles.settingItem}>
        <Button title="Reset App Data" onPress={resetAppData} color="red" />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
});

export default SettingsScreen;
