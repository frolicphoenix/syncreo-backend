// hashPassword.js
const bcrypt = require('bcryptjs');

async function hashPassword(password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log('Hashed password:', hashedPassword);
}

hashPassword('adminM3');
