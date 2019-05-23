import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { SearchableField, SortableItem, SortableValue } from "@app/shared/components/grid/grid.model";

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit, OnChanges {

  @ViewChild('content') private content: ElementRef;
  /**
   * Тайтл которвй отображает компонента
   */
  @Input() title: string = '';
  /**
   * Шаблон для элемента списка который будет отрисован
   */
  @Input() private template: TemplateRef<any>;
  /**
   * Поля по которым возможен поиск
   */
  @Input() private searchFields: SearchableField[] = [];
  /**
   * Поля по которым возможна сортировка
   */
  @Input() private sortableFields: SortableItem[] = [];
  /**
   * Данные которая компонента должна отрисовать
   */
  @Input('data') private outerData: any[];

  /**
   * Input позволяет передать извне функцию которая будет фильтровать данные
   * @param searchValue
   * @param data
   */
  @Input() private searchData(searchValue: string, data: any[]): any[] {

    return data.filter((item) => {

      let found = !this.searchFields.length;

      this.searchFields.forEach(field => {

        let fieldValue = item[field];
        if (typeof fieldValue === 'number') {
          fieldValue = fieldValue.toString();
        }
        if (fieldValue.toUpperCase().includes(searchValue.toUpperCase())) {
          found = true;
        }

      });

      return found;

    });
  }

  /**
   * Input позволяет передать извне функцию которая будет сортировать данные
   * @param sortValue
   * @param data
   */
  @Input() private sortData(sortValue: SortableValue, data: any[]): any[] {
    if (sortValue) {
      return data.sort((a, b) => {
        if (a[sortValue.field] < b[sortValue.field]) {
          return sortValue.type === 'DESC' ? 1 : -1;
        } else if (a[sortValue.field] > b[sortValue.field]) {
          return sortValue.type === 'DESC' ? -1 : 1;
        } else {
          return 0;
        }
      });
    } else {
      return data;
    }
  }

  filterForm = new FormGroup({
    search: new FormControl(''),
    sort: new FormControl('')
  });

  private gridData : any[];

  constructor(private viewContainerRef: ViewContainerRef) {

  }

  ngOnInit(): void {
    this.filterForm.valueChanges.subscribe(res => {
      this.filterData();
    });
  }

  ngOnChanges(): void {
    this.filterData();
  }

  private filterData() {
    const sortValue = this.filterForm.get('sort').value.split('.');
    const searchValue = this.filterForm.get('search').value;
    this.gridData = this.sortData(
      sortValue[1] ? {
        field: sortValue[0],
        type: sortValue[1]
      } : null,
      this.searchData(searchValue, this.outerData)
    );

    /**
     * Не самый оптимальный вариант т.к. при каждом вызове будут перерисовываться все шаблоны
     * Не хватило времени что бы оптимизировать
     */
    this.setGridView();
  }

  private setGridView() {
    if (this.template && this.outerData) {
      this.content.nativeElement.innerHTML = '';
      this.gridData.forEach(item => {
        this.viewContainerRef.createEmbeddedView(this.template, { $implicit: item }).rootNodes.forEach(node => {
          this.content.nativeElement.appendChild(node);
        });
      });
    }
  }
}
