export default class UserModel {
  constructor(id, name, email, password, type) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.type = type;
  }
  static register(name, email, password, type) {
    const newUser = new UserModel(
      users.length + 1,
      name,
      email,
      password,
      type
    );
    users.push(newUser);
    return newUser;
  }
  static login(email, password) {
    const user = users.find((u) => u.email == email && u.password == password);
    return user;
  }
  static getOne(id) {
    const user = users.find((u) => u.id == id);
    return user;
  }

  static getAll() {
    return users;
  }
}
let users = [
  new UserModel(1, "user1", "user1@gmail.com", "pass123", "admin"),
  new UserModel(2, "user2", "user2@gmail.com", "pass456", "customer"),
  new UserModel(3, "user3", "user3@gmail.com", "pass789", "customer"),
  new UserModel(4, "user4", "user4@gmail.com", "pass101", "customer"),
  new UserModel(5, "user5", "user5@gmail.com", "pass202", "admin"),
];
