import { Component } from '@angular/core';
import { GridView } from './components/grid/grid';

@Component({
  selector: 'app-root',
  template: `<div class="root"><grid-view /></div>`,
  imports: [GridView],
})
export class App {}
