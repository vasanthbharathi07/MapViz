#!/bin/bash

# Run ESLint in the React app
echo "Running ESLint..."

# Navigate to the React app directory (if needed)
# cd /path/to/your/react-app

# Run ESLint with the desired options
npx eslint ./src --ext .js,.jsx,.ts,.tsx

# Capture exit code of ESLint
EXIT_CODE=$?

if [ $EXIT_CODE -ne 0 ]; then
  echo "ESLint found issues."
  exit 1
else
  echo "ESLint passed successfully."
  exit 0
fi
