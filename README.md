# Seneca Client For Ng2

This is a typescript library for AngularJs2 to invoke methods of microservices which is based on [seneca framework](https://github.com/senecajs/seneca).  

It has dependencies to "rxjs", "@angular/core" and "@angular/http" in your AngularJs2 project environment.

## Installation

    npm install seneca_ng2_client

## Use it in your code

First, import the types to your file.

    import { useService, Service } from 'seneca_client_for_ng2';

Second, initialize the service object.

    private senecaClient : any = null;  
    constructor(private service: Service){
        this.senecaClient = useService(*this.service*, "*name_of_your_service*");
    }

Third, call the method on the seervice.

    private loadData(){
        let param = {};
        this.senecaClient("*methodName*")(*param*)
	    .subscribe(res=>{
            console.log(res);
	    // your code for handling data is here.
        });
    }

That's all for use the code. In the code above, you are responsible to take care of four things:
1. *this.service*
2. *name_of_your_service*
3. *methodname*
4. *param*

I will explain them one by one.

### this.service  

"this.service" is an injectable AngularJs2 service object. It is initialized by *MicroserviceClient* class.  

    import { Service, MicroserviceClient } from 'seneca_client_for_ng2';
    ...
    providers: [{provide: Service, useClass: MicroserviceClient}]

In this way, you can easily mock the *Service* in your unit test.  
To initialize *MicroserviceClient* object, you have to specify an InjectionToken.  

    import { MICRO_API_CONF, Service, MicroserviceClient } from 'seneca_client_for_ng2';
    ...
    providers: [
        {provide: MICRO_API_CONF, useValue: { baseurl: "http://host:port" }}, 
	    {provide: Service, useClass: MicroserviceClient }
	]

### name_of_your_service

The pre-condition of this library is assuming that your microservice instances is deployed behind a proxy. Each microservice instance has its own unique name in the url.  
For example, name_of_your_service is interface_service. Then the generated url is as following.

    http://baseUrl/_api/interface_service/act


### methodName

The name of the method defined at your microservice end. It assumes your method defined as following based on seneca framework:  

    seneca.add({action: "methodName"}, function(msg, respond){
        ....
    }

### param

The param means the parameter objects, values should be in {}. It assumes your method defined as following based on seneca framework:  

    seneca.add({action: "methodName"}, function(msg, respond){
        let param = msg.param;
	...
    }





