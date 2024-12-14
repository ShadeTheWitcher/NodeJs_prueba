exports.login = (req, res) => {
    const { username, password } = req.body;
    // Lógica de autenticación aquí
    res.json({ message: `Usuario ${username} autenticado` });
  };
  
  exports.register = (req, res) => {
    const { username, password } = req.body;
    // Lógica de registro aquí
    res.json({ message: `Usuario ${username} registrado` });
  };
  