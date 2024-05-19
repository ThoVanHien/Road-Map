## Typescript Type

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
  -
