 
const servicesData = require('../data/services.json');

module.exports = (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS method
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow GET method
  if (req.method !== 'GET') {
    return res.status(405).json({ 
      success: false, 
      message: 'Method not allowed' 
    });
  }

  const { id } = req.query;

  // If ID is provided, return single service
  if (id) {
    const service = servicesData.data.find(s => s.id === id);
    if (service) {
      return res.status(200).json({
        success: true,
        message: 'Service retrieved successfully',
        data: service
      });
    } else {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }
  }

  // Return all services
  return res.status(200).json(servicesData);
};