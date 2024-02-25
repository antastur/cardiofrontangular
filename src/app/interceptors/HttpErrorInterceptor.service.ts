import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptorService extends HttpErrorResponse {

  constructor(private toastrService: ToastrService) { super(toastrService); }

  showSucess(texto: any,titulo: any){
    this.toastrService.success(texto,titulo);
  }


 showError(texto: any,titulo: any){
  this.toastrService.success(texto,titulo)
}


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

     return next.handle(request).pipe(catchError((error: HttpErrorResponse) => {




      let errMsg = 'Ops algo ha pasado';

      let errorType = 'Error';




        if (error.status === 409) {
          errMsg = `${error.status}, "Acción no permitida"`;
          errorType = 'Conflicto con BD';

            this.toastrService.error(errMsg, errorType, { closeButton: true });
         }

         if (error.status === 404) {
          errMsg = `${error.status}, "No encontrado recurso "`;
          errorType = 'Conflicto con BD';

            this.toastrService.error(errMsg, errorType, { closeButton: true });
         }


         if (error.status === 401) {
          errMsg = `${error.status}, "Sin autorizacion"`;
          errorType = 'Conflicto con BD';

            this.toastrService.error(errMsg, errorType, { closeButton: true });
         }


         if (error.status === 400) {
          errMsg = `${error.status}, "Error en la solicitud"`;
          errorType = 'Conflicto con BD';

            this.toastrService.error(errMsg, errorType, { closeButton: true });
         }


         if (error.status === 500) {
          errMsg = `${error.status}, "Pruebe en otro momento,si no consultar con servicio técnico"`;
          errorType = 'Conflicto de sistema';

            this.toastrService.error(errMsg, errorType, { closeButton: true });
         }

         if (error.status === 200) {
          errMsg = `${error.status}, "Accion realizada con éxito"`;
          errorType = 'Enhorabuena';
          this.toastrService.success(errMsg, errorType, { closeButton: true });
         }
          return throwError(errMsg);
    }));
  }




  }


