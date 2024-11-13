import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly hardcodedUsername = 'test';
  private readonly hardcodedPassword = '1234';

  constructor() { }

  login(username: string, password: string): boolean {
    return username === this.hardcodedUsername && password === this.hardcodedPassword;
  }
}
