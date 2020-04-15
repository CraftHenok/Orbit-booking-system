const colors: any = {
  pastUnserved: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  pastServed: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  future: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  },
  scheduleBlocking: {
    primary: '#123',
    secondary: '#123'
  }
};

/**
 * Color
 * This class is a gateway to all colors used on the appointment card found on the calender
 * use getcolorof to access color by passing the color name
 */
export class Color {

  /**
   *
   * @param colorName - name of the color you need to access
   * @returns - color
   */
  public static getColorOf(colorName: string) {
    return colors[colorName];
  }

}

