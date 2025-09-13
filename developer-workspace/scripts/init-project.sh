#!/bin/bash

PROJECT_NAME=$1
PROJECT_TYPE=$2

echo "🚀 Initializing $PROJECT_NAME ($PROJECT_TYPE)..."

# Create project directory
mkdir -p projects/$PROJECT_NAME
cd projects/$PROJECT_NAME

# Initialize git
git init
git branch -M main

# Create base structure
mkdir -p {src,tests,docs,config,scripts}

# Create appropriate package.json based on type
case $PROJECT_TYPE in
  "react")
    cat > package.json << 'PACKAGE'
{
  "name": "PROJECT_NAME",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "test": "jest",
    "start": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "vite": "^5.0.0",
    "@vitejs/plugin-react": "^4.0.0",
    "jest": "^29.0.0"
  }
}
PACKAGE
    ;;
  "nextjs")
    cat > package.json << 'PACKAGE'
{
  "name": "PROJECT_NAME",
  "version": "1.0.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "test": "jest"
  },
  "dependencies": {
    "next": "14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  }
}
PACKAGE
    ;;
  "express")
    cat > package.json << 'PACKAGE'
{
  "name": "PROJECT_NAME",
  "version": "1.0.0",
  "scripts": {
    "dev": "nodemon src/index.js",
    "start": "node src/index.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.18.0",
    "cors": "^2.8.5",
    "dotenv": "^16.0.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.0",
    "jest": "^29.0.0"
  }
}
PACKAGE
    ;;
esac

# Replace PROJECT_NAME placeholder
sed -i "s/PROJECT_NAME/$PROJECT_NAME/g" package.json

# CRITICAL: Install dependencies immediately
echo "📦 Installing dependencies..."
npm install

# Create .gitignore
cat > .gitignore << 'GITIGNORE'
node_modules/
dist/
build/
.env
.env.local
*.log
.DS_Store
coverage/
.next/
.cache/
GITIGNORE

# Create README with progress tracking
cat > README.md << 'README'
# PROJECT_NAME

## 📊 Build Progress

### Components
- [ ] Frontend (0%)
- [ ] Backend (0%)
- [ ] Database (0%)
- [ ] API (0%)
- [ ] Authentication (0%)
- [ ] Testing (0%)
- [ ] Deployment (0%)

### Worktrees
Run `git worktree list` to see all active branches

### Quick Commands
- `npm run dev` - Start development
- `npm test` - Run tests
- `npm run build` - Build for production

## 🤖 Active Agents
- master-orchestrator (managing)
- dependency-manager (packages)
- context-manager (state)
README

sed -i "s/PROJECT_NAME/$PROJECT_NAME/g" README.md

# Commit initial structure
git add .
git commit -m "Initial project structure with dependencies"

# Create parallel worktrees
echo "🔄 Setting up parallel development branches..."

git worktree add -b frontend ../../$PROJECT_NAME-frontend
git worktree add -b backend ../../$PROJECT_NAME-backend  
git worktree add -b database ../../$PROJECT_NAME-database
git worktree add -b testing ../../$PROJECT_NAME-testing
git worktree add -b deployment ../../$PROJECT_NAME-deployment

# Install dependencies in each worktree
for worktree in ../../$PROJECT_NAME-*; do
  if [ -d "$worktree" ]; then
    echo "📦 Installing dependencies in $(basename $worktree)..."
    cp package.json $worktree/
    cp .gitignore $worktree/
    (cd $worktree && npm install)
  fi
done

echo "✅ Project $PROJECT_NAME initialized successfully!"
echo "📁 Main project: projects/$PROJECT_NAME"
echo "🔄 Worktrees created for parallel development"
echo "📦 All dependencies installed"
