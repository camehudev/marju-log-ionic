import { Component } from '@angular/core';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonFabButton, IonIcon} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';
import { IonButton } from '@ionic/angular';
import { homeOutline, cubeOutline, mapOutline } from 'ionicons/icons'; // Exemplo de ícones
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ApiService } from '../services/api';
// 👇 ADICIONE ESTA LINHA AQUI EM BAIXO:



@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    ExploreContainerComponent,
    IonFab,
    IonFabButton,
    IonIcon,
    IonButton,
    CommonModule,
   ]
})
export class Tab2Page {

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

  async abrirCameraEnviar() {
    try {
      // 1. Abre a câmara do telemóvel
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64, // Ideal para enviar facilmente para APIs em formato string/base64
        source: CameraSource.Camera
      });

      // Guarda a imagem temporariamente para mostrar no ecrã (opcional)
      this.capturedImage = `data:image/jpeg;base64,${image.base64String}`;

      // 2. Prepara os dados para enviar à API
      const payload = {
        image: image.base64String,
        timestamp: new Date().toISOString()
      };

      this.cameraService.enviarImagem(this.capturedImage).subscribe({
          next: (response) => {
            console.log('Imagem enviada com sucesso:', response);
            // Aqui pode adicionar lógica para mostrar uma mensagem de sucesso ao utilizador
          },
          error: (error) => {
            console.error('Erro ao enviar a imagem:', error);
            // Aqui pode adicionar lógica para mostrar uma mensagem de erro ao utilizador
          }
        });


    } catch (error) {
      console.error('Utilizador cancelou a câmara ou ocorreu um erro:', error);
    }
  }

}
