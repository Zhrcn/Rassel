# RASEEL Innovation Company

A modern, responsive website for RASEEL Innovation Company - a leading general contracting company specializing in innovative construction solutions.

## 🚀 Features

- **Modern Design**: Clean, professional design with smooth animations and transitions
- **Responsive Layout**: Fully responsive design that works on all devices
- **Dark/Light Theme**: Toggle between light and dark themes with persistent storage
- **Tailwind CSS**: Built with Tailwind CSS for rapid development and consistent styling
- **Accessibility**: WCAG compliant with proper focus states and keyboard navigation
- **Performance**: Optimized for fast loading and smooth user experience

## 🛠️ Technology Stack

- **HTML5**: Semantic markup structure
- **Tailwind CSS**: Utility-first CSS framework via CDN
- **JavaScript**: Interactive functionality and theme management
- **Responsive Design**: Mobile-first approach with breakpoint optimization

## 📁 Project Structure

```
Rassel/
├── index.html          # Homepage with hero, services, and contact sections
├── about.html          # About us page with company story and values
├── services.html       # Services overview with detailed service cards
├── projects.html       # Projects showcase with filtering and search
├── project.html        # Individual project detail pages
├── script.js           # JavaScript functionality and theme toggle
├── projects-data.js    # Project data for dynamic content
├── styles.css          # Custom CSS (legacy - now using Tailwind CDN)
└── README.md           # Project documentation
```

## 🎨 Design System

### Color Palette
- **Primary**: Gray scale (50-900) for text and backgrounds
- **Accent**: Golden brown (#d5ad65) for highlights and CTAs
- **Supporting**: Semantic colors for success, warning, and error states

### Typography
- **Primary Font**: Inter (with Poppins fallback)
- **Display Font**: Playfair Display for headings
- **System Fonts**: Fallback to system UI fonts

### Components
- **Cards**: Consistent card design with hover effects
- **Buttons**: Primary, secondary, and ghost button styles
- **Forms**: Accessible form elements with focus states
- **Navigation**: Responsive navigation with mobile menu

## 🔧 Key Features

### Theme System
- Automatic theme detection based on system preferences
- Persistent theme storage using localStorage
- Smooth transitions between light and dark modes
- Consistent color scheme across all themes

### Responsive Design
- Mobile-first approach
- Breakpoint system: sm (640px), md (768px), lg (1024px), xl (1280px)
- Flexible grid layouts
- Optimized mobile navigation

### Accessibility
- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Focus management
- High contrast mode support

### Performance
- Optimized images with responsive sizing
- Minimal JavaScript bundle
- Efficient CSS with Tailwind's utility classes
- Fast loading times

## 🚀 Getting Started

1. **Clone or download** the project files
2. **Open** `index.html` in your web browser
3. **Navigate** through the different pages using the navigation menu
4. **Toggle themes** using the theme toggle button in the header

## 📱 Pages Overview

### Homepage (`index.html`)
- Hero section with company introduction
- Services overview
- Statistics and achievements
- Contact form and information

### About (`about.html`)
- Company story and mission
- Core values and principles
- Team statistics and achievements
- Call-to-action section

### Services (`services.html`)
- Comprehensive service offerings
- Detailed service descriptions
- Service categories and specialties
- Contact and quote requests

### Projects (`projects.html`)
- Project portfolio showcase
- Search and filtering capabilities
- Grid and list view options
- Project categorization

### Project Details (`project.html`)
- Individual project information
- Project scope and details
- Related project suggestions
- Contact information

## 🎯 Customization

### Colors
Modify the Tailwind config in each HTML file to change the color scheme:

```javascript
tailwind.config = {
    theme: {
        extend: {
            colors: {
                accent: {
                    500: '#your-color-here'
                }
            }
        }
    }
}
```

### Content
- Update text content directly in the HTML files
- Modify project data in `projects-data.js`
- Adjust images and media content

### Styling
- Use Tailwind utility classes for styling
- Add custom CSS in the `<style>` sections
- Modify component layouts using Tailwind's grid and flexbox utilities

## 🌟 Recent Updates

### Complete UI Transformation
- **All pages** now use the modern design structure from `index.html`
- **Consistent styling** across all pages using Tailwind CSS
- **Modern components** with hover effects and animations
- **Improved typography** and spacing
- **Enhanced accessibility** features

### Design Improvements
- Modern card designs with shadows and hover effects
- Consistent color scheme and typography
- Improved spacing and layout
- Enhanced mobile responsiveness
- Better visual hierarchy

## 📞 Support

For questions or support regarding this website:
- **Email**: info@raseel.com
- **Location**: Saudi Arabia
- **Company**: RASEEL Innovation Company for General Contracting

## 📄 License

© 2024 RASEEL Innovation Company for General Contracting. All rights reserved.

---

**Built with ❤️ using modern web technologies for the construction industry.**
