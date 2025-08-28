(function () {
  'use strict';

  var projects = [
    { slug: 'boulevard', title: 'BOULEVARD', image: 'https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?q=80&w=1740&auto=format&fit=crop', category: 'Commercial / Public Space' },
    { slug: 'ecoclean', title: 'ECOCLEAN', image: 'https://images.unsplash.com/photo-1560185008-b033106af2d0?q=80&w=1740&auto=format&fit=crop', category: 'Industrial / Facility' },
    { slug: 'neom', title: 'NEOM', image: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1740&auto=format&fit=crop', category: 'Urban Development' },
    { slug: 'civil-work', title: 'CIVIL WORK', image: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?q=80&w=1740&auto=format&fit=crop', category: 'Infrastructure' },
    { slug: 'al-falak-building', title: 'AL-FALAK BUILDING', image: 'https://images.unsplash.com/photo-1523419409543-07c5b3c9c7f0?q=80&w=1740&auto=format&fit=crop', category: 'Corporate' },
    { slug: 'aramco-fence', title: 'ARAMCO FENCE', image: 'https://images.unsplash.com/photo-1541976076758-347942db1970?q=80&w=1740&auto=format&fit=crop', category: 'Industrial / Security' },
    { slug: 'fgs-jubail-city', title: 'FGS – JUBAIL CITY', image: 'https://images.unsplash.com/photo-1541888936425-d81bb19240f5?q=80&w=1740&auto=format&fit=crop', category: 'Government / City' },
    { slug: 'city-bike', title: 'CITY BIKE', image: 'https://images.unsplash.com/photo-1481070555726-e2fe8357725c?q=80&w=1740&auto=format&fit=crop', category: 'Public / Mobility' },
    { slug: 'shanab-restaurant', title: 'SHANAB RESTAURANT', image: 'https://images.unsplash.com/photo-1564758866811-54db4c5a8f62?q=80&w=1740&auto=format&fit=crop', category: 'F&B' },
    { slug: 'tricycle', title: 'TRICYCLE', image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=1740&auto=format&fit=crop', category: 'Retail / Concept' },
    { slug: 'burger-fi', title: 'BURGER FI', image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1740&auto=format&fit=crop', category: 'F&B' },
    { slug: 'the-hub-co', title: 'THE HUB CO', image: 'https://images.unsplash.com/photo-1521337585582-63c5421bb9b7?q=80&w=1740&auto=format&fit=crop', category: 'Retail / Community' },
    { slug: 'elephant', title: 'ELEPHANT', image: 'https://images.unsplash.com/photo-1475483768296-6163e08872a1?q=80&w=1740&auto=format&fit=crop', category: 'Retail / Concept' },
    { slug: 'stellar', title: 'STELLAR', image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1740&auto=format&fit=crop', category: 'Retail / Concept' },
    { slug: 'jamd', title: 'JAMD', image: 'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?q=80&w=1740&auto=format&fit=crop', category: 'Retail / Concept' },
    { slug: 'qnad', title: 'QNAD', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1740&auto=format&fit=crop', category: 'Retail / Concept' },
    { slug: 'fudge-and-co', title: 'FUDGE & CO.', image: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?q=80&w=1740&auto=format&fit=crop', category: 'F&B' },
    { slug: 'tangent', title: 'TANGENT', image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1740&auto=format&fit=crop', category: 'Retail / Concept' },
    { slug: 'chemistry-coffee-northern-al-khobar', title: 'CHEMISTRY COFFEE – NORTHERN AL-KHOBAR', image: 'https://images.unsplash.com/photo-1481833761820-0509d3217039?q=80&w=1740&auto=format&fit=crop', category: 'F&B' },
    { slug: 'chemistry-coffee-tabuk-boulevard', title: 'CHEMISTRY COFFEE – TABUK BOULEVARD', image: 'https://images.unsplash.com/photo-1481833761820-0509d3217039?q=80&w=1740&auto=format&fit=crop', category: 'F&B' },
    { slug: 'chemistry-coffee-dammam', title: 'CHEMISTRY COFFEE – DAMMAM', image: 'https://images.unsplash.com/photo-1481833761820-0509d3217039?q=80&w=1740&auto=format&fit=crop', category: 'F&B' },
    { slug: 'sellfish-northern-al-khobar', title: 'SELLFISH – NORTHERN AL-KHOBAR', image: 'https://images.unsplash.com/photo-1541976076758-347942db1970?q=80&w=1740&auto=format&fit=crop', category: 'F&B' }
  ];

  window.RASEEL_PROJECTS = projects;
})();


