import { Injectable, signal } from '@angular/core';
import * as webix from 'webix-grid-gpl';
import type { WebixSortConfig } from 'webix';

@Injectable({ providedIn: 'root' })
export class WebixGridService {
  private readonly gridInstance = signal<webix.ui.datatable | null>(null);

  create(
    container: string | HTMLElement,
    config: webix.ui.datatableConfig,
  ): webix.ui.datatable {
    const grid = webix.grid({
      ...config,
      container,
    });

    this.gridInstance.set(grid);
    return grid;
  }

  adjustGrid(): void {
    this.gridInstance()?.adjust();
  }

  getGrid(): webix.ui.datatable | null {
    return this.gridInstance();
  }

  sort(sortConfig: WebixSortConfig | WebixSortConfig[]): void {
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
