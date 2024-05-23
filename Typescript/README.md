## Typescript Type

- Link tham khảo: https://www.typescripttutorial.net/
- Type inference: TS tự gán kiểu khi gán biến
- Type annotations: đặt type cho biến. Sd khi chưa muốn gán giá trị ngay tại thời điểm khởi tạo, rõ ràng kiểu giá trị trả về của 1 hàm.
- Các kiểu primitive types trong typescript: number, bigint, string, boolean, null, undefined, symbol
- {}, Object, object type:
  - {} và Object: re-assign object, array, primitive type
  - {} cho gán lại function trùng với Object.prototype còn Object thì không cho.
  - object thì cho gán lại object, array, và không phải là primitive type
    {[key: string]: string} không cho gán lại bất kì gì ngoài tuân theo quy tắc. Vd: {prop: 'kieu du lieu string'}
- Array:
  ```typescript
  const a = [1, 2, 3, null]; // number[]
  const a = [1, 2, 3, undefined]; // (number| undefined)[]
  ```
- Tupple:

  ```typescript
  const a: [number, ?string]; // theo đúng thứ tự, nếu ? là optional
  ```

- Enum:
  ```typescript
  let a = 7; // return undefined
  a = 5; // return 5
  // Đối enum thì bên dưới sẽ chạy như sau
  enum Month = {
    Jan,
    Feb // ...
  }
  // const Month = {}
  // Month[Month['Jan'] = 0] = "Jan"
  ```
- Union:

  ```typescript
  let a: string | number;
  ```

- Type aliases:

  ```typescript
  type abc = string | number;
  const a: abc = 1; // hoặc 'string'
  ```

- Class trong typescript:

  - Access Modifiers:
    - Private: chỉ sử dụng được trong class.
    - Public: truy cập bởi class, instance.
    - Protected: chỉ base class và subclass
  - Readonly: `readonly` property, không thể gán lại bằng constructor hoặc gán bình thường.
  - Getters/Setters: `get` và `set` property | method. Dùng để xào nấu một private property nào đó. Thường property đặt tên biến `_tenBien`. `get tenBien() {...}`
  - Kế thừa dùng `extends`. `super` dùng để gọi constructor của base class.
  - Method overriding: `super.meThod()` ở subclass
  - `Instance property` là property sau khi được `new classA()`.
  - `Static property` là property được share chung giữa các instances của 1 class. Chỉ dùng như sau `classA.staticProperty` Không dùng `this`

- ## Abstract classes:

  - Có thể chứa normal method.
  - Nếu có method là abstract method thì class bắt buộc phải là abstract class.
  - Abstract class phải được `extends` chứ không khởi tạo instance trực tiếp.

  ```typescript
  abstract class Employee {
    abstract fn(): string;
    name: string;
    constructor() {
      this.name = this.fn();
    }
  }

  class ContractEmployee extends Employee {
    constructor() {
      super();
    }
    fn() {
      return "Contract Van Hien";
    }
  }

  const emp = new ContractEmployee();
  console.log(emp);
  ```

## Singleton Pattern

- Link tham khảo: https://www.youtube.com/@procademy
- Thêm private vào trước constructor.

  ```typescript
  class Person {
    private static _instance: Person;
    private constructor() {}
    static getInstance() {
      if (this._instance) {
        return this._instance;
      }
      this._instance = new Person();
      return Person._instance;
    }
  }
  const p1 = Person.getInstance();
  const p2 = Person.getInstance();
  console.log(p1 === p2); //true
  ```

## Interface

- `interface NameI`: không chứa bất kì `implementation` nào
- `interface` giống như `type`
- Những trường hợp sử dụng `interface`:

  - Dùng như type của object.
  - Dùng `implements` để class có các properties và method như interface đã định nghĩa.
  - Dùng để định nghĩa kiểu dữ liệu của parameter trong 1 function

  ```typescript
  interface User {
    prop: string; // Không thể gán giá trị
    greetUser(): void; // method
  }

  // TH1
  let user: User;
  user = {
    prop: "prop",
    greetUser() {
      console.log(this.prop);
    },
  };
  user.greetUser();

  // TH2
  class Admin implements User {
    prop: string = "hien";
    greetUser(): void {
      console.log(this.prop);
    }
  }

  // TH3
  function callAMessage(user: User) {
    user.greetUser();
  }
  const ad = new Admin();
  callAMessage(ad);
  ```

- Readonly trong `interface`

  - Nếu trong interface định nghĩa là `readonly` thì khi class `implements` interface đó thì có thể khai báo lại mà không cần phải có từ khóa `readonly`. Điều này xảy ra 1 vấn đề khi dùng class để làm kiểu dữ liệu thì hoàn toàn có thể sử dụng prop định nghĩa ở lớp cha(không còn `readonly`)

- Optional: sử dụng sau tên prop. Ví dụ `location?: string|undefined = 'HCM city'`

- `interface` có thể multi `extends`. Còn `class` chỉ có thể single `extends`

## Intersection `&`

- Video tham khảo: https://youtu.be/ZVMAPLvfcDc?si=7E8J2gPqVaTNWedn

```typescript
// TH1
type stringOrNumber = string | number;
type boolOrNumber = number | boolean;
type myType = stringOrNumber & boolOrNumber; // giống với toán tử &&

// TH2
type a = {
  name: string;
};
type b = {
  name: number;
};
type c = a & b; // sẽ bị lỗi do nó compare từng member type với nhau

// TH3
interface O {
  id: number;
  items: string[];
}
function temp(o: O & {}) {
  // Có thể hiểu O là type object. Nó phải so với keys trong type object
  console.log(o.id, o.items);
}
temp({ id: 1, items: ["1"] });
```
