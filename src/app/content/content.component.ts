import { Component, OnInit } from '@angular/core';
import { CountersService } from './../services/counters/counters.service';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
  providers: [CountersService]
})
export class ContentComponent implements OnInit {
  form: FormGroup;
  public dataIsPresent: boolean;
  errorShown: boolean;
  errorMessage: string;
  public rows: Array<any> = [];
  public columns: Array<any> = [
    { title: 'Date', name: 'date', dataType: 'String' },
    { title: 'Group', name: 'group', filtering: { filterString: '', placeholder: 'Filter by Group' }, dataType: 'String' },
    { title: 'Counter Value', name: 'countervalue', filtering: { filterString: '', placeholder: 'Filter by Counter Value' }, dataType: 'Integer' }
  ];
  public page: number = 1;
  public itemsPerPage: number = 10;
  public maxSize: number = 5;
  public numPages: number = 1;
  public length: number = 0;

  public config: any = {
    paging: true,
    sorting: { columns: this.columns },
    filtering: { filterString: '' },
    className: ['table-striped', 'table-bordered']
  };

  private data: Array<any>;

  public constructor(public counterService: CountersService, public formBuilder: FormBuilder) {
    this.form = formBuilder.group(this.initLoginFormModel());
    this.errorShown = false;
    this.dataIsPresent = false;

  }

  public ngOnInit(): void {

  }

  public changePage(page: any, data: Array<any> = this.data): Array<any> {
    console.log("changePage is called");
    let start = (page.page - 1) * page.itemsPerPage;
    let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  public changeSort(data: any, config: any): any {
    let localData: Array<any> = data;
    console.log("sorting data are ", localData.length);
    console.log("config is", config);
    if (!config.sorting) {
      return data;
    }

    let columns = this.config.sorting.columns || [];
    let columnName: string = void 0;
    let dataType: string = "";
    let sort: string = void 0;
    let sortNumber: number = 0;

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].sort !== '' && columns[i].sort !== false) {
        columnName = columns[i].name;
        if (columns[i].dataType == "Integer") {
          dataType = "Integer";
          sortNumber = columns[i].sort;
        } else {
          sort = columns[i].sort;
        }
      }
    }

    if (!columnName) {
      return data;
    }

    if (dataType == "Integer") {
      console.log("Accessing integer sort");
      return data.sort((previous: number, current: number) => {
        if (sort == 'desc') {
          return current[columnName] - previous[columnName];
        } else {
          return previous[columnName] - current[columnName];
        }
      });

    }
    return data.sort((previous: any, current: any) => {
      if (previous[columnName] > current[columnName]) {
        return sort === 'desc' ? -1 : 1;
      } else if (previous[columnName] < current[columnName]) {
        return sort === 'asc' ? -1 : 1;
      }
      return 0;
    });
  }

  public changeFilter(data: any, config: any): any {
    console.log("changeFilter is called");
    let filteredData: Array<any> = data;
    this.columns.forEach((column: any) => {
      if (column.filtering) {
        filteredData = filteredData.filter((item: any) => {
          if (typeof item[column.name] != "string") {
            item[column.name] = String(item[column.name]);
          }
          return item[column.name].match(column.filtering.filterString);
        });
      }
    });

    if (!config.filtering) {
      return filteredData;
    }

    if (config.filtering.columnName) {
      return filteredData.filter((item: any) =>
        item[config.filtering.columnName].match(this.config.filtering.filterString));
    }

    let tempArray: Array<any> = [];
    filteredData.forEach((item: any) => {
      let flag = false;
      this.columns.forEach((column: any) => {
        if (item[column.name].toString().match(this.config.filtering.filterString)) {
          flag = true;
        }
      });
      if (flag) {
        tempArray.push(item);
      }
    });
    filteredData = tempArray;

    return filteredData;
  }

  public onChangeTable(config: any, page: any = { page: this.page, itemsPerPage: this.itemsPerPage }): any {
    console.log("The mother of all calls");
    if (config.filtering) {
      Object.assign(this.config.filtering, config.filtering);
    }

    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }

    let filteredData = this.changeFilter(this.data, this.config);
    let sortedData = this.changeSort(filteredData, this.config);
    this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
    this.length = sortedData.length;
  }

  public onCellClick(data: any): any {
    console.log(data);
  }

  getData(path: string) {
    this.counterService.getMetricsCounters(path).subscribe(
      counterValues => {
        this.data = counterValues;
        this.length = this.data.length;
        if (this.length == 0) {
          this.errorShown = true;
          this.errorMessage = " No data found";
        }
        else {
          console.log("data length is ", this.length);
          this.onChangeTable(this.config);
          this.dataIsPresent = true;
          this.errorShown = false;
          this.errorMessage = "";
        }
      },
      error => {
        console.log("error saving component");
        console.log(error);
      }
    );
  }

  initLoginFormModel() {

    const model = {
      counterPath: ['', [Validators.required]]
    };

    return model;
  }

  subscribeRegistrationFormChanges() {
    Object.keys(this.form.controls).forEach(key => {
      this.form.controls[key].setValidators(this.initLoginFormModel()[key][1]);
      this.form.controls[key].updateValueAndValidity();
    });
  }

  submit(value: any) {
    let abpath: string = value.counterPath;
    abpath = abpath.replace(/\\/g, "-0-");
    abpath = abpath.replace(/:/g, "-1-");
    this.getData(abpath);
    console.log(this.data);
  }

  onClickClear() {
    this.dataIsPresent = false;
    this.clearTableData();
    this.onChangeTable(this.config);
  }

  clearTableData() {
    this.data = [];
    this.length = this.data.length;
    this.errorShown = false;
    this.errorMessage = "";
    this.form.reset();
  }

}

