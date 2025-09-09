import { View, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

interface DonationTier {
  id: string;
  name: string;
  price: number;
  description: string;
  benefits: string[];
  xpBonus: number;
  icon: string;
  color: string;
  popular?: boolean;
  soldCount?: number;
}

export default function ShopScreen() {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);

  const donationTiers: DonationTier[] = [
    {
      id: 'tavern-patron',
      name: 'Tavern Patron',
      price: 10,
      description: 'Support the tavern and name an NPC',
      benefits: [
        'Name an NPC (appears in 1-2 episodes)',
        'Receive "Patron" badge on avatar',
        '"Canon Creator" certificate',
        'Small speaking role for your NPC'
      ],
      xpBonus: 100,
      icon: 'person.circle.fill',
      color: '#4ecdc4',
      soldCount: 234
    },
    {
      id: 'companion-keeper',
      name: 'Companion Keeper',
      price: 25,
      description: 'Create a beloved pet or familiar',
      benefits: [
        'Name a pet/familiar for 2-3 episodes',
        'Design basic personality traits',
        '"Companion Keeper" badge',
        'Updates when your companion appears'
      ],
      xpBonus: 250,
      icon: 'pawprint.fill',
      color: '#f39c12',
      popular: true,
      soldCount: 89
    },
    {
      id: 'merchant-prince',
      name: 'Merchant Prince',
      price: 100,
      description: 'Establish a recurring merchant shop',
      benefits: [
        'Name a recurring shopkeeper (3-5 appearances)',
        'Choose shop type and personality',
        'Design their catchphrase',
        'Shop added to world map permanently'
      ],
      xpBonus: 1000,
      icon: 'bag.fill',
      color: '#e74c3c',
      soldCount: 23
    },
    {
      id: 'monster-creator',
      name: 'Monster Creator',
      price: 250,
      description: 'Design a fearsome mini-boss encounter',
      benefits: [
        'Create a mini-boss encounter',
        'Name, appearance, and fighting style',
        'Choose their last words',
        'Behind-the-scenes creation video'
      ],
      xpBonus: 2500,
      icon: 'flame.fill',
      color: '#9b59b6',
      soldCount: 8
    },
    {
      id: 'lore-keeper',
      name: 'Lore Keeper',
      price: 500,
      description: 'Create permanent world history',
      benefits: [
        'Design historical event or artifact',
        'Name on in-world monuments',
        'Permanent +1 vote strength bonus',
        'Submitted lore becomes wiki canon'
      ],
      xpBonus: 5000,
      icon: 'book.fill',
      color: '#8e44ad',
      soldCount: 4
    },
    {
      id: 'quest-giver',
      name: 'Quest Giver',
      price: 1000,
      description: 'Design a complete story arc',
      benefits: [
        'Create 3-episode story arc',
        'Design quest-giving NPC',
        'Choose the moral dilemma',
        'Story contributor credit'
      ],
      xpBonus: 10000,
      icon: 'scroll.fill',
      color: '#2c3e50',
      soldCount: 2
    },
    {
      id: 'realm-patron',
      name: 'Realm Patron',
      price: 2500,
      description: 'Found an entire city or town',
      benefits: [
        'Name a recurring town/city location',
        'Design culture and key NPCs',
        'Physical map with your location',
        'Monthly story impact reports'
      ],
      xpBonus: 25000,
      icon: 'building.2.fill',
      color: '#16a085',
      soldCount: 1
    },
    {
      id: 'dragon-sponsor',
      name: 'Dragon Sponsor',
      price: 5000,
      description: 'Create a season-long antagonist',
      benefits: [
        'Design major villain for entire season',
        'Full backstory and relationships',
        'Executive Producer credit',
        'Custom episode about villain origin'
      ],
      xpBonus: 50000,
      icon: 'flame.circle.fill',
      color: '#c0392b',
      soldCount: 0
    },
    {
      id: 'deity-rank',
      name: 'Deity Rank',
      price: 10000,
      description: 'Ascend to godhood in the pantheon',
      benefits: [
        'Create god/goddess in pantheon',
        'Religion affects multiple storylines',
        'Avatar becomes celestial permanently',
        'Divine Council member status'
      ],
      xpBonus: 100000,
      icon: 'crown.fill',
      color: '#d4af37',
      soldCount: 0
    }
  ];

  const handlePurchase = (tier: DonationTier) => {
    Alert.alert(
      `Purchase ${tier.name}?`,
      `You're about to support the realm with $${tier.price}. This will permanently add your creation to the story and grant you ${tier.xpBonus} XP!`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Support Realm', 
          onPress: () => {
            Alert.alert(
              'Thank You!',
              `Your contribution has been received! You'll be notified when your ${tier.name} creation appears in the story. +${tier.xpBonus} XP has been added to your avatar!`
            );
          }
        }
      ]
    );
  };

  const getTierIcon = (iconName: string) => {
    return iconName as any;
  };

  return (
    <View style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.title}>Canon Forge</ThemedText>
        <ThemedText style={styles.subtitle}>Shape the story forever</ThemedText>
      </ThemedView>

      {/* Revenue Stats */}
      <ThemedView style={styles.section}>
        <ThemedView style={styles.revenueCard}>
          <View style={styles.revenueStats}>
            <View style={styles.revenueStat}>
              <ThemedText type="defaultSemiBold" style={styles.revenueValue}>$2,847</ThemedText>
              <ThemedText style={styles.revenueLabel}>Donated Today</ThemedText>
            </View>
            <View style={styles.revenueStat}>
              <ThemedText type="defaultSemiBold" style={styles.revenueValue}>$15,365</ThemedText>
              <ThemedText style={styles.revenueLabel}>This Month</ThemedText>
            </View>
            <View style={styles.revenueStat}>
              <ThemedText type="defaultSemiBold" style={styles.revenueValue}>2,890</ThemedText>
              <ThemedText style={styles.revenueLabel}>Total Patrons</ThemedText>
            </View>
          </View>
          <ThemedText style={styles.revenueDescription}>
            Every contribution becomes permanent canon in our dark fantasy universe
          </ThemedText>
        </ThemedView>
      </ThemedView>

      <ScrollView style={styles.tiersList}>
        {donationTiers.map((tier) => (
          <TouchableOpacity
            key={tier.id}
            style={[
              styles.tierCard,
              selectedTier === tier.id && styles.selectedTier,
              tier.popular && styles.popularTier
            ]}
            onPress={() => setSelectedTier(tier.id)}
          >
            {tier.popular && (
              <View style={styles.popularBadge}>
                <ThemedText style={styles.popularText}>MOST POPULAR</ThemedText>
              </View>
            )}

            <View style={styles.tierHeader}>
              <View style={[styles.tierIcon, { backgroundColor: tier.color }]}>
                <IconSymbol name={getTierIcon(tier.icon)} size={28} color="#fff" />
              </View>
              <View style={styles.tierInfo}>
                <ThemedText type="defaultSemiBold" style={styles.tierName}>{tier.name}</ThemedText>
                <ThemedText style={styles.tierPrice}>${tier.price}</ThemedText>
                {tier.soldCount !== undefined && (
                  <ThemedText style={styles.tierSold}>{tier.soldCount} supporters</ThemedText>
                )}
              </View>
              <View style={styles.xpBadge}>
                <ThemedText style={styles.xpText}>+{tier.xpBonus.toLocaleString()} XP</ThemedText>
              </View>
            </View>

            <ThemedText style={styles.tierDescription}>{tier.description}</ThemedText>

            <View style={styles.benefitsList}>
              {tier.benefits.map((benefit, index) => (
                <View key={index} style={styles.benefitItem}>
                  <IconSymbol name="checkmark.circle.fill" size={16} color="#4ecdc4" />
                  <ThemedText style={styles.benefitText}>{benefit}</ThemedText>
                </View>
              ))}
            </View>

            <TouchableOpacity 
              style={[styles.purchaseButton, { backgroundColor: tier.color }]}
              onPress={() => handlePurchase(tier)}
            >
              <IconSymbol name="heart.fill" size={16} color="#fff" />
              <ThemedText style={styles.purchaseButtonText}>
                Support Realm - ${tier.price}
              </ThemedText>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Recent Supporters */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>Recent Supporters</ThemedText>
        <ThemedView style={styles.supportersCard}>
          <View style={styles.supporterItem}>
            <IconSymbol name="crown.fill" size={16} color="#d4af37" />
            <ThemedText style={styles.supporterText}>
              🟢 DragonLord666 became a Merchant Prince! "Grimbold's Mystical Wares" joins the realm!
            </ThemedText>
          </View>
          <View style={styles.supporterItem}>
            <IconSymbol name="scroll.fill" size={16} color="#2c3e50" />
            <ThemedText style={styles.supporterText}>
              🎯 MysticMage sponsored a Quest! The "Lost Heir of Thornwood" arc begins next week!
            </ThemedText>
          </View>
          <View style={styles.supporterItem}>
            <IconSymbol name="pawprint.fill" size={16} color="#f39c12" />
            <ThemedText style={styles.supporterText}>
              🐾 WhisperWind created a companion! "Mr. Whiskers" the wise cat debuts tomorrow!
            </ThemedText>
          </View>
        </ThemedView>
      </ThemedView>

      {/* Flash Sale Banner */}
      <ThemedView style={styles.section}>
        <ThemedView style={styles.flashSaleCard}>
          <View style={styles.flashSaleHeader}>
            <IconSymbol name="bolt.fill" size={20} color="#ff6b6b" />
            <ThemedText type="defaultSemiBold" style={styles.flashSaleTitle}>Flash Sale!</ThemedText>
            <ThemedText style={styles.flashSaleTimer}>2h 15m left</ThemedText>
          </View>
          <ThemedText style={styles.flashSaleText}>
            Next 3 Companion Keeper purchases get bonus pet evolution storyline!
          </ThemedText>
        </ThemedView>
      </ThemedView>
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
  section: {
    margin: 15,
  },
  sectionTitle: {
    color: '#d4af37',
    fontSize: 20,
    marginBottom: 10,
  },
  revenueCard: {
    backgroundColor: '#2a2a2a',
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#444',
  },
  revenueStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  revenueStat: {
    alignItems: 'center',
  },
  revenueValue: {
    color: '#4ecdc4',
    fontSize: 18,
  },
  revenueLabel: {
    color: '#888',
    fontSize: 12,
    marginTop: 2,
  },
  revenueDescription: {
    color: '#aaa',
    fontSize: 14,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  tiersList: {
    flex: 1,
    paddingHorizontal: 15,
  },
  tierCard: {
    backgroundColor: '#2a2a2a',
    marginBottom: 15,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#444',
    position: 'relative',
  },
  selectedTier: {
    borderColor: '#d4af37',
    borderWidth: 2,
  },
  popularTier: {
    borderColor: '#4ecdc4',
    borderWidth: 2,
  },
  popularBadge: {
    position: 'absolute',
    top: -8,
    right: 20,
    backgroundColor: '#4ecdc4',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 1,
  },
  popularText: {
    color: '#000',
    fontSize: 10,
    fontWeight: 'bold',
  },
  tierHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tierIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  tierInfo: {
    flex: 1,
  },
  tierName: {
    color: '#fff',
    fontSize: 18,
  },
  tierPrice: {
    color: '#d4af37',
    fontSize: 20,
    fontWeight: 'bold',
  },
  tierSold: {
    color: '#888',
    fontSize: 10,
  },
  xpBadge: {
    backgroundColor: '#4ecdc4',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  xpText: {
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold',
  },
  tierDescription: {
    color: '#aaa',
    fontSize: 14,
    marginBottom: 15,
    lineHeight: 18,
  },
  benefitsList: {
    gap: 8,
    marginBottom: 20,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  benefitText: {
    color: '#ccc',
    fontSize: 13,
    flex: 1,
  },
  purchaseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 8,
    gap: 8,
  },
  purchaseButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  supportersCard: {
    backgroundColor: '#2a2a2a',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#444',
    gap: 12,
  },
  supporterItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  supporterText: {
    color: '#aaa',
    fontSize: 13,
    flex: 1,
    lineHeight: 18,
  },
  flashSaleCard: {
    backgroundColor: '#2a2a2a',
    padding: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ff6b6b',
  },
  flashSaleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  flashSaleTitle: {
    color: '#ff6b6b',
    fontSize: 16,
  },
  flashSaleTimer: {
    color: '#ff6b6b',
    fontSize: 12,
    marginLeft: 'auto',
  },
  flashSaleText: {
    color: '#fff',
    fontSize: 14,
  },
});