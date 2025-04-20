// Equipment data
const equipment = [
  {
      id: 1,
      name: "John Deere Tractor",
      category: "tractor",
      description: "Powerful tractor suitable for plowing and heavy field work",
      image: 'images/john-deere-5050d-tractor.jpg',
      price: 150,
      details: "This premium tractor features a 100HP engine, hydraulic system, and air-conditioned cabin for comfort during long working hours.",
      models: ["Standard", "Premium", "Deluxe"]
  },
  {
      id: 2,
      name: "Combine Harvester",
      category: "harvester",
      description: "Efficient harvester for grain crops with minimal loss",
      image: "https://images.unsplash.com/photo-1591086429666-764f4448b9de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      price: 220,
      details: "Advanced harvester with automatic height adjustment, grain quality sensors, and wide cutting width for faster harvesting.",
      models: ["Standard Width", "Wide Width", "Super Wide"]
  },
  {
      id: 3,
      name: "Agricultural Plow",
      category: "plow",
      description: "Heavy-duty plow for deep soil cultivation",
      image: "https://images.unsplash.com/photo-1597534458220-9fb4969f2df5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
      price: 80,
      details: "Durable plow with adjustable depth settings, suitable for various soil types and conditions.",
      models: ["Basic", "Professional", "Heavy-Duty"]
  },
  {
      id: 4,
      name: "Seeding Machine",
      category: "planter",
      description: "Precise seeder for row crops with adjustable spacing",
      image: "https://images.unsplash.com/photo-1587367500174-003834b5bec9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
      price: 120,
      details: "Advanced precision planting system with electronic seed monitoring and variable rate application.",
      models: ["6-Row", "12-Row", "24-Row"]
  },
  {
      id: 5,
      name: "Irrigation System",
      category: "irrigation",
      description: "Mobile irrigation system for efficient water distribution",
      image: "https://images.unsplash.com/photo-1533329782019-0b113f6a2a09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
      price: 90,
      details: "Water-efficient irrigation system with programmable timer and adjustable spray patterns.",
      models: ["Drip System", "Sprinkler System", "Pivot System"]
  },
  {
      id: 6,
      name: "Fertilizer Spreader",
      category: "fertilizer",
      description: "Precise application of granular fertilizers",
      image: "https://images.unsplash.com/photo-1615233500144-2fed31f58779?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
      price: 70,
      details: "Variable rate fertilizer spreader with GPS guidance for precise application according to soil needs.",
      models: ["Small Capacity", "Medium Capacity", "Large Capacity"]
  },
  {
      id: 7,
      name: "Mahindra Tractor",
      category: "tractor",
      description: "Durable and fuel-efficient tractor for various farming tasks",
      image: "https://images.unsplash.com/photo-1591086429666-764f4448b9de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGV8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      price: 130,
      details: "Mahindra tractor with 75HP engine, ergonomic seating, and power steering for easy handling.",
      models: ["Standard", "Turbo", "Ultra"]
  },
  {
      id: 8,
      name: "New Holland Tractor",
      category: "tractor",
      description: "High-performance tractor for all types of farming activities",
      image: "https://images.unsplash.com/photo-1503386435953-66943ba30817?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGV8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      price: 140,
      details: "Advanced tractor with 90HP engine, GPS navigation, and low fuel consumption.",
      models: ["Basic", "Pro", "Elite"]
  }
];

// Global state variables
let selectedCategory = 'all';
let selectedEquipment = null;
let selectedModel = null;

// DOM elements
const equipmentGrid = document.getElementById('equipment-grid');
const modelDialog = document.getElementById('model-dialog');
const rentalFormDialog = document.getElementById('rental-form-dialog');
const toast = document.getElementById('toast');

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
  // Render equipment categories
  renderEquipmentCategories();
  
  // Set up event listeners
  setupEventListeners();
  
  // Set current year in footer
  document.getElementById('current-year').textContent = new Date().getFullYear();
});

// Set up event listeners
function setupEventListeners() {
  // Filter buttons
  const filterButtons = document.querySelectorAll('.filter-button');
  filterButtons.forEach(button => {
      button.addEventListener('click', function() {
          // Remove active class from all buttons
          filterButtons.forEach(btn => btn.classList.remove('active'));
          
          // Add active class to clicked button
          this.classList.add('active');
          
          // Update selected category and re-render equipment
          selectedCategory = this.getAttribute('data-category');
          if (selectedCategory === 'all') {
              renderEquipmentCategories();
          } else {
              renderEquipmentModels(selectedCategory);
          }
      });
  });
  
  // Rental form submission
  document.getElementById('rental-form').addEventListener('submit', function(e) {
      e.preventDefault();
      handleFormSubmit();
  });
}

// Render equipment categories
function renderEquipmentCategories() {
  // Clear existing cards
  equipmentGrid.innerHTML = '';
  
  // Get unique categories
  const categories = [...new Set(equipment.map(item => item.category))];
  
  // Create and append category cards
  categories.forEach(category => {
      const card = document.createElement('div');
      card.className = 'equipment-card';
      card.innerHTML = `
          <div class="equipment-image">
              <img src="images/${category}.jpg" alt="${category}">
          </div>
          <div class="equipment-content">
              <h3 class="equipment-title">${category.charAt(0).toUpperCase() + category.slice(1)}</h3>
              <button class="view-models-button" data-category="${category}">View Models</button>
          </div>
      `;
      
      equipmentGrid.appendChild(card);
      
      // Add event listener to the view models button
      card.querySelector('.view-models-button').addEventListener('click', function() {
          const category = this.getAttribute('data-category');
          renderEquipmentModels(category);
      });
  });
}

// Render equipment models based on selected category
function renderEquipmentModels(category) {
  // Clear existing cards
  equipmentGrid.innerHTML = '';
  
  // Filter equipment by selected category
  const filteredEquipment = equipment.filter(item => item.category === category);
  
  // Create and append equipment cards
  filteredEquipment.forEach(item => {
      const card = document.createElement('div');
      card.className = 'equipment-card';
      card.innerHTML = `
          <div class="equipment-image">
              <img src="${item.image}" alt="${item.name}">
          </div>
          <div class="equipment-content">
              <h3 class="equipment-title">${item.name}</h3>
              <p class="equipment-description">${item.description}</p>
              <div class="equipment-meta">
                  <span class="icon">📅</span>
                  <span>$${item.price} per day</span>
              </div>
              <div class="equipment-meta">
                  <span class="icon">✓</span>
                  <span>Available Now</span>
              </div>
              <div class="equipment-actions">
                  <button class="rent-button" data-id="${item.id}">Rent Now</button>
              </div>
          </div>
      `;
      
      equipmentGrid.appendChild(card);
      
      // Add event listener to the rent button
      card.querySelector('.rent-button').addEventListener('click', function() {
          const itemId = parseInt(this.getAttribute('data-id'));
          openModelDialog(itemId);
      });
  });
}

// Open model selection dialog
function openModelDialog(equipmentId) {
  // Find the selected equipment
  selectedEquipment = equipment.find(item => item.id === equipmentId);
  if (!selectedEquipment) return;
  
  // Update dialog content
  document.getElementById('selected-equipment-name').textContent = selectedEquipment.name;
  document.getElementById('selected-equipment-img').src = selectedEquipment.image;
  document.getElementById('selected-equipment-img').alt = selectedEquipment.name;
  document.getElementById('selected-equipment-details').textContent = selectedEquipment.details;
  document.getElementById('selected-equipment-price').textContent = `$${selectedEquipment.price} per day`;
  
  // Render available models
  const modelsList = document.getElementById('models-list');
  modelsList.innerHTML = '';
  
  selectedEquipment.models.forEach((model, index) => {
      const modelPrice = selectedEquipment.price + (index * 20);
      const modelButton = document.createElement('button');
      modelButton.className = 'model-button';
      modelButton.innerHTML = `
          ${model}
          <span class="model-price">$${modelPrice.toFixed(2)}/day</span>
      `;
      
      modelButton.addEventListener('click', function() {
          handleModelSelect(model);
      });
      
      modelsList.appendChild(modelButton);
  });
  
  // Show the dialog
  modelDialog.style.display = 'block';
  document.body.style.overflow = 'hidden'; // Prevent scrolling
}

// Close model selection dialog
function closeModelDialog() {
  modelDialog.style.display = 'none';
  document.body.style.overflow = ''; // Re-enable scrolling
}

// Handle model selection
function handleModelSelect(model) {
  selectedModel = model;
  closeModelDialog();
  openRentalForm();
}

// Open rental form dialog
function openRentalForm() {
  if (!selectedEquipment || !selectedModel) return;
  
  // Update form content
  document.getElementById('rental-equipment-name').textContent = `Rent ${selectedEquipment.name}`;
  document.getElementById('rental-model-name').textContent = `Model: ${selectedModel}`;
  
  // Clear form fields
  document.getElementById('rental-form').reset();
  
  // Show the dialog
  rentalFormDialog.style.display = 'block';
  document.body.style.overflow = 'hidden'; // Prevent scrolling
}

// Close rental form dialog
function closeRentalForm() {
  rentalFormDialog.style.display = 'none';
  document.body.style.overflow = ''; // Re-enable scrolling
}

// Handle form submission
function handleFormSubmit() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const duration = document.getElementById('duration').value;
  const location = document.getElementById('location').value;
  
  // Form validation
  if (!name || !email || !duration) {
      showToast('Error', 'Please fill in all required fields');
      return;
  }
  
  // Process form submission (in a real app, this would send data to a server)
  console.log('Form submitted:', {
      equipment: selectedEquipment?.name,
      model: selectedModel,
      name,
      email, 
      duration,
      location
  });
  
  // Show success message
  showToast('Request Submitted', 'Your rental request has been submitted successfully!');
  
  // Close the form dialog
  closeRentalForm();
}

// Show toast notification
function showToast(title, message) {
  const toastEl = document.getElementById('toast');
  document.getElementById('toast-title').textContent = title;
  document.getElementById('toast-message').textContent = message;
  
  // Show toast
  toastEl.style.display = 'block';
  
  // Auto-hide after 5 seconds
  setTimeout(function() {
      closeToast();
  }, 5000);
}

// Close toast notification
function closeToast() {
  document.getElementById('toast').style.display = 'none';
}

// Scroll to equipment section
function scrollToEquipment() {
  document.getElementById('equipment-section').scrollIntoView({ behavior: 'smooth' });
}