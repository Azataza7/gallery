import mongoose from "mongoose";
import config from "./config";
import User from "./models/User";


const run = async () => {
  await mongoose.connect(config.mongoose.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection('users');

  } catch (e) {
    console.log('Collections were not present, skipping drop');
  }

  const [user1, user2] = await User.create(
    {
      email: "superUser@gmail.com",
      password: "admin123",
      token: "adminToken",
      avatar: "fixtures/avatar.webp",
      role: "admin",
      displayName: "Dirty Billy",
    },
    {
      email: "user@mail.com",
      password: "admin123",
      token: "userToken",
      avatar: "fixtures/avatar-1.webp",
      role: "user",
      displayName: "Double wide Joe",
    }
  );

  await db.close();
}

run().catch(console.error);