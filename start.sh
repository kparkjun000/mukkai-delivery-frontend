#!/bin/bash
echo "🚀 Starting Mukkai Delivery Frontend with Express Server"
echo "📁 Current directory: $(pwd)"
echo "📋 Files in dist/:"
ls -la dist/ || echo "❌ No dist folder found"
echo "🌍 Starting Express server on port $PORT..."
node server.js