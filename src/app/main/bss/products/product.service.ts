import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private firestore: Firestore) {}

  getProducts() {
    const coll = collection(this.firestore, 'products');
    return collectionData(coll, { idField: 'id' });
  }

  addProduct(product: any) {
    const coll = collection(this.firestore, 'products');
    return addDoc(coll, product);
  }

  editProduct(id: string, productData: any) {
    const productDoc = doc(this.firestore, `products/${id}`);
    return updateDoc(productDoc, productData);
  }

  deleteProduct(id: string) {
    const productDoc = doc(this.firestore, `products/${id}`);
    return deleteDoc(productDoc);
  }
}
