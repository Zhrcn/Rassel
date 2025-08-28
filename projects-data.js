(function () {
  'use strict';

  var projects = [
    {
      slug: 'boulevard',
      title: 'BOULEVARD',
      image: 'https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?q=80&w=1740&auto=format&fit=crop',
      category: 'Commercial / Public Space',
      description: 'A prestigious commercial development featuring modern retail spaces, entertainment venues, and public gathering areas.',
      location: 'Riyadh, Saudi Arabia',
      client: 'Private Developer',
      year: '2023',
      scope: ['Commercial Construction', 'Public Space Design', 'Infrastructure Development', 'Landscaping'],
      area: '25,000 sqm',
      duration: '18 months',
      highlights: ['Modern architectural design', 'Sustainable building practices', 'Advanced MEP systems', 'Public art integration']
    },
    {
      slug: 'ecoclean',
      title: 'ECOCLEAN',
      image: 'https://images.unsplash.com/photo-1560185008-b033106af2d0?q=80&w=1740&auto=format&fit=crop',
      category: 'Industrial / Facility',
      description: 'State-of-the-art industrial facility designed for sustainable manufacturing and environmental responsibility.',
      location: 'Jeddah, Saudi Arabia',
      client: 'EcoClean Industries',
      year: '2023',
      scope: ['Industrial Construction', 'MEP Systems', 'Environmental Controls', 'Safety Systems'],
      area: '45,000 sqm',
      duration: '24 months',
      highlights: ['LEED Gold certification', 'Zero-waste design', 'Advanced automation', 'Green energy systems']
    },
    {
      slug: 'neom',
      title: 'NEOM',
      image: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1740&auto=format&fit=crop',
      category: 'Urban Development',
      description: 'Part of the visionary NEOM smart city project, featuring cutting-edge technology and sustainable urban planning.',
      location: 'NEOM Region, Saudi Arabia',
      client: 'NEOM Company',
      year: '2024',
      scope: ['Smart City Infrastructure', 'Sustainable Development', 'Technology Integration', 'Urban Planning'],
      area: '150,000 sqm',
      duration: '36 months',
      highlights: ['Smart city technology', '100% renewable energy', 'Autonomous systems', 'Innovative architecture']
    },
    {
      slug: 'civil-work',
      title: 'CIVIL WORK',
      image: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?q=80&w=1740&auto=format&fit=crop',
      category: 'Infrastructure',
      description: 'Comprehensive civil engineering project including roads, bridges, and utility infrastructure development.',
      location: 'Dammam, Saudi Arabia',
      client: 'Ministry of Transport',
      year: '2023',
      scope: ['Road Construction', 'Bridge Engineering', 'Utility Infrastructure', 'Drainage Systems'],
      area: '80,000 sqm',
      duration: '30 months',
      highlights: ['Advanced engineering solutions', 'Durable materials', 'Traffic optimization', 'Environmental protection']
    },
    {
      slug: 'al-falak-building',
      title: 'AL-FALAK BUILDING',
      image: 'https://images.unsplash.com/photo-1523419409543-07c5b3c9c7f0?q=80&w=1740&auto=format&fit=crop',
      category: 'Corporate',
      description: 'Modern corporate headquarters featuring sustainable design, smart building technology, and premium finishes.',
      location: 'Riyadh, Saudi Arabia',
      client: 'Al-Falak Group',
      year: '2023',
      scope: ['Corporate Construction', 'Smart Building Systems', 'Premium Finishing', 'Landscaping'],
      area: '35,000 sqm',
      duration: '22 months',
      highlights: ['Smart building automation', 'Premium materials', 'Sustainable design', 'Employee wellness features']
    },
    {
      slug: 'aramco-fence',
      title: 'ARAMCO FENCE',
      image: 'https://images.unsplash.com/photo-1541976076758-347942db1970?q=80&w=1740&auto=format&fit=crop',
      category: 'Industrial / Security',
      description: 'High-security perimeter fencing system for critical infrastructure with advanced monitoring capabilities.',
      location: 'Dhahran, Saudi Arabia',
      client: 'Saudi Aramco',
      year: '2023',
      scope: ['Security Fencing', 'Surveillance Systems', 'Access Control', 'Perimeter Security'],
      area: '12,000 sqm',
      duration: '8 months',
      highlights: ['Advanced security features', '24/7 monitoring', 'Durable materials', 'Rapid deployment']
    },
    {
      slug: 'fgs-jubail-city',
      title: 'FGS – JUBAIL CITY',
      image: 'https://images.unsplash.com/photo-1541888936425-d81bb19240f5?q=80&w=1740&auto=format&fit=crop',
      category: 'Government / City',
      description: 'Government facility development featuring modern administrative spaces and public service areas.',
      location: 'Jubail, Saudi Arabia',
      client: 'Jubail Municipality',
      year: '2023',
      scope: ['Government Construction', 'Administrative Spaces', 'Public Services', 'Infrastructure'],
      area: '28,000 sqm',
      duration: '20 months',
      highlights: ['Modern government design', 'Public accessibility', 'Efficient workflows', 'Sustainable practices']
    },
    {
      slug: 'city-bike',
      title: 'CITY BIKE',
      image: 'https://images.unsplash.com/photo-1481070555726-e2fe8357725c?q=80&w=1740&auto=format&fit=crop',
      category: 'Public / Mobility',
      description: 'Urban mobility infrastructure including bike lanes, stations, and supporting facilities for sustainable transportation.',
      location: 'Khobar, Saudi Arabia',
      client: 'Khobar Municipality',
      year: '2024',
      scope: ['Mobility Infrastructure', 'Bike Lanes', 'Station Construction', 'Supporting Facilities'],
      area: '15,000 sqm',
      duration: '12 months',
      highlights: ['Sustainable transportation', 'Modern infrastructure', 'Public accessibility', 'Environmental benefits']
    },
    {
      slug: 'shanab-restaurant',
      title: 'SHANAB RESTAURANT',
      image: 'https://images.unsplash.com/photo-1564758866811-54db4c5a8f62?q=80&w=1740&auto=format&fit=crop',
      category: 'F&B',
      description: 'Contemporary restaurant design featuring modern aesthetics, efficient kitchen layouts, and premium dining experiences.',
      location: 'Jeddah, Saudi Arabia',
      client: 'Shanab Group',
      year: '2023',
      scope: ['Restaurant Construction', 'Kitchen Design', 'Interior Finishing', 'HVAC Systems'],
      area: '2,500 sqm',
      duration: '6 months',
      highlights: ['Modern restaurant design', 'Efficient kitchen layout', 'Premium finishes', 'Optimal customer experience']
    },
    {
      slug: 'tricycle',
      title: 'TRICYCLE',
      image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=1740&auto=format&fit=crop',
      category: 'Retail / Concept',
      description: 'Innovative retail concept store featuring flexible spaces, modern design, and interactive customer experiences.',
      location: 'Riyadh, Saudi Arabia',
      client: 'Tricycle Retail',
      year: '2023',
      scope: ['Retail Construction', 'Concept Design', 'Interactive Spaces', 'Modern Finishing'],
      area: '1,800 sqm',
      duration: '5 months',
      highlights: ['Innovative retail design', 'Interactive spaces', 'Modern aesthetics', 'Customer engagement']
    },
    {
      slug: 'burger-fi',
      title: 'BURGER FI',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1740&auto=format&fit=crop',
      category: 'F&B',
      description: 'Fast-casual restaurant chain featuring efficient service layouts, modern branding, and consistent quality.',
      location: 'Multiple Locations',
      client: 'Burger Fi International',
      year: '2023-2024',
      scope: ['Restaurant Construction', 'Chain Standardization', 'Efficient Layouts', 'Brand Integration'],
      area: '1,200 sqm per location',
      duration: '4 months per location',
      highlights: ['Chain standardization', 'Efficient operations', 'Modern branding', 'Consistent quality']
    },
    {
      slug: 'the-hub-co',
      title: 'THE HUB CO',
      image: 'https://images.unsplash.com/photo-1521337585582-63c5421bb9b7?q=80&w=1740&auto=format&fit=crop',
      category: 'Retail / Community',
      description: 'Community retail hub featuring mixed-use spaces, community gathering areas, and sustainable design principles.',
      location: 'Dammam, Saudi Arabia',
      client: 'Hub Development Co',
      year: '2024',
      scope: ['Mixed-Use Development', 'Community Spaces', 'Retail Construction', 'Sustainable Design'],
      area: '18,000 sqm',
      duration: '16 months',
      highlights: ['Community-focused design', 'Mixed-use spaces', 'Sustainable practices', 'Social interaction']
    },
    {
      slug: 'elephant',
      title: 'ELEPHANT',
      image: 'https://images.unsplash.com/photo-1475483768296-6163e08872a1?q=80&w=1740&auto=format&fit=crop',
      category: 'Retail / Concept',
      description: 'Unique retail concept featuring innovative design, interactive elements, and memorable customer experiences.',
      location: 'Khobar, Saudi Arabia',
      client: 'Elephant Retail',
      year: '2023',
      scope: ['Concept Retail', 'Innovative Design', 'Interactive Elements', 'Premium Finishing'],
      area: '2,200 sqm',
      duration: '7 months',
      highlights: ['Unique concept design', 'Interactive elements', 'Memorable experiences', 'Premium quality']
    },
    {
      slug: 'stellar',
      title: 'STELLAR',
      image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1740&auto=format&fit=crop',
      category: 'Retail / Concept',
      description: 'Premium retail concept featuring luxury finishes, sophisticated design, and exceptional customer service spaces.',
      location: 'Riyadh, Saudi Arabia',
      client: 'Stellar Retail Group',
      year: '2024',
      scope: ['Luxury Retail', 'Premium Finishing', 'Sophisticated Design', 'Customer Service'],
      area: '3,500 sqm',
      duration: '9 months',
      highlights: ['Luxury finishes', 'Sophisticated design', 'Premium materials', 'Exceptional service']
    },
    {
      slug: 'jamd',
      title: 'JAMD',
      image: 'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?q=80&w=1740&auto=format&fit=crop',
      category: 'Retail / Concept',
      description: 'Modern retail concept featuring contemporary design, flexible spaces, and innovative customer engagement.',
      location: 'Jeddah, Saudi Arabia',
      client: 'Jamd Retail',
      year: '2023',
      scope: ['Contemporary Retail', 'Flexible Spaces', 'Innovative Design', 'Customer Engagement'],
      area: '2,800 sqm',
      duration: '6 months',
      highlights: ['Contemporary design', 'Flexible spaces', 'Innovation focus', 'Customer engagement']
    },
    {
      slug: 'qnad',
      title: 'QNAD',
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1740&auto=format&fit=crop',
      category: 'Retail / Concept',
      description: 'Dynamic retail space featuring adaptive layouts, modern aesthetics, and enhanced shopping experiences.',
      location: 'Khobar, Saudi Arabia',
      client: 'Qnad Retail',
      year: '2024',
      scope: ['Dynamic Retail', 'Adaptive Layouts', 'Modern Aesthetics', 'Enhanced Shopping'],
      area: '2,100 sqm',
      duration: '5 months',
      highlights: ['Dynamic design', 'Adaptive layouts', 'Modern aesthetics', 'Enhanced experiences']
    },
    {
      slug: 'fudge-and-co',
      title: 'FUDGE & CO.',
      image: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?q=80&w=1740&auto=format&fit=crop',
      category: 'F&B',
      description: 'Artisanal dessert café featuring cozy atmospheres, premium materials, and delightful customer experiences.',
      location: 'Riyadh, Saudi Arabia',
      client: 'Fudge & Co.',
      year: '2023',
      scope: ['Café Construction', 'Cozy Atmospheres', 'Premium Materials', 'Customer Experience'],
      area: '1,500 sqm',
      duration: '4 months',
      highlights: ['Cozy atmosphere', 'Premium materials', 'Artisanal focus', 'Delightful experiences']
    },
    {
      slug: 'tangent',
      title: 'TANGENT',
      image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1740&auto=format&fit=crop',
      category: 'Retail / Concept',
      description: 'Innovative retail concept featuring cutting-edge design, technology integration, and future-focused customer experiences.',
      location: 'Dammam, Saudi Arabia',
      client: 'Tangent Retail',
      year: '2024',
      scope: ['Innovative Retail', 'Technology Integration', 'Future-Focused Design', 'Customer Experience'],
      area: '3,200 sqm',
      duration: '8 months',
      highlights: ['Cutting-edge design', 'Technology integration', 'Future-focused', 'Innovation leadership']
    },
    {
      slug: 'chemistry-coffee-northern-al-khobar',
      title: 'CHEMISTRY COFFEE – NORTHERN AL-KHOBAR',
      image: 'https://images.unsplash.com/photo-1481833761820-0509d3217039?q=80&w=1740&auto=format&fit=crop',
      category: 'F&B',
      description: 'Specialty coffee shop featuring modern café design, premium coffee equipment, and welcoming customer spaces.',
      location: 'Northern Al-Khobar, Saudi Arabia',
      client: 'Chemistry Coffee',
      year: '2023',
      scope: ['Coffee Shop Construction', 'Modern Café Design', 'Premium Equipment', 'Welcoming Spaces'],
      area: '1,200 sqm',
      duration: '3 months',
      highlights: ['Specialty coffee focus', 'Modern design', 'Premium equipment', 'Welcoming atmosphere']
    },
    {
      slug: 'chemistry-coffee-tabuk-boulevard',
      title: 'CHEMISTRY COFFEE – TABUK BOULEVARD',
      image: 'https://images.unsplash.com/photo-1481833761820-0509d3217039?q=80&w=1740&auto=format&fit=crop',
      category: 'F&B',
      description: 'Premium coffee destination featuring sophisticated design, premium finishes, and exceptional coffee experiences.',
      location: 'Tabuk Boulevard, Saudi Arabia',
      client: 'Chemistry Coffee',
      year: '2024',
      scope: ['Premium Coffee Shop', 'Sophisticated Design', 'Premium Finishes', 'Exceptional Experiences'],
      area: '1,800 sqm',
      duration: '4 months',
      highlights: ['Premium destination', 'Sophisticated design', 'Premium finishes', 'Exceptional quality']
    },
    {
      slug: 'chemistry-coffee-dammam',
      title: 'CHEMISTRY COFFEE – DAMMAM',
      image: 'https://images.unsplash.com/photo-1481833761820-0509d3217039?q=80&w=1740&auto=format&fit=crop',
      category: 'F&B',
      description: 'Contemporary coffee shop featuring modern aesthetics, efficient layouts, and memorable customer interactions.',
      location: 'Dammam, Saudi Arabia',
      client: 'Chemistry Coffee',
      year: '2023',
      scope: ['Contemporary Coffee Shop', 'Modern Aesthetics', 'Efficient Layouts', 'Customer Interaction'],
      area: '1,500 sqm',
      duration: '3 months',
      highlights: ['Contemporary design', 'Modern aesthetics', 'Efficient operations', 'Memorable interactions']
    },
    {
      slug: 'sellfish-northern-al-khobar',
      title: 'SELLFISH – NORTHERN AL-KHOBAR',
      image: 'https://images.unsplash.com/photo-1541976076758-347942db1970?q=80&w=1740&auto=format&fit=crop',
      category: 'F&B',
      description: 'Seafood restaurant featuring coastal-inspired design, premium kitchen equipment, and exceptional dining experiences.',
      location: 'Northern Al-Khobar, Saudi Arabia',
      client: 'Sellfish Restaurant',
      year: '2023',
      scope: ['Seafood Restaurant', 'Coastal Design', 'Premium Kitchen', 'Dining Experience'],
      area: '2,800 sqm',
      duration: '5 months',
      highlights: ['Coastal inspiration', 'Premium kitchen', 'Seafood focus', 'Exceptional dining']
    }
  ];

  // Add search and filter functionality
  window.RASEEL_PROJECTS = projects;
  console.log('RASEEL_PROJECTS loaded with', projects.length, 'projects');
  
  // Search functionality
  window.searchProjects = function(query) {
    if (!query) return projects;
    
    const searchTerm = query.toLowerCase();
    return projects.filter(project => 
      project.title.toLowerCase().includes(searchTerm) ||
      project.description.toLowerCase().includes(searchTerm) ||
      project.category.toLowerCase().includes(searchTerm) ||
      project.location.toLowerCase().includes(searchTerm)
    );
  };
  
  // Filter by category
  window.filterProjectsByCategory = function(category) {
    if (!category) return projects;
    return projects.filter(project => project.category === category);
  };
  
  // Get unique categories
  window.getProjectCategories = function() {
    return [...new Set(projects.map(project => project.category))];
  };
  
  // Get project by slug
  window.getProjectBySlug = function(slug) {
    console.log('getProjectBySlug called with:', slug);
    const project = projects.find(project => project.slug === slug);
    console.log('Project found:', project);
    return project;
  };
})();


