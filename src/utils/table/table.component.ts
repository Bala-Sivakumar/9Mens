import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})

export class TableComponent {

  @Input() inputData: any=[];
  @Input() tableHeaders: Array<String>=[];
  convertedArray?: { key: string, value: number }[];

  constructor() {
  }
  ngOnInit(){

  }

}
