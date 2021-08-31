import { Injectable } from '@angular/core';
import { Message, MessageService } from 'primeng-lts/api';

@Injectable({
  providedIn: 'root'
})
export class ErrorHanderService {

  constructor(private message: MessageService) { }

  handler(error: any) {
    let msg: any;

    if (typeof error === 'string') {
        msg.detail = error;
    } else {
      msg = 'Erro ao processar serviço remoto. Tente novamente!';
    }

    this.message.add({severity: 'error', summary: 'Erro', detail: msg, closable: true });

  }
}
