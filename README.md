# Next.js Feedback System

A modern feedback collection and analysis system built with Next.js, featuring real-time processing and embedded widget capabilities.

## System Architecture

The system consists of four main components:

### Application Layer
- **Frontend**: Next.js client application for submitting feedback
- **Backend Service**: Next.js API routes handling feedback submission
- **Embed Script**: JavaScript widget for embedding feedback forms in external websites

### Background Processing
- **Queue System**: Bull MQ for managing background jobs
- **Analysis Worker**: Lambda function for processing feedback trends
- **Media Storage**: Uploadthing/Cloudinary integration for handling media uploads

### Cloud Infrastructure
- **Caching**: Redis for storing popular feedback topics
- **Database**: PostgreSQL for permanent feedback storage

### Frontend Integration
- Embeddable feedback widget that can be integrated into any website

## Getting Started

### Prerequisites

- Node.js 18 or later
- PostgreSQL
- Redis
- AWS Lambda (for feedback analysis)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/sutharjay1/response.git
cd response
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Configure your environment variables:
- Database connection
- Redis connection
- Cloud storage credentials
- Queue settings

5. Run the development server:
```bash
pnpm run dev
```

### Embedding the Feedback Widget

Add the following script to your website:

```html
<script src="https://your-domain.com/embed.js"></script>
<div id="feedback-widget"></div>
```

## System Architecture
<div align="center">
  <img src="https://utfs.io/f/xi8FFW9wN0K4bPwq2UivN6RHfr2Dx40U9YIXgwWoEyzGnTVM" alt="Response architecture" width="100%" />

  </div>


## Features

- 📝 Real-time feedback collection
- 📊 Automated feedback analysis
- 🔄 Background processing with Bull MQ
- 💾 Reliable data storage with PostgreSQL
- ⚡ Fast caching with Redis
- 🖼️ Media upload support
- 📱 Responsive embedded widget

## API Documentation

### Submit Feedback
```typescript
POST /api/feedback
{
  "type": string,
  "content": string,
  "metadata": {
    "userId": string,
    "page": string
  }
}
```

### Get Feedback Analytics
```typescript
GET /api/feedback/analytics
Query Parameters:
- startDate: string
- endDate: string
- type: string
```

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Support

For support, email support@your-domain.com or open an issue in the GitHub repository.