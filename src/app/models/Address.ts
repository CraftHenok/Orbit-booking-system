export class Address {
  line1: string;
  line2: string;
  city: string;
  country: string;


  constructor(line1?: string, line2?: string, city?: string, country?: string) {
    this.line1 = line1;
    this.line2 = line2;
    this.city = city;
    this.country = country;
  }
}
