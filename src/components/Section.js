export default class Section {
  constructor({ renderer}, containterSelector ) {
  
    this._renderer = renderer;
    this._container = document.querySelector(containterSelector);
  }

  addItem(data) {
    this._container.prepend(data);
  }

  renderItems(items) {
    items.reverse().forEach((data) => {
      this.addItem(this._renderer(data))
    })
  }
}

