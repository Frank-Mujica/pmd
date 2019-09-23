import { Component } from '@angular/core';
import { AuthService } from '../login/auth.service';
import { Router } from '@angular/router';
import { Usuario } from '../login/usuario';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})

export class HeaderComponent {

    usuario: Usuario;

    constructor(private authService: AuthService, private router: Router) { }
    
    logout(): void {
        let username = this.authService.usuario.username;
        this.authService.logout();
        Swal.fire('Cerrar Sesión', `Hola ${username} has cerrado sesión éxitosamente!`, 'success');
        this.router.navigate(['/inicio']);
    }

}