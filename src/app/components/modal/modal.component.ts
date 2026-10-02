import { Component, inject, Input, OnInit , ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonModal,
  IonTitle,
  IonToolbar,
} from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import {FormsProdutosComponent} from '../forms/forms-produtos/forms-produtos.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  imports: [
    FormsModule,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonModal,
    IonTitle,
    IonToolbar,
    FormsProdutosComponent,
    ReactiveFormsModule
  ],
})
export class ModalComponent implements OnInit {

  constructor() { }

  @ViewChild(IonModal) modal!: IonModal;
  @Input() isModalOpen: boolean = false;
  @Input() respostaApi: any; // Variável para armazenar a resposta da API
  @Input() dadosApi: any;


  // Declaração do formulário reativo
  etiquetaForm!: FormGroup;
  private fb = inject(FormBuilder);

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name!: string;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: CustomEvent<OverlayEventDetail>) {
    if (event.detail.role === 'confirm') {
      this.message = `Hello, ${event.detail.data}!`;
    }
  }



  // Recebe os dados da API vindos do componente Pai


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


