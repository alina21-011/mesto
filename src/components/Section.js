export default class Section {
  constructor({items, renderer}, containterSelector ) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containterSelector);
  }

  addItem(data) {
    this._container.prepend(data);
  }

  renderItems() {
    this._items.reverse().forEach((data) => {
      this.addItem(this._renderer(data))
    })
  }
}