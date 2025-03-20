import { Component } from '@angular/core';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  username: string;

  constructor(private userService: UserService){
    const userDetails = this.userService.getUsername();
    this.username = userDetails?.username ? userDetails.username : '';
  }


}
