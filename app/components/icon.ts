import { iconMap } from './icon-map';

import { Component, Input, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  inputs: ['icon', 'size', 'color'],
  selector: 'Icon',
  template: `<Label text="{{ iconCode }}" class="icon" [fontSize]="size" [color]="color"></Label>`
})
export class IconComponent implements OnInit {

  public iconCode: string;

  private icons: {
    [key: string]: string;
  } = iconMap;

  @Input() public icon: string;
  @Input() public size: number;
  @Input() public color: string;

  constructor() {

  }

  ngOnInit() {

    this.size = this.size || 30;
    this.color = this.color || '#888888';

    if (!this.icon) {
      console.log('icone deve ser fornecido');
      return;
    }

    if (!this.icons[this.icon]) {
      console.log(`ícone: ${this.icon} não configurado`);
      return;
    }

    this.size = this.size || 40;

    this.iconCode = String.fromCharCode(parseInt(this.icons[this.icon], 16));

  }

}