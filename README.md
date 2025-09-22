# Offer Benchmarking Agent

A sophisticated banking offer benchmarking platform powered by AI that helps banks analyze their offer portfolios against competitors.

## Features

- **AI-Powered Chat Interface**: Natural language interaction powered by Perplexity AI
- **Competitive Analysis**: Compare offers across multiple categories and competitors
- **Real-time Insights**: Get actionable recommendations and market insights
- **Interactive Visualizations**: Charts, tables, and scorecards for data analysis
- **Merchant Tracking**: Monitor new merchant partnerships across competitors
- **Export Capabilities**: Download reports in multiple formats

## Setup

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Perplexity API key (optional but recommended)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```

4. Add your Perplexity API key to `.env`:
   ```
   VITE_PERPLEXITY_API_KEY=your_perplexity_api_key_here
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## Perplexity API Integration

This application uses Perplexity AI for intelligent chat responses. To get the best experience:

1. Sign up at [Perplexity AI](https://www.perplexity.ai/)
2. Get your API key from the dashboard
3. Add it to your `.env` file as `VITE_PERPLEXITY_API_KEY`

### Without API Key

The application will work without the Perplexity API key using fallback responses, but you'll get much better, contextual AI responses with the API configured.

## Usage

1. **Start Benchmarking**: Begin by providing your bank's name and offer data
2. **Select Competitors**: Choose from suggested competitors or add custom ones
3. **Analyze Results**: View comprehensive analysis across multiple dimensions
4. **Ask Questions**: Use natural language to get specific insights about your data

## API Configuration

The Perplexity API integration supports:
- Real-time chat responses
- Banking industry expertise
- Contextual analysis and recommendations
- Market trend insights

## Technologies Used

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **AI Integration**: Perplexity API
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Styling**: Tailwind CSS

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details