import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private hardcodedUsername = 'user';
  private hardcodedPassword = 'password';

  constructor() { }

  login(username: string, password: string): boolean {
    return username === this.hardcodedUsername && password === this.hardcodedPassword;
  }
}