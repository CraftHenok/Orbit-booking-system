/**
 * Navigation
 * the data used by navigation component
 */
export class Navigation {
  /**
   * the base link of the navigation
   * example: the link of the logo image in any dashboard
   * in case of admin '/admin'
   */
  homeLink: string;

  /**
   * list of the icon navigation that appear on the side nav
   */
  iconNavigations: IconNavigation[];

  constructor(homeLink: string, iconNavigations: IconNavigation[]) {
    this.homeLink = homeLink;
    this.iconNavigations = iconNavigations;
  }
}

/**
 * icon navigation
 */
export class IconNavigation {
  /**
   * where to navigate when clicked
   */
  link: string;

  /**
   * the title of the tooltip
   * shown when hovered
   */
  toolTipTitle: string;

  /**
   * name of the icon
   * the icon name could be from angular material icon collection
   * or custom registered one
   */
  iconName: string;

  constructor(link: string, toolTipTitle: string, iconName: string) {
    this.link = link;
    this.toolTipTitle = toolTipTitle;
    this.iconName = iconName;
  }
}
