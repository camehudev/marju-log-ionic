import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // Injeção moderna recomendada pelo Angular
  private http = inject(HttpClient);

  private apiUrl = 'http://127.0.0.1:8000/stock/scan-image';

  enviarImagem(base64Image: string): Observable<any> {
    const payload = {
      image: base64Image,
      timestamp: new Date().toISOString()
    };

    return this.http.post<any>(this.apiUrl, payload);
  }
}
