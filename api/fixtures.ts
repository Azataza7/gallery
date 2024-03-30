import mongoose from "mongoose";
import config from "./config";
import User from "./models/User";
import Gallery from "./models/Gallery";


const run = async () => {
  await mongoose.connect(config.mongoose.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection('users');
    await db.dropCollection('galleries');

  } catch (e) {
    console.log('Collections were not present, skipping drop');
  }

  const [user1, user2] = await User.create(
    {
      email: "superUser@gmail.com",
      password: "admin123",
      token: "adminToken",
      role: "admin",
      displayName: "Dirty Billy",
    },
    {
      email: "user@mail.com",
      password: "admin123",
      token: "userToken",
      role: "user",
      displayName: "Double wide Joe",
    }
  );

  await Gallery.create(
    {user: user1, title: 'Beautiful nature', image: 'fixtures/nature.png'},
    {user: user1, title: 'Stunning moutain', image: 'fixtures/mountain.jpg'},
    {user: user2, title: 'SunFlowers', image: 'fixtures/sunflower.webp'},
    {user: user2, title: 'Cutie Raccoon', image: 'fixtures/raccoon.jpg'},
  )
  await db.close();
}

run().catch(console.error);