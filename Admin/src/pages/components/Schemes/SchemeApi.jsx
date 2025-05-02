import { API_URL } from '../../../constants/config';
export const SchemesAPI = {
    // Fetch all schemes
    fetchSchemes: async () => {
      try {
        const response = await fetch(`${API_URL}/admin/schemes`);
        if (!response.ok) throw new Error('Failed to fetch schemes');
        const data = await response.json();
        if(!data){
          return [];
        }
        // console.log(data);
        return data;
      } catch (error) {
        console.error('Error fetching schemes:', error);
        // Return empty array for now (in production, handle this better)
        return [];
      }
    },
    
    // Create a new scheme
    createScheme: async (schemeData) => {
      try {
        console.log(schemeData)
  
        const response = await fetch(`${API_URL}/admin/schemes`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(schemeData)
        });
        console.log('Creating scheme:', schemeData);
  
        if (!response.ok) throw new Error('Failed to create scheme');
        return await response.json();
      } catch (error) {
        console.error('Error creating scheme:', error);
        throw error;
      }
    },
    
    // Update an existing scheme
    updateScheme: async (id, schemeData) => {
      try {
        const response = await fetch(`${API_URL}/admin/schemes/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(schemeData)
        });
        if (!response.ok) throw new Error('Failed to update scheme');
        return await response.json();
      } catch (error) {
        console.error('Error updating scheme:', error);
        throw error;
      }
    },
    
    // Delete a scheme
    deleteScheme: async (id) => {
      try {
        const response = await fetch(`${API_URL}/admin/schemes/${id}`, {
          method: 'DELETE'
        });
        if (!response.ok) throw new Error('Failed to delete scheme');
        return true;
      } catch (error) {
        console.error('Error deleting scheme:', error);
        throw error;
      }
    }
  };