const mongoose = require("mongoose");
const mongoURI =process.env.DB_URL;

const mongoDB = async () => {
  await mongoose
    .connect(mongoURI, { useNewUrlParser: true })
    .then(async () => {
      console.log("connected to the database");

      //fetching of food items

      const fetched_data = await mongoose.connection.db.collection(
        "food_items"
      );

      //   collection to be converted into normal array using toArray

      await fetched_data
        .find({})
        .toArray()
        .then((data) => {
          global.food_items = data;
         
        })
        .catch((err) => {
          console.log(err);
        });

      // fetching category
      const fetched_category = await mongoose.connection.db.collection(
        "foodCategory"
      );
      await fetched_category
        .find({})
        .toArray()
        .then((data) => {
          global.foodCategory = data;
          
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((e) => {
      console.log("---------------failed", e);
    });
};

module.exports = mongoDB;
