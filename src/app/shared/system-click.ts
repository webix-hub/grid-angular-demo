import { Injectable } from '@angular/core';
import * as webix from 'webix-grid-gpl';

@Injectable({ providedIn: 'root' })
export class SystemClickService {
  private tickInterval: number | undefined;
  private tickHandler: string | number | undefined;

  startSystemTick(intervalMs: number = 50) {
    this.tickInterval = setInterval(() => {
      webix.callEvent('system:tick', []);
    }, intervalMs);

    // systemStatus.update surely can be called in tickInterval directly, it's just a showcase of API
    this.tickHandler = webix.attachEvent('system:tick', () => {
      this.getSystemStatusFilter()?.update?.();
    });
  }

  destroySystemClick() {
    clearInterval(this.tickInterval);
    if (this.tickHandler) {
      webix.detachEvent(String(this.tickHandler));
    }
  }

  private getSystemStatusFilter() {
    return webix.ui.datafilter['systemStatus'] as
      | (webix.ui.WebixFilter & {
          update(master?: webix.ui.baseview): void;
        })
      | undefined;
  }
}
