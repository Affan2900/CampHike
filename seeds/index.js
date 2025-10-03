const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
require('dotenv').config();
const { places, descriptors } = require("./seedHelpers");

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random = Math.floor(Math.random() * 55);
    const price = Math.floor(Math.random()*4000)+10;
    const camp = new Campground({
      author: '68df7341b70ed13ddfab61e7',
      location: `${cities[random].city}, ${cities[random].province}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      images :  [
        {
          url: 'https://res.cloudinary.com/dplnlmpqk/image/upload/v1709403278/CampHike/e1iys0xnsp0h87asvrtf.jpg',
          filename: 'CampHike/e1iys0xnsp0h87asvrtf',
        },
        {
          url: 'https://res.cloudinary.com/dplnlmpqk/image/upload/v1709403278/CampHike/qkknbnccddmyokn9jrpc.jpg',
          filename: 'CampHike/qkknbnccddmyokn9jrpc',
        }
      ],
      description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione cumque repellat facere suscipit sequi doloribus aliquam debitis temporibus, tenetur culpa provident modi reiciendis explicabo rem, eaque nostrum autem illum? Laborum.',
      price,
      geometry : {
        type: "Point",
        coordinates: [
          cities[random].longitude,
          cities[random].latitude,
        ]
      }
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
