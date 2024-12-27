const api2 = async() => {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon/ditto");
  const data = await res.json();

  console.log(data);
}

api2()

