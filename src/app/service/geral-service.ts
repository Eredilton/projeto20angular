import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { dadosList, itemsList, listaCompleta } from '../model/model';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root',

})
export class GeralService {

   http = inject(HttpClient);
  // constructor(private http:HttpClient) {}

   //private api:any = "http://localhost:3001/produtos";
    private api = environment.baseUrlApi;
    private netApi=environment.netUrl;
    private listaApi=environment.listUrl;

   getListaProdutosApi(): Observable<itemsList[]> {
    return this.http.get<itemsList[]>(`${this.api}`)
  }


  postProdutos(criadorDeProdutos: itemsList): Observable<itemsList> {
    return this.http.post<itemsList>(this.api, criadorDeProdutos);
  }


  deleteProdutos(id: number): Observable<itemsList> {

    return this.http.delete<itemsList>(`${this.api}/${id}`);
  }




  getDados(): Observable<dadosList[]> {

    return this.http.get<dadosList[]>(`${this.netApi}`)
  }


  listaGet():Observable<listaCompleta[]>{
     return this.http.get<listaCompleta[]>(`${this.listaApi}`)

  }


}
