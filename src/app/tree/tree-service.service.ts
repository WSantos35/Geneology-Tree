import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlResolver } from '@angular/compiler';
@Injectable({
  providedIn: 'root'
})
export class TreeServiceService {

  constructor(private client:HttpClient) { }
  private url = 'assets/json/Daxcsa.json';
  private TREE:any;
  private DataTree = {
    Padre: null,
    HijoIz: null,
    HijoDe: null
  }
  private posHijoIz = 0;
  private posHijoDe = 1;

  //CODIGOS PROCESOS
  private SUCCESSFUL = 1;
  private ERROR = 0;
  
  //Obtiene todo los datos del archivo json
  Get_FullTree(){
    return new Promise(((suscribe)=>{
      this.getJson().subscribe((data=>{
        this.TREE = data;
        const RESP = this.CargarDatosIniciales();
        suscribe(RESP);
      }))
    }));
  }
  
  GET_DATA_TREE(){
    return this.DataTree;
  }

  POST_Ver_Hijos(Hijo){
    this.DataTree.Padre=Hijo;
    this.DataTree.HijoIz = this.getHijo(this.DataTree.Padre.children,this.posHijoIz);
    this.DataTree.HijoDe = this.getHijo(this.DataTree.Padre.children,this.posHijoDe);
    return this.DataTree;
  }

  POST_Ver_Padre(Padre){
    const NodoInicial = this.TREE.attributes[0];
    const resp:any = this.BuscarDato(Padre.parent_id,NodoInicial);
      
    if(resp.encontrado){
      this.DataTree.Padre = resp.valor;
      this.DataTree.HijoIz = this.getHijo(this.DataTree.Padre.children,this.posHijoIz);
      this.DataTree.HijoDe = this.getHijo(this.DataTree.Padre.children,this.posHijoDe);
      return {code: this.SUCCESSFUL, message: this.DataTree};
    }else{
      this.DataTree.Padre = Padre;
      this.DataTree.HijoIz = this.getHijo(this.DataTree.Padre.children,this.posHijoIz);
      this.DataTree.HijoDe = this.getHijo(this.DataTree.Padre.children,this.posHijoDe);
      return {code:this.ERROR,message:this.DataTree};
    }
    
  }

  private BuscarDato(idPadre,NodoBusqueda){
    if(NodoBusqueda==null){
      return {encontrado:false};
    }
    if(idPadre==NodoBusqueda.distributor_id){
      return {encontrado:true, valor:NodoBusqueda};
    }
    if(NodoBusqueda.children==null){
      return {encontrado:false};
    }
    if(NodoBusqueda.children.length>this.posHijoIz){
      const respIz:any = this.BuscarDato(idPadre,NodoBusqueda.children[this.posHijoIz]);
      if(respIz.encontrado){
        return respIz;
      }
    }
    if(NodoBusqueda.children.length>this.posHijoDe){
      const respDe:any = this.BuscarDato(idPadre,NodoBusqueda.children[this.posHijoDe]);
      if(respDe.encontrado){
        return respDe;
      }
    }
    return {encontrado: false};
  }

  private getJson(){
    return this.client.get(this.url);
  }

  private CargarDatosIniciales(){
    const PrimerDato = 0;
    if(this.TREE.data==null){
      return {code:this.ERROR, message:"NO EXISTE DATA"};
    }
    this.TREE = this.TREE.data;

    if(this.TREE.attributes!=null){
      if(this.TREE.attributes.length>PrimerDato){
        this.DataTree.Padre = this.TREE.attributes[PrimerDato];
        this.DataTree.HijoIz = this.getHijo(this.DataTree.Padre.children,this.posHijoIz);
        this.DataTree.HijoDe = this.getHijo(this.DataTree.Padre.children,this.posHijoDe);
        return {code: this.SUCCESSFUL, message: this.TREE};
      }else{
        return {code: this.ERROR, message: "NO POSEE DISTRIBUIDORES"};
      }
    }else{
      return {code: this.ERROR, message: "NO POSEE DISTRIBUIDORES"};
    }
  }

  private getHijo(Hijos,posHijo){
    if(Hijos!=null){
      if(Hijos.length>posHijo){
        return Hijos[posHijo];
      }else{
        return null;
      }
    }
    return Hijos;
  }
}

