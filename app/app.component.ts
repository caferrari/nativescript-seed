import { FCMService } from './service/fcm.service';

import { Component, OnInit } from '@angular/core';

import { Color } from 'color';
import { Page } from 'ui/page';

@Component({
  moduleId: module.id,
  selector: 'ns-app',
  template: '<page-router-outlet></page-router-outlet>'
})
export class AppComponent implements OnInit {
  constructor(
    private page: Page,
    private fcmService: FCMService
  ) {
    this.fcmService;
  }

  public ngOnInit(): void {
    this.page.backgroundSpanUnderStatusBar = true;
    this.page.androidStatusBarBackground = new Color('#0972AB');
  }
}