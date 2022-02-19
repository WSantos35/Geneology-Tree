import { Component, OnInit } from '@angular/core';
import { TreeServiceService } from './tree-service.service';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit {

  constructor(private ServiceTree:TreeServiceService) { }

  ngOnInit(): void {
    this.data();
  }

  async data(){
    const data = await this.ServiceTree.Get_FullTree();
    console.log(data);
  }

}
