import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MessagesService } from '../messages/messages.service';
import { AuthService } from '../auth.service';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  messages = [] as any[];
  loading = true;

  constructor(
    private messagesSvc: MessagesService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.messagesSvc.getMessages().subscribe((msgs) => {
      this.messages = msgs;
      this.loading = false;
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
