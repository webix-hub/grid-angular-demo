import { AfterViewInit, Component, ElementRef, OnDestroy, inject, viewChild } from '@angular/core';
import { data } from './data';
import { Data } from '../../models/data.model';
import { FiltersService } from '../../shared/definefilters';
import { WebixGridService } from '../../shared/webix-grid';
import { GridAdjustService } from '../../shared/adjust-grid';
import { SystemClickService } from '../../shared/system-click';
import * as webix from 'webix-grid-gpl';

interface SparklineConfig extends webix.WebixSparklineOptions {
  type: string;
}

@Component({
  selector: 'grid-view',
  styleUrl: './grid.css',
  template: ` <div #gridContainer class="grid-container"></div> `,
})
export class GridView implements AfterViewInit, OnDestroy {
  private readonly gridContainerRef =
    viewChild.required<ElementRef<HTMLDivElement>>('gridContainer');
  private readonly gridService = inject(WebixGridService);
  private readonly gridAdjustService = inject(GridAdjustService);
  private readonly filtersService = inject(FiltersService);
  private readonly systemClickService = inject(SystemClickService);

  ngAfterViewInit(): void {
    this.filtersService.registerCustomFilters();
    this.systemClickService.startSystemTick();
    this.initGrid();
  }

  ngOnDestroy(): void {
    this.gridService.destroy();
    this.gridAdjustService.destroyObserver();
    this.systemClickService.destroySystemClick();
  }

  private initGrid(): void {
    const container = this.gridContainerRef().nativeElement;
    const config = this.getGridConfig();

    this.gridService.create(container, { ...config, data });
    this.gridAdjustService.observeResize(container);
  }

  private getGridConfig(): webix.ui.datatableConfig {
    return {
      leftSplit: webix.env.mobile ? 0 : 1,
      sort: 'multi',
      select: 'row',
      drag: 'order',
      dragColumn: true,
      tooltip: true,
      footer: true,
      css: 'custom',
      resizeColumn: { icon: true },
      columns: this.getColumns(),
      scheme: {
        $init: (obj: Data) => {
          obj.last_updated = new Date(obj.last_updated);
          obj.installed = new Date(obj.installed);
        },
      },
      ready: () => {
        this.applyInitialSorting();
      },
    };
  }

  private applyInitialSorting(): void {
    const sortConfig: webix.WebixSortConfig[] = [
      { by: 'room_type', dir: 'asc' },
      { by: 'target_temperature', dir: 'desc' },
    ];

    this.gridService.sort(sortConfig);
    this.gridService.markSorting('room_type', 'asc');
    this.gridService.markSorting('target_temperature', 'desc', true);
  }

  private getColumns(): webix.WebixDatatableColumn[] {
    return [
      {
        id: 'name',
        header: [{ placeholder: 'Room Name', content: 'textFilter' }],
        sort: 'text',
        width: 150,
        footer: {
          content: 'countRows',
        },
      },
      {
        id: 'room_type',
        header: [{ placeholder: 'Type', content: 'selectFilter' }],
        sort: 'text',
        width: 200,
        footer: {
          content: 'systemStatus',
          colspan: 4,
        },
      },
      {
        id: 'current_temperature',
        css: 'align-right',
        header: [
          {
            text: 'Current Temp (°C)',
            placeholder: 'Current Temp (°C)',
            content: 'textFilter',
          },
        ],
        sort: 'int',
        width: 150,
      },
      {
        id: 'target_temperature',
        css: 'align-right',
        header: 'Target Temp (°C)',
        sort: 'int',
        width: 160,
      },
      {
        id: 'system_status',
        header: 'Status',
        sort: 'text',
        tooltip: '#system_status#',
        css: { 'text-align': 'center' },
        template: function (obj: Data) {
          return `<div class="status-badge status-light-${obj.system_status}">
                  <span class="status-text">${obj.system_status}</span>
                </div>`;
        },
      },
      {
        id: 'temperature_history',
        header: 'Temp History',
        template: function (...args: unknown[]) {
          const color = '#2563eb';
          const template = webix.Sparklines.getTemplate({
            type: 'line',
            color,
          } as SparklineConfig);
          return template(...args);
        },
        tooltip: function (_obj: unknown, _common: unknown, value: unknown) {
          return String(value || '');
        },
        minWidth: 180,
        fillspace: true,
      },
      {
        id: 'last_updated',
        format: webix.Date.dateToStr('%M %d, %Y %H:%i:%s'),
        header: 'Last Updated',
        sort: 'date',
        width: 160,
      },
      {
        id: 'installed',
        format: webix.Date.dateToStr('%M %d, %Y'),
        header: [{ placeholder: 'Installation date', content: 'textFilter' }],
        sort: 'date',
        width: 140,
      },
    ];
  }
}
