import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from '../producto';
//import { ProductoService } from './../producto.service';
import { ProductoService } from '../producto.service';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css']
})
export class AgregarProductoComponent {

  //asocia a un objeto que viene del formulario  
  producto: Producto = new Producto();


  //recibimos el servico en el constructor
  //Router para redirigir la respuesta dproducto?: Productoproducto: Productoproducto: Productoel backen del objeto que se ha agregado de producto 
  //al listado de productos
  constructor(private productoServicio:  ProductoService,
    private enrutador: Router){}


    //metodo del formulario onSubmit()
    onSubmit(){
      this.guardarProducto(); //llamamos al metodo
    }


    /*
       (this.producto) pasamos como parametro el objeto
       de producto que viene del submit
       .subscribe nos subscribimos regresa un objto de tipo observble
      */
    guardarProducto(){
       this.productoServicio.agregarProducto(this.producto).subscribe(
        { 
          next: (datos) => {
            //console.log(datos) imprme el objeto que va ala BD
            this.irListaProductos();
          },
          
           error: (error: any ) => {console.log(error)}
        
        }
      );
    }

    //volvemos a cargar los datos
    //para cargar todos los productos
    irListaProductos(){
      this.enrutador.navigate(['/productos']);

    }


  }
