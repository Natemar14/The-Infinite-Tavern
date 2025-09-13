# Quick commands for development

# Start new project
alias new-project='./scripts/init-project.sh'

# Monitor progress
alias monitor='./scripts/monitor.sh'

# Fix dependencies
fix-deps() {
  cd projects/$1
  rm -rf node_modules package-lock.json
  npm install
  echo "✅ Dependencies fixed for $1"
}

# Run project
run-project() {
  cd projects/$1
  npm run dev
}

# Check all projects
alias check-all='for p in projects/*/; do echo "Checking $(basename $p)..."; cd $p && npm test; cd ../..; done'

# Update all worktrees
update-worktrees() {
  cd projects/$1
  git worktree list | while read line; do
    WORKTREE=$(echo $line | awk '{print $1}')
    echo "Updating $WORKTREE..."
    cd $WORKTREE && git pull && npm install
  done
}
