import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TreeServiceService {

  constructor(private client:HttpClient) { }
  private url = 'assets/json/Daxcsa.json';
  private TREE = {}
  
  //Obtiene todo los datos del archivo json
  Get_FullTree(){
    return new Promise(((suscribe)=>{
      this.getJson().subscribe((data=>{
        this.TREE = data;
        suscribe(this.TREE);
      }))
    }));
  }

  private getJson(){
    return this.client.get(this.url);
  }
}
