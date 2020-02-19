const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

export class Color {
  private static colorNames = ['red', 'blue', 'yellow'];

  public static getColorOf(colorName: string) {
    return colors[colorName];
  }

  public static getRandomColor() {
    return colors[this.colorNames[this.getRandomInt(this.colorNames.length)]];
  }

  private static getRandomInt(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
  }
}

