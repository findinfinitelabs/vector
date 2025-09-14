// verify-password.js
// Usage: node verify-password.js <password>

const bcrypt = require('bcrypt');
const hash = '$2b$10$ypC8.kNhffGfnOUD0k9ZG.yQyRJ/qjzL8fLQxO2WyzzXOo9E1Ddeq';

const password = process.argv[2];
if (!password) {
  console.error('Usage: node verify-password.js <password>');
  process.exit(1);
}

bcrypt.compare(password, hash, (err, result) => {
  if (err) throw err;
  if (result) {
    console.log('Password matches!');
  } else {
    console.log('Password does NOT match.');
  }
});
