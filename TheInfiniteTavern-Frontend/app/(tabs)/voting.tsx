import { View, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useState, useMemo } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useGame } from '@/contexts/GameContext';

export default function VotingScreen() {
  const { state, dispatch } = useGame();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  
  const currentVote = state.currentVote;
  const hasVoted = currentVote?.userVoteId !== undefined;
  const userAvatar = state.user.avatar;

  const handleVote = () => {
    if (selectedOption === null || !currentVote) {
      Alert.alert('No Option Selected', 'Please select a voting option first.');
      return;
    }
    
    dispatch({ type: 'CAST_VOTE', payload: { voteId: currentVote.id, optionId: selectedOption } });
    dispatch({ type: 'UPDATE_AVATAR_XP', payload: { xp: 25, source: 'vote_cast' } });
    
    Alert.alert('Vote Cast!', `Your vote has been recorded. +25 XP earned!`);
  };

  const voteOptions = currentVote?.options || [];

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.title}>Current Vote</ThemedText>
        <ThemedText style={styles.subtitle}>Shape the story's destiny</ThemedText>
      </ThemedView>

      {/* Vote Timer */}
      <ThemedView style={styles.section}>
        <ThemedView style={styles.timerCard}>
          <IconSymbol name="clock.fill" size={24} color="#ff6b6b" />
          <View>
            <ThemedText type="defaultSemiBold" style={styles.timerTitle}>Voting Closes In:</ThemedText>
            <ThemedText style={styles.timerText}>2 hours 34 minutes</ThemedText>
          </View>
          <View style={styles.voteStats}>
            <ThemedText style={styles.totalVotes}>{currentVote?.totalVotes.toLocaleString()} votes cast</ThemedText>
            <ThemedText style={styles.yourPower}>Your Vote Power: +{userAvatar?.voteStrength || 1}</ThemedText>
          </View>
        </ThemedView>
      </ThemedView>

      {/* Current Episode Context */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>Episode Context</ThemedText>
        <ThemedView style={styles.contextCard}>
          <ThemedText type="defaultSemiBold" style={styles.episodeTitle}>Episode #247: The Dragon's Gambit</ThemedText>
          <ThemedText style={styles.contextText}>
            The party has successfully negotiated with the ancient dragon Pyraxis, but as they prepare to leave his lair, 
            a hooded merchant approaches them at the cavern entrance. He offers them a mysterious artifact that could 
            "tip the scales in the coming war," but his price is steep - and his true intentions unclear.
          </ThemedText>
        </ThemedView>
      </ThemedView>

      {/* Voting Options */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>Cast Your Vote</ThemedText>
        <ThemedText style={styles.question}>
          {currentVote?.question || "Loading voting question..."}
        </ThemedText>

        <View style={styles.optionsContainer}>
          {voteOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.voteOption,
                selectedOption === option.id && styles.selectedOption,
                hasVoted && styles.votedOption
              ]}
              onPress={() => !hasVoted && setSelectedOption(option.id)}
              disabled={hasVoted}
            >
              <View style={styles.optionHeader}>
                <View style={styles.optionNumber}>
                  <ThemedText style={styles.optionNumberText}>{option.id}</ThemedText>
                </View>
                <View style={styles.optionContent}>
                  <ThemedText style={styles.optionText}>{option.text}</ThemedText>
                </View>
                <View style={styles.votePercentage}>
                  <ThemedText style={styles.percentageText}>{option.percentage}%</ThemedText>
                  <ThemedText style={styles.voteCount}>{option.votes} votes</ThemedText>
                </View>
              </View>
              
              {/* Ranger Hint */}
              {option.rangerHint && userAvatar?.class.toLowerCase() === 'ranger' && (
                <View style={styles.rangerHint}>
                  <IconSymbol name="eye.fill" size={16} color="#4ecdc4" />
                  <ThemedText style={styles.hintText}>{option.rangerHint}</ThemedText>
                </View>
              )}

              {/* Vote Bar */}
              <View style={styles.voteBar}>
                <View style={[styles.voteBarFill, { width: `${option.percentage}%` }]} />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {!hasVoted ? (
          <TouchableOpacity 
            style={[styles.submitButton, selectedOption && styles.submitButtonActive]} 
            onPress={handleVote}
          >
            <IconSymbol name="hand.raised.fill" size={20} color={selectedOption ? "#000" : "#666"} />
            <ThemedText style={[styles.submitButtonText, selectedOption && styles.submitButtonTextActive]}>
              Cast Your Vote
            </ThemedText>
          </TouchableOpacity>
        ) : (
          <View style={styles.votedMessage}>
            <IconSymbol name="checkmark.circle.fill" size={24} color="#4ecdc4" />
            <ThemedText style={styles.votedText}>Vote Recorded! +25 XP Earned</ThemedText>
          </View>
        )}
      </ThemedView>

      {/* Recent Votes History */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>Your Recent Votes</ThemedText>
        <ThemedView style={styles.historyCard}>
          <View style={styles.historyItem}>
            <View style={styles.historyIcon}>
              <IconSymbol name="checkmark.circle.fill" size={16} color="#4ecdc4" />
            </View>
            <View>
              <ThemedText style={styles.historyTitle}>Episode #246: "Spare the corrupted knight"</ThemedText>
              <ThemedText style={styles.historyResult}>✓ Your choice won! +25 XP bonus</ThemedText>
            </View>
          </View>
          <View style={styles.historyItem}>
            <View style={styles.historyIcon}>
              <IconSymbol name="xmark.circle.fill" size={16} color="#ff6b6b" />
            </View>
            <View>
              <ThemedText style={styles.historyTitle}>Episode #245: "Investigate the ruins"</ThemedText>
              <ThemedText style={styles.historyResult}>✗ Majority chose differently</ThemedText>
            </View>
          </View>
          <View style={styles.historyItem}>
            <View style={styles.historyIcon}>
              <IconSymbol name="checkmark.circle.fill" size={16} color="#4ecdc4" />
            </View>
            <View>
              <ThemedText style={styles.historyTitle}>Episode #244: "Form alliance with dwarves"</ThemedText>
              <ThemedText style={styles.historyResult}>✓ Your choice won! +25 XP bonus</ThemedText>
            </View>
          </View>
        </ThemedView>
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
  timerCard: {
    backgroundColor: '#2a2a2a',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ff6b6b',
    gap: 12,
  },
  timerTitle: {
    color: '#fff',
    fontSize: 16,
  },
  timerText: {
    color: '#ff6b6b',
    fontSize: 18,
    fontWeight: 'bold',
  },
  voteStats: {
    marginLeft: 'auto',
    alignItems: 'flex-end',
  },
  totalVotes: {
    color: '#4ecdc4',
    fontSize: 14,
  },
  yourPower: {
    color: '#d4af37',
    fontSize: 12,
    fontWeight: 'bold',
  },
  contextCard: {
    backgroundColor: '#2a2a2a',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#444',
  },
  episodeTitle: {
    color: '#d4af37',
    fontSize: 16,
    marginBottom: 8,
  },
  contextText: {
    color: '#aaa',
    lineHeight: 20,
  },
  question: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 20,
    fontStyle: 'italic',
  },
  optionsContainer: {
    gap: 15,
    marginBottom: 20,
  },
  voteOption: {
    backgroundColor: '#2a2a2a',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#444',
    padding: 15,
  },
  selectedOption: {
    borderColor: '#d4af37',
    borderWidth: 2,
  },
  votedOption: {
    opacity: 0.8,
  },
  optionHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  optionNumber: {
    backgroundColor: '#d4af37',
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  optionNumberText: {
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold',
  },
  optionContent: {
    flex: 1,
  },
  optionText: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 20,
  },
  votePercentage: {
    alignItems: 'flex-end',
  },
  percentageText: {
    color: '#d4af37',
    fontSize: 18,
    fontWeight: 'bold',
  },
  voteCount: {
    color: '#888',
    fontSize: 10,
  },
  rangerHint: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
    paddingLeft: 36,
  },
  hintText: {
    color: '#4ecdc4',
    fontSize: 12,
    fontStyle: 'italic',
  },
  voteBar: {
    height: 4,
    backgroundColor: '#444',
    borderRadius: 2,
    marginLeft: 36,
  },
  voteBarFill: {
    height: '100%',
    backgroundColor: '#d4af37',
    borderRadius: 2,
  },
  submitButton: {
    backgroundColor: '#333',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    gap: 8,
  },
  submitButtonActive: {
    backgroundColor: '#d4af37',
  },
  submitButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: 'bold',
  },
  submitButtonTextActive: {
    color: '#000',
  },
  votedMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 15,
    backgroundColor: '#1a4a3a',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#4ecdc4',
  },
  votedText: {
    color: '#4ecdc4',
    fontSize: 16,
    fontWeight: 'bold',
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
    alignItems: 'flex-start',
    gap: 10,
  },
  historyIcon: {
    marginTop: 2,
  },
  historyTitle: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 2,
  },
  historyResult: {
    color: '#888',
    fontSize: 12,
  },
});