// SchemesPage.jsx
import React, { useState, useEffect } from 'react';
import { SchemesList } from './components/Schemes/SchemesList';
import { SchemeModal } from './components/Schemes/SchemeModal';
import { SearchFilters } from './components/Schemes/SearchFilters';
import { HeaderSection } from './components/Schemes/HeaderSection';
import { SchemesAPI } from './components/Schemes/SchemeApi';

const SchemesPage = () => {
  const [schemes, setSchemes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [stateFilter, setStateFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentScheme, setCurrentScheme] = useState(null);

  // Fetch schemes on component mount
  useEffect(() => {
    fetchSchemes();
  }, []);

  const fetchSchemes = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await SchemesAPI.fetchSchemes();
      setSchemes(data);
    } catch (error) {
      setError('Failed to fetch schemes. Please try again later.');
      console.error('Error fetching schemes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter schemes based on search term, status filter, type filter, and state filter
  const filteredSchemes = schemes.filter(scheme => {
    const matchesSearch = searchTerm === '' || 
      scheme.schemeName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scheme.schemeDescription?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scheme.schemeEligibility?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === '' || scheme.status === statusFilter;
    const matchesType = typeFilter === '' || scheme.schemeType === typeFilter;
    const matchesState = stateFilter === '' || 
      (scheme.schemeType === 'state' && scheme.stateName === stateFilter);
    
    return matchesSearch && matchesStatus && matchesType && matchesState;
  });

  // Open modal for adding new scheme
  const handleAddScheme = () => {
    setCurrentScheme(null);
    setIsModalOpen(true);
  };

  // Open modal for editing existing scheme
  const handleEditScheme = (scheme) => {
    // Transform scheme data to match the form structure
    const schemeForEdit = {
      name: scheme.schemeName,
      description: scheme.schemeDescription,
      eligibility: scheme.schemeEligibility,
      startDate: scheme.startDate ? new Date(scheme.startDate).toISOString().split('T')[0] : '',
      endDate: scheme.endDate ? new Date(scheme.endDate).toISOString().split('T')[0] : '',
      status: scheme.status,
      officialWebsite: scheme.officialWebsite || '',
      guidelinesUrl: scheme.guidelinesUrl || '',
      schemeType: scheme.schemeType,
      stateName: scheme.stateName || '',
      _id: scheme._id
    };
    
    setCurrentScheme(schemeForEdit);
    setIsModalOpen(true);
  };

  // Save new or edited scheme
  const handleSaveScheme = async (formData) => {
    try {
      if (formData._id) {
        // Edit existing scheme
        // Transform form data to match API expectations
        const schemeData = {
          schemeName: formData.name,
          schemeDescription: formData.description,
          schemeEligibility: formData.eligibility,
          startDate: formData.startDate,
          endDate: formData.endDate || null,
          status: formData.status,
          officialWebsite: formData.officialWebsite,
          guidelinesUrl: formData.guidelinesUrl,
          schemeType: formData.schemeType,
          stateName: formData.stateName
        };
        
        const updatedScheme = await SchemesAPI.updateScheme(formData._id, schemeData);
        setSchemes(prevSchemes => 
          prevSchemes.map(s => s._id === formData._id ? updatedScheme : s)
        );
      } else {
        // Add new scheme
        // Transform form data to match API expectations
        const schemeData = {
          schemeName: formData.name,
          schemeDescription: formData.description,
          schemeEligibility: formData.eligibility,
          startDate: formData.startDate,
          endDate: formData.endDate || null,
          status: formData.status,
          officialWebsite: formData.officialWebsite,
          guidelinesUrl: formData.guidelinesUrl,
          schemeType: formData.schemeType,
          stateName: formData.stateName
        };
        
        const newScheme = await SchemesAPI.createScheme(schemeData);
        setSchemes(prevSchemes => [...prevSchemes, newScheme]);
      }
      setIsModalOpen(false);
      return true;
    } catch (error) {
      console.error('Error saving scheme:', error);
      throw error;
    }
  };

  // Delete a scheme
  const handleDeleteScheme = async (id) => {
    if (window.confirm('Are you sure you want to delete this scheme?')) {
      try {
        await SchemesAPI.deleteScheme(id);
        setSchemes(prevSchemes => prevSchemes.filter(s => s._id !== id));
      } catch (error) {
        alert('Failed to delete scheme. Please try again.');
      }
    }
  };

  return (
    <div>
      <HeaderSection onAddScheme={handleAddScheme} />
      
      <SearchFilters 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        stateFilter={stateFilter}
        setStateFilter={setStateFilter}
      />

      <SchemesList 
        schemes={filteredSchemes}
        isLoading={isLoading}
        error={error}
        onRetry={fetchSchemes}
        onEdit={handleEditScheme}
        onDelete={handleDeleteScheme}
        onAdd={handleAddScheme}
      />

      {isModalOpen && (
        <SchemeModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          scheme={currentScheme}
          onSave={handleSaveScheme}
        />
      )}
    </div>
  );
};

export default SchemesPage;