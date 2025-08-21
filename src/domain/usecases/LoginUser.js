export default class LoginUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ phone, password }) {
    if (!phone || !password) throw new Error("Missing credentials");
    
    try {
      const user = await this.userRepository.login({ phone, password });
      return user;
    } catch (error) {
      console.log("usecase error: " + error);
      throw error;
    }

  }
}
