import { Injectable, signal } from '@angular/core';
import * as webix from 'webix-grid-gpl';

// Extend the baseview interface to include additional methods used by this service
interface IWebixGridInstance extends webix.ui.baseview {
  sort(sortConfig: webix.WebixSortConfig | webix.WebixSortConfig[]): void;
  markSorting(columnId: string, dir: 'asc' | 'desc', append?: boolean): void;
  destructor(): void;
}
@Injectable({ providedIn: 'root' })
export class WebixGridService {
  private readonly gridInstance = signal<IWebixGridInstance | null>(null);

  create(container: string | HTMLElement, config: webix.ui.datatableConfig): IWebixGridInstance {
    const grid = webix.grid({
      ...config,
      container,
    }) as IWebixGridInstance;

    this.gridInstance.set(grid);
    return grid;
  }

  adjustGrid(): void {
    this.gridInstance()?.adjust();
  }

  getGrid(): webix.ui.baseview | null {
    return this.gridInstance();
  }

  sort(sortConfig: webix.WebixSortConfig | webix.WebixSortConfig[]): void {
    this.gridInstance()?.sort(sortConfig);
  }

  markSorting(columnId: string, dir: 'asc' | 'desc', append?: boolean): void {
    this.gridInstance()?.markSorting(columnId, dir, append);
  }

  destroy(): void {
    const grid = this.gridInstance();
    if (grid) {
      grid.destructor();
      this.gridInstance.set(null);
    }
  }
}
