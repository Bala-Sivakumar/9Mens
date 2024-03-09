import { ApiService } from './app.service';
import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppModule } from './app.module';
import { FormsModule } from '@angular/forms';
import { EventEmitter } from 'stream';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { PersonDto, ShareDto } from './dto.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { ModalComponent } from '../utils/modal.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { TableComponent } from '../utils/table/table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule,AppModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  tableModalRef: MdbModalRef<TableComponent> | null = null;
  [x: string]: any;
  protected title = 'lj88_homies';
  protected name:any = '';
  protected amount:any = '';
  protected spent:any = '';
  protected getname:any = '';
  protected homiesDetails:PersonDto[]=[];
  protected spenderShareMap: Map<string, number> = new Map<string, number>();
  protected getDetails:ShareDto[]=[];
  protected currentDate = new Date();
  protected currentPage:string='ADD';
  protected tableHeaders:Array<String>=['Person','Amount']

  constructor(private ApiService: ApiService,private dialog: MatDialog,private modalService: MdbModalService) { }

  ngOnInit(){
    //console.log(this.currentDate.toLocaleString());

  }

  protected onSubmit(){
    this.homiesDetails=[];
    if (this.currentPage === 'ADD') {
      const amt = this.amount / ((this.spent.split(',').length) + 1);
      const person: PersonDto = {
        spender: this.name,
        date: this.currentDate.toLocaleString(),
        total_amount: this.amount ,
        share_amount:amt,
        shared_with: this.spent
      };
      this.homiesDetails.push(person)
      this.loadPersonsByAge(this.homiesDetails!)
    } else {
      this.getPersonsBySharedWith(this.getname);
    }
  }



  protected loadPersonsByAge(details: PersonDto[]): void {
    this.ApiService.createUser(details)
        .subscribe({
            next: (data: PersonDto[]) => {
                console.log(data);
                this.dialog.open(ModalComponent, {
                  width: '400px',
                  data: 'Successfully Stored Details' // Set width as needed
                  // Add more configuration options as needed
                });
            },
            error: (error) => {
                console.error('Error fetching persons:', error);
                this.dialog.open(ModalComponent, {
                  width: '400px',
                  data: 'Failed to Store Details' // Set width as needed
                  // Add more configuration options as needed
                });
            }
          });
}


  protected tabswitch(value:string){
    switch (value) {
      case "GET":
          this.currentPage = 'GET';
        break;

      default:
          this.currentPage = 'ADD';
        break;
    }

  }

protected getPersonsBySharedWith(getname:string): void {
  this.ApiService.getPersonsBySharedWith(this.getname)
  .subscribe(persons => {
    this.getDetails = persons;
    console.log(this.getDetails)
    this.openModal(persons);
  });
}


openModal(getDetails:ShareDto[]) {
  this.tableModalRef = this.modalService.open(TableComponent, {
    modalClass: 'cust'


  })
  this.tableModalRef.component.inputData = getDetails ;
  this.tableModalRef.component.tableHeaders = this.tableHeaders ;
}
}
