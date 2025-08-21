export default class RegisterUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ email, password, phone }) {
    if (!email || !password || !phone) {
      throw new Error("Missing required fields");
    }

    const user = await this.userRepository.register({ email, password, phone });
    return user; 
  }
}
