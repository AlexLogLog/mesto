export class Section {
    constructor( { renderer}, containerSelector ) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
     }

      setItemList(element) {
        this._container.append(element);
      }
      setItemNew(element) {
        this._container.prepend(element);
      }

      clear() {
        this._container.innerHTML = '';
      }

      renderItems(card) {
        this.clear();
        
        card.forEach(item => {
          this._renderer(item);
        });
      }
}