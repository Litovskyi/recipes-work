import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AlertService} from '../../alert.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit, OnDestroy {

  @Input() delay = 5000;
  public type = 'success';
  public text: string;
  sub: Subscription;

  constructor(private alertService: AlertService) {
  }

  ngOnInit() {
    this.sub = this.alertService.alert.subscribe(alert => {
      this.text = alert.text;
      this.type = alert.type;

      const timeout = setTimeout(() => {
        clearTimeout(timeout);
        this.text = '';
      }, this.delay);
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}
