export class Member {
  id: string | number;
  name: string;
  picture: string;
  color: string;
  easingFunction: string;
  isCanceled: boolean;
  time: number;
  order: number;
  position: number;

  constructor(
    id: string | number,
    name: string,
    picture: string | null,
    color: string
  ) {
    this.id = id;
    this.name = name;
    this.picture = picture || 'assets/images/race/helmet.png';
    this.color = color;
    this.easingFunction = this.getRandomEasingFunction();
    this.isCanceled = false;
    this.time = 0;
    this.order = 0;
    this.position = 0;
  }

  getRandomEasingFunction() {
    let r1 = Math.floor(Math.random() * 100) / 100;
    let r2 = Math.floor(Math.random() * 100) / 100;
    let x1 = r1 >= r2 ? r1 : r2;
    let x2 = r1 < r2 ? r1 : r2;

    return `cubic-bezier(${x1}, ${x2}, 1, 1)`;
  }
}
