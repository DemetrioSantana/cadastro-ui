import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';

import localePt from '@angular/common/locales/pt';

import { ConfirmDialogModule } from 'primeng-lts/confirmdialog';

import { ErrorHanderService } from './core/error-hander.service';
import { AppComponent } from './app.component';
import { MessageComponent } from './components/templates/message/message.component';
import { HeaderComponent } from './components/templates/header/header.component';
import { FooterComponent } from './components/templates/footer/footer.component';
import { ListarProdutoComponent } from './views/listar-produto/listar-produto.component';
import { CriarProdutoComponent } from './views/criar-produto/criar-produto.component';
import { ProdutoService } from './produto/service/produto.service';

import { ButtonModule } from 'primeng-lts/button';
import { TooltipModule } from 'primeng-lts/tooltip';
import { CardModule } from 'primeng-lts/card';
import { ToolbarModule } from 'primeng-lts/toolbar';
import { InputTextModule } from 'primeng-lts/inputtext';
import { ToggleButtonModule } from 'primeng-lts/togglebutton';
import { CalendarModule } from 'primeng-lts/calendar';
import { DropdownModule } from 'primeng-lts/dropdown';
import { InputNumberModule } from 'primeng-lts/inputnumber';
import { TableModule } from 'primeng-lts/table';
import { MessageService } from 'primeng-lts/api';
import { ConfirmationService } from 'primeng-lts/api';
import { ToastModule } from 'primeng-lts/toast';
import { MessageModule } from 'primeng-lts/message';
import { InputMaskModule } from 'primeng-lts/inputmask';
import { NgxCurrencyModule } from 'ngx-currency';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MessageComponent,
    CriarProdutoComponent,
    ListarProdutoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,

    ToolbarModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    ToggleButtonModule,
    CalendarModule,
    DropdownModule,
    InputNumberModule,
    TableModule,
    TooltipModule,
    CommonModule,
    ToastModule,
    MessageModule,
    ConfirmDialogModule,
    NgxCurrencyModule,
    InputMaskModule

  ],
  providers: [
    ProdutoService,
    ErrorHanderService,
    MessageService,
    ConfirmationService,
    {provide: LOCALE_ID, useValue: 'pt'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
