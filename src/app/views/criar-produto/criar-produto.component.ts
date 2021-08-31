import { ErrorHanderService } from './../../core/error-hander.service';
import { MessageService } from 'primeng-lts/api';
import { ProdutoService } from './../../produto/service/produto.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CurrencyMaskDirective } from 'ngx-currency';
import { kStringMaxLength } from 'buffer';


@Component({
  selector: 'app-criar-produto',
  templateUrl: './criar-produto.component.html',
  styleUrls: ['./criar-produto.component.css']
})
export class CriarProdutoComponent implements OnInit {

constructor(private router: Router,
            private errorHandler: ErrorHanderService,
            private routerActive: ActivatedRoute,
            private formBuilder: FormBuilder,
            private servico: ProdutoService,
            private message: MessageService,
            private titulo: Title) {
            }

produto: FormGroup;

presente: Date;
passado: Date;
futuro: Date;

mascaraCustomizada: any;
lb: any;
control: any;
mensagemDeValidacao: any;

campoInvalido = false;

mascaraMoedaCustomizada = '0';

unidadeAbreviada: string;
inputQuantidade: string;



unidade = {
  label: 'un',
  value: '',
  mask: { prefix: '',
  thousands: '',
  decimal: '',
  precision: 4 }
};

unidadeMascara = [
  {
  label: 'lt',
  value: 'LITRO',
  mask: { prefix: '',
  thousands: '.',
  decimal: ',',
  precision: 3 }
},
  {
  label: 'kg',
  value: 'QUILO',
  mask: { prefix: '',
  thousands: '.',
  decimal: ',',
  precision: 3 }
},
  {
  label: 'un',
  value: 'UNIDADE',
  mask: { prefix: '',
  thousands: '',
  decimal: '',
  precision: 4 }
}];
contador = 0;
unidades = [
  {ordinal: 0, name: 'LITRO', value: 'lt'},
  {ordinal: 1, name: 'QUILO', value: 'kg'},
  {ordinal: 2, name: 'UNIDADE', value: 'un'}
];



pt = {
  firstDayOfWeek: 0,
  dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
  dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
  dayNamesMin: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sa'],
  monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
    'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
  monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
  today: 'Hoje',
  clear: 'Limpar'
};


  ngOnInit(): void {
      this.configurarFormulario();
      this.titulo.setTitle('Casdastro de produto');
      this.configurarDatas();
      const idProduto = this.routerActive.snapshot.paramMap.get('id');
      if (idProduto){
          this.titulo.setTitle('Atualização de produto');
          this.carregarProduto(idProduto);
        }
  }

  atualizarProduto(){
    this.servico.atualizar(this.produto.value).then(
        () => {
          this.message.add({severity: 'success', summary: 'Registro de novo produto',
            detail: 'Produto atualizado com sucesso!', closable: true });
          this.produto.reset();
          this.router.navigate(['/criar-cadastro']);
        })
        .catch( error => {
            this.errorHandler.handler(error.status);
        });
  }

  acoes(){
    if (this.produto.valid) {
      if (this.produto.value.id === null){
         this.salvarNovoProduto();
       }else{
         this.atualizarProduto();
       }
   } else {
     this.validacoesDoFormulario(this.produto);
     this.message.add({severity: 'error', summary: 'Erro de validação',
     detail: 'Campo obrigatório!', closable: true });
   }

    }

    validacoesDoFormulario(forGrouo: FormGroup){
      Object.keys(this.produto.controls).forEach(campo => {
        const control = this.produto.get(campo);
        control.markAsDirty();
        if (control instanceof FormGroup) {
          this.campoInvalido = true;
          this.mensagemDeValidacao = 'O campo ' + control + 'é obrigatório!';
          this.validacoesDoFormulario(forGrouo);
        }
      });
    }

  carregarProduto(idProduto: string) {
    this.servico.buscar(idProduto)
    .then((produto) => {
      this.produto.patchValue(produto);
      this.validarCamposPreenchidos();
     })
    .catch(err => {
      this.errorHandler.handler(err);
    }
      );
  }

  configurarFormulario(){
    this.produto = this.formBuilder.group({
      id: [],
      nomeDoItem: ['', Validators.required],
      unidadeDeMedida: [null, Validators.required],
      quantidade: [null, Validators.required],
      preco: [null, Validators.required],
      produtoPerecivel: [false, Validators.required],
      dataDeValidade: [],
      dataDeFabricacao: [null, Validators.required]
      });
  }

  salvarNovoProduto() {
    this.servico.salvar(this.produto.value).then(
          () => {
            this.message.add({severity: 'success', summary: 'Registro de novo produto',
              detail: 'Cadastro realizado com sucesso!', closable: true });
            this.produto.reset();
          })
          .catch( error => {
              this.errorHandler.handler(error.status);
          });
  }

  configurarDatas(){
    this.presente = new Date();
    this.passado = new Date(new Date().getFullYear() * (-10));
    this.futuro = new Date(new Date().getFullYear() * 10);
  }
  configurarMascara(dado){
    this.produto.get('quantidade').setValue(null);
    this.produto.get('quantidade').markAsPristine();
    this.unidadeAbreviada = dado.label;
    this.alterarCampoQuantidade(dado.label);
  }


  alterarCampoQuantidade(dado) {
         this.unidadeMascara  .forEach(unidade => {
          if (unidade.value === this.produto.value.unidadeDeMedida.name) {
           this.unidade = unidade;
          }
        });
  }

  validarCamposPreenchidos() {
    if (this.produto.valid) {
         this.unidades.forEach(unidade => {
          if (unidade.value === this.produto.value.unidadeDeMedida.name) {
            this.produto.get('unidadeDeMedida').setValue(unidade);
        }
      });
    }
  }

  validarTamanhoMinimo(valor: number) {
    return (input: FormControl) => {
      return (!input.value || input.value.length >= valor) ? null : { tamanhoMinimo: { tamanho: valor } };
    };
  }


}
