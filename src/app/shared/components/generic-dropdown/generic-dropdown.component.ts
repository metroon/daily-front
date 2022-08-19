import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-generic-dropdown',
  templateUrl: './generic-dropdown.component.html',
  styleUrls: ['./generic-dropdown.component.scss'],
})
export class GenericDropdownComponent {
  @Output() itemChanged = new EventEmitter();
  @Input() placeholder: string;

  public selectedItem!: any;
  public isVisible: boolean = false;
  public filteredItems: any[];

  private _itemList: any[];
  public get itemList(): any[] {
    return this._itemList;
  }
  @Input()
  public set itemList(v: any[]) {
    this._itemList = v;
    this.filteredItems = v;
  }

  private _shownValue: string;
  public get shownValue(): string {
    return this._shownValue;
  }
  @Input()
  public set shownValue(v: string) {
    this._shownValue = v;
    this.selectedItem = {};
    this.selectedItem[v] = null;
  }

  private _reset: boolean;
  public get reset(): boolean {
    return this._reset;
  }
  @Input()
  public set reset(v: boolean) {
    this._reset = v;
    this.selectedItem = {};
    this.selectedItem[this.shownValue] = null;
  }

  constructor() {}

  toggleDropdown() {
    this.isVisible = !this.isVisible;
  }

  blurDropdown() {
    setTimeout(() => {
      this.toggleDropdown();
    }, 200);
  }

  onItemSelect(item): void {
    this.selectedItem = item;
    this.itemChanged.emit(item);
  }

  resetSelect(): void {
    this.reset = true;
    this.itemChanged.emit(null);
  }
}
