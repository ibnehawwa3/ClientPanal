import { Injectable } from '@angular/core';
import {AngularFirestore,AngularFirestoreCollection,
  AngularFirestoreDocument} from 'angularfire2/firestore';
  import { Observable } from 'rxjs';
import { Client } from '../models/Client';  
import { map } from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class ClientService {
ClientsCollection : AngularFirestoreCollection<Client>;
ClientDoc : AngularFirestoreDocument<Client>;
clients : Observable<Client []>;
client : Observable <Client>;

  constructor(private afs : AngularFirestore) { 
    this.ClientsCollection = this.afs.collection('clients',
    ref => ref.orderBy('lastName','asc'));
  }
  getClients():Observable<Client[]> {
    debugger;
    this.clients = this.ClientsCollection.snapshotChanges().pipe(
    map(changes => {
      debugger;
      return changes.map(action => {
        debugger;
         const data = action.payload.doc.data() as Client;
         data.id = action.payload.doc.id;
         return data
      });
    }));
    return this.clients;
  }
  newClient(client : Client)
  {
    this.ClientsCollection.add(client);
  }
  getClient(id : string) : Observable<Client>{
    this.ClientDoc = this.afs.doc<Client>(`clients/${id}`);
    this.client = this.ClientDoc.snapshotChanges().pipe(
      map(action => {
        if (action.payload.exists === false)
        {return null}
        else{
          const data = action.payload.data() as Client;
          data.id = action.payload.id;
          return data;
          
        }
      }));
      return this.client;
  }
  updateClient(client : Client)
  {
    this.ClientDoc = this.afs.doc(`clients/${client.id}`);
    this.ClientDoc.update(client);
  }
  deleteClient(client : Client)
  {
    this.ClientDoc = this.afs.doc(`clients/${client.id}`);
    this.ClientDoc.delete( );
  }
}
