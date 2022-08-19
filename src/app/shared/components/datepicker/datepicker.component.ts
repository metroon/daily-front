import {
  Component,
  EventEmitter,
  Injectable,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  NgbCalendar,
  NgbDateAdapter,
  NgbDateParserFormatter,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';
import { DateHelper } from '../../utils/helpers/date.helper';
@Injectable()
export class CustomAdapter extends NgbDateAdapter<string> {
  readonly DELIMITER = '/';

  fromModel(value: string | null): NgbDateStruct | null {
    if (value) {
      const date = value.split(this.DELIMITER);
      return {
        month: parseInt(date[0], 10),
        day: parseInt(date[1], 10),
        year: parseInt(date[2], 10),
      };
    }
    return null;
  }

  toModel(date: NgbDateStruct | null): string | null {
    return date
      ? date.month + this.DELIMITER + date.day + this.DELIMITER + date.year
      : null;
  }
}

@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {
  readonly DELIMITER = '-';
  public dateFormat = 'dd/MM/yyyy';

  parse(value: string): NgbDateStruct | null {
    if (value) {
      const date = value.split(this.DELIMITER);
      return {
        month: parseInt(date[0], 10),
        day: parseInt(date[1], 10),
        year: parseInt(date[2], 10),
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    if (date) {
      let dateString = `${date.year}/${date.month}/${date.day}`;
      return DateHelper.formatDate(dateString, this.dateFormat);
    } else {
      return '';
    }
  }
}

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],

  providers: [
    CustomDateParserFormatter,
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useExisting: CustomDateParserFormatter },
  ],
})
export class DatepickerComponent implements OnInit {
  @Output() dateChanged = new EventEmitter();
  @Input() canType = true;

  private _format: string = this.formatter.dateFormat;
  public get format(): string {
    return this._format;
  }
  @Input()
  public set format(v: string) {
    this._format = v;
    this.formatter.dateFormat = v;
    if (v === 'PPPP') {
      this.canType = false;
    }
  }

  private _finalDate: string;
  public get finalDate(): string {
    return this._finalDate;
  }
  public set finalDate(v: string) {
    this._finalDate = v;
    if (v) {
      this.dateChanged.emit(new Date(v));
    }
  }

  @Input() currentDate = '';

  private _reset: boolean;
  public get reset(): boolean {
    return this._reset;
  }
  @Input()
  public set reset(v: boolean) {
    this._reset = v;
    if (this.currentDate) {
      this.finalDate = DateHelper.formatDate(this.currentDate);
    } else {
      this.finalDate = '';
    }
  }

  public placeholder = '';
  public minDate = { year: 0, month: 0, day: 0 };

  constructor(private formatter: CustomDateParserFormatter) {}

  ngOnInit() {
    this.setMinDate();
    this.setPlaceholder();
    if (this.currentDate) {
      this.finalDate = DateHelper.formatDate(this.currentDate);
      this.setPlaceholder(this.currentDate);
    }
  }

  setMinDate() {
    let today = new Date();
    this.minDate.year = today.getFullYear();
    this.minDate.month = today.getMonth() + 1;
    this.minDate.day = today.getDate();
  }

  setPlaceholder(date = null) {
    let newDate = (date ? new Date(date) : new Date()).toString();
    this.placeholder = DateHelper.formatDate(newDate, this.format);
  }

  checkCanType(e) {
    let regex = new RegExp(/[0-9-./]/g);
    let isValid = regex.test(e.key);
    isValid = e.key == 'Backspace' ? true : isValid;
    if (!this.canType || !isValid) {
      e.preventDefault();
    }
  }
}
