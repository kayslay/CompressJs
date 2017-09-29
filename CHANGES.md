# Changes
## V2.0.0

#### Some options have been removed from the Compress option
These are the options removed:

#### functions:
All the options that take functions have been removed. The support for events makes the use of these function useless.
listen to the events when fired to perform actions with them.

#### rateEvent: 
rateEvent has been removed. the default rate event is the `"change"` event.

#### Compress function is now a factory function. There is no need for the `new` keyword anymore.

Here is an example of the differences
```javascript
//new way
let comp = Compress({
		//options
	});

//old way 
let comp = new Compress({
        //options
    })
```
