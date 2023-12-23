import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  var token = localStorage.getItem("prftoken");

  if(token != null && token.length > 0){
    const modifiedRequest = req.clone({
      setHeaders:{
        "Authorization": `Bearer ${token}`
      }
    })
  
    return next(modifiedRequest);
  }else{
    return next(req);
  }
  
};
