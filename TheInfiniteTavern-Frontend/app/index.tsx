import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useGame } from '@/contexts/GameContext';

export default function AppEntry() {
  const { state } = useGame();
  const router = useRouter();

  useEffect(() => {
    // Check if user has completed onboarding and has an avatar
    if (state.user.hasCompletedOnboarding && state.user.avatar) {
      // User has an avatar, go to main app
      router.replace('/(tabs)');
    } else {
      // User needs to create avatar
      router.replace('/character-creation');
    }
  }, [state.user.hasCompletedOnboarding, state.user.avatar, router]);

  // Loading screen while determining route
  return (
    <View style={styles.container}>
      <ThemedText style={styles.loadingText}>Loading The Infinite Tavern...</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: '#d4af37',
    fontSize: 18,
    fontWeight: 'bold',
  },
});