export class Section {
    constructor( {item, renderer}, containerSelector ) {
        this._item = item;
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
    
      renderItems() {
        this.clear();
    
        this._item.forEach(item => {
          this._renderer(item);
        });
      }
}