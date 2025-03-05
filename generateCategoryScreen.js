// generateScreens.js

const fs = require('fs');
const path = require('path');

// Load screen names from JSON
const screensFilePath = path.join(__dirname, 'screens.json');
const screens = require(screensFilePath);

// Get custom folder from command line or default to 'screens'
const customFolder = process.argv[2] || 'ProductAddScreens';
const screensDir = path.join(__dirname, customFolder);

// Ensure the directory exists
if (!fs.existsSync(screensDir)) {
  fs.mkdirSync(screensDir, { recursive: true });
}

// Template for a basic screen component
const getScreenTemplate = (screenName) => `
import { View, Text, StyleSheet } from 'react-native';

const ${screenName} = () => {
  return (
    <View style={styles.container}>
      <Text>${screenName} Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ${screenName};
`;

// Create screen files
screens.forEach((screenName) => {
  const screenFilePath = path.join(screensDir, `${screenName}.tsx`);
  
  if (!fs.existsSync(screenFilePath)) {
    fs.writeFileSync(screenFilePath, getScreenTemplate(screenName));
    console.log(`Created ${screenName}.tsx in ${customFolder}`);
  } else {
    console.log(`${screenName}.tsx already exists in ${customFolder}`);
  }
});

console.log('Screen generation complete!');

// To run this script with a custom folder: `node generateScreens.js myFolder`
// Or use the default 'screens' folder: `node generateScreens.js`
// Make sure you have a screens.json file like: ["Home", "Profile", "Settings"]
