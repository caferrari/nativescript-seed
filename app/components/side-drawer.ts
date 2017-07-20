import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { PushTransition, SlideInOnTopTransition } from 'nativescript-telerik-ui/sidedrawer';
import { RadSideDrawerComponent, SideDrawerType } from 'nativescript-telerik-ui/sidedrawer/angular';
import { isAndroid } from 'platform';
import { ActionItem } from 'ui/action-bar';
import { Page } from 'ui/page';

import { Router } from '../providers/router';

@Component({
  moduleId: module.id,
  selector: 'SideDrawer',
  templateUrl: './side-drawer.html'
})
export class SideDrawerComponent implements AfterViewInit, OnInit {

  @ViewChild(RadSideDrawerComponent)
  public drawerComponent: RadSideDrawerComponent;
  public drawerTransition: any;
  public currentUrl: string;

  private drawer: SideDrawerType;

  constructor(
    private page: Page,
    private router: Router,
  ) {

    this.setActionBarIcon(this.page);
    this.setDrawerTransition();

    this.currentUrl = this.router.currentUrl().replace(/^\//, '');
  }

  public ngOnInit(): void {

  }

  public ngAfterViewInit(): void {
    this.drawer = this.drawerComponent.sideDrawer;
  }

  public navigateTo(page: string): void {
    page = page.replace(/^\//, '');

    if (this.currentUrl === page) {
      this.drawer.closeDrawer();
      return;
    }

    this.router.navigate(`/${page}`);
  }

  public logout() {
    this.router.navigate(`/login`, { fade: true, clearHistory: true });
  }

  private setDrawerTransition(): void {
    if (isAndroid) {
      this.drawerTransition = new SlideInOnTopTransition();
    } else {
      this.drawerTransition = new PushTransition();
    }
  }

  private setActionBarIcon(page: Page): void {
    if (isAndroid) {
      page.actionBar.navigationButton = this.getNavigationButton();
    } else {
      page.actionBar.actionItems.addItem(this.getNavigationButton());
    }
  }

  private getNavigationButton(): ActionItem {
    let navActionItem = new ActionItem();
    navActionItem.icon = 'res://ic_menu_white';
    if (navActionItem.ios) {
      navActionItem.ios.position = 'left';
    }
    navActionItem.on('tap', this.toggleDrawer.bind(this));
    return navActionItem;
  }

  private toggleDrawer(): void {
    this.drawer = this.drawerComponent.sideDrawer;
    this.drawer.toggleDrawerState();
  }
}