interface User {
  prop: string; // Không thể gán giá trị
  readonly propReadOnly: string;
}

class Admin implements User {
  propReadOnly: any = 5;
  prop: string;
  // propReadOnly: any = 1;
}
let ad = new Admin();
ad.propReadOnly = 1;
console.log(ad.propReadOnly);
