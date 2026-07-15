import { Component } from '@angular/core';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IdsButtonComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  protected handleClick(): void {
    console.log('Button clicked!');
  }
}
