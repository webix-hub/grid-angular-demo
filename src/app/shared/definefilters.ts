import { Injectable } from '@angular/core';
import * as webix from 'webix-grid-gpl';

@Injectable({ providedIn: 'root' })
export class FiltersService {
  registerCustomFilters() {
    this.getCountRowsFilter();
    this.getSystemStatusFilter();
  }

  getSystemStatusFilter(): void {
    const systemStatusFilter: Partial<webix.ui.WebixFilter> & {
      startTime: number;
      node: HTMLElement | null;
      update(master: webix.ui.baseview): void;
      render(): string;
      refresh(master: webix.ui.baseview, node: HTMLElement): void;
    } = {
      startTime: Date.now(),
      node: null as HTMLElement | null,
      render() {
        return "<div class='system-status-footer'></div>";
      },
      refresh(master: webix.ui.baseview, node: HTMLElement) {
        this.node = node;
        this.update(master);
      },
      update(master: webix.ui.baseview) {
        if (!this.node) return;
        const sec = Math.floor((Date.now() - this.startTime) / 1000);
        const h = String(Math.floor(sec / 3600)).padStart(2, '0');
        const m = String(Math.floor((sec % 3600) / 60)).padStart(2, '0');
        const s = String(sec % 60).padStart(2, '0');
        this.node.innerHTML = `
          System running: ${h}:${m}:${s},
          <span class="text-green">0 issues detected</span>
        `;
      },
    };

    webix.ui.datafilter['systemStatus'] = systemStatusFilter;
  }

  getCountRowsFilter(): void {
    webix.ui.datafilter['countRows'] = webix.extend(
      {
        refresh(master: webix.ui.datatable, node: HTMLElement) {
          node.innerHTML = `Total rooms: ${master.count()}`;
        },
      },
      webix.ui.datafilter['summColumn'],
    );
  }
}
