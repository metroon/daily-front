import { Component, HostListener, OnInit } from '@angular/core';
import { CustomizerService } from '../../services/customizer.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SessionStorageService } from '../../services/session-storage.service';

@Component({
  selector: 'app-customizer',
  templateUrl: './customizer.component.html',
  styleUrls: ['./customizer.component.scss'],
})
export class CustomizerComponent implements OnInit {
  public customizer: any;
  public sidebarSetting: any = 'color';
  public layoutType: string = 'ltr';
  public sidebarType: string = 'default';
  public data: any;
  public configString = '';
  public hasCopied = false;

  constructor(
    public customize: CustomizerService,
    private sessionStorageService: SessionStorageService,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {
    this.customize.data.color.layout_version =
      this.sessionStorageService.getItem('layoutVersion');
    this.customize.data.color.color =
      this.sessionStorageService.getItem('color');
    this.customize.data.color.primary_color =
      this.sessionStorageService.getItem('primary_color');
    this.customize.data.color.secondary_color =
      this.sessionStorageService.getItem('secondary_color');
  }

  @HostListener('document:click', ['$event'])
  clickedOutside(e) {
    this.customizer = '';
  }

  // Open customizer
  openCustomizerSetting(val) {
    this.customizer = val;
  }

  // Sidebar customizer Settings
  customizerSetting(val) {
    this.sidebarSetting = val;
  }

  // Customize Layout Type
  customizeLayoutType(val) {
    this.customize.setLayoutType(val);
    this.layoutType = val;
  }

  // Customize Sidebar Type
  customizeSidebarType(val) {
    if (val == 'default') {
      this.customize.data.settings.sidebar.type = 'default';
      this.customize.data.settings.sidebar.body_type = 'default';
    } else if (val == 'compact') {
      this.customize.data.settings.sidebar.type = 'compact-wrapper';
      this.customize.data.settings.sidebar.body_type = 'sidebar-icon';
    } else if (val == 'compact-icon') {
      this.customize.data.settings.sidebar.type = 'compact-page';
      this.customize.data.settings.sidebar.body_type = 'sidebar-hover';
    }
    this.sidebarType = val;
  }

  // Customize Sidebar Setting
  customizeSidebarSetting(val) {
    this.customize.data.settings.sidebar_setting = val;
  }

  // Customize Sidebar Backround
  customizeSidebarBackround(val) {
    this.customize.data.settings.sidebar_backround = val;
  }

  // Customize Mix Layout
  customizeMixLayout(val) {
    this.customize.setLayout(val);
  }

  // Customize Light Color
  customizeLightColorScheme(val) {
    this.customize.setColorLightScheme(val);
  }

  // Customize Dark Color
  customizeDarkColorScheme(val) {
    this.customize.setColorDarkScheme(val);
  }

  //Display modal for copy config
  copyConfig(popup, data) {
    this.modalService.open(popup, {
      backdropClass: 'dark-modal',
      centered: true,
    });
    let dataAsString = JSON.stringify(this.customize.data, null, '~');
    dataAsString = dataAsString
      .replace(/"([^"]+)":/g, '$1:')
      .replace(/\n~/g, '\n    ')
      .replace(/~/g, '  ')
      .replace(/\n}/g, '\n  }');
    this.configString = `export class ConfigDB {\n  static data = ${dataAsString}\n}`;
  }

  //Copy config
  copyText() {
    this.hasCopied = true;
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.configString;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.toastr.success('Configurações Copiadas');
  }
  ngOnInit() {}
}
