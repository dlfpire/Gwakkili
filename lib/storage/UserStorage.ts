import { UserCategory, UserData } from "../type/userType";
import SessionStorageKey from "./sessionStorageKey";

class UserStorage {
  static getPubKey(): string | null {
    return sessionStorage.getItem(SessionStorageKey.pubkey);
  }
  static getPrivateKey(): string | null {
    return sessionStorage.getItem(SessionStorageKey.privatekey);
  }

  static setPubKey(pubkey: string) {
    sessionStorage.setItem(SessionStorageKey.pubkey, pubkey);
  }
  static setPrivKey(privkey: string) {
    sessionStorage.setItem(SessionStorageKey.privatekey, privkey);
  }

  static getUserProfile(): UserData | null {
    if (!sessionStorage) return null;

    const user = sessionStorage.getItem(SessionStorageKey.user_profile);
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }
  static getUserCategory(): UserCategory | null {
    const user = this.getUserProfile();
    if (user == null) return null;

    const category = sessionStorage.getItem(SessionStorageKey.user_category);

    if (category == null) return null;
    return JSON.parse(category) as UserCategory;
  }

  static setUserProfile(profile: UserData) {
    sessionStorage.setItem(
      SessionStorageKey.user_profile,
      JSON.stringify(profile)
    );
  }
  static setUserCategory(category: UserCategory) {
    sessionStorage.setItem(
      SessionStorageKey.user_category,
      JSON.stringify(category)
    );
  }

  static clear() {
    sessionStorage.removeItem(SessionStorageKey.pubkey);
    sessionStorage.removeItem(SessionStorageKey.privatekey);

    sessionStorage.removeItem(SessionStorageKey.user_profile);
    sessionStorage.removeItem(SessionStorageKey.user_category);
  }
  static isLoggedIn(): boolean {
    return this.getPubKey() !== null && this.getPrivateKey() !== null;
  }
}

export default UserStorage;
