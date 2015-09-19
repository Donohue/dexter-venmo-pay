# Venmo Pay Dexter Module
> This Dexter module takes a Venmo username, dollar amount, and payment note, and performs the API request to make the Venmo payment.
This module currently requires a Venmo access token to be provided in an environment variable, however, when Dexter releases user-specific
key value stores and OAuth support, this should pull the access token directly from the Dexter user. This is a good proof-of-concept for now.

## File Details
### index.js
> Entrypoint for your module: must export an object in the root that minimally
> contains a run method.  The exported object will be wrapped in a Dexter
> BaseStep class that provides the following functions:
>   * this.run(step, dexter); //You must implement this
>   * this.complete(data); //Call this ONCE if execution is successful
>   * this.fail(err); //Call this ONCE if there's a critical issue
>   * this.log(msgOrData); //Call this to log either a message or data

### package.json
> Standard Node.js `package.json` file that specifies the name of your module. 
> The name of your module will need to be unique in the Dexter ecosystem.  
> It's a good idea to prefix the module name with a unique username.

### meta.json
> Metadata required by the Dexter runtime. You should update this --
> instructions within.

### form 
> For future use by the Dexter App Editor

## Implmentation Details

### Testing the module
> Update the default fixture in `fixtures/default.js` with some artificial details for
> testing. Minimally add dummy values for your inputs. When you're ready test your module:

```shell
$ dexter run  # or dexter run <fixture-name> 
```

### Registering the module
> When you're ready to try your module out in a real App, you'll want to push it
> into Dexter.  To do that, push it to the rundexter git server:

```shell
$ dexter push
```
