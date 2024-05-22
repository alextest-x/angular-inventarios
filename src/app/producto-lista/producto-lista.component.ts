import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from '../producto';
import { ProductoService } from '../producto.service';

@Component({
  selector: 'app-producto-lista',
  templateUrl: './producto-lista.component.html'
})
export class ProductoListaComponent {
  productos: Producto[];

  constructor(private productoServicio: ProductoService,
              private enrutador: Router){}
  
  ngOnInit(){
    //inicializamos
    //Cargamos los productos
    this.obtenerProductos();
  }

  private obtenerProductos(){
    // Consumir los datos del observable (suscribirnos) por trae un objeto de tipo observable
    //para que nos avise el observable
    this.productoServicio.obtenerProductosLista().subscribe(
      //recibe un listado un areglo de objeto de tipo producto la guardamos en la variable de datos
      (datos => {
        this.productos = datos; //asignamos los datos que recibimos al atributo de productos
      })
    );
  }


   editarProducto(id:number){
        this.enrutador.navigate(['editar-producto', id]);

   }

   
    eliminarProducto(id:number){
      this.productoServicio.eliminarProducto(id).subscribe(

        { 
          next: (datos) => this.obtenerProductos(),
          error: (errores) => console.log(errores)
        }

      );

    }

}
