const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const data = require("./data.js");

const recipeSchema = new Schema({
  title: { type: String, required: true, unique: true },
  level: {
    type: String,
    enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]
  },
  ingredients: [String],
  cousine: { type: String, required: true },
  dishType: {
    type: String,
    enum: ["Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"]
  },
  image: {
    type: String,
    default: "https://images.media-allrecipes.com/images/75131.jpg"
  },
  duration: { type: Number, min: 0 },
  creator: { type: String },
  created: { type: Date, default: Date.now }
});

const Recipe = mongoose.model("recipe", recipeSchema);

mongoose
  .connect("mongodb://localhost/recipeApp")
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

Recipe.create({
  title: "French Onion Soup"
})
  .then(Recipe => {
    console.log("Recipe has been created", Recipe);
  })
  .catch(err => {
    console.log("An error has occured");
  });

Recipe.findById("5b7ebe048701034bbb2a8732")
  .then(recipe => {
    recipe.duration = 100;
    return recipe.save(); // Update the user '42' and return a promise
  })
  .then(recipe => {
    console.log("The duration was updated");
  })
  .catch(err => {
    console.log("Update did not occur");
  });

Recipe.deleteOne({ title: "Carrot Cake" })
  .then(recipe => {
    console.log("Carrot Cake was deleted");
  })
  .catch(err => {
    console.log("Carrot Cake was NOT deleted");
  });

mongoose.connection.close();
