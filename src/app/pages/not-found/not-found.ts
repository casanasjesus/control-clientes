import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [RouterModule],
  templateUrl: './not-found.html',
})
export class NotFoundComponent {
  readonly title: string = 'Error 404';
  readonly subTitle: string = 'No se encontró el recurso solicitado.';
  readonly buttonText: string = 'Volver al incio';
}
