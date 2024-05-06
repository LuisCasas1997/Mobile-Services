import { Injectable } from '@angular/core';
import { Firestore, query, collection, where, getDocs } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated = new BehaviorSubject<boolean>(false);

  constructor(private firestore: Firestore) {}

  async validateUser(email: string, password: string) {
    const usersColl = collection(this.firestore, 'usuarios');
    const q = query(usersColl, where('email', '==', email), where('password', '==', password));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  }

  setAuthStatus(status: boolean) {
    console.log("Actualizando estado de autenticación a:", status);
    this.isAuthenticated.next(status);
  }

}
