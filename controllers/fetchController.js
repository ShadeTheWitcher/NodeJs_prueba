

exports.getPokemon = async (req, res) => {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/ditto');
    if (!response.ok) throw new Error(`Error: ${response.status}`);

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
