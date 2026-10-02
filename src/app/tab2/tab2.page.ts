import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonFabButton, IonIcon, LoadingController} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';
import { IonButton } from '@ionic/angular';
import { homeOutline, cubeOutline, mapOutline } from 'ionicons/icons'; // Exemplo de ícones
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ApiService } from '../services/api';
import { ToastController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import {ModalComponent} from '../components/modal/modal.component';
import { FormsProdutosComponent } from '../components/forms/forms-produtos/forms-produtos.component';



@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    ModalComponent,
    IonFab,
    IonFabButton,
    IonIcon,
    CommonModule,
    FormsModule, FormsProdutosComponent]
})
export class Tab2Page {
  private toastController = inject(ToastController);
  private loadingController = inject(LoadingController); // Injetar o LoadingController
  private cd = inject(ChangeDetectorRef);

  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(private cameraService: ApiService) {
    /**
     * Any icons you want to use in your application
     * can be registered in app.component.ts and then
     * referenced by name anywhere in your application.
     */
    addIcons({ add });
  }

  capturedImage: string | undefined;
  respostaApi: any; // Variável para armazenar a resposta da API

  // Função auxiliar para mostrar o Toast
  async apresentarToast(mensagem: string, cor: 'success' | 'danger' = 'danger') {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 3000, // Duração em milissegundos (3 segundos)
      position: 'middle', // Pode ser 'top', 'middle' ou 'bottom'
      color: cor, // 'danger' para vermelho (erros), 'success' para verde
    });
    await toast.present();
  }

async abrirCameraEnviar() {
    let loading: HTMLIonLoadingElement | null = null;

    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera
      });

      if (image.base64String) {
        this.capturedImage = `data:image/jpeg;base64,${image.base64String}`;

        const responseFetch = await fetch(this.capturedImage);
        const blob = await responseFetch.blob();

        const formData = new FormData();
        formData.append('file', blob, 'foto.jpg');

        loading = await this.loadingController.create({
          message: 'Processando imagem...',
        });
        await loading.present();

        // REMOVIDO o 'await' daqui, pois .subscribe() não é uma Promise
        this.cameraService.enviarImagem(formData).subscribe({
          next: (response: any) => {
            loading?.dismiss();

            if (response && response.endereco_organizado) {
              this.respostaApi = response.endereco_organizado; // Atualiza a variável
            } else {
              this.apresentarToast('A API não retornou uma resposta válida.');
            }

            // FORÇA O ECRÃ A ATUALIZAR IMEDIATAMENTE
            this.cd.detectChanges();
          },
          error: (err: any) => {
            loading?.dismiss();
            console.error('Erro ao enviar imagem:', err);
            this.apresentarToast(`Erro ao processar a imagem na API: ${err.message}`);

            // FORÇA O ECRÃ A ATUALIZAR EM CASO DE ERRO
            this.cd.detectChanges();
          }
        });
      }

    } catch (error: any) {
      loading?.dismiss();
      if (error.message !== 'User cancelled photo app') {
        console.error('Erro na câmara:', error);
        this.apresentarToast(`Não foi possível capturar a imagem: ${error.message}`);
        this.cd.detectChanges();
      }
    }
  }


}
