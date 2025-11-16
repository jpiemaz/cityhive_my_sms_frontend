import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment';
import { Message } from './message.model';

@Injectable({ providedIn: 'root' })
export class MessagesService {
  private api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getMessages() {
    return this.http.get<Message[]>(`${this.api}/messages`);
  }
}
