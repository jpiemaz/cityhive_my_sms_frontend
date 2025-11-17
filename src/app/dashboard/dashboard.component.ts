import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MessagesService } from '../messages/messages.service';
import { AuthService } from '../auth.service';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  messages = [] as any[];
  loading = true;
  newMessage = '';
  phoneNumber = '';

  constructor(
    private messagesSvc: MessagesService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages() {
    this.messagesSvc.getMessages().subscribe((msgs) => {
      this.messages = msgs;
      this.loading = false;
    });
  }

  sendMessage() {
    if (!this.newMessage.trim() || !this.phoneNumber.trim()) return;

    this.messagesSvc
      .createMessage({ text: this.newMessage, phone_number: this.phoneNumber })
      .subscribe({
        next: (msg) => {
          this.messages.unshift(msg);
          this.newMessage = '';
          this.phoneNumber = '';
        },
        error: (err) => console.error('Failed to send message', err),
      });
  }

  clearMessage() {
    this.newMessage = '';
    this.phoneNumber = '';
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
