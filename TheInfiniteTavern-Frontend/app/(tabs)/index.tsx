import { View, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useGame } from '@/contexts/GameContext';

export default function TavernScreen() {
  const { state, dispatch } = useGame();
  
  const handleWatchEpisode = (episodeId: string) => {
    dispatch({ type: 'WATCH_EPISODE', payload: { episodeId } });
    dispatch({ type: 'UPDATE_AVATAR_XP', payload: { xp: 50, source: 'episode_watch' } });
    Alert.alert('Episode Watched!', 'You gained 50 XP for watching the episode!');
  };
  
  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.title}>The Infinite Tavern</ThemedText>
        <ThemedText style={styles.subtitle}>Where legends are born and stories unfold</ThemedText>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>Latest Episode</ThemedText>
        <ThemedView style={styles.episodeCard}>
          <ThemedText type="defaultSemiBold">Episode #247: The Dragon's Gambit</ThemedText>
          <ThemedText style={styles.episodeDescription}>
            The party stands before the ancient dragon, but their words carry more weight than their swords...
          </ThemedText>
          <TouchableOpacity 
            style={styles.watchButton}
            onPress={() => handleWatchEpisode(state.episodes[0]?.id || 'ep_247')}
          >
            <ThemedText style={styles.watchButtonText}>Watch Now</ThemedText>
            <IconSymbol name="play.fill" size={16} color="#fff" />
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>Current Vote</ThemedText>
        <ThemedView style={styles.voteCard}>
          <ThemedText type="defaultSemiBold">Should the party trust the mysterious merchant?</ThemedText>
          <ThemedText style={styles.voteTimer}>Vote closes in: 2h 34m</ThemedText>
          <View style={styles.voteOptions}>
            <TouchableOpacity style={styles.voteOption}>
              <ThemedText>Yes, trust completely</ThemedText>
              <ThemedText style={styles.votePercent}>34%</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.voteOption}>
              <ThemedText>Yes, but stay cautious</ThemedText>
              <ThemedText style={styles.votePercent}>52%</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.voteOption}>
              <ThemedText>No, it's a trap</ThemedText>
              <ThemedText style={styles.votePercent}>14%</ThemedText>
            </TouchableOpacity>
          </View>
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>Tavern News</ThemedText>
        <ThemedView style={styles.newsCard}>
          <ThemedText style={styles.newsItem}>🟢 DragonLord666 just became a Merchant Prince!</ThemedText>
          <ThemedText style={styles.newsItem}>⚔️ Guild "Shadow Hunters" won last night's war</ThemedText>
          <ThemedText style={styles.newsItem}>🎉 234 heroes leveled up today</ThemedText>
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>Quick Stats</ThemedText>
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <ThemedText type="defaultSemiBold">{state.tavernStats.activeHeroes.toLocaleString()}</ThemedText>
            <ThemedText style={styles.statLabel}>Active Heroes</ThemedText>
          </View>
          <View style={styles.statCard}>
            <ThemedText type="defaultSemiBold">{state.tavernStats.votesCast.toLocaleString()}</ThemedText>
            <ThemedText style={styles.statLabel}>Votes Cast</ThemedText>
          </View>
          <View style={styles.statCard}>
            <ThemedText type="defaultSemiBold">{state.tavernStats.newEpisodes}</ThemedText>
            <ThemedText style={styles.statLabel}>New Episodes</ThemedText>
          </View>
          <View style={styles.statCard}>
            <ThemedText type="defaultSemiBold">${state.tavernStats.donatedToday.toLocaleString()}</ThemedText>
            <ThemedText style={styles.statLabel}>Donated Today</ThemedText>
          </View>
        </View>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  title: {
    color: '#d4af37',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    color: '#888',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 5,
  },
  section: {
    margin: 15,
  },
  sectionTitle: {
    color: '#d4af37',
    fontSize: 20,
    marginBottom: 10,
  },
  episodeCard: {
    backgroundColor: '#2a2a2a',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#444',
  },
  episodeDescription: {
    color: '#aaa',
    marginVertical: 10,
  },
  watchButton: {
    backgroundColor: '#d4af37',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  watchButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  voteCard: {
    backgroundColor: '#2a2a2a',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#444',
  },
  voteTimer: {
    color: '#ff6b6b',
    fontSize: 14,
    marginTop: 5,
  },
  voteOptions: {
    marginTop: 15,
    gap: 10,
  },
  voteOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#333',
    padding: 12,
    borderRadius: 8,
  },
  votePercent: {
    color: '#d4af37',
    fontWeight: 'bold',
  },
  newsCard: {
    backgroundColor: '#2a2a2a',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#444',
    gap: 8,
  },
  newsItem: {
    color: '#aaa',
    fontSize: 14,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: '#2a2a2a',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#444',
    alignItems: 'center',
    width: '48%',
  },
  statLabel: {
    color: '#888',
    fontSize: 12,
    marginTop: 5,
  },
});
