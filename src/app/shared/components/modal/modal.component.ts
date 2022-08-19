import {
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalData } from '../../models/modal-data';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() public modalData: ModalData;
  @Input() public isDelete = false;
  @Input() public buttonVisible = true;
  @ViewChild('modal') private modalContent: TemplateRef<ModalComponent>;
  private modalRef: NgbModalRef;

  constructor(private modalService: NgbModal) {}

  ngOnInit() {}

  open(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.modalRef = this.modalService.open(this.modalContent, {
        keyboard: false,
      });
      this.modalRef.result.then(resolve, resolve);
    });
  }

  async onClose(): Promise<void> {
    this.modalRef.close(false);
  }

  async onResult(): Promise<void> {
    this.modalRef.close(true);
  }
}
