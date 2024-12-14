const users = []; // Simulación de datos

exports.getAllUsers = (req, res) => {
  res.json(users);
};

exports.createUser = (req, res) => {
  const newUser = { id: users.length + 1, ...req.body };
  users.push(newUser);
  res.status(201).json(newUser);
};