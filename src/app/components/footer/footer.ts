import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
})
export class FooterComponent {
  readonly name: string = 'Jesús Casañas';
  readonly currentYear: number = new Date().getFullYear();
}
