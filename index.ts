import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Http } from '@angular/http';
import { Injectable, InjectionToken, Inject } from '@angular/core';

export interface MicroServiceAPIConfig {
    baseUrl: string
}

export const MICRO_API_CONF = new InjectionToken<MicroServiceAPIConfig>("microservice.api.config");


export abstract class Service{
    abstract post(microserviceName: string, methodName: string, param: any): Observable<any>;
}

@Injectable()
export class MicroserviceClient extends Service{
    private buildUrl: (string)=>string;
    constructor(private http: Http, @Inject(MICRO_API_CONF) apiConfig: MicroServiceAPIConfig){
      super();
      this.buildUrl = (microserviceName:string):string=>{
        return `${apiConfig.baseUrl}/_api/${microserviceName}/act`;
      };
    }
    post(microserviceName: string, methodName: string, param: any): Observable<any>{

    	return new Observable<any>((observer: Observer<any>)=>{
	    this.http.post(this.buildUrl(microserviceName), {
		action: methodName,
		param: param

	    })
	    .subscribe((res)=>{
	        observer.next("_body" in res ? JSON.parse(res["_body"]) : res);
	    });
	});
    
    }
}

export function useService(service: Service, microserviceName: string): (string)=>(any)=>Observable<any>{
    return (methodName: string): (any)=>Observable<any> =>{
        return (param: any): Observable<any> =>{
	    return service.post(microserviceName, methodName, param);
        };
    };
}
