const uploadFile = (req, res) => {
  return res.status(200).json({
    success: true,
    fileName: req.file.filename,
  });
};

const uploadMultiFile = (req, res) => {
  const clientFile = req.files.map((p) => p.filename);

  return res.status(200).json({
    success: true,
    fileName: clientFile,
  });
};

module.exports = {
  uploadFile,
  uploadMultiFile,
};
