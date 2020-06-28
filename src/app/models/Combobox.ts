export class Combobox {
  private _producto_cantidad: number;
  get producto_cantidad(): number {
    return this._producto_cantidad;
}
  set producto_cantidad(aux:number) {
    this._producto_cantidad = aux;
  }

}
