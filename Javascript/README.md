# Ref

-[Jonas course]

(1) : https://github.com/jonasschmedtmann/complete-javascript-course/blob/master/14-OOP/final/script.js

(2) : https://www.udemy.com/course/the-complete-javascript-course/

-[Javascript Tutorial]: https://www.javascripttutorial.net/

## Argument vs. Parameter

<p align="center" width=100%>
    <img width=80% src="https://i.sstatic.net/9lg1H.png">
</p>

### 1. Argument object

- Argument object trong một function là gì. Mình lấy ví dụ:

```javascript
function example() {
  console.log(arguments[0]); // 1
}
example(1, 3);
```

- Nhìn có vẻ giống một array, nhưng nó KHÔNG phải là một instance của Array

```javascript
function example() {
  return arguments.filter((x) => x > 0); //arguments.filter is not a function
}
example(1, 2, 3, 4);
```

- Nó là một `iterable`.
<p align="center" width=100%>
    <img width=80% src="./ex1.png">
</p>

- `Arrow Function` KHÔNG có Argument Object.

### 2. Rest parameter

- Rest parameter `...` phải được xuất hiện ở cuối:

```javascript
function fn(a,...rest, b) {
 // error, nếu chuyển rest xuống cuối thì rest là Array không phải Argument object
}
```

- Gom 1 đóng lại thành một array mới:

```javascript
let [x, y, ...args] = [70, 80, 90, 100];
//args = [90, 100]
```

### 3. Spread operator

- Cũng là `...` nhưng xuất hiện bất kì ở đâu ngoại trừ vị trí của rest(vì nếu ở đó thì gọi là rest rồi).

- Spread trong Array hoặc một iterable object (Map, Set):

```javascript
const odd = [1, 3, 5];
const combined = [2, ...odd, 4, 6];
console.log(combined); //[ 2, 1, 3, 5, 4, 6 ]
```

- Spread trong Object(ES2018):

```javascript
const hien = {
  name: 'hien',
};
const student = {
  ...hien,
  age: 1998
};

console.log(student);
/*
{
     name: 'hien',
     age: 1998
}
/*
```

- Các trường hợp hay dùng:

  - Push element vào array:

    ```javascript
    const a = [1, 2];
    const b = [3, 4];
    b.push(...a); //push từng phần tử
    //khác với
    b.push(a); // push 1 phần tử
    ```

  - Nối mảng

    ```javascript
    const a = [1, 2];
    const b = [3, 4];
    const c = [...a, ...b];
    ```

  - Clone một array mới(chỉ là shallow copy):

    ```javascript
    const a = [1, [2, [3]]];
    const b = [...a];
    // b[1] === a[1]
    ```

  - Clone object mới(chỉ là shallow copy):

    ```javascript
    const hien = {
      name: "hien",
    };
    const student = {
      hien,
      age: 1998,
    };
    const teacher = {
      ...student,
    };
    console.log(teacher);
    //student.hien === hien
    ```

  - Nối object:
    ```javascript
    const hien = {
      name: "hien",
    };
    const student = {
      age: 1998,
    };
    const teacher = {
      ...student,
      ...hien,
    };
    console.log(teacher);
    ```

### 4. Destructuring

- Object:

  > let { property1: alias1, property2: alias2 = defaultIfUndefined} = object != null || {};

  > Thường dùng destructuring trong function. ({a,b}) => a+b

- Array:
  > let [property1: alias1, property2: alias2 = defaultIfUndefined] = array != null || [];
  ```javascript
  const [a, b, c] = [1, 2, 3];
  //let a = 1, b = 2, c = 3;
  ```

## Promise/Async/Await

- Eager giống như construtor của class, chạy mỗi khi khởi tạo object
- Lazy giống như define một function mà không chạy.
- Ref: https://duthanhduoc.com/blog/on-tap-callback-promise-async-await

### 1. Promise

- Javascript Promises are Eager and Not Lazy:

  ```javascript
  const promise = new Promise((resolve, reject) => {
      console.log ("Creating promise");
      resolve("data");
      //Or reject(error')
      //Or throw new Error('error)
  )};
  ```

- Convert Eager to Lazy:
  ```javascript
  const promise = () =>
    new Promise((resolve, reject) => {
      console.log("Creating promise");
      resolve("data");
      //Or reject(error')
      //Or throw new Error('error')
    });
  ```
- The same ways return Promise:
  - First way:
    ```javascript
    const p1 = new Promise((resolve, reject) => {
      resolve("data"); // <=> return resolve("data");
      //Or reject("error"); <=> return reject ("error"); <=> throw new Eror ("error")
    });
    ```
  - Second way:
    ```javascript
    const p2 = async () => {
      return "hello"; // <=> return Promise.resolve('hello');
      // Or return Promise.reject('error'); <=> throw new Error('error');
      // If not return, the data will be undefined
    };
    ```
  - Third way:
    ```javascript
    const p3 = () => {
      return Promise.resolve("hello");
      // Or return Promise.reject('error');
    };
    ```
- Promise chaining:

  - Use with `then`:
    ```javascript
    p.then((res) => {
      // Default return Promise.resolve(); If not return anything.
      return res + 1; // <=> Promise.resolve(res + 1)
      // Or throw new Error('error'); <=> return Promise.reject('error');
    }).then(console.log);
    ```
  - Use with `catch`:

    ```javascript
    p.catch((error) => {
      // Default return Promise.resolve(); If not return anything.
      return error + " at..."; // <=> Promise.resolve(error + " at...")
      // Or throw new Error('error'); <=> return Promise.reject('error');
    }).then(console.log);
    ```

- Tip to avoid promise hell:
  ```javascript
  // There are 2 promise: p1,p2. And p1 need data p2
  const p1 = (value) => Promise.resolve("p1 get" + value);
  const p2 = Promise.resolve("data from p2");
  p2.then((data) => {
    return p1(data);
  }).then(console.log); //p1's then
  ```

### 2. Async/Await

- `Async function` always return a `promise`.
- The `await` operator is used to wait for a Promise and get its fulfillment value. It can only be used inside an `async function`.

  ```javascript
  const p = Promise.resolve("data");
  const aFn = async () => {
    const data = await p;
    console.log(data); // From this line will be pushed microtask queue.
    return 1; // Default return Promise.resolve(); If not return anything.
  };
  aFn();
  console.log("script end");
  ```

- Handle error with try/catch:

  ```javascript
  const getApi1 = () => {
    return Promise.reject(new Error("Loi get api"));
  };
  const getApi2 = async () => {
    try {
      await getApi1(); // Đoạn này kết quả reject nên nhảy vào catch ở dưới
      console.log("in try getapi2");
      return "value getApi2";
    } catch (error) {
      // Default return Promise.resolve(); If not return anything.
    }
  };

  const getApi3 = async () => {
    //Should use try/catch in the top level of async function
    try {
      const data = await getApi2();
      console.log(data);
    } catch (error) {
      console.log("loi roi");
    }
  };
  getApi3();
  console.log("script end");
  //script end
  //undefined
  ```

### 3. Event Loop

- Ref: https://viblo.asia/p/event-loop-trong-javascript-microtask-macrotask-promise-va-cac-cau-hoi-phong-van-pho-bien-GyZJZjrbJjm
- Order of execution: `Sync code` -> `Microtask` -> `Rendering` -> `Macrotask`.
- If have a `await` promise:

  - The `Event Loop` will wait until this promise is resolved.
  - Tasks in the code following an await expression will be added to the `Microtask queue`.

- Ví dụ từ bài viết:

  ```javascript
  async function async1() {
    console.log("async1 start");
    await async2(); // Phải đợi cho tới khi async2 này resolved
    console.log("async1 end"); // Đưa vào microtask queue
  }

  async function async2() {
    console.log("async2 start");
    //Chờ cho promise này chạy xong
    await new Promise((resolve) => {
      console.log("async2 promise"); //Sync code
      setTimeout(() => {
        console.log("async2 setTimeout"); // Đưa vào macrotask queue
        resolve();
      }, 100);
    });
    console.log("async2 end"); // Đưa vào microtask queue. Có await async2() nên đợi cái này xong.
    // Function này không return nên mặc định là Promise.resolve() = undefined
  }
  async1();
  ```

- When we use setTimeout(cb, 3000): Runtime will register timer or libuv(Nodejs).
- Một vài bài toán về rendering performance trong bài viết:

  ```javascript
  let count = 0;
  setInterval(() => {
    document.getElementById("count").innerHTML = `Count: ${++count}`;
  }, 1000);

  function start() {
    console.log("start");
    let i = 0;

    let start = Date.now();

    function count() {
      // move the scheduling to the beginning
      if (i < 2e9 - 1e6) {
        // Những setTimeout lồng nhau thì từ cái thứ 6 trở đi sẽ delay 4ms
        setTimeout(count); // schedule the new call
        // Đưa setTimeout lên đây sẽ làm cho macrotask queue sẽ có sẵn callback mà không phải chờ đưa vào.
      }

      do {
        i++;
      } while (i % 1e6 != 0);

      if (i == 2e9) {
        document.getElementById("log").innerHTML =
          "Log: Done in " + (Date.now() - start) + "ms";
      }
    }

    count();
  ```

## Object and Class

- Hình tròn đại diện cho function, hình vuông đại diện cho Object. Ref: https://www.javascripttutorial.net/javascript-prototype/
  > `obj.constructor` sẽ tìm các properties của nó trước sau đó tìm ở `obj.__proto__`

<p align="center" width=100%>
    <img width=50% src="https://www.javascripttutorial.net/wp-content/uploads/2022/01/JS-prototype-object-with-method.svg">
</p>

- Kế thừa trong javascript bằng prototype:

  > `let teacher = Object.create(person)`

  > `Object.create(object, propertiesObject)` // lấy toàn bộ properties methods của object cho `prototype` object mới

<p align="center" width=100%>
    <img width=30% src="https://www.javascripttutorial.net/wp-content/uploads/2022/01/JavaScript-prototypal-inheritance-example.svg">
</p>

- Con trỏ `this` sẽ references tới object mà hiện tại đang gọi function. Trick lỏ ví dụ x.y thì x là this.

  - Function invocation: `this` sẽ ref tới `global object` với `non-strict` và `undefined` với `strict-mode`
  - Method invocation: `obj.method()`, `this` sẽ trỏ tới `obj` đang gọi method đó. Nếu gán method đó bằng biến khác thì khi gọi biến đó `this` sẽ ref tới `global object`. Bất kể là có gán cho obj khác đi nữa. Dùng `call`, `bind`, `apply`.
  - Contructor invocation: sử dụng từ khóa `new` với một function (không phải `arrow function`) sẽ tạo `this = {}` trong function đó
  - Indirect invocation: sử dụng `call`, `bind`, `apply`.
    - `call(thisArg, arg1, arg2, ...)`: gọi hàm và truyền object như là `this`
    - `bind(thisArg, [arg1,arg2,...])`: giống call
    - `apply(thisArg, arg1, arg2, ...)`: trả về 1 hàm mới.

- Object Property types:

  - Data properties

    ```javascript
    "use strict";
    let obj = {};

    Object.defineProperty(obj, "age", {
      configurable: false, // có thể được redefined hay delete không. Default true
      enumerable: true, // Có thể `for in` key này không. Default true
      writable: true, // value có thể được change không. Default true
      value: "5", // value. Default undefined
    });
    delete obj.age; // Có lỗi do `configurableset` là false
    ```

  - Acessor properties

    ```javascript
    let obj = {};

    Object.defineProperty(obj, "fullName", {
      configurable: false, // có thể được redefined hay delete không. Default true
      enumerable: true, // Có thể `for in` key này không. Default true
      get: function () {
        // khi read value thì get function tự động gọi. Default undefined
        return this.firstName + " " + this.lastName;
      },
      set: function (value) {
        // Khi assign value thì set function tự động gọi.
        if (value && typeof value === "string") {
          this.firstName = value;
        }
        throw "Invalid name";
      },
    });
    ```

  - `Object.getOwnPropertyDescriptor()`: descriptor là Data + Accessor
  - `For...in` loop được cả prototype chain.
  - `obj.hasOwnProperty()` return boolean. Xác định property đó có phải của riêng obj đó không.
  - `Factory function` là function return 1 obj.
  - `obj ?. property` return về undefined thay vì quăng lỗi. Có thể dùng với function để kiểm tra func đó có là undefined hay null.
  - `?? [expression]` nếu giá trị trước đó là null hoặc undefined.

- Class ES6

  <img width=45% src="./assets/constructorfn.png"> ====>
  <img width=46.5% src="./assets/class.png">

  - Class KHÔNG `hoisted`
  - `new class {}`: class expression. Dùng để tạo 1 singleton object
  - `[expression]`: có thể dùng để làm tên key
  - `static funcProperty(){}` hoặc `this.constructor.funcProperty()` để call static function. Static function là function không thuộc về obj mà là của class.
  - Dùng `#` trước filed để đánh dấu private(ES2022). Nếu trình duyệt không hỗ trợ hãy dùng `let` hoặc `var`

- Closure: lưu trữ biến của outer function. Có thể kết hợp với IIFE để gói setTimeout
