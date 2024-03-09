import { ComponentFactoryResolver, ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { PersonDto, ShareDto } from './dto.model';
import { ModalComponent } from '../utils/modal.component';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8080/persons';
  private componentRef!: ComponentRef<ModalComponent>;
  private componentSubscriber!: Subject<string>;

  constructor(private http: HttpClient,private resolver: ComponentFactoryResolver) { }

  createUser(userData: PersonDto[]): Observable<PersonDto[]> {
    return this.http.post<PersonDto[]>(`${this.apiUrl}/add`, userData);
  }

  getPersonsBySharedWith(sharedWith: string): Observable<ShareDto[]> {
    const params = new HttpParams().set('sharedWith', sharedWith);
    return this.http.get<ShareDto[]>(`${this.apiUrl}/details`, { params });
  }


}
