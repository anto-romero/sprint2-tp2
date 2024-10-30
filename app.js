const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://Grupo-13:grupo13@cursadanodejs.ls9ii.mongodb.net/Node-js"
  )
  .then(() => console.log("Conexión exitosa a MongoDB"))
  .catch((error) => console.log("Error al conectar a MongoDB:", error));

const superheroSchema = new mongoose.Schema(
  {
    nombreSuperHeroe: { type: String, required: true },
    nombreReal: { type: String, required: true },
    edad: { type: Number, min: 0 },
    planetaOrigen: { type: String, default: "Desconocido" },
    debilidad: String,
    poderes: [String],
    aliados: [String],
    enemigos: [String],
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "Grupo-13" }
);

const SuperHero = mongoose.model("Grupo-13", superheroSchema);

//función que inserta un superheroe
async function insertSuperHero() {
 
  const hero = new SuperHero({
    nombreSuperHeroe: "Aetherion",
    nombreReal: "Draven Arkanis",
    edad: 35,
    planetaOrigen: "Veldora",
    debilidad: "Veldorite",
    poderes: [
      "Manipulación de los elementos",
      "Teletransportación",
      "Constructos de Energía",
    ],
    aliados: ["Thorne"],
    enemigos: ["Xirran", "Nyxara"],
  });

  await hero.save();
  console.log("Superheroe insertado", hero);
}

insertSuperHero();

//función que actualiza la informacion de un superheroe
async function updateSuperHero(nombreSuperHeroe) {
  const result = await SuperHero.updateOne(
    { nombreSuperHeroe: nombreSuperHeroe },
    {
      $set: { edad: 37 },
    }
  );
  console.log("Resultado de la actualización:", result);
}

updateSuperHero("Aetherion");

//función que busca un superheroe
async function findSuperHeroes() {
  const heroes = await SuperHero.find({
    planetaOrigen: "Veldora",
  });
  console.log("Superhéroes encontrados:", heroes);
}

findSuperHeroes();

//función que elimina un superheroe
async function deleteSuperHero(nombreSuperHeroe) {
  const result = await SuperHero.deleteOne({
    nombreSuperHeroe: nombreSuperHeroe,
  });
  console.log("Superhero eliminado:", result);
}

deleteSuperHero("Aetherion");
