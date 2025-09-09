#!/bin/bash
# Setup parallel development worktrees

echo "Setting up parallel development worktrees..."

# Create worktrees for parallel development
git worktree add -b avatar-system ../franchise-avatar
git worktree add -b donation-engine ../franchise-donations  
git worktree add -b video-pipeline ../franchise-video
git worktree add -b voting-system ../franchise-voting
git worktree add -b admin-dashboard ../franchise-admin
git worktree add -b ai-director ../franchise-ai

echo "✅ Worktrees created for parallel development!"
echo "Each team can now work independently:"
echo "  - Avatar team: cd ../franchise-avatar"
echo "  - Donation team: cd ../franchise-donations"
echo "  - Video team: cd ../franchise-video"
echo "  - Voting team: cd ../franchise-voting"
echo "  - Admin team: cd ../franchise-admin"
echo "  - AI team: cd ../franchise-ai"
