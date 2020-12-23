import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  template: '<div class="lds-roller">\n' +
    '      <div></div>\n' +
    '      <div></div>\n' +
    '      <div></div>\n' +
    '      <div></div>\n' +
    '      <div></div>\n' +
    '      <div></div>\n' +
    '      <div></div>\n' +
    '      <div></div>\n' +
    '    </div>',
  styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent {
}
