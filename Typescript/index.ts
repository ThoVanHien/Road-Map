class Person {
  private static _instance: Person;
  private constructor() {}
  static getInstance() {
    if (this._instance) {
      return this._instance;
    }
    this._instance = new Person();
    return this._instance;
  }
}
const p1 = Person.getInstance();
const p2 = Person.getInstance();
console.log(p1 === p2); //true
