import { User } from '../../domain/entities/User';
import authApi from '../api/AuthApi';

export default class UserRepository {
  async register({ email, password, phone }) {
    
    try {
      const response = await authApi.register({ email, password, phone });

      return new User({
        email: response.user.email,
        token: response.token || null
    });
    } catch (err) {
      throw err;
    }
  }

  async login({ phone, password }) {

    try {
      const response = await authApi.login({ phone, password });
      const { user, token } = response;
      return new User({
        email: user.email,
        token: token
      });
    } catch (err) {
      throw err;
    }
  }

}
