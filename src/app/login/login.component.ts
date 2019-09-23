import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';
import Swal from 'sweetalert2';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

    usuario: Usuario;

    constructor(private authService: AuthService, private router: Router) {
        this.usuario = new Usuario;
    }

    ngOnInit() {
        if (this.authService.isAuthenticated()) {
            Swal.fire('Sesión Iniciada', `hola ${this.authService.usuario.username} ya estás autenticado!`, 'info');
            this.router.navigate(['/inicio']);
        }
    }

    login(): void {
        console.log(this.usuario);
        if (this.usuario.username == null || this.usuario.password == null) {
            Swal.fire('Error al ingresar', 'Nombre de usuario y/o contraseña vacías!', 'error');
            return;
        }

        else 

        this.authService.login(this.usuario).subscribe(response => {
            console.log(response);

            this.authService.userSave(response.access_token);
            this.authService.tokenSave(response.access_token);
            let usuario = this.authService.usuario;
            this.router.navigate(['/inicio']);
            Swal.fire('Bienvenido!', `Hola ${usuario.username}! has iniciado sesión correctamente!`, 'success');
        }, error => {
            if (error.status == 400) {
                Swal.fire('Error al ingresar', 'El nombre de usuario y/o contraseña son incorrectas!', 'error');  
            }

            else if (error.status == 401) {
                Swal.fire('Error al ingresar', 'El usuario no se encuentra registrado! </br> Por favor verifique que su nombre de usuario sea correcto.', 'error');  
            }

        });

    }

}