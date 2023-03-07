const { default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt");

const SALT_WORK_FACTOR = 8;

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.pre("save", function (next) {
  var user = this;
  console.log("🚀 ~ file: userModel.js:18 ~ user:", user);

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();
  console.log("sd");
  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    console.log("sad22");
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      // override the cleartext password with the hashed one
      console.log("sda222222222");
      user.password = hash;
      next();
    });
  });
});

// userSchema.methods.comparePassword = function (candidatePassword, cb) {
//   bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
//     if (err) return cb(err);
//     cb(null, isMatch);
//   });
// };

exports.userModel = mongoose.model("User", userSchema);