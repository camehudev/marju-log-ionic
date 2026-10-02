import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonItem, IonInput, IonButton, IonButtons, IonModal
} from '@ionic/angular';

@Component({
  selector: 'app-forms-produtos',
  templateUrl: './forms-produtos.component.html',
  styleUrls: ['./forms-produtos.component.scss'],
  imports: [
    CommonModule, ReactiveFormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonItem, IonInput, IonButton, IonButtons, IonModal
  ],
})
export class FormsProdutosComponent  implements OnInit {
  private fb = inject(FormBuilder);

  // Recebe os dados da API vindos do componente Pai
  @Input() dadosApi: any;
  @Input() isModalOpen: boolean = false;

  // Declaração do formulário reativo
  etiquetaForm!: FormGroup;

  ngOnInit() {
    // Inicializa o formulário com os dados recebidos (ou valores vazios por defeito)
    this.etiquetaForm = this.fb.group({
      destinatario: [this.dadosApi?.destinatario || '', Validators.required],
      rua: [this.dadosApi?.rua || '', Validators.required],
      bairro: [this.dadosApi?.bairro || ''],
      cidade_uf: [this.dadosApi?.cidade_uf || '', Validators.required],
      cep: [this.dadosApi?.cep || '', Validators.required]
    });
  }

  // Método executado ao submeter/guardar o formulário
  salvarAlteracoes() {
    if (this.etiquetaForm.valid) {
      console.log('Dados corrigidos pelo utilizador:', this.etiquetaForm.value);
      // Aqui pode enviar para a base de dados ou emitir para o componente pai
      this.isModalOpen = false; // Fecha o modal
    }
  }
}

