import { Injectable, inject, signal } from '@angular/core';
import { WebixGridService } from './webix-grid';

@Injectable({ providedIn: 'root' })
export class GridAdjustService {
  private readonly gridService = inject(WebixGridService);
  private readonly resizeObserver = signal<ResizeObserver | null>(null);
  private timeout: number | undefined;

  observeResize(container: HTMLElement, debounceMs = 50): void {
    if (!container) return;

    this.setupResizeObserver(
      container,
      () => {
        this.gridService.adjustGrid();
      },
      debounceMs,
    );
  }

  private setupResizeObserver(
    element: HTMLElement,
    onResize: () => void,
    debounceMs: number,
  ): void {
    const observer = new ResizeObserver(() => {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => onResize(), debounceMs);
    });

    observer.observe(element);
    this.resizeObserver.set(observer);
  }

  destroyObserver(): void {
    this.resizeObserver()?.disconnect();
    this.resizeObserver.set(null);
    clearTimeout(this.timeout);
  }
}
