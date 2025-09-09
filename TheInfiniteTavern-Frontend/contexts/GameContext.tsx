import React, { createContext, useContext, useReducer, ReactNode } from 'react';

export interface Avatar {
  id: string;
  name: string;
  class: string;
  race: string;
  appearance: string;
  level: number;
  currentXP: number;
  nextLevelXP: number;
  voteStrength: number;
  guild?: {
    id: string;
    name: string;
    rank: string;
  };
  stats: {
    episodesWatched: number;
    votesCast: number;
    correctPredictions: number;
    friendsRecruited: number;
    realmInfluence: number;
  };
  achievements: Achievement[];
  cosmetics: {
    unlocked: string[];
    equipped: string[];
  };
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  unlockedAt: Date;
}

export interface Episode {
  id: string;
  number: number;
  title: string;
  description: string;
  videoUrl?: string;
  viewCount: number;
  isWatched: boolean;
}

export interface Vote {
  id: string;
  episodeId: string;
  question: string;
  options: VoteOption[];
  closesAt: Date;
  totalVotes: number;
  userVoteId?: string;
  isActive: boolean;
}

export interface VoteOption {
  id: string;
  text: string;
  votes: number;
  percentage: number;
  rangerHint?: string;
}

export interface DonationTier {
  id: string;
  name: string;
  price: number;
  description: string;
  benefits: string[];
  xpBonus: number;
  icon: string;
  color: string;
  soldCount: number;
}

export interface GameState {
  user: {
    id: string;
    avatar?: Avatar;
    hasCompletedOnboarding: boolean;
  };
  episodes: Episode[];
  currentVote?: Vote;
  recentVotes: Vote[];
  donationTiers: DonationTier[];
  tavernStats: {
    activeHeroes: number;
    votesCast: number;
    newEpisodes: number;
    donatedToday: number;
  };
  guildData?: {
    id: string;
    name: string;
    motto: string;
    members: any[];
    stats: any;
    recentActivity: any[];
  };
}

type GameAction = 
  | { type: 'SET_AVATAR'; payload: Avatar }
  | { type: 'UPDATE_AVATAR_XP'; payload: { xp: number; source: string } }
  | { type: 'LEVEL_UP'; payload: { newLevel: number } }
  | { type: 'CAST_VOTE'; payload: { voteId: string; optionId: string } }
  | { type: 'WATCH_EPISODE'; payload: { episodeId: string } }
  | { type: 'UNLOCK_ACHIEVEMENT'; payload: Achievement }
  | { type: 'UPDATE_STATS'; payload: Partial<Avatar['stats']> }
  | { type: 'SET_CURRENT_VOTE'; payload: Vote }
  | { type: 'COMPLETE_ONBOARDING' };

const initialState: GameState = {
  user: {
    id: 'user_1',
    hasCompletedOnboarding: false,
  },
  episodes: [
    {
      id: 'ep_247',
      number: 247,
      title: "The Dragon's Gambit",
      description: "The party stands before the ancient dragon, but their words carry more weight than their swords...",
      viewCount: 45000,
      isWatched: false,
    },
    {
      id: 'ep_246',
      number: 246,
      title: "The Betrayal at Thornwood Keep",
      description: "Trust is shattered as allies become enemies in the moonlit courtyard...",
      viewCount: 52000,
      isWatched: true,
    }
  ],
  currentVote: {
    id: 'vote_248',
    episodeId: 'ep_248',
    question: "Should the party trust the mysterious merchant?",
    options: [
      {
        id: 'opt_1',
        text: "Trust the merchant completely - accept his offer",
        votes: 1247,
        percentage: 34,
        rangerHint: "Your ranger senses detect no deception in his words"
      },
      {
        id: 'opt_2', 
        text: "Accept the deal but stay vigilant for betrayal",
        votes: 1923,
        percentage: 52,
        rangerHint: "The forest spirits whisper warnings about this place"
      },
      {
        id: 'opt_3',
        text: "Refuse the offer - it's obviously a trap",
        votes: 521,
        percentage: 14,
        rangerHint: "You notice fresh grave dirt under his fingernails"
      }
    ],
    closesAt: new Date(Date.now() + 2.5 * 60 * 60 * 1000), // 2.5 hours from now
    totalVotes: 3691,
    isActive: true,
  },
  recentVotes: [],
  donationTiers: [
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
    }
  ],
  tavernStats: {
    activeHeroes: 12847,
    votesCast: 3421,
    newEpisodes: 47,
    donatedToday: 2847,
  },
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'SET_AVATAR':
      return {
        ...state,
        user: {
          ...state.user,
          avatar: action.payload,
        },
      };
      
    case 'UPDATE_AVATAR_XP':
      if (!state.user.avatar) return state;
      
      const newXP = state.user.avatar.currentXP + action.payload.xp;
      const shouldLevelUp = newXP >= state.user.avatar.nextLevelXP;
      
      return {
        ...state,
        user: {
          ...state.user,
          avatar: {
            ...state.user.avatar,
            currentXP: shouldLevelUp ? newXP - state.user.avatar.nextLevelXP : newXP,
            level: shouldLevelUp ? state.user.avatar.level + 1 : state.user.avatar.level,
            nextLevelXP: shouldLevelUp ? Math.floor(state.user.avatar.nextLevelXP * 1.2) : state.user.avatar.nextLevelXP,
          },
        },
      };
      
    case 'CAST_VOTE':
      return {
        ...state,
        currentVote: state.currentVote ? {
          ...state.currentVote,
          userVoteId: action.payload.optionId,
        } : state.currentVote,
        user: {
          ...state.user,
          avatar: state.user.avatar ? {
            ...state.user.avatar,
            stats: {
              ...state.user.avatar.stats,
              votesCast: state.user.avatar.stats.votesCast + 1,
            },
          } : state.user.avatar,
        },
      };
      
    case 'WATCH_EPISODE':
      return {
        ...state,
        episodes: state.episodes.map(ep =>
          ep.id === action.payload.episodeId
            ? { ...ep, isWatched: true }
            : ep
        ),
        user: {
          ...state.user,
          avatar: state.user.avatar ? {
            ...state.user.avatar,
            stats: {
              ...state.user.avatar.stats,
              episodesWatched: state.user.avatar.stats.episodesWatched + 1,
            },
          } : state.user.avatar,
        },
      };
      
    case 'UNLOCK_ACHIEVEMENT':
      if (!state.user.avatar) return state;
      
      return {
        ...state,
        user: {
          ...state.user,
          avatar: {
            ...state.user.avatar,
            achievements: [...state.user.avatar.achievements, action.payload],
          },
        },
      };
      
    case 'UPDATE_STATS':
      if (!state.user.avatar) return state;
      
      return {
        ...state,
        user: {
          ...state.user,
          avatar: {
            ...state.user.avatar,
            stats: {
              ...state.user.avatar.stats,
              ...action.payload,
            },
          },
        },
      };
      
    case 'SET_CURRENT_VOTE':
      return {
        ...state,
        currentVote: action.payload,
      };
      
    case 'COMPLETE_ONBOARDING':
      return {
        ...state,
        user: {
          ...state.user,
          hasCompletedOnboarding: true,
        },
      };
      
    default:
      return state;
  }
}

const GameContext = createContext<{
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
} | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  
  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}

// Utility functions for common operations
export function calculateLevel(xp: number): number {
  return Math.floor(Math.sqrt(xp / 100)) + 1;
}

export function calculateXPForLevel(level: number): number {
  return Math.pow(level - 1, 2) * 100;
}

export function calculateNextLevelXP(level: number): number {
  return calculateXPForLevel(level + 1) - calculateXPForLevel(level);
}

export function getClassPerks(className: string): { perk: string; color: string } {
  const perks: Record<string, { perk: string; color: string }> = {
    ranger: { perk: 'See hidden environmental clues', color: '#4ecdc4' },
    barbarian: { perk: 'Double XP from combat episodes', color: '#e74c3c' },
    sorcerer: { perk: 'Preview future voting option', color: '#9b59b6' },
    rogue: { perk: 'See exact vote percentages', color: '#2c3e50' },
    paladin: { perk: 'Bonus XP for good choices', color: '#d4af37' },
    warlock: { perk: 'Gain XP from dark choices', color: '#8e44ad' },
    bard: { perk: 'Bonus XP for social sharing', color: '#f39c12' },
    druid: { perk: 'Extra vote on nature decisions', color: '#16a085' },
  };
  
  return perks[className.toLowerCase()] || { perk: 'Unknown class perk', color: '#666' };
}

export function getRacialBonus(raceName: string): string {
  const bonuses: Record<string, string> = {
    human: '+10% XP gain from all sources',
    elf: 'Extended voting time awareness (+30 minutes)',
    dwarf: 'Double rewards from donation tiers',
    tiefling: 'Bonus XP when morally ambiguous choices win',
    dragonborn: 'Extra vote strength in dragon-related episodes',
    halfling: 'Chance for bonus XP on failed predictions',
  };
  
  return bonuses[raceName.toLowerCase()] || 'Unknown racial bonus';
}