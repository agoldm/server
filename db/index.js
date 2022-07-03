
const mongoose = require('mongoose');

main().catch(err => console.log(err));

// async function main() {
//   await mongoose.connect('mongodb://localhost:27017/SHUGI');
//   console.log('Mongo Connect');
// }
async function main() {
  await mongoose.connect(`mongodb+srv://shira:0528819696@cluster0.3ioem.mongodb.net/shugi?retryWrites=true&w=majority`);
  console.log('Mongo Connect');
}
