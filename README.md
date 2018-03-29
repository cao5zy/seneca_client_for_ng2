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




