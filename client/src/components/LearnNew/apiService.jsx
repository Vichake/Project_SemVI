/**
 * API Service for fetching data from backend
 * 
 * In a real application, this would connect to your actual API endpoints.
 * For now, it returns mock data with simulated network delays.
 */

// Base API URL - would be configured based on environment
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '/api';

// Simulates network delay for mock data
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Example of mock data for development
const mockData = {
  trendingTechnologies: [
    {
      id: 1,
      title: 'Precision Agriculture',
      imageUrl: '/api/placeholder/1600/400',
      description: 'Using technology to optimize farming practices'
    },
    {
      id: 2,
      title: 'Vertical Farming',
      imageUrl: '/api/placeholder/1600/400',
      description: 'Growing crops in vertically stacked layers'
    },
    {
      id: 3,
      title: 'Hydroponics',
      imageUrl: '/api/placeholder/1600/400',
      description: 'Growing plants without soil using mineral nutrient solutions'
    },
    {
      id: 4,
      title: 'Drone Technology',
      imageUrl: '/api/placeholder/1600/400',
      description: 'Using drones for crop monitoring and analysis'
    }
  ],
  categories: [
    {
      id: 'crop',
      title: 'Crop Production',
      description: 'Learn techniques to improve crop yield and quality.'
    },
    {
      id: 'soil',
      title: 'Soil & Water Conservation',
      description: 'Discover methods to conserve soil and water resources.'
    },
    {
      id: 'pest',
      title: 'Pest Management',
      description: 'Explore techniques to manage pests and diseases effectively.'
    },
    {
      id: 'livestock',
      title: 'Livestock Management',
      description: 'Learn how to manage livestock for better productivity.'
    },
    {
      id: 'agroforestry',
      title: 'Agroforestry',
      description: 'Integrate trees and crops for sustainable farming.'
    },
    {
      id: 'smart',
      title: 'Smart Farming',
      description: 'Leverage technology for efficient farming practices.'
    }
  ],
  techniques: {
    crop: [
      {
        id: 'crop-rotation',
        name: 'Crop Rotation',
        description: 'A method to improve soil fertility and reduce pests.',
        image: '/api/placeholder/200/200'
      },
      {
        id: 'intercropping',
        name: 'Intercropping',
        description: 'Growing two or more crops together for better yield.',
        image: '/api/placeholder/200/200'
      }
    ],
    soil: [
      {
        id: 'soil-testing',
        name: 'Soil Testing',
        description: 'Analyze soil nutrients to optimize crop growth.',
        image: '/api/placeholder/200/200'
      },
      {
        id: 'terrace-farming',
        name: 'Terrace Farming',
        description: 'Prevent soil erosion on slopes with terrace farming.',
        image: '/api/placeholder/200/200'
      }
    ],
    pest: [
      {
        id: 'ipm',
        name: 'Integrated Pest Management',
        description: 'A sustainable approach to managing pests.',
        image: '/api/placeholder/200/200'
      },
      {
        id: 'biological-control',
        name: 'Biological Control',
        description: 'Use natural predators to control pests.',
        image: '/api/placeholder/200/200'
      }
    ],
    livestock: [
      {
        id: 'dairy-farming',
        name: 'Dairy Farming',
        description: 'Efficient management of dairy animals for milk production.',
        image: '/api/placeholder/200/200'
      },
      {
        id: 'poultry-farming',
        name: 'Poultry Farming',
        description: 'Raising birds for eggs and meat production.',
        image: '/api/placeholder/200/200'
      }
    ],
    agroforestry: [
      {
        id: 'silvopasture',
        name: 'Silvopasture',
        description: 'Combine forestry and grazing for sustainable farming.',
        image: '/api/placeholder/200/200'
      },
      {
        id: 'alley-cropping',
        name: 'Alley Cropping',
        description: 'Grow crops between rows of trees for better yield.',
        image: '/api/placeholder/200/200'
      }
    ],
    smart: [
      {
        id: 'precision-agriculture',
        name: 'Precision Agriculture',
        description: 'Use technology to optimize farming practices.',
        image: '/api/placeholder/200/200'
      },
      {
        id: 'drone-technology',
        name: 'Drone Technology',
        description: 'Monitor crops and livestock with drones.',
        image: '/api/placeholder/200/200'
      }
    ]
  },
  quote: {
    text: "The discovery of agriculture was the first big step toward a civilized life.",
    author: "Arthur Keith",
    image: "/api/placeholder/600/300"
  },
  reviews: [
    {
      id: 1,
      name: 'Dr. John Smith',
      title: 'Agricultural Scientist',
      comment: 'Precision agriculture is revolutionizing farming by leveraging data and technology.',
      imageUrl: '/api/placeholder/100/100'
    },
    {
      id: 2,
      name: 'Jane Doe',
      title: 'Tech Innovator',
      comment: 'Vertical farming is the future of sustainable food production.',
      imageUrl: '/api/placeholder/100/100'
    },
    {
      id: 3,
      name: 'Prof. Emily White',
      title: 'Environmentalist',
      comment: 'Hydroponics is a game-changer for urban farming.',
      imageUrl: '/api/placeholder/100/100'
    },
    {
      id: 4,
      name: 'Rahul Verma',
      title: 'Farmer',
      comment: 'Drone technology has made monitoring crops and livestock more efficient than ever.',
      imageUrl: '/api/placeholder/100/100'
    },
    {
      id: 5,
      name: 'Dr. Priya Sharma',
      title: 'Agroforestry Expert',
      comment: 'Agroforestry is a sustainable way to integrate trees and crops for long-term benefits.',
      imageUrl: '/api/placeholder/100/100'
    }
  ]
};

/**
 * API Service class
 */
class ApiService {
  // For development purposes, use mock data with delay
  // In production, this would make actual fetch calls
  async get(endpoint) {
    try {
      if (process.env.NODE_ENV === 'development') {
        // Simulate API delay
        await delay(300);
        
        // Return mock data based on endpoint
        switch (endpoint) {
          case 'trending-technologies':
            return mockData.trendingTechnologies;
          case 'categories':
            return mockData.categories;
          case 'quote':
            return mockData.quote;
          case 'reviews':
            return mockData.reviews;
          default:
            if (endpoint.startsWith('techniques/')) {
              const category = endpoint.split('/')[1];
              return mockData.techniques[category] || [];
            }
            throw new Error(`Unknown endpoint: ${endpoint}`);
        }
      } else {
        // Real API call for production
        const response = await fetch(`${API_BASE_URL}/${endpoint}`);
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        return await response.json();
      }
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
      throw error;
    }
  }

  // Get trending technologies
  async getTrendingTechnologies() {
    return this.get('trending-technologies');
  }

  // Get categories
  async getCategories() {
    return this.get('categories');
  }

  // Get techniques for a specific category
  async getTechniques(categoryId) {
    return this.get(`techniques/${categoryId}`);
  }

  // Get motivational quote
  async getQuote() {
    return this.get('quote');
  }

  // Get expert reviews
  async getReviews() {
    return this.get('reviews');
  }

  // Get technique details
  async getTechniqueDetails(techId) {
    return this.get(`technique-details/${techId}`);
  }
}

// Export as a singleton
export default new ApiService();