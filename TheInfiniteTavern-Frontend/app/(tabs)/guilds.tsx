import { View, ScrollView, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function GuildsScreen() {
  const [activeTab, setActiveTab] = useState<'myGuild' | 'tavern' | 'wars'>('myGuild');

  const guildMembers = [
    { id: 1, name: 'Shadowbane', level: 23, class: 'Ranger', online: true, rank: 'Leader' },
    { id: 2, name: 'Firebrand', level: 28, class: 'Sorcerer', online: true, rank: 'Officer' },
    { id: 3, name: 'Ironwall', level: 19, class: 'Paladin', online: false, rank: 'Member' },
    { id: 4, name: 'Whisperwind', level: 31, class: 'Rogue', online: true, rank: 'Officer' },
    { id: 5, name: 'Stormcaller', level: 15, class: 'Druid', online: false, rank: 'Member' },
  ];

  const onlineHeroes = [
    { id: 1, name: 'DragonSlayer99', level: 45, class: 'Barbarian' },
    { id: 2, name: 'MysticMoon', level: 32, class: 'Warlock' },
    { id: 3, name: 'BardOfSongs', level: 28, class: 'Bard' },
    { id: 4, name: 'ElfLord', level: 41, class: 'Ranger' },
    { id: 5, name: 'DarkKnight', level: 38, class: 'Paladin' },
  ];

  const renderMember = ({ item }: { item: any }) => (
    <View style={styles.memberCard}>
      <View style={styles.memberInfo}>
        <View style={styles.memberAvatar}>
          <IconSymbol 
            name={item.online ? "person.fill" : "person"} 
            size={24} 
            color={item.online ? "#4ecdc4" : "#666"} 
          />
          {item.online && <View style={styles.onlineIndicator} />}
        </View>
        <View style={styles.memberDetails}>
          <ThemedText type="defaultSemiBold" style={styles.memberName}>{item.name}</ThemedText>
          <ThemedText style={styles.memberClass}>Level {item.level} {item.class}</ThemedText>
        </View>
      </View>
      <ThemedText style={[styles.memberRank, item.rank === 'Leader' && styles.leaderRank]}>
        {item.rank}
      </ThemedText>
    </View>
  );

  const renderOnlineHero = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.heroCard}>
      <View style={styles.heroAvatar}>
        <IconSymbol name="person.fill" size={20} color="#d4af37" />
      </View>
      <View style={styles.heroInfo}>
        <ThemedText style={styles.heroName}>{item.name}</ThemedText>
        <ThemedText style={styles.heroLevel}>Lv.{item.level} {item.class}</ThemedText>
      </View>
      <TouchableOpacity style={styles.inviteButton}>
        <IconSymbol name="plus.circle.fill" size={16} color="#4ecdc4" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.title}>Guild Hall</ThemedText>
        <ThemedText style={styles.subtitle}>Unite with fellow heroes</ThemedText>
      </ThemedView>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'myGuild' && styles.activeTab]}
          onPress={() => setActiveTab('myGuild')}
        >
          <ThemedText style={[styles.tabText, activeTab === 'myGuild' && styles.activeTabText]}>
            My Guild
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'tavern' && styles.activeTab]}
          onPress={() => setActiveTab('tavern')}
        >
          <ThemedText style={[styles.tabText, activeTab === 'tavern' && styles.activeTabText]}>
            Tavern Hub
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'wars' && styles.activeTab]}
          onPress={() => setActiveTab('wars')}
        >
          <ThemedText style={[styles.tabText, activeTab === 'wars' && styles.activeTabText]}>
            Guild Wars
          </ThemedText>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {activeTab === 'myGuild' && (
          <>
            {/* Guild Info */}
            <ThemedView style={styles.section}>
              <ThemedView style={styles.guildInfoCard}>
                <View style={styles.guildHeader}>
                  <View style={styles.guildBanner}>
                    <IconSymbol name="shield.fill" size={40} color="#d4af37" />
                  </View>
                  <View style={styles.guildDetails}>
                    <ThemedText type="defaultSemiBold" style={styles.guildName}>Shadow Hunters</ThemedText>
                    <ThemedText style={styles.guildMotto}>"Hunt in the darkness, strike with light"</ThemedText>
                    <ThemedText style={styles.guildStats}>Founded 3 months ago • Rank #7</ThemedText>
                  </View>
                </View>
                <View style={styles.guildStatsRow}>
                  <View style={styles.statItem}>
                    <ThemedText type="defaultSemiBold" style={styles.statValue}>24</ThemedText>
                    <ThemedText style={styles.statLabel}>Members</ThemedText>
                  </View>
                  <View style={styles.statItem}>
                    <ThemedText type="defaultSemiBold" style={styles.statValue}>15,847</ThemedText>
                    <ThemedText style={styles.statLabel}>Total XP</ThemedText>
                  </View>
                  <View style={styles.statItem}>
                    <ThemedText type="defaultSemiBold" style={styles.statValue}>89%</ThemedText>
                    <ThemedText style={styles.statLabel}>Win Rate</ThemedText>
                  </View>
                </View>
              </ThemedView>
            </ThemedView>

            {/* Guild Members */}
            <ThemedView style={styles.section}>
              <View style={styles.sectionHeader}>
                <ThemedText type="subtitle" style={styles.sectionTitle}>Members (5/50)</ThemedText>
                <TouchableOpacity style={styles.inviteMemberButton}>
                  <IconSymbol name="person.badge.plus" size={16} color="#4ecdc4" />
                  <ThemedText style={styles.inviteText}>Invite</ThemedText>
                </TouchableOpacity>
              </View>
              <FlatList
                data={guildMembers}
                renderItem={renderMember}
                keyExtractor={(item) => item.id.toString()}
                scrollEnabled={false}
              />
            </ThemedView>

            {/* Guild Activities */}
            <ThemedView style={styles.section}>
              <ThemedText type="subtitle" style={styles.sectionTitle}>Recent Activity</ThemedText>
              <ThemedView style={styles.activityCard}>
                <View style={styles.activityItem}>
                  <IconSymbol name="trophy.fill" size={16} color="#d4af37" />
                  <ThemedText style={styles.activityText}>Guild won Episode #246 prediction war!</ThemedText>
                  <ThemedText style={styles.activityTime}>2h ago</ThemedText>
                </View>
                <View style={styles.activityItem}>
                  <IconSymbol name="person.badge.plus.fill" size={16} color="#4ecdc4" />
                  <ThemedText style={styles.activityText}>Stormcaller joined the guild</ThemedText>
                  <ThemedText style={styles.activityTime}>1d ago</ThemedText>
                </View>
                <View style={styles.activityItem}>
                  <IconSymbol name="arrow.up.circle.fill" size={16} color="#4ecdc4" />
                  <ThemedText style={styles.activityText}>Whisperwind promoted to Officer</ThemedText>
                  <ThemedText style={styles.activityTime}>3d ago</ThemedText>
                </View>
              </ThemedView>
            </ThemedView>
          </>
        )}

        {activeTab === 'tavern' && (
          <>
            {/* Tavern Stats */}
            <ThemedView style={styles.section}>
              <ThemedText type="subtitle" style={styles.sectionTitle}>Tavern Status</ThemedText>
              <View style={styles.tavernStats}>
                <View style={styles.tavernStatCard}>
                  <IconSymbol name="person.3.fill" size={24} color="#4ecdc4" />
                  <ThemedText type="defaultSemiBold" style={styles.tavernStatValue}>3,892</ThemedText>
                  <ThemedText style={styles.tavernStatLabel}>Heroes Online</ThemedText>
                </View>
                <View style={styles.tavernStatCard}>
                  <IconSymbol name="bubble.left.and.bubble.right.fill" size={24} color="#d4af37" />
                  <ThemedText type="defaultSemiBold" style={styles.tavernStatValue}>1,247</ThemedText>
                  <ThemedText style={styles.tavernStatLabel}>Active Conversations</ThemedText>
                </View>
              </View>
            </ThemedView>

            {/* Online Heroes */}
            <ThemedView style={styles.section}>
              <ThemedText type="subtitle" style={styles.sectionTitle}>Heroes in the Tavern</ThemedText>
              <FlatList
                data={onlineHeroes}
                renderItem={renderOnlineHero}
                keyExtractor={(item) => item.id.toString()}
                scrollEnabled={false}
              />
            </ThemedView>
          </>
        )}

        {activeTab === 'wars' && (
          <>
            {/* Current War */}
            <ThemedView style={styles.section}>
              <ThemedText type="subtitle" style={styles.sectionTitle}>Active Guild War</ThemedText>
              <ThemedView style={styles.warCard}>
                <View style={styles.warHeader}>
                  <ThemedText type="defaultSemiBold" style={styles.warTitle}>Episode #248 Prediction War</ThemedText>
                  <ThemedText style={styles.warTimer}>Ends in 4h 17m</ThemedText>
                </View>
                <ThemedText style={styles.warQuestion}>
                  Will the party find the ancient artifact in the temple ruins?
                </ThemedText>
                <View style={styles.warResults}>
                  <View style={styles.warOption}>
                    <ThemedText style={styles.warOptionText}>Shadow Hunters: YES</ThemedText>
                    <ThemedText style={styles.warVotes}>147 votes</ThemedText>
                  </View>
                  <View style={styles.warVsIndicator}>
                    <ThemedText style={styles.vsText}>VS</ThemedText>
                  </View>
                  <View style={styles.warOption}>
                    <ThemedText style={styles.warOptionText}>Iron Legion: NO</ThemedText>
                    <ThemedText style={styles.warVotes}>132 votes</ThemedText>
                  </View>
                </View>
                <View style={styles.warRewards}>
                  <IconSymbol name="trophy.fill" size={16} color="#d4af37" />
                  <ThemedText style={styles.rewardText}>Winner gets +100 XP for all members</ThemedText>
                </View>
              </ThemedView>
            </ThemedView>

            {/* War History */}
            <ThemedView style={styles.section}>
              <ThemedText type="subtitle" style={styles.sectionTitle}>Recent Wars</ThemedText>
              <ThemedView style={styles.historyCard}>
                <View style={styles.historyItem}>
                  <IconSymbol name="checkmark.circle.fill" size={16} color="#4ecdc4" />
                  <View style={styles.historyContent}>
                    <ThemedText style={styles.historyTitle}>Episode #246 vs Iron Legion</ThemedText>
                    <ThemedText style={styles.historyResult}>Victory! +100 XP earned</ThemedText>
                  </View>
                </View>
                <View style={styles.historyItem}>
                  <IconSymbol name="xmark.circle.fill" size={16} color="#ff6b6b" />
                  <View style={styles.historyContent}>
                    <ThemedText style={styles.historyTitle}>Episode #245 vs Mystic Order</ThemedText>
                    <ThemedText style={styles.historyResult}>Defeat - Better luck next time!</ThemedText>
                  </View>
                </View>
                <View style={styles.historyItem}>
                  <IconSymbol name="checkmark.circle.fill" size={16} color="#4ecdc4" />
                  <View style={styles.historyContent}>
                    <ThemedText style={styles.historyTitle}>Episode #244 vs Dragon Riders</ThemedText>
                    <ThemedText style={styles.historyResult}>Victory! +100 XP earned</ThemedText>
                  </View>
                </View>
              </ThemedView>
            </ThemedView>
          </>
        )}
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
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#2a2a2a',
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#d4af37',
  },
  tabText: {
    color: '#888',
    fontSize: 14,
  },
  activeTabText: {
    color: '#d4af37',
    fontWeight: 'bold',
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  guildInfoCard: {
    backgroundColor: '#2a2a2a',
    padding: 20,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#d4af37',
  },
  guildHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    gap: 15,
  },
  guildBanner: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 10,
  },
  guildDetails: {
    flex: 1,
  },
  guildName: {
    color: '#d4af37',
    fontSize: 20,
  },
  guildMotto: {
    color: '#aaa',
    fontSize: 14,
    fontStyle: 'italic',
    marginTop: 2,
  },
  guildStats: {
    color: '#666',
    fontSize: 12,
    marginTop: 5,
  },
  guildStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    color: '#fff',
    fontSize: 16,
  },
  statLabel: {
    color: '#888',
    fontSize: 12,
    marginTop: 2,
  },
  inviteMemberButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#333',
    borderRadius: 15,
  },
  inviteText: {
    color: '#4ecdc4',
    fontSize: 12,
  },
  memberCard: {
    backgroundColor: '#2a2a2a',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
  },
  memberInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  memberAvatar: {
    position: 'relative',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 8,
    height: 8,
    backgroundColor: '#4ecdc4',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  memberDetails: {
    gap: 2,
  },
  memberName: {
    color: '#fff',
    fontSize: 14,
  },
  memberClass: {
    color: '#888',
    fontSize: 12,
  },
  memberRank: {
    color: '#666',
    fontSize: 12,
    fontWeight: 'bold',
  },
  leaderRank: {
    color: '#d4af37',
  },
  activityCard: {
    backgroundColor: '#2a2a2a',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#444',
    gap: 12,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  activityText: {
    color: '#aaa',
    fontSize: 14,
    flex: 1,
  },
  activityTime: {
    color: '#666',
    fontSize: 10,
  },
  tavernStats: {
    flexDirection: 'row',
    gap: 15,
  },
  tavernStatCard: {
    backgroundColor: '#2a2a2a',
    flex: 1,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#444',
    alignItems: 'center',
    gap: 8,
  },
  tavernStatValue: {
    color: '#fff',
    fontSize: 18,
  },
  tavernStatLabel: {
    color: '#888',
    fontSize: 12,
    textAlign: 'center',
  },
  heroCard: {
    backgroundColor: '#2a2a2a',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
  },
  heroAvatar: {
    width: 36,
    height: 36,
    backgroundColor: '#333',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  heroInfo: {
    flex: 1,
  },
  heroName: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  heroLevel: {
    color: '#888',
    fontSize: 12,
  },
  inviteButton: {
    padding: 8,
  },
  warCard: {
    backgroundColor: '#2a2a2a',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#d4af37',
  },
  warHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  warTitle: {
    color: '#d4af37',
    fontSize: 16,
  },
  warTimer: {
    color: '#ff6b6b',
    fontSize: 12,
  },
  warQuestion: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 15,
  },
  warResults: {
    alignItems: 'center',
    marginBottom: 15,
  },
  warOption: {
    backgroundColor: '#333',
    padding: 12,
    borderRadius: 8,
    marginVertical: 5,
    alignItems: 'center',
    minWidth: 120,
  },
  warOptionText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  warVotes: {
    color: '#4ecdc4',
    fontSize: 10,
  },
  warVsIndicator: {
    backgroundColor: '#d4af37',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
  },
  vsText: {
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold',
  },
  warRewards: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 10,
    backgroundColor: '#333',
    borderRadius: 8,
  },
  rewardText: {
    color: '#d4af37',
    fontSize: 12,
  },
  historyCard: {
    backgroundColor: '#2a2a2a',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#444',
    gap: 12,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  historyContent: {
    flex: 1,
  },
  historyTitle: {
    color: '#fff',
    fontSize: 14,
  },
  historyResult: {
    color: '#888',
    fontSize: 12,
  },
});