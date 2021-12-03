// Node modules
import { Injectable } from '@angular/core';
// Own modules
import { User } from "src/app/model/user";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  saveLocalStorage(user: User) {
    if (user.email) localStorage.setItem("mystore", JSON.stringify(user));
  }

  readLocalStorage(): User | undefined {
    try {
      const storage = localStorage.getItem("mystore");
      if (storage) return JSON.parse(storage)
      localStorage.clear();
      return undefined;
    } catch (error) {
      localStorage.clear();
      return undefined;
    }
  }

  cleanLocalStorage() {
    localStorage.clear();
  }
}
