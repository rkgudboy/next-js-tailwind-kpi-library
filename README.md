# KPI Library - Analytics Dashboard Components

A modern, comprehensive library of KPIs, data visualizations, layouts, and storyboards for building powerful analytics dashboards. Built with Next.js, React, TypeScript, and Tailwind CSS.

## 📢 Recent Updates

- ✅ Added Jest and React Testing Library for comprehensive unit testing
- ✅ Fixed all TypeScript and ESLint errors for production-ready builds
- ✅ Updated metadata for better SEO and branding
- ✅ Added helper utilities with full test coverage
- ✅ Created detailed onboarding documentation with screenshots

## 🚀 Features

- **📊 Rich Component Library**: Extensive collection of KPI cards, data visualizations, layouts, and storyboard templates
- **🔍 Smart Search**: Quickly find assets with real-time search functionality
- **💡 Interactive Onboarding**: Guided tour with coach marks to help new users get started
- **⭐ Favorites System**: Save and organize your frequently used components
- **🔐 Access Management**: Request access to premium components with built-in approval workflow
- **📱 Responsive Design**: Fully responsive UI that works seamlessly across all devices
- **🎨 Modern UI/UX**: Clean, intuitive interface built with Tailwind CSS
- **⚡ High Performance**: Optimized for fast loading and smooth interactions

## 📋 Table of Contents

- [Getting Started](#-getting-started)
- [Installation](#-installation)
- [Development](#-development)
- [Project Structure](#-project-structure)
- [Features Overview](#-features-overview)
- [Onboarding Guide](#-onboarding-guide)
- [Technologies Used](#-technologies-used)
- [Contributing](#-contributing)
- [License](#-license)

## 🏁 Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn package manager
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/rkgudboy/next-js-tailwind-kpi-library.git
cd next-js-tailwind-kpi-library
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🛠️ Development

### Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Add any environment variables here
NEXT_PUBLIC_API_URL=your_api_url
```

## 📁 Project Structure

```
next-js-tailwind-kpi-library/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── modals/           # Modal components
│   ├── cards/            # Card components
│   ├── SearchBar.tsx     # Search functionality
│   ├── Navigation.tsx    # Navigation tabs
│   └── ...
├── hooks/                # Custom React hooks
├── types/                # TypeScript type definitions
├── utils/                # Utility functions
│   ├── mockData.ts       # Mock data for components
│   └── helpers.ts        # Helper functions
├── public/               # Static assets
│   └── screenshots/      # Application screenshots
├── __tests__/            # Test files
│   ├── components/       # Component tests
│   └── utils/           # Utility function tests
├── jest.config.js        # Jest configuration
├── jest.setup.js         # Jest setup file
├── README.md             # Project documentation
├── ONBOARDING.md         # Onboarding guide with screenshots
└── package.json          # Project dependencies
```

## 🎯 Features Overview

### 1. Component Categories

- **KPIs**: Key performance indicators with various metrics and visualizations
- **Data Visualizations**: Charts, graphs, and data representation components
- **Layouts**: Pre-built dashboard layouts for different use cases
- **Storyboards**: Complete dashboard templates and workflows

### 2. Search and Filter

- Real-time search across all components
- Filter by category, access status, and favorites
- Smart suggestions and autocomplete

### 3. Access Management

- View component details and previews
- Request access to premium components
- Track request status (pending/approved)
- Bulk request functionality

### 4. Favorites System

- Add components to favorites for quick access
- Organize frequently used components
- Persistent favorites across sessions

### 5. Interactive Features

- Modal previews with detailed information
- Copy component code snippets
- Export and integration options
- Responsive grid layout

## 📚 Onboarding Guide

For a detailed walkthrough of the application features with screenshots, see our [Onboarding Guide](./ONBOARDING.md).

## 🧪 Testing

The project uses Jest and React Testing Library for unit testing. Tests are located in the `__tests__` directory.

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode during development
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Test Structure

- **Component Tests**: Located in `__tests__/components/`
- **Utility Tests**: Located in `__tests__/utils/`
- **Setup**: Global test setup in `jest.setup.js`
- **Configuration**: Jest configuration in `jest.config.js`

### Writing Tests

Example test structure:
```typescript
import { render, screen } from '@testing-library/react';
import { ComponentName } from '@/components/ComponentName';

describe('ComponentName', () => {
  it('renders correctly', () => {
    render(<ComponentName />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
});
```

## 🔧 Technologies Used

- **Frontend Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: Custom components with Heroicons
- **State Management**: React hooks and context
- **Testing**: [Jest](https://jestjs.io/) with [React Testing Library](https://testing-library.com/react)
- **Build Tool**: Next.js built-in bundler
- **Utilities**: Lodash for debouncing

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Coding Standards

- Follow TypeScript best practices
- Use functional components with hooks
- Maintain consistent code formatting
- Write meaningful commit messages
- Add appropriate comments for complex logic

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Design inspiration from modern dashboard interfaces
- Icons from [Heroicons](https://heroicons.com/)
- Built with love by the development team

---

For more information or support, please open an issue in the GitHub repository.