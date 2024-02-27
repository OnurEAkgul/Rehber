import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class coreServices {

  filters: {
    [rule: string]: Function;
  } = {};

  constructor() {
    // Register 'contains' filter on service instantiation
    this.register('contains', this.containsFilter.bind(this));
  }

  filter(value: any[], fields: any[], filterValue: any, filterMatchMode: string, filterLocale?: string): any[] {
    const filterFunction = this.filters[filterMatchMode];
    if (filterFunction) {
      return filterFunction(value, fields, filterValue, filterLocale);
    } else {
      console.error(`Filter mode '${filterMatchMode}' is not registered.`);
      return value;
    }
  }

  register(rule: string, fn: Function): void {
    this.filters[rule] = fn;
  }

  // 'contains' filter implementation
  containsFilter(value: any[], fields: any[], filterValue: any, filterLocale?: string): any[] {
    if (!value || !fields || !filterValue) {
      return value;
    }

    // Convert filter value to lowercase for case-insensitive comparison
    filterValue = filterValue.toLowerCase();

    return value.filter(item => {
      for (const field of fields) {
        const fieldValue = String(item[field]).toLowerCase();
        if (fieldValue.includes(filterValue)) {
          return true;
        }
      }
      return false;
    });
  }
}
