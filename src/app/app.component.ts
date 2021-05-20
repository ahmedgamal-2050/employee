import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'employee';
  public todayDate: Date = new Date();
  public userName: string = "Ahmed Gamal";
}
