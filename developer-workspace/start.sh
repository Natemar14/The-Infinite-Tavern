#!/bin/bash

echo "🚀 ====================================="
echo "   DEVELOPER WORKSPACE CONTROL CENTER"
echo "===================================== 🚀"
echo ""
echo "What would you like to do?"
echo ""
echo "1) Start new project"
echo "2) Monitor progress"
echo "3) Open project"
echo "4) Install/fix dependencies"
echo "5) Show all worktrees"
echo "6) Run all tests"
echo "7) Deploy project"
echo ""
read -p "Enter choice (1-7): " choice

case $choice in
  1)
    read -p "Project name: " name
    echo "Project type:"
    echo "1) React"
    echo "2) Next.js"
    echo "3) Express API"
    read -p "Enter type (1-3): " type
    
    case $type in
      1) PROJECT_TYPE="react" ;;
      2) PROJECT_TYPE="nextjs" ;;
      3) PROJECT_TYPE="express" ;;
    esac
    
    ./scripts/init-project.sh $name $PROJECT_TYPE
    ;;
  2)
    ./scripts/monitor.sh
    ;;
  3)
    ls projects/
    read -p "Enter project name: " name
    cd projects/$name && code .
    ;;
  4)
    read -p "Project name: " name
    cd projects/$name
    echo "🔧 Fixing dependencies..."
    rm -rf node_modules package-lock.json
    npm install
    echo "✅ Dependencies fixed!"
    ;;
  5)
    for project in projects/*/; do
      echo "Project: $(basename $project)"
      cd $project && git worktree list
      cd ../..
    done
    ;;
  6)
    for project in projects/*/; do
      echo "Testing: $(basename $project)"
      cd $project && npm test
      cd ../..
    done
    ;;
  7)
    read -p "Project name: " name
    cd projects/$name
    npm run build
    echo "✅ Project built and ready for deployment!"
    ;;
esac
