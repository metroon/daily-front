import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class ExampleService {
  constructor(private http: HttpClient, private baseService: BaseService) {}

  public getBarChartSingleMock() {
    return this.http.get('assets/data/bar-chart-single.json');
  }

  public getPieChartMock() {
    return this.http.get('assets/data/pie-chart.json');
  }

  public getSingleChartMock() {
    return this.http.get('assets/data/single-chart.json');
  }

  public geMultiDataChartMock() {
    return this.http.get('assets/data/multi-data-chart.json');
  }

  public getTableData() {
    return this.http.get('assets/data/table-data.json');
  }
}
