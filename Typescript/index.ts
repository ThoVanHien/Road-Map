interface O {
  id: number;
  items: string[];
}
type te = O & number;
let test: te = {
  id: 1,
  items: ["1"],
};

// function temp(o: O & number) {
//   // Có thể hiểu O là object. Nó phải so với 1obj thì mới không bị never
//   console.log(o.id, o.items, o.a);
// }

// temp({ id: 1, items: ["1"], a: "1" });
