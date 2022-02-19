import { Component, OnInit } from '@angular/core';
import { TreeServiceService } from './tree-service.service';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit {

  constructor(private ServiceTree:TreeServiceService) { }
  Title:String = "";
  DataTree:any = {
    Padre: null,
    HijoIz: null,
    HijoDe: null
  }
  DataModal = {
    binary_placement: String,
    category_name: String,
    distributor_id: Number,
    full_name: String,
    num_children: Number,
    parent_id: Number,
    parent_username: String,
    product_name: String,
    status: String,
    username: String
  }

  ngOnInit(): void {
    this.CargarData();
  }

  Ver_Hijos(Hijo){
    this.DataTree = this.ServiceTree.POST_Ver_Hijos(Hijo);
  }

  Ver_Padre(Padre){
    const RESP:any = this.ServiceTree.POST_Ver_Padre(Padre);
    console.log(RESP.message);
    if(!RESP.code){
      alert("PADRE NO ENCONTRADO");
    }
    
  }

  CargarDatosModal(Data){
    console.log(Data);
    this.DataModal = {
      binary_placement: Data.binary_placement,
      category_name: Data.category_name,
      distributor_id: Data.distributor_id,
      full_name: Data.full_name,
      num_children: Data.num_children,
      parent_id: Data.parent_id,
      parent_username: Data.parent_username,
      product_name: Data.product_name,
      status: Data.status,
      username: Data.username
    };
  }

  async CargarData(){
    const data:any = await this.ServiceTree.Get_FullTree();
    if(data.code){
      this.Title = data.message.type;
      this.DataTree = this.ServiceTree.GET_DATA_TREE();
      console.log(this.DataTree);
    }else{
      alert(data.message);
    }
  }

}
