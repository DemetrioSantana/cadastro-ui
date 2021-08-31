import { FormGroup } from '@angular/forms';
import { Produto } from './../model/produto';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import * as moment from 'moment';

const URL_API = environment.apiUrl;
const httpOtions = {
    headers: new HttpHeaders({
    'access-control-allow-origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
  })
 };


@Injectable({
  providedIn: 'root'
})
export class ProdutoService {


  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      return of(error as T);
    };
  }

  // POST /produtos
  salvar(produto: Produto): Promise<Produto> {
   return this.http.post<Produto>(URL_API + '/produtos', produto, httpOtions)
   .toPromise();
  }

  // PUT /produtos
  atualizar(produto: Produto): Promise<Produto> {
    return this.http.put<Produto>(URL_API + '/produtos/' + produto.id, produto, httpOtions)
    .toPromise();
  }

  // GET /produtos
  buscar(id: string): Promise<Produto> {
    return this.http.get<Produto>(URL_API + '/produtos/' + id, httpOtions)
    .toPromise()
    .then(response => {
      const produto = response;

      this.converterStringsParaDatas([produto]);

      return produto;

    });
  }

  // DELETE /produtos
  excluir(id: number): Promise<any> {
    return this.http.delete<Produto>(URL_API + '/produtos/' + id, httpOtions)
    .toPromise();
  }

  // GET /produtos
  listar(){
    return this.http.get(URL_API + '/produtos', httpOtions);
  }

  converterStringsParaDatas(produtos: Produto[]){
    for (const produto of produtos) {
      produto.dataDeFabricacao = moment(produto.dataDeFabricacao,
        'YYYY-MM-DD').toDate();

      if (produto.dataDeValidade) {
        produto.dataDeValidade = moment(produto.dataDeValidade,
          'YYYY-MM-DD').toDate();
      }
    }
  }
}

