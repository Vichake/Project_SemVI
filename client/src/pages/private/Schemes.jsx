import React, { useState, useEffect } from 'react';

// Dummy scheme data for demonstration
const schemes = {
  national: [
    {
      id: 1,
      title: "PM Kisan Samman Nidhi",
      description: "Financial assistance to small and marginal farmers through direct benefit transfer.",
      image: "/api/placeholder/400/250",
      category: "Financial Aid",
      deadline: "Dec 31, 2025",
      region: "All India"
    },
    {
      id: 2,
      title: "Pradhan Mantri Fasal Bima Yojana",
      description: "Crop insurance scheme to protect farmers against crop failure due to natural calamities.",
      image: "/api/placeholder/400/250",
      category: "Insurance",
      deadline: "Seasonal",
      region: "All India"
    },
    {
      id: 3,
      title: "Soil Health Card Scheme",
      description: "Soil testing and recommendations for farmers to improve productivity through judicious use of inputs.",
      image: "/api/placeholder/400/250",
      category: "Agricultural Support",
      deadline: "Ongoing",
      region: "All India"
    }
  ],
  state: [
    {
      id: 1,
      title: "Karnataka Raitha Suraksha Pradhan Mantri Fasal Bima Yojana",
      description: "State extension of PMFBY with additional benefits for farmers in Karnataka.",
      image: "/api/placeholder/400/250",
      category: "Insurance",
      deadline: "Seasonal",
      region: "Karnataka"
    },
    {
      id: 2,
      title: "Punjab Crop Loan Waiver Scheme",
      description: "Loan waiver for small and marginal farmers with landholdings up to 5 acres.",
      image: "/api/placeholder/400/250",
      category: "Financial Relief",
      deadline: "June 30, 2025",
      region: "Punjab"
    },
    {
      id: 3,
      title: "Maharashtra Farm Pond on Demand Scheme",
      description: "Provides financial assistance to farmers for construction of farm ponds.",
      image: "/api/placeholder/400/250",
      category: "Water Management",
      deadline: "Ongoing",
      region: "Maharashtra"
    }
  ],
  specialized: [
    {
      id: 1,
      title: "Tribal Sub-Plan for Agriculture",
      description: "Special agricultural assistance program for tribal farmers and communities.",
      image: "/api/placeholder/400/250",
      category: "Tribal Support",
      deadline: "Ongoing",
      region: "Tribal Regions"
    },
    {
      id: 2,
      title: "Women Farmers Empowerment Program",
      description: "Focused initiatives for women in agriculture including training and subsidies.",
      image: "/api/placeholder/400/250",
      category: "Women's Empowerment",
      deadline: "Dec 15, 2025",
      region: "All India"
    },
    {
      id: 3,
      title: "Organic Farming Incentive Scheme",
      description: "Financial support and certification assistance for farmers transitioning to organic methods.",
      image: "/api/placeholder/400/250",
      category: "Organic Farming",
      deadline: "Ongoing",
      region: "All India"
    }
  ]
};

// Feather Icons Component
const FeatherIcon = ({ name, size }) => {
  return (
    <svg 
      width={size || 24} 
      height={size || 24} 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className="as-feather-icon"
    >
      {name === 'menu' && <path d="M3 12h18M3 6h18M3 18h18" />}
      {name === 'x' && <path d="M18 6L6 18M6 6l12 12" />}
      {name === 'search' && <>
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </>}
      {name === 'arrow-right' && <path d="M5 12h14M12 5l7 7-7 7" />}
      {name === 'feather' && <>
        <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
        <path d="M16 8L2 22" />
        <path d="M17.5 15H9" />
      </>}
      {name === 'dollar-sign' && <>
        <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </>}
      {name === 'users' && <>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </>}
      {name === 'filter' && <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />}
      {name === 'calendar' && <>
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </>}
      {name === 'map-pin' && <>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </>}
      {name === 'chevron-down' && <path d="M6 9l6 6 6-6" />}
      {name === 'check-circle' && <>
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <path d="M22 4L12 14.01l-3-3" />
      </>}
      {name === 'facebook' && <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />}
      {name === 'twitter' && <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />}
      {name === 'instagram' && <>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <path d="M17.5 6.5h.01" />
      </>}
      {name === 'youtube' && <>
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
        <path d="M9.75 15.02l5.75-3.27-5.75-3.27v6.54z" />
      </>}
    </svg>
  );
};



