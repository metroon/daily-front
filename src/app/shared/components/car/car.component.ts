import { Component, OnInit, Input } from '@angular/core';
import * as tinycolor from 'tinycolor2';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss'],
})
export class CarComponent implements OnInit {
  private _color: string = '#DA4453';
  public get color(): string {
    return this._color;
  }
  @Input()
  public set color(v: string) {
    this._color = v;
    this.accentColor = this.getAccentColor(v);
  }

  @Input() racing = false;
  @Input() time = 5;

  public accentColor: string = '#DF606C';

  constructor() {}

  ngOnInit(): void {}

  getAccentColor(color) {
    color = tinycolor(color);
    return color.isDark()
      ? color.lighten(15).toString()
      : color.darken(15).toString();
  }
}
