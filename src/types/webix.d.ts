// Temporary type declarations for webix-grid-gpl v11.3.
// Can be removed once webix-grid-gpl ships its own TypeScript definitions.
declare module 'webix' {
  type WebixCallback = (...args: unknown[]) => unknown;

  interface WebixSortConfig {
    by: string;
    dir: 'asc' | 'desc';
    as?: string;
  }

  interface WebixSparklineOptions {
    type?: string;
    color?: string;
    width?: number;
    height?: number;
  }

  interface WebixDatatableColumn {
    id?: string;
    header?: unknown;
    footer?: unknown;
    sort?: string;
    width?: number;
    minWidth?: number;
    fillspace?: boolean;
    css?: unknown;
    tooltip?: unknown;
    template?: unknown;
    format?: unknown;
  }

  namespace ui {
    interface baseview {}

    interface WebixFilter {
      render?(): string;
      refresh?(master: baseview, node: HTMLElement): void;
      getValue?(): unknown;
      setValue?(value: unknown): void;
      update?(master?: baseview): void;
      startTime?: number;
    }

    interface datatableConfig {
      container?: string | HTMLElement;
      columns?: WebixDatatableColumn[];
      data?: unknown[];
      sort?: string;
      select?: string;
      drag?: string;
      dragColumn?: boolean;
      tooltip?: boolean;
      footer?: boolean;
      css?: string;
      resizeColumn?: boolean | { icon?: boolean };
      scheme?: Record<string, unknown>;
      ready?: () => void;
      leftSplit?: number;
    }

    interface datatable extends baseview {
      adjust(): void;
      sort(config: unknown): void;
      markSorting(columnId: string, dir: string, append?: boolean): void;
      count(): number;
      destructor(): void;
    }

    const datafilter: Record<string, WebixFilter>;
  }

  namespace env {
    const mobile: boolean;
  }

  namespace Sparklines {
    function getTemplate(options: WebixSparklineOptions): (...args: unknown[]) => string;
  }

  namespace Date {
    function dateToStr(format: string): (date: globalThis.Date) => string;
  }

  function callEvent(name: string, params: unknown[]): void;
  function attachEvent(type: string, handler: WebixCallback, id?: string): string | number;
  function detachEvent(id: string): void;
  function extend(target: object, source: object): ui.WebixFilter;
}
