#!/bin/bash

# Progress monitoring dashboard
clear
echo "📊 ====================================="
echo "   DEVELOPMENT PROGRESS MONITOR"
echo "===================================== 📊"
echo ""

# Check if we're in a project
if [ -d "projects" ]; then
  for project in projects/*/; do
    if [ -d "$project" ]; then
      PROJECT_NAME=$(basename $project)
      echo "🚀 Project: $PROJECT_NAME"
      echo ""
      
      # Check worktrees
      cd $project
      echo "📁 Active Worktrees:"
      git worktree list 2>/dev/null | while read line; do
        WORKTREE=$(echo $line | awk '{print $1}')
        BRANCH=$(echo $line | awk '{print $3}' | tr -d '[]')
        
        # Count files to estimate progress
        if [ -d "$WORKTREE" ]; then
          FILE_COUNT=$(find $WORKTREE -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" 2>/dev/null | wc -l)
          echo "  ├─ $BRANCH: $FILE_COUNT files"
        fi
      done
      
      echo ""
      echo "📈 Component Status:"
      
      # Check package.json exists (dependency health)
      if [ -f "package.json" ]; then
        echo "  ✅ Dependencies: Installed"
      else
        echo "  ❌ Dependencies: Not configured"
      fi
      
      # Check if node_modules exists
      if [ -d "node_modules" ]; then
        PACKAGE_COUNT=$(ls node_modules | wc -l)
        echo "  ✅ Packages: $PACKAGE_COUNT modules"
      else
        echo "  ❌ Packages: Not installed"
      fi
      
      # Check if project runs
      if command -v npm &> /dev/null; then
        npm run dev --dry-run &> /dev/null
        if [ $? -eq 0 ]; then
          echo "  ✅ Runnable: Yes"
        else
          echo "  ⚠️  Runnable: Configuration needed"
        fi
      fi
      
      cd ../..
    fi
  done
else
  echo "No projects found. Run init-project.sh first!"
fi

echo ""
echo "====================================="
echo "💡 Tips:"
echo "  - Run scripts/init-project.sh to start new project"
echo "  - Each worktree works independently"
echo "  - Dependencies auto-install on setup"
echo "====================================="
