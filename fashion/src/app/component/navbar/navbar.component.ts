import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isLoggedIn = false;
  username: string | null = null;
  cartItemCount = 0;

  constructor(private authService: AuthService, private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.authService.getUsername().subscribe((name) => {
      this.username = name;
    });

    // Get cart item count
    // this.cartService.getCartItems().subscribe((items) => {
    //   this.cartItemCount = items ? items.length : 0;
    // });
  }

  logout() {
    this.authService.logout();
    this.username = null;
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
