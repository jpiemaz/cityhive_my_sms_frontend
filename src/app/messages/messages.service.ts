import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment';
import { Message } from './message.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MessagesService {
  private api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.api}/api/v1/messages`);
  }

  createMessage(payload: { text: string; phone_number: string }): Observable<Message> {
    return this.http.post<Message>(`${this.api}/api/v1/messages`, payload);
  }
}
