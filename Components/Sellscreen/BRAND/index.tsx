import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';

const Brand = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  // Snap points for the bottom sheet
  const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);

  // Handle opening the sheet
  const handleOpenPress = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  // Handle closing the sheet
  const handleClosePress = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  return (
    <View style={styles.container}>
      <Button title="Open Bottom Sheet" onPress={handleOpenPress} />
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
      >
        <View style={styles.contentContainer}>
          <Text style={styles.text}>This is the bottom sheet content!</Text>
          <Button title="Close" onPress={handleClosePress} />
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default Brand;

// After adding this component, you can use it in your app like this:
// import BottomSheetComponent from './path/to/BottomSheetComponent';
// function App() {
//   return <BottomSheetComponent />;
// }
