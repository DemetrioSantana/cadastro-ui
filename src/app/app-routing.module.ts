import { ListarProdutoComponent } from './views/listar-produto/listar-produto.component';
import { CriarProdutoComponent } from './views/criar-produto/criar-produto.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: ListarProdutoComponent
  },
  {
    path: 'criar-produto',
    component: CriarProdutoComponent
  },
  {
    path: 'criar-produto/:id',
    component: CriarProdutoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
