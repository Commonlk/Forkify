import uniqid from "uniqid";

export default class List {
  constructor() {
    this.items = [];
  }

  addItem(count, unit, ingredient) {
    const item = {
      id: uniqid(),
      count,
      unit,
      ingredient,
    };
  }

  deleteItem(id) {
    const index = this.items.findIndex((el) => el.id === id);
    // [2,4,8] splice(1,2) -> return [4,8], original array is [2,8]
    // [2,4,8] slice(1,2) -> return 4, original array is [2,4,8]
    this.item.splice(index, 1);
  }
}
