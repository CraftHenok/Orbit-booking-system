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

export class Color {

  public static getColorOf(colorName: string) {
    return colors[colorName];
  }

}

