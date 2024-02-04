import { Component } from '@angular/core';
import { Router,RouterModule, RouterOutlet } from '@angular/router';
import { UsersTableComponent } from './users-table/users-table.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,UsersTableComponent,RouterModule,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'usuarios-front';
  constructor(private router: Router) {} 
}
