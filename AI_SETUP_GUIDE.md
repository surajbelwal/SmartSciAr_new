# 🤖 AI Integration Setup Guide

## Step 1: Get Your Free Gemini API Key

1. **Visit Google AI Studio**: Go to https://makersuite.google.com/app/apikey
2. **Sign in** with your Google account
3. **Create API Key**: Click "Create API Key" button
4. **Copy the key**: Save it somewhere safe - you'll need it in the next step

## Step 2: Configure the API Key

1. Open `services/aiService.js` in your project
2. Replace `YOUR_GEMINI_API_KEY_HERE` with your actual API key:

```javascript
const API_KEY = "your-actual-api-key-here";
```

## Step 3: How It Works

### 🎯 Topic-Specific AI

- The AI assistant is **restricted to the current topic only**
- If you ask about unrelated topics, it will redirect you back to the current topic
- Perfect for focused learning!

### 🔧 Smart Prompting System

The AI uses a sophisticated prompt system that:

- **Enforces topic boundaries**: Only answers questions related to the current 3D model topic
- **Educational focus**: Provides clear, student-friendly explanations
- **Practical examples**: Includes real-world applications when possible
- **Length control**: Keeps responses concise (max 200 words)

### 🚀 Features

- **Beautiful chat interface** with animations
- **Real-time responses** from Gemini AI
- **Loading indicators** and error handling
- **Topic context awareness**
- **Seamless navigation** back to the 3D model

## Step 4: Usage

1. **View any 3D model** (Chemistry, Biology, or Physics)
2. **Click "Ask AI"** button below the model
3. **Ask questions** about the current topic
4. **Get instant answers** from the AI assistant

### Example Questions You Can Ask:

- "What is the structure of this molecule?"
- "How does this process work?"
- "What are the main properties?"
- "Can you explain this concept simply?"
- "What are real-world applications?"

## Step 5: Troubleshooting

### API Key Issues:

- Make sure you copied the entire API key
- Check that there are no extra spaces
- Ensure the API key is active in Google AI Studio

### Network Issues:

- Check your internet connection
- The app needs internet to connect to Gemini API

### Topic Restriction:

- If AI seems too restrictive, the topic filtering is working correctly
- Ask more specific questions related to the current topic

## 🎉 You're All Set!

Your AI-powered educational assistant is now ready to help students learn about science topics in a focused, interactive way!

## Technical Details

### AI Service Architecture:

```
services/aiService.js
├── GoogleGenerativeAI integration
├── Topic-specific prompt generation
├── Error handling & validation
└── Response formatting
```

### Navigation Flow:

```
3D Model Screen → Ask AI Button → AI Chat Screen
```

### Data Flow:

```
User Question → AI Service → Gemini API → Formatted Response → Chat UI
```
