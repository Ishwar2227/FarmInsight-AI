/**
 * Returns a dummy pest detection response after accepting an image upload.
 */
const detectPest = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No image uploaded' });
  }

  // Dummy analysis payload
  const dummyPrediction = {
    probableDisease: 'Leaf Blight',
    confidence: 0.87,
    recommendedAction: 'Apply copper-based fungicide and ensure proper drainage.',
    uploadedFile: `/uploads/${req.file.filename}`,
  };

  res.json({
    success: true,
    data: dummyPrediction,
    message: 'Analysis complete. This is a placeholder response.',
  });
};

module.exports = { detectPest };


