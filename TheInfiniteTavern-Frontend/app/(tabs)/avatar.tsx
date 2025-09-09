import { View, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useGame, getClassPerks, getRacialBonus } from '@/contexts/GameContext';

export default function AvatarScreen() {
  const { state, dispatch } = useGame();
  const router = useRouter();
  
  // If no avatar exists, redirect to character creation
  if (!state.user.avatar) {
    return (
      <View style={styles.container}>
        <ThemedView style={styles.header}>
          <ThemedText type="title" style={styles.title}>Create Your Hero</ThemedText>
          <ThemedText style={styles.subtitle}>Begin your legend in the realm</ThemedText>
        </ThemedView>
        
        <View style={styles.createHeroContainer}>
          <IconSymbol name="person.badge.plus" size={80} color="#d4af37" />
          <ThemedText style={styles.createHeroText}>
            You haven't created your hero yet! Start your journey by forging your character.
          </ThemedText>
          <TouchableOpacity 
            style={styles.createHeroButton}
            onPress={() => router.push('/character-creation')}
          >
            <IconSymbol name="sparkles" size={20} color="#000" />
            <ThemedText style={styles.createHeroButtonText}>Forge Your Hero</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const avatar = state.user.avatar;
  const classPerks = getClassPerks(avatar.class);
  const racialBonus = getRacialBonus(avatar.race);
  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.title}>Your Hero</ThemedText>
        <ThemedText style={styles.subtitle}>Forge your legend in the realm</ThemedText>
      </ThemedView>

      {/* Avatar Display */}
      <ThemedView style={styles.section}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatarFrame}>
            <IconSymbol name="person.fill" size={120} color="#d4af37" />
            <View style={styles.classIcon}>
              <IconSymbol name="arrow.up.circle.fill" size={30} color="#4ecdc4" />
            </View>
          </View>
          <ThemedText type="defaultSemiBold" style={styles.heroName}>{avatar.name}</ThemedText>
          <ThemedText style={styles.heroClass}>Level {avatar.level} {avatar.class}</ThemedText>
          <ThemedText style={styles.heroTitle}>"{avatar.race} {avatar.appearance}"</ThemedText>
        </View>
      </ThemedView>

      {/* Level Progress */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>Progression</ThemedText>
        <ThemedView style={styles.progressCard}>
          <View style={styles.levelHeader}>
            <ThemedText type="defaultSemiBold">Level {avatar.level} → Level {avatar.level + 1}</ThemedText>
            <ThemedText style={styles.xpText}>{avatar.currentXP}/{avatar.nextLevelXP} XP</ThemedText>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${(avatar.currentXP / avatar.nextLevelXP) * 100}%` }]} />
          </View>
          <ThemedText style={styles.progressText}>{avatar.nextLevelXP - avatar.currentXP} XP until next level</ThemedText>
        </ThemedView>
      </ThemedView>

      {/* Stats */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>Hero Statistics</ThemedText>
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <IconSymbol name="tv.fill" size={24} color="#d4af37" />
            <ThemedText type="defaultSemiBold" style={styles.statValue}>{avatar.stats.episodesWatched}</ThemedText>
            <ThemedText style={styles.statLabel}>Episodes Watched</ThemedText>
          </View>
          <View style={styles.statCard}>
            <IconSymbol name="hand.raised.fill" size={24} color="#d4af37" />
            <ThemedText type="defaultSemiBold" style={styles.statValue}>{avatar.stats.votesCast}</ThemedText>
            <ThemedText style={styles.statLabel}>Votes Cast</ThemedText>
          </View>
          <View style={styles.statCard}>
            <IconSymbol name="checkmark.circle.fill" size={24} color="#4ecdc4" />
            <ThemedText type="defaultSemiBold" style={styles.statValue}>{avatar.stats.correctPredictions}</ThemedText>
            <ThemedText style={styles.statLabel}>Correct Predictions</ThemedText>
          </View>
          <View style={styles.statCard}>
            <IconSymbol name="person.3.fill" size={24} color="#d4af37" />
            <ThemedText type="defaultSemiBold" style={styles.statValue}>{avatar.stats.friendsRecruited}</ThemedText>
            <ThemedText style={styles.statLabel}>Friends Recruited</ThemedText>
          </View>
        </View>
      </ThemedView>

      {/* Class Perks */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>{avatar.class} Perks</ThemedText>
        <ThemedView style={styles.perksCard}>
          <View style={styles.perk}>
            <IconSymbol name="eye.fill" size={20} color={classPerks.color} />
            <ThemedText style={styles.perkText}>{classPerks.perk}</ThemedText>
          </View>
          <View style={styles.perk}>
            <IconSymbol name="leaf.fill" size={20} color="#4ecdc4" />
            <ThemedText style={styles.perkText}>{racialBonus}</ThemedText>
          </View>
          <View style={styles.perk}>
            <IconSymbol name="plus.circle.fill" size={20} color="#d4af37" />
            <ThemedText style={styles.perkText}>Vote Strength: +{avatar.voteStrength}</ThemedText>
          </View>
        </ThemedView>
      </ThemedView>

      {/* Achievements */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>Recent Achievements</ThemedText>
        <ThemedView style={styles.achievementsCard}>
          <View style={styles.achievement}>
            <IconSymbol name="trophy.fill" size={24} color="#d4af37" />
            <View>
              <ThemedText type="defaultSemiBold" style={styles.achievementTitle}>Kingmaker</ThemedText>
              <ThemedText style={styles.achievementDesc}>Your vote decided a major plot point</ThemedText>
            </View>
          </View>
          <View style={styles.achievement}>
            <IconSymbol name="crystal.ball.fill" size={24} color="#9b59b6" />
            <View>
              <ThemedText type="defaultSemiBold" style={styles.achievementTitle}>Prophet</ThemedText>
              <ThemedText style={styles.achievementDesc}>Predicted 10 outcomes correctly</ThemedText>
            </View>
          </View>
          <View style={styles.achievement}>
            <IconSymbol name="crown.fill" size={24} color="#d4af37" />
            <View>
              <ThemedText type="defaultSemiBold" style={styles.achievementTitle}>Guild Leader</ThemedText>
              <ThemedText style={styles.achievementDesc}>Recruited 10 friends to the realm</ThemedText>
            </View>
          </View>
        </ThemedView>
      </ThemedView>

      {/* Customize Button */}
      <ThemedView style={styles.section}>
        <TouchableOpacity style={styles.customizeButton}>
          <IconSymbol name="paintbrush.fill" size={20} color="#fff" />
          <ThemedText style={styles.customizeButtonText}>Customize Avatar</ThemedText>
        </TouchableOpacity>
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
  },
  subtitle: {
    color: '#888',
    fontSize: 16,
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
  avatarContainer: {
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    padding: 20,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#d4af37',
  },
  avatarFrame: {
    position: 'relative',
    marginBottom: 15,
  },
  classIcon: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    backgroundColor: '#1a1a1a',
    borderRadius: 15,
    padding: 2,
  },
  heroName: {
    color: '#d4af37',
    fontSize: 24,
    marginBottom: 5,
  },
  heroClass: {
    color: '#4ecdc4',
    fontSize: 18,
    marginBottom: 5,
  },
  heroTitle: {
    color: '#888',
    fontSize: 14,
    fontStyle: 'italic',
  },
  progressCard: {
    backgroundColor: '#2a2a2a',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#444',
  },
  levelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  xpText: {
    color: '#4ecdc4',
    fontSize: 14,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#444',
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4ecdc4',
    borderRadius: 4,
  },
  progressText: {
    color: '#888',
    fontSize: 12,
    textAlign: 'center',
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
    gap: 8,
  },
  statValue: {
    color: '#fff',
    fontSize: 18,
  },
  statLabel: {
    color: '#888',
    fontSize: 12,
    textAlign: 'center',
  },
  perksCard: {
    backgroundColor: '#2a2a2a',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#444',
    gap: 12,
  },
  perk: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  perkText: {
    color: '#aaa',
    flex: 1,
  },
  achievementsCard: {
    backgroundColor: '#2a2a2a',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#444',
    gap: 15,
  },
  achievement: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  achievementTitle: {
    color: '#d4af37',
    fontSize: 16,
  },
  achievementDesc: {
    color: '#888',
    fontSize: 12,
  },
  customizeButton: {
    backgroundColor: '#d4af37',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    gap: 8,
  },
  customizeButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  createHeroContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    gap: 20,
  },
  createHeroText: {
    color: '#aaa',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
  },
  createHeroButton: {
    backgroundColor: '#d4af37',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 12,
    gap: 8,
  },
  createHeroButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});