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
  - const a = [1,2,3, null] // number[]
  - const a = [1,2,3, undefined] // (number| undefined)[]
- Tupple:

  - const a: [number, ?string] // theo đúng thứ tự, nếu ? là optional

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

  - let a: string | number

- Type aliases:
  - type abc = string | number
  - const a:abc = 1 // hoặc 'string'
