export class IconNavigation {
  link: string;
  toolTipTitle: string;
  iconName: string;

  constructor(link: string, toolTipTitle: string, iconName: string) {
    this.link = link;
    this.toolTipTitle = toolTipTitle;
    this.iconName = iconName;
  }
}

export class Navigation {
  homeLink: string;
  iconNavigations: IconNavigation[];

  constructor(homeLink: string, iconNavigations: IconNavigation[]) {
    this.homeLink = homeLink;
    this.iconNavigations = iconNavigations;
  }
}
