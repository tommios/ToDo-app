import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name field is required!"],
  },
  lastName: {
    type: String,
    required: [true, "Last name field is required!"],
  },
  username: {
    type: String,
    required: [true, "User name field is required!"],
  },
  phoneNumber: {
    type: String,
    unique: true,
    required: [true, "Phone number field is required!"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email field is required!"],
  },
  country: {
    type: String,
    required: [true, "Country field is required!"],
  },
  password: {
    type: String,
    required: [true, "Password field is required!"],
  },
});

class userClass {
  // `fullName` becomes a virtual
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  set fullName(v) {
    const firstSpace = v.indexOf(" ");
    this.firstName = v.split(" ")[0];
    this.lastName = firstSpace === -1 ? "" : v.substr(firstSpace + 1);
  }

  // `getFullName()` becomes a document method
  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  getFirstName() {
    return `${this.firstName}`;
  }

  getLastName() {
    return `${this.lastName}`;
  }

  getUserName() {
    return `${this.username}`;
  }

  getPhoneNumber() {
    return `${this.phoneNumber}`;
  }

  getEmail() {
    return `${this.email}`;
  }

  getCountry() {
    return `${this.country}`;
  }

  // `findByFullName()` becomes a static
  static findByFullName(name) {
    const firstSpace = name.indexOf(" ");
    const firstName = name.split(" ")[0];
    const lastName = firstSpace === -1 ? "" : name.substr(firstSpace + 1);
    return this.findOne({ firstName, lastName });
  }
}

userSchema.loadClass(userClass);
const User = db.model("User", userSchema);

export default mongoose.model("User", userSchema);
