import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <main>
      <router-outlet />
    </main>
  `,
  styles: [`
    main{
      padding: 0 20px;
    }
  `],
})
export class QuickListApp {
}
