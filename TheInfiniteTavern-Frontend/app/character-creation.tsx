import { View, ScrollView, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useGame, calculateNextLevelXP } from '@/contexts/GameContext';

interface CharacterClass {
  id: string;
  name: string;
  description: string;
  perk: string;
  icon: string;
  color: string;
}

interface CharacterRace {
  id: string;
  name: string;
  description: string;
  bonus: string;
  icon: string;
}

export default function CharacterCreationScreen() {
  const { state, dispatch } = useGame();
  const router = useRouter();
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [selectedRace, setSelectedRace] = useState<string>('');
  const [heroName, setHeroName] = useState<string>('');
  const [selectedAppearance, setSelectedAppearance] = useState<string>('');
  const [currentStep, setCurrentStep] = useState<number>(0);

  const classes: CharacterClass[] = [
    {
      id: 'ranger',
      name: 'Ranger',
      description: 'Masters of the wild, skilled with bow and blade',
      perk: 'See hidden environmental clues in voting scenarios',
      icon: 'arrow.up.to.line',
      color: '#4ecdc4'
    },
    {
      id: 'barbarian',
      name: 'Barbarian',
      description: 'Fierce warriors who channel primal rage',
      perk: 'Double XP from combat-heavy episodes',
      icon: 'flame.fill',
      color: '#e74c3c'
    },
    {
      id: 'sorcerer',
      name: 'Sorcerer',
      description: 'Wielders of raw magical power',
      perk: 'Preview one future voting option per week',
      icon: 'sparkles',
      color: '#9b59b6'
    },
    {
      id: 'rogue',
      name: 'Rogue',
      description: 'Cunning thieves and assassins of the shadows',
      perk: 'See exact vote percentages (others see bars)',
      icon: 'eye.slash.fill',
      color: '#2c3e50'
    },
    {
      id: 'paladin',
      name: 'Paladin',
      description: 'Holy warriors blessed by divine light',
      perk: 'Bonus XP for voting for "good" choices',
      icon: 'shield.fill',
      color: '#d4af37'
    },
    {
      id: 'warlock',
      name: 'Warlock',
      description: 'Dark pact-makers who bargain with otherworldly beings',
      perk: 'Gain XP when "dark" choices win',
      icon: 'moon.fill',
      color: '#8e44ad'
    },
    {
      id: 'bard',
      name: 'Bard',
      description: 'Charismatic storytellers and performers',
      perk: 'Bonus XP for social sharing',
      icon: 'music.note',
      color: '#f39c12'
    },
    {
      id: 'druid',
      name: 'Druid',
      description: 'Protectors of nature and shapeshifters',
      perk: 'Vote counts extra on nature-related decisions',
      icon: 'leaf.fill',
      color: '#16a085'
    }
  ];

  const races: CharacterRace[] = [
    {
      id: 'human',
      name: 'Human',
      description: 'Versatile and ambitious, quick to adapt',
      bonus: '+10% XP gain from all sources',
      icon: 'person.fill'
    },
    {
      id: 'elf',
      name: 'Elf',
      description: 'Graceful and long-lived, naturally magical',
      bonus: 'Extended voting time awareness (+30 minutes)',
      icon: 'leaf.arrow.circle.fill'
    },
    {
      id: 'dwarf',
      name: 'Dwarf',
      description: 'Sturdy and determined, master crafters',
      bonus: 'Double rewards from donation tiers',
      icon: 'hammer.fill'
    },
    {
      id: 'tiefling',
      name: 'Tiefling',
      description: 'Infernal heritage grants dark charisma',
      bonus: 'Bonus XP when morally ambiguous choices win',
      icon: 'flame.circle.fill'
    },
    {
      id: 'dragonborn',
      name: 'Dragonborn',
      description: 'Draconic bloodline with elemental breath',
      bonus: 'Extra vote strength in dragon-related episodes',
      icon: 'dragon.fill'
    },
    {
      id: 'halfling',
      name: 'Halfling',
      description: 'Small but brave, naturally lucky',
      bonus: 'Chance for bonus XP on failed predictions',
      icon: 'clover.fill'
    }
  ];

  const appearances = [
    { id: 'warrior', name: 'Seasoned Warrior', description: 'Battle-scarred and experienced' },
    { id: 'noble', name: 'Noble Born', description: 'Regal bearing and fine features' },
    { id: 'mysterious', name: 'Mysterious Wanderer', description: 'Cloaked and enigmatic' },
    { id: 'young', name: 'Fresh Adventurer', description: 'Young and eager for glory' },
    { id: 'grizzled', name: 'Grizzled Veteran', description: 'Weathered by countless battles' },
    { id: 'magical', name: 'Touched by Magic', description: 'Ethereal and otherworldly' }
  ];

  const steps = ['Class', 'Race', 'Appearance', 'Name', 'Confirm'];

  const handleNext = () => {
    if (currentStep === 0 && !selectedClass) {
      Alert.alert('Select Class', 'Please choose your character class first.');
      return;
    }
    if (currentStep === 1 && !selectedRace) {
      Alert.alert('Select Race', 'Please choose your character race first.');
      return;
    }
    if (currentStep === 2 && !selectedAppearance) {
      Alert.alert('Select Appearance', 'Please choose your character appearance first.');
      return;
    }
    if (currentStep === 3 && !heroName.trim()) {
      Alert.alert('Enter Name', 'Please enter your hero name first.');
      return;
    }
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCreateHero = () => {
    const newAvatar = {
      id: `avatar_${Date.now()}`,
      name: heroName,
      class: selectedClass,
      race: selectedRace,
      appearance: selectedAppearance,
      level: 1,
      currentXP: 500, // Starting bonus XP
      nextLevelXP: calculateNextLevelXP(1),
      voteStrength: 1,
      stats: {
        episodesWatched: 0,
        votesCast: 0,
        correctPredictions: 0,
        friendsRecruited: 0,
        realmInfluence: 500,
      },
      achievements: [],
      cosmetics: {
        unlocked: ['basic_armor', 'starter_weapon'],
        equipped: ['basic_armor', 'starter_weapon'],
      },
    };

    dispatch({ type: 'SET_AVATAR', payload: newAvatar });
    dispatch({ type: 'COMPLETE_ONBOARDING' });
    
    Alert.alert(
      'Hero Created!',
      `Welcome to the realm, ${heroName}! Your ${selectedRace} ${selectedClass} has been forged and is ready for adventure. +500 XP bonus for character creation!`,
      [{ 
        text: 'Enter the Tavern', 
        onPress: () => router.replace('/(tabs)') 
      }]
    );
  };

  const getSelectedClass = () => classes.find(c => c.id === selectedClass);
  const getSelectedRace = () => races.find(r => r.id === selectedRace);
  const getSelectedAppearance = () => appearances.find(a => a.id === selectedAppearance);

  return (
    <View style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.title}>Forge Your Hero</ThemedText>
        <ThemedText style={styles.subtitle}>Shape your destiny in the realm</ThemedText>
      </ThemedView>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${((currentStep + 1) / steps.length) * 100}%` }]} />
        </View>
        <ThemedText style={styles.progressText}>
          Step {currentStep + 1} of {steps.length}: {steps[currentStep]}
        </ThemedText>
      </View>

      <ScrollView style={styles.content}>
        {currentStep === 0 && (
          <ThemedView style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>Choose Your Class</ThemedText>
            <ThemedText style={styles.sectionDescription}>
              Each class grants unique perks and voting advantages
            </ThemedText>
            <View style={styles.optionsGrid}>
              {classes.map(cls => (
                <TouchableOpacity
                  key={cls.id}
                  style={[
                    styles.classCard,
                    selectedClass === cls.id && styles.selectedCard,
                    { borderColor: cls.color }
                  ]}
                  onPress={() => setSelectedClass(cls.id)}
                >
                  <View style={[styles.classIcon, { backgroundColor: cls.color }]}>
                    <IconSymbol name={cls.icon as any} size={24} color="#fff" />
                  </View>
                  <ThemedText type="defaultSemiBold" style={styles.cardTitle}>{cls.name}</ThemedText>
                  <ThemedText style={styles.cardDescription}>{cls.description}</ThemedText>
                  <View style={styles.perkContainer}>
                    <IconSymbol name="star.fill" size={12} color="#d4af37" />
                    <ThemedText style={styles.perkText}>{cls.perk}</ThemedText>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ThemedView>
        )}

        {currentStep === 1 && (
          <ThemedView style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>Choose Your Race</ThemedText>
            <ThemedText style={styles.sectionDescription}>
              Your heritage shapes your abilities and bonuses
            </ThemedText>
            <View style={styles.optionsList}>
              {races.map(race => (
                <TouchableOpacity
                  key={race.id}
                  style={[
                    styles.raceCard,
                    selectedRace === race.id && styles.selectedCard
                  ]}
                  onPress={() => setSelectedRace(race.id)}
                >
                  <View style={styles.raceIcon}>
                    <IconSymbol name={race.icon as any} size={24} color="#d4af37" />
                  </View>
                  <View style={styles.raceInfo}>
                    <ThemedText type="defaultSemiBold" style={styles.raceName}>{race.name}</ThemedText>
                    <ThemedText style={styles.raceDescription}>{race.description}</ThemedText>
                    <View style={styles.bonusContainer}>
                      <IconSymbol name="plus.circle.fill" size={12} color="#4ecdc4" />
                      <ThemedText style={styles.bonusText}>{race.bonus}</ThemedText>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ThemedView>
        )}

        {currentStep === 2 && (
          <ThemedView style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>Choose Appearance</ThemedText>
            <ThemedText style={styles.sectionDescription}>
              How do you want your hero to appear in the realm?
            </ThemedText>
            <View style={styles.optionsList}>
              {appearances.map(appearance => (
                <TouchableOpacity
                  key={appearance.id}
                  style={[
                    styles.appearanceCard,
                    selectedAppearance === appearance.id && styles.selectedCard
                  ]}
                  onPress={() => setSelectedAppearance(appearance.id)}
                >
                  <ThemedText type="defaultSemiBold" style={styles.appearanceName}>{appearance.name}</ThemedText>
                  <ThemedText style={styles.appearanceDescription}>{appearance.description}</ThemedText>
                </TouchableOpacity>
              ))}
            </View>
          </ThemedView>
        )}

        {currentStep === 3 && (
          <ThemedView style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>Name Your Hero</ThemedText>
            <ThemedText style={styles.sectionDescription}>
              This name will be whispered in taverns across the realm...
            </ThemedText>
            <View style={styles.nameInputContainer}>
              <TextInput
                style={styles.nameInput}
                placeholder="Enter your hero's name"
                placeholderTextColor="#666"
                value={heroName}
                onChangeText={setHeroName}
                maxLength={20}
              />
              <ThemedText style={styles.characterCount}>{heroName.length}/20</ThemedText>
            </View>
            <View style={styles.nameExample}>
              <ThemedText style={styles.exampleText}>Examples:</ThemedText>
              <ThemedText style={styles.exampleNames}>
                Shadowbane • Ironwill • Mystral • Thornwick • Emberheart
              </ThemedText>
            </View>
          </ThemedView>
        )}

        {currentStep === 4 && (
          <ThemedView style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>Confirm Your Hero</ThemedText>
            <ThemedView style={styles.confirmCard}>
              <View style={styles.heroPreview}>
                <View style={[styles.heroIcon, { backgroundColor: getSelectedClass()?.color || '#666' }]}>
                  <IconSymbol name="person.fill" size={48} color="#fff" />
                </View>
                <View style={styles.heroDetails}>
                  <ThemedText type="defaultSemiBold" style={styles.heroNameDisplay}>{heroName}</ThemedText>
                  <ThemedText style={styles.heroClassRace}>
                    {getSelectedRace()?.name} {getSelectedClass()?.name}
                  </ThemedText>
                  <ThemedText style={styles.heroAppearance}>
                    {getSelectedAppearance()?.name}
                  </ThemedText>
                </View>
              </View>
              
              <View style={styles.summarySection}>
                <ThemedText style={styles.summaryTitle}>Class Perk:</ThemedText>
                <ThemedText style={styles.summaryText}>{getSelectedClass()?.perk}</ThemedText>
              </View>
              
              <View style={styles.summarySection}>
                <ThemedText style={styles.summaryTitle}>Racial Bonus:</ThemedText>
                <ThemedText style={styles.summaryText}>{getSelectedRace()?.bonus}</ThemedText>
              </View>

              <View style={styles.bonusXp}>
                <IconSymbol name="star.fill" size={20} color="#d4af37" />
                <ThemedText style={styles.bonusXpText}>+500 XP Character Creation Bonus!</ThemedText>
              </View>
            </View>
          </ThemedView>
        )}
      </ScrollView>

      {/* Navigation Buttons */}
      <View style={styles.navigationContainer}>
        {currentStep > 0 && (
          <TouchableOpacity style={styles.backButton} onPress={handlePrevious}>
            <IconSymbol name="chevron.left" size={16} color="#fff" />
            <ThemedText style={styles.backButtonText}>Back</ThemedText>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity 
          style={[styles.nextButton, currentStep === steps.length - 1 && styles.createButton]}
          onPress={currentStep === steps.length - 1 ? handleCreateHero : handleNext}
        >
          <ThemedText style={styles.nextButtonText}>
            {currentStep === steps.length - 1 ? 'Create Hero' : 'Next'}
          </ThemedText>
          {currentStep < steps.length - 1 && (
            <IconSymbol name="chevron.right" size={16} color="#000" />
          )}
        </TouchableOpacity>
      </View>
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
  progressContainer: {
    padding: 20,
    backgroundColor: '#2a2a2a',
  },
  progressBar: {
    height: 4,
    backgroundColor: '#444',
    borderRadius: 2,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4ecdc4',
    borderRadius: 2,
  },
  progressText: {
    color: '#aaa',
    fontSize: 12,
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    color: '#d4af37',
    fontSize: 24,
    marginBottom: 8,
  },
  sectionDescription: {
    color: '#aaa',
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 20,
  },
  optionsGrid: {
    gap: 15,
  },
  optionsList: {
    gap: 12,
  },
  classCard: {
    backgroundColor: '#2a2a2a',
    padding: 15,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#444',
  },
  selectedCard: {
    borderColor: '#d4af37',
    backgroundColor: '#333',
  },
  classIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 5,
  },
  cardDescription: {
    color: '#aaa',
    fontSize: 14,
    marginBottom: 10,
    lineHeight: 18,
  },
  perkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#333',
    padding: 8,
    borderRadius: 6,
  },
  perkText: {
    color: '#d4af37',
    fontSize: 12,
    flex: 1,
  },
  raceCard: {
    backgroundColor: '#2a2a2a',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#444',
    gap: 15,
  },
  raceIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#333',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  raceInfo: {
    flex: 1,
  },
  raceName: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 4,
  },
  raceDescription: {
    color: '#aaa',
    fontSize: 12,
    marginBottom: 6,
  },
  bonusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  bonusText: {
    color: '#4ecdc4',
    fontSize: 11,
    flex: 1,
  },
  appearanceCard: {
    backgroundColor: '#2a2a2a',
    padding: 15,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#444',
  },
  appearanceName: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 5,
  },
  appearanceDescription: {
    color: '#aaa',
    fontSize: 14,
  },
  nameInputContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  nameInput: {
    backgroundColor: '#2a2a2a',
    color: '#fff',
    fontSize: 18,
    padding: 15,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#444',
    textAlign: 'center',
  },
  characterCount: {
    position: 'absolute',
    right: 15,
    top: 15,
    color: '#666',
    fontSize: 12,
  },
  nameExample: {
    alignItems: 'center',
  },
  exampleText: {
    color: '#888',
    fontSize: 14,
    marginBottom: 5,
  },
  exampleNames: {
    color: '#4ecdc4',
    fontSize: 14,
    fontStyle: 'italic',
  },
  confirmCard: {
    backgroundColor: '#2a2a2a',
    padding: 20,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#d4af37',
  },
  heroPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 15,
  },
  heroIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroDetails: {
    flex: 1,
  },
  heroNameDisplay: {
    color: '#d4af37',
    fontSize: 24,
  },
  heroClassRace: {
    color: '#4ecdc4',
    fontSize: 16,
    marginTop: 5,
  },
  heroAppearance: {
    color: '#888',
    fontSize: 14,
    marginTop: 2,
  },
  summarySection: {
    marginBottom: 15,
  },
  summaryTitle: {
    color: '#d4af37',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  summaryText: {
    color: '#aaa',
    fontSize: 14,
    lineHeight: 18,
  },
  bonusXp: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 15,
    backgroundColor: '#333',
    borderRadius: 10,
  },
  bonusXpText: {
    color: '#d4af37',
    fontSize: 16,
    fontWeight: 'bold',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#2a2a2a',
    borderTopWidth: 1,
    borderTopColor: '#444',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#444',
    borderRadius: 8,
    gap: 8,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#d4af37',
    borderRadius: 8,
    gap: 8,
  },
  createButton: {
    backgroundColor: '#4ecdc4',
  },
  nextButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});