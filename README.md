# Product Management System

A modern, responsive React application for managing products with a beautiful Material-UI design and dark/light theme switching.

## ✨ Features

- **Modern UI/UX**: Built with Material-UI (MUI) for a professional, polished look
- **Theme Switching**: Toggle between dark and light themes with persistent storage
- **Responsive Design**: Mobile-first approach with responsive navigation and layouts
- **Interactive Dashboard**: Beautiful statistics cards and data tables
- **Form Validation**: Enhanced forms with real-time validation and error handling
- **Smooth Animations**: Subtle hover effects and transitions throughout the app
- **Accessibility**: Proper focus management and keyboard navigation support

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Product-Management-React
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠️ Built With

- **React 19** - Modern React with hooks and functional components
- **Material-UI (MUI)** - Comprehensive UI component library
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **Emotion** - CSS-in-JS styling solution

## 🎨 Design Features

### Theme System
- **Light Theme**: Clean, bright interface with subtle shadows
- **Dark Theme**: Easy on the eyes with dark backgrounds and proper contrast
- **Persistent**: Theme preference is saved in localStorage
- **Smooth Transitions**: Elegant theme switching animations

### Component Highlights
- **Navigation**: Responsive navbar with mobile drawer and theme toggle
- **Dashboard**: Interactive statistics cards with gradient backgrounds
- **Data Tables**: Enhanced tables with hover effects and status indicators
- **Forms**: Modern form inputs with validation and error handling
- **Cards**: Beautiful card layouts with shadows and hover effects

### Color Palette
- **Primary**: Blue (#1976d2) with gradient variations
- **Secondary**: Pink (#dc004e) for accents
- **Success**: Green for positive actions
- **Warning**: Orange for pending states
- **Error**: Red for destructive actions

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Breakpoints**: Responsive layouts for all screen sizes
- **Touch Friendly**: Proper touch targets and mobile navigation
- **Performance**: Optimized for smooth scrolling and interactions

## 🔧 Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (not recommended)

## 📁 Project Structure

```
src/
├── component/          # React components
│   ├── Home.jsx       # Dashboard with product list
│   ├── AddProduct.jsx # Add new product form
│   ├── EditProduct.jsx# Edit existing product form
│   └── Navbar.js      # Navigation component
├── context/           # React context providers
│   └── ThemeContext.js# Theme management
├── service/           # API services
│   └── productservice.js
├── App.js            # Main application component
└── index.js          # Application entry point
```

## 🎯 Key Components

### Home Component
- Product dashboard with statistics cards
- Interactive data table with sorting and filtering
- Action buttons for edit and delete operations
- Responsive grid layout

### AddProduct Component
- Clean form design with validation
- Status selection dropdown
- Real-time error feedback
- Success notifications

### EditProduct Component
- Pre-populated form fields
- Loading states and error handling
- Consistent with add product design
- Smooth navigation flow

### Navbar Component
- Responsive navigation with mobile drawer
- Theme toggle button
- Active route highlighting
- Beautiful gradient branding

## 🌟 Future Enhancements

- [ ] Search and filtering capabilities
- [ ] Pagination for large datasets
- [ ] Export functionality (CSV, PDF)
- [ ] User authentication and roles
- [ ] Real-time updates with WebSocket
- [ ] Advanced analytics and charts
- [ ] Multi-language support
- [ ] Offline functionality with PWA

## 🤝 Contributing

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Material-UI team for the excellent component library
- React community for the amazing ecosystem
- Create React App for the project scaffolding
