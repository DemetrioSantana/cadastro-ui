import { ErrorHanderService } from './../../core/error-hander.service';
import { ConfirmationService, MessageService } from 'primeng-lts/api';
import { ProdutoService } from './../../produto/service/produto.service';
import { Produto } from 'src/app/produto/model/produto';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-listar-produto',
  templateUrl: './listar-produto.component.html',
  styleUrls: ['./listar-produto.component.css']
})
export class ListarProdutoComponent implements OnInit {
  produtos: Produto[];
  produto: Produto;

  constructor(private service: ProdutoService,
              private confirmationService: ConfirmationService,
              private message: MessageService,
              private errorHandler: ErrorHanderService) { }


  ngOnInit(): void {
    this.listarProdutos();
  }

  listarProdutos(){
    this.produtos = null;
    this.service.listar().subscribe((res: Produto[]) => {
    this.produtos = res;
    });
  }

  confirmarExclusao(produto: any) {
    this.confirmationService.confirm({
        message: 'Deseja realmente excluir este item?',
        accept: () => {
          this.excluirProduto(produto);
       }
    });
 }

 excluirProduto(produto: any) {
    this.service.excluir(produto.id)
    .then(() => {
      this.listarProdutos();
      this.message.add({severity: 'success', summary: 'Exclusão de registro',
      detail: 'Item excluido com sucesso!', closable: true });
    })
    .catch(error => this.errorHandler.handler(error));
 }

}
