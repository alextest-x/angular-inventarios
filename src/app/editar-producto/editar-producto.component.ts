import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from '../producto';
import { ProductoService } from './../producto.service';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html'

})
export class EditarProductoComponent {


  producto: Producto = new Producto();
  id: number;


  constructor ( private productoService: ProductoService,
                private ruta: ActivatedRoute,
                private enrutador: Router) {}

                  //llama el metodo initi despues del constructor 
                  //recibe el parametro el id para ir a buscar en la BD
                  //snapshot accede a los parametros que estamos recibiendo id
                   ngOnInit(): void {
                  
                    this.id = this.ruta.snapshot.params['id']; //obtiene el valor del id en la ruta
                    //que recuperamos en la base de datos

                    this.productoService.obtenerProductoPorId(this.id).subscribe(
                      {
                        //vamos a procesar el objeto que estamos solicitando 
                        //o el error desde el backend: spring
                        //resposnEntity.ok(producto)
                        //error-> RecursoNoEncotradoExcepcion("mensaje");

                        //los datos que recibimos es el objeto de tipo producto
                        //(datos) asigna los datos a la variable this.producto que viene del backend
                        //ya tienen toda la informaion que viene del backend
                        next: (datos) => this.producto = datos
                        ,
                        //se manda a imprimir a consola
                        error:(errores: any) => {console.log(errores)}  

                      }
                    );
                   }

                   //editar producto guarda los datos actualizados
                   onSubmit(){

                    this.editarProducto();
                    return;
                   }


                   editarProducto(){
                    this.productoService.editarProducto(this.id, this.producto).subscribe(
                      {
                        next: (datos) =>  this.irProductoLista(),
                        error: (errores) => console.log(errores)
                      }

                    );
                    
                   }

                   irProductoLista(){
                   this.enrutador.navigate(['/productos']);
                   }    
}
