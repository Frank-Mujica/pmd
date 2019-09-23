import { Component } from '@angular/core';

@Component({
  //El selector indica con que ruta se llamará el componente desde el index.html 
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Bienvenido a pmd!';
}
