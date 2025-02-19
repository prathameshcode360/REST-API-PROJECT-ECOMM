export default class UserModel {
  constructor(name, email, password, id) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.id = id; // Use 'id' instead of '_id'
  }
}
