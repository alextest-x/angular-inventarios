import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from './producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private urlBase = "http://localhost:8080/inventarios-app/productos";

  constructor(private clienteHttp: HttpClient) { }


  //el observable regresa un objeto de tipo Producto
  obtenerProductosLista(): Observable<Producto[]>{
    return this.clienteHttp.get<Producto[]>(this.urlBase);
  }

   //en el metodo recibe un objeto de tipo producto
   //que es un objeto que vamos a enviar en la peticion de tipo post
   //regresa un objeto de tipo observable 
   //es de tipo Object pero es de tipo Producto 

  
   //enviamos al producto como parte del cuerpo del mensaje
  agregarProducto(producto: Producto): Observable<Object>{
  return this.clienteHttp.post(this.urlBase, producto);
  
  }

   obtenerProductoPorId(id:number){
    return this.clienteHttp.get<Producto>(`${this.urlBase}/${id}`);
  }


     //enviamos al producto como parte del cuerpo del mensaje
     //y lo regresa actualizado
     editarProducto(id: number, producto: Producto): Observable <Object> { 
       return this.clienteHttp.put(`${this.urlBase}/${id}`, producto);
      
      }

     eliminarProducto(id: number): Observable <Object> { 
      return this.clienteHttp.delete(`${this.urlBase}/${id}`);

     }
  


}
