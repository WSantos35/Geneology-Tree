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

  async CargarData(){
    const data:any = await this.ServiceTree.Get_FullTree();
    if(data.code){
      this.Title = data.type;
      this.DataTree = this.ServiceTree.GET_DATA_TREE();
      console.log(this.DataTree);
    }else{
      alert(data.message);
    }
  }

}
