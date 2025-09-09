import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useGame } from '@/contexts/GameContext';

export default function AdminDashboardScreen() {
  const { state } = useGame();

  return (
    <View style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.title}>Mission Control</ThemedText>
        <ThemedText style={styles.subtitle}>Franchise Intelligence Center</ThemedText>
      </ThemedView>

      <ScrollView style={styles.content}>
        {/* Franchise Health Score */}
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Franchise Health</ThemedText>
          <ThemedView style={styles.healthCard}>
            <View style={styles.healthScore}>
              <View style={styles.scoreCircle}>
                <ThemedText style={styles.scoreNumber}>87</ThemedText>
                <ThemedText style={styles.scoreLabel}>/ 100</ThemedText>
              </View>
              <View style={styles.scoreDetails}>
                <View style={styles.scoreItem}>
                  <IconSymbol name="arrow.up" size={12} color="#4ecdc4" />
                  <ThemedText style={styles.scoreText}>Virality trending up</ThemedText>
                </View>
                <View style={styles.scoreItem}>
                  <IconSymbol name="arrow.right" size={12} color="#f39c12" />
                  <ThemedText style={styles.scoreText}>Viewer retention stable</ThemedText>
                </View>
                <View style={styles.scoreItem}>
                  <IconSymbol name="arrow.up" size={12} color="#4ecdc4" />
                  <ThemedText style={styles.scoreText}>Donation velocity increasing</ThemedText>
                </View>
                <View style={styles.scoreItem}>
                  <IconSymbol name="checkmark" size={12} color="#4ecdc4" />
                  <ThemedText style={styles.scoreText}>Narrative coherence strong</ThemedText>
                </View>
              </View>
            </View>
          </ThemedView>
        </ThemedView>

        {/* Live Stats */}
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Live Statistics</ThemedText>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <IconSymbol name="person.3.fill" size={24} color="#4ecdc4" />
              <ThemedText type="defaultSemiBold" style={styles.statValue}>
                {state.tavernStats.activeHeroes.toLocaleString()}
              </ThemedText>
              <ThemedText style={styles.statLabel}>Current Viewers</ThemedText>
            </View>
            <View style={styles.statCard}>
              <IconSymbol name="hand.raised.fill" size={24} color="#d4af37" />
              <ThemedText type="defaultSemiBold" style={styles.statValue}>
                {state.tavernStats.votesCast.toLocaleString()}
              </ThemedText>
              <ThemedText style={styles.statLabel}>Votes This Hour</ThemedText>
            </View>
            <View style={styles.statCard}>
              <IconSymbol name="dollarsign.circle.fill" size={24} color="#16a085" />
              <ThemedText type="defaultSemiBold" style={styles.statValue}>
                ${state.tavernStats.donatedToday.toLocaleString()}
              </ThemedText>
              <ThemedText style={styles.statLabel}>Donations Today</ThemedText>
            </View>
            <View style={styles.statCard}>
              <IconSymbol name="tv.fill" size={24} color="#9b59b6" />
              <ThemedText type="defaultSemiBold" style={styles.statValue}>
                {state.tavernStats.newEpisodes}
              </ThemedText>
              <ThemedText style={styles.statLabel}>Content Generated</ThemedText>
            </View>
          </View>
        </ThemedView>

        {/* Avatar Economy View */}
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Avatar Economy</ThemedText>
          <ThemedView style={styles.economyCard}>
            <ThemedText style={styles.economyTitle}>Player Level Distribution</ThemedText>
            <View style={styles.levelDistribution}>
              <View style={styles.levelBar}>
                <ThemedText style={styles.levelLabel}>Levels 1-10</ThemedText>
                <View style={styles.levelBarContainer}>
                  <View style={[styles.levelBarFill, { width: '60%', backgroundColor: '#4ecdc4' }]} />
                </View>
                <ThemedText style={styles.levelPercent}>45,000 (60%)</ThemedText>
              </View>
              <View style={styles.levelBar}>
                <ThemedText style={styles.levelLabel}>Levels 11-25</ThemedText>
                <View style={styles.levelBarContainer}>
                  <View style={[styles.levelBarFill, { width: '27%', backgroundColor: '#f39c12' }]} />
                </View>
                <ThemedText style={styles.levelPercent}>20,000 (27%)</ThemedText>
              </View>
              <View style={styles.levelBar}>
                <ThemedText style={styles.levelLabel}>Levels 26-50</ThemedText>
                <View style={styles.levelBarContainer}>
                  <View style={[styles.levelBarFill, { width: '10%', backgroundColor: '#e74c3c' }]} />
                </View>
                <ThemedText style={styles.levelPercent}>7,500 (10%)</ThemedText>
              </View>
              <View style={styles.levelBar}>
                <ThemedText style={styles.levelLabel}>Levels 51+</ThemedText>
                <View style={styles.levelBarContainer}>
                  <View style={[styles.levelBarFill, { width: '3%', backgroundColor: '#d4af37' }]} />
                </View>
                <ThemedText style={styles.levelPercent}>2,300 (3%)</ThemedText>
              </View>
            </View>
          </ThemedView>
        </ThemedView>

        {/* Donation Intelligence */}
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Donation Intelligence</ThemedText>
          <ThemedView style={styles.donationCard}>
            <View style={styles.donationHeader}>
              <ThemedText style={styles.donationTitle}>Today's Performance</ThemedText>
              <View style={styles.donationStats}>
                <ThemedText style={styles.donationTotal}>$2,847</ThemedText>
                <ThemedText style={styles.donationCount}>47 transactions</ThemedText>
              </View>
            </View>
            
            <ThemedText style={styles.trendingText}>
              🔥 Trending: Companion Keeper tier ($25) - 89% of purchases
            </ThemedText>
            
            <View style={styles.donationRecommendations}>
              <ThemedText style={styles.recommendationTitle}>AI Recommendations:</ThemedText>
              <View style={styles.recommendation}>
                <IconSymbol name="lightbulb.fill" size={16} color="#d4af37" />
                <ThemedText style={styles.recommendationText}>
                  Companion Keeper tier overperforming - suggest price increase to $35
                </ThemedText>
              </View>
              <View style={styles.recommendation}>
                <IconSymbol name="star.fill" size={16} color="#d4af37" />
                <ThemedText style={styles.recommendationText}>
                  Flash opportunity: Episode 250 coming - push Quest Giver tier
                </ThemedText>
              </View>
            </View>
          </ThemedView>
        </ThemedView>

        {/* Content Pipeline */}
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Content Pipeline</ThemedText>
          <ThemedView style={styles.pipelineCard}>
            <View style={styles.pipelineStatus}>
              <View style={styles.pipelineItem}>
                <View style={[styles.pipelineIcon, { backgroundColor: '#f39c12' }]}>
                  <IconSymbol name="clock.fill" size={16} color="#fff" />
                </View>
                <View>
                  <ThemedText style={styles.pipelineTitle}>In Voting</ThemedText>
                  <ThemedText style={styles.pipelineDesc}>Episode #248 decision closes in 1h 23m</ThemedText>
                </View>
              </View>
              
              <View style={styles.pipelineItem}>
                <View style={[styles.pipelineIcon, { backgroundColor: '#9b59b6' }]}>
                  <IconSymbol name="gears" size={16} color="#fff" />
                </View>
                <View>
                  <ThemedText style={styles.pipelineTitle}>In Generation</ThemedText>
                  <ThemedText style={styles.pipelineDesc}>Script done, rendering audio</ThemedText>
                </View>
              </View>
              
              <View style={styles.pipelineItem}>
                <View style={[styles.pipelineIcon, { backgroundColor: '#4ecdc4' }]}>
                  <IconSymbol name="checkmark.circle.fill" size={16} color="#fff" />
                </View>
                <View>
                  <ThemedText style={styles.pipelineTitle}>Published Today</ThemedText>
                  <ThemedText style={styles.pipelineDesc}>Episode #247: 45K views, 89% retention</ThemedText>
                </View>
              </View>
            </View>
          </ThemedView>
        </ThemedView>

        {/* Controls */}
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Quick Controls</ThemedText>
          <View style={styles.controlsGrid}>
            <TouchableOpacity style={styles.controlButton}>
              <IconSymbol name="play.fill" size={20} color="#4ecdc4" />
              <ThemedText style={styles.controlText}>Trigger Episode</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.controlButton}>
              <IconSymbol name="bolt.fill" size={20} color="#f39c12" />
              <ThemedText style={styles.controlText}>Flash Sale</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.controlButton}>
              <IconSymbol name="gear" size={20} color="#666" />
              <ThemedText style={styles.controlText}>Settings</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.controlButton}>
              <IconSymbol name="chart.bar.fill" size={20} color="#9b59b6" />
              <ThemedText style={styles.controlText}>Analytics</ThemedText>
            </TouchableOpacity>
          </View>
        </ThemedView>
      </ScrollView>
    </View>
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
  content: {
    flex: 1,
  },
  section: {
    margin: 15,
  },
  sectionTitle: {
    color: '#d4af37',
    fontSize: 20,
    marginBottom: 10,
  },
  healthCard: {
    backgroundColor: '#2a2a2a',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#444',
  },
  healthScore: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  scoreCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#333',
    borderWidth: 3,
    borderColor: '#4ecdc4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreNumber: {
    color: '#4ecdc4',
    fontSize: 24,
    fontWeight: 'bold',
  },
  scoreLabel: {
    color: '#888',
    fontSize: 12,
  },
  scoreDetails: {
    flex: 1,
    gap: 8,
  },
  scoreItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  scoreText: {
    color: '#aaa',
    fontSize: 12,
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
    fontSize: 16,
  },
  statLabel: {
    color: '#888',
    fontSize: 11,
    textAlign: 'center',
  },
  economyCard: {
    backgroundColor: '#2a2a2a',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#444',
  },
  economyTitle: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 15,
  },
  levelDistribution: {
    gap: 12,
  },
  levelBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  levelLabel: {
    color: '#aaa',
    fontSize: 12,
    width: 80,
  },
  levelBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: '#333',
    borderRadius: 4,
  },
  levelBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  levelPercent: {
    color: '#888',
    fontSize: 11,
    width: 80,
    textAlign: 'right',
  },
  donationCard: {
    backgroundColor: '#2a2a2a',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#444',
  },
  donationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  donationTitle: {
    color: '#fff',
    fontSize: 16,
  },
  donationStats: {
    alignItems: 'flex-end',
  },
  donationTotal: {
    color: '#4ecdc4',
    fontSize: 20,
    fontWeight: 'bold',
  },
  donationCount: {
    color: '#888',
    fontSize: 12,
  },
  trendingText: {
    color: '#f39c12',
    fontSize: 14,
    marginBottom: 15,
  },
  donationRecommendations: {
    gap: 8,
  },
  recommendationTitle: {
    color: '#d4af37',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  recommendation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  recommendationText: {
    color: '#aaa',
    fontSize: 12,
    flex: 1,
  },
  pipelineCard: {
    backgroundColor: '#2a2a2a',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#444',
  },
  pipelineStatus: {
    gap: 15,
  },
  pipelineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  pipelineIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pipelineTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  pipelineDesc: {
    color: '#888',
    fontSize: 12,
  },
  controlsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'space-between',
  },
  controlButton: {
    backgroundColor: '#2a2a2a',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#444',
    alignItems: 'center',
    width: '48%',
    gap: 8,
  },
  controlText: {
    color: '#aaa',
    fontSize: 12,
  },
});