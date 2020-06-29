export class Combobox {
  private _producto_cantidad: number;
  get getproducto_cantidad(): number {
    return this._producto_cantidad;
}
  set setproducto_cantidad(aux:number) {
    this._producto_cantidad = aux;
  }

}
