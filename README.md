# Ecosystem Onboarding

A modern web application designed to streamline the onboarding process for new ecosystem members. This interactive platform provides a comprehensive introduction to your ecosystem's features, resources, and community.

## Features

- **Interactive Mind Map**: Visual representation of the ecosystem structure and connections
- **Responsive Design**: Optimized for desktop and mobile devices
- **Modern UI**: Built with React, TypeScript, and Tailwind CSS
- **AI Integration**: Powered by Gemini AI for intelligent assistance
- **Real-time Navigation**: Smooth transitions between different sections

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **AI Service**: Google Gemini API
- **Icons**: Lucide React

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- Google Gemini API key

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/JamalDrenthe/ecosystemonboarding.git
   cd ecosystemonboarding
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create a .env.local file
   echo "GEMINI_API_KEY=your_api_key_here" > .env.local
   ```
   Replace `your_api_key_here` with your actual Gemini API key.

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000` to view the application.

## Project Structure

```
ecosystemonboarding/
├── components/          # React components
│   ├── MindMap.tsx     # Interactive mind map component
│   └── Sidebar.tsx     # Navigation sidebar
├── services/           # API services
│   └── geminiService.ts # Gemini AI integration
├── data.ts            # Application data and configuration
├── types.ts           # TypeScript type definitions
├── App.tsx            # Main application component
└── index.tsx          # Application entry point
```

## Usage

- Navigate through the ecosystem using the sidebar menu
- Interact with the mind map to explore connections
- Use the AI assistant for guidance and information
- Access resources and documentation through integrated links

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions, please open an issue on the GitHub repository.

---

Built with ❤️ for the ecosystem community
