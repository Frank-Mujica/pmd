import { Component } from '@angular/core';
import { AuthService } from '../login/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html'
})

export class DashboardComponent {

    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit() {
        if (this.authService.isAuthenticated() == false) {
            Swal.fire('Acceso Denegado', `No tienes permiso para acceder a esta página! </br> Está página requiere de un usuario con permisos.`, 'warning');
            this.router.navigate(['/login']);
        } else if (this.authService.roles != "ROLE_GPL") {
            Swal.fire('Acceso Denegado', 'No tienes permisos para acceder a esta página.', 'warning');
            this.router.navigate(['/inicio']);
        }
    }
}