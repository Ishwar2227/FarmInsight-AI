/**
 * Returns a list of dummy crop advisories.
 */
const getCropAdvisory = (req, res) => {
  const advisories = [
    {
      crop: 'Rice',
      stage: 'Tillering',
      recommendation: 'Maintain 2-3 cm water depth and apply nitrogen-rich fertilizer.',
    },
    {
      crop: 'Wheat',
      stage: 'Flowering',
      recommendation: 'Monitor for rust disease and spray appropriate fungicides if needed.',
    },
    {
      crop: 'Cotton',
      stage: 'Boll Formation',
      recommendation: 'Ensure adequate potassium supply and scout for bollworms.',
    },
  ];

  res.json({ success: true, data: advisories });
};

module.exports = { getCropAdvisory };


