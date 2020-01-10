// This page is made for testing
const Campground = require('./models/campground'),
  Comment = require('./models/comment');

var seeds = [
  {
    name: 'Granite Hill',
    image:
      'https://t4.ftcdn.net/jpg/02/85/46/07/240_F_285460722_WlwSgE1pRZgx1BT29xtD6C4Zzob1UUqr.jpg',
    description:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus, sit! Sapiente placeat maiores, a neque qui quibusdam obcaecati magnam dignissimos aliquam? Ab quidem repudiandae sed aut officia reprehenderit quisquam, aperiam delectus ea vitae, debitis accusantium ipsam recusandae! Pariatur, rem ipsum! Quo veniam facere aperiam tempora magnam earum, nemo id reprehenderit?',
    price: 40.5
  },
  {
    name: 'Wild America',
    image:
      'https://t3.ftcdn.net/jpg/01/04/39/74/240_F_104397470_KOh3GwOPKv62RcutYNnoryWwXtKSAkFK.jpg',
    description:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus, sit! Sapiente placeat maiores, a neque qui quibusdam obcaecati magnam dignissimos aliquam? Ab quidem repudiandae sed aut officia reprehenderit quisquam, aperiam delectus ea vitae, debitis accusantium ipsam recusandae! Pariatur, rem ipsum! Quo veniam facere aperiam tempora magnam earum, nemo id reprehenderit?',
    price: 12.4
  },
  {
    name: 'Collective spot',
    image:
      'https://t4.ftcdn.net/jpg/00/98/85/59/240_F_98855948_ynjkxnksBv62XUEj5hhII4clXAde1p4p.jpg',
    description:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus, sit! Sapiente placeat maiores, a neque qui quibusdam obcaecati magnam dignissimos aliquam? Ab quidem repudiandae sed aut officia reprehenderit quisquam, aperiam delectus ea vitae, debitis accusantium ipsam recusandae! Pariatur, rem ipsum! Quo veniam facere aperiam tempora magnam earum, nemo id reprehenderit?',
    price: 5.2
  }
];

// The keyword async is needed
let seedDB = async function() {
  // Awaiting comments to be removed
  // Remove all campgrounds
  await Campground.deleteMany({});
  // console.log("Campground removed");
  // The rest of the code won't run until this line finishes
  await Comment.deleteMany({});
  // console.log("Comment removed");
  // Recreate all campgrounds from the seeds
  for (seed of seeds) {
    let campground = await Campground.create(seed);
    // console.log("Added campground");
    let comment = await Comment.create({
      text: 'This place is great but I wish there was Internet',
      author: 'The Geek'
    });
    campground.comments.push(comment);
    // console.log("Created new comment");
    campground.save();
  }
};

module.exports = seedDB;
