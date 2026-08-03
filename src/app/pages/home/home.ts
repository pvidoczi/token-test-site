import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import {
  IdsCardBodyDirective,
  IdsCardComponent,
  IdsCardHeaderComponent,
  IdsCardSubtitleDirective,
  IdsCardTitleDirective,
} from '@i-cell/ids-angular/card';
import { IdsCheckboxComponent } from '@i-cell/ids-angular/checkbox';
import { IdsDividerComponent } from '@i-cell/ids-angular/divider';
import { IdsRadioComponent, IdsRadioGroupComponent } from '@i-cell/ids-angular/radio';
import { IdsSwitchComponent } from '@i-cell/ids-angular/switch';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FormsModule,
    IdsButtonComponent,
    IdsCardBodyDirective,
    IdsCardComponent,
    IdsCardHeaderComponent,
    IdsCardSubtitleDirective,
    IdsCardTitleDirective,
    IdsCheckboxComponent,
    IdsDividerComponent,
    IdsRadioComponent,
    IdsRadioGroupComponent,
    IdsSwitchComponent,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  protected notificationsEnabled = true;
  protected selectedPlan = 'standard';
}
