import { ErrorMessage } from 'src/app/shared/models/errormessage';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptorService extends HttpErrorResponse {

constructor(private toastrService: ToastrService) { super(toastrService); }



errormessage!: ErrorMessage;

/*
intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


  return next.handle(request).pipe(
    map((event: HttpEvent<any>) => {



      let errorType="Error";
      let errMsg="";

      if (event instanceof HttpResponse) {

            if (event.status==409 ){
                   this.errormessage=event.body;
                  errMsg=this.errormessage.message;
                  this.toastrService.error(errMsg, errorType+event.status, { closeButton: true });
                }

                if (event.status==404 ){

                  this.errormessage=event.body;
                 errMsg=this.errormessage.message;
                 this.toastrService.error(errMsg, errorType+event.status, { closeButton: true });
               }

               if (event.status==401 ){

                this.errormessage=event.body;
               errMsg=this.errormessage.message;
               this.toastrService.error(errMsg, errorType+event.status, { closeButton: true });
             }

             if (event.status==400 ){

              this.errormessage=event.body;
             errMsg=this.errormessage.message;
             this.toastrService.error(errMsg, errorType+event.status, { closeButton: true });
           }

           if (event.status==500 ){

            this.errormessage=event.body;
           errMsg=this.errormessage.message;
           this.toastrService.error(errMsg, errorType+event.status, { closeButton: true });
         }

           }
 return event;
    }));



  }


}
*/


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

  return next.handle(request ).pipe(catchError((error: HttpErrorResponse) => {

  let errMsg = 'Ops algo ha pasado';

      let errorType = 'Error';




        if (error.status=== 409) {
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


          return throwError(errMsg);
  }));
  }
}






   //let promiseResponse: Promise<Response>=fetch(request.url);

 //  return next.handle(request).pipe(tap(()=>{

  /*   promiseResponse.then(response=> {

        let errortype="Error";
        respuesta: HttpResponse<ErrorMessage>;
        respuesta=response;
        errMsg = `${response.body.}`
      this.toastrService.error(errMsg, errortype, { closeButton: true });
      })

    }));

  }  */
