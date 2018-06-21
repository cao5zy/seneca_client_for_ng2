import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Http } from '@angular/http';
import { Injectable, InjectionToken, Inject } from '@angular/core';
import * as _ from 'underscore';

export interface MicroServiceAPIConfig {
    baseUrl: string
}

export const MICRO_API_CONF = new InjectionToken<MicroServiceAPIConfig>("microservice.api.config");


export abstract class Service{
    abstract act(microserviceName: string, methodName: string, id: string, param: any): Observable<any>;
}

@Injectable()
export class MicroserviceClient extends Service{
    private buildUrl: (string)=>string;
    constructor(private http: Http, @Inject(MICRO_API_CONF) apiConfig: MicroServiceAPIConfig){
      super();
      this.buildUrl = (microserviceName:string):string=>{
        return `${apiConfig.baseUrl}/_api/${microserviceName}`;
      };
    }
    act(microserviceName: string, methodName: string, id: any, param: any): Observable<any>{

        let rest_methods = ["get", "post", "delete", "patch"];

        function is_rest() {
          return _.find(rest_methods, n=>n==methodName.toLowerCase());
        }

        function build_rest_url() {
          return ((dict)=>{
	    return dict[methodName.toLowerCase()]();
	  })(
	  {
            "get": function(){
	      return param ? `${this.buildUrl(microserviceName)}/${id}` : `${this.buildUrl(microserviceName)}`;
	    },
	    "post": function(){
              return this.buildUrl(microserviceName);
            },
	    "delete": function(){
              return `${this.buildUrl(microserviceName)}/${id}`;
            },
	    "patch": function(){
	      return `${this.buildUrl(microserviceName)}/${id}`;
            }
          }
	  );
        }

        let rest_actions = {
          "get": function(){
            return this.http.get(build_rest_url());
          },
	  "post": function(){
	    return this.http.post(build_rest_url(), param);
	  },
	  "delete": function(){
	    return this.http.delete(build_rest_url());
	  },
	  "patch": function(){
	    return this.http.patch(build_rest_url(), param);
	  }
        };

        return is_rest() ? new Observable<any>((observer: Observer<any>)=>{
	  rest_actions[methodName.toLowerCase()]().
	    subscribe(res=>{
	      observer.next(res);
	    });
	  
	}) :
	    new Observable<any>((observer: Observer<any>)=>{
	      this.http.post(this.buildUrl(microserviceName), {
		action: methodName,
		param: param
		}).subscribe((res)=>{
                     observer.next("_body" in res ? JSON.parse(res["_body"]) : res);
	        });
	});

    }
}

export function useService(service: Service, microserviceName: string): (string)=>(any)=>Observable<any>{
    return (methodName: string): (any)=>Observable<any> =>{
        return (param: any): Observable<any> =>{
	    let getp = _.propertyOf(param);
	    return service.act(microserviceName, methodName, getp("id") ? getp("id") : param, getp("param") ? getp("param") : null);
        };
    };
}
