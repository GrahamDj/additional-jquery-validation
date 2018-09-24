/**
 * Additional jQuery Form Validation methods that match the rules used in CodeIgniter Form Validation
 */

$.validator.addMethod( "exactlength", function( value, element, param ) {
    if ( this.optional( element ) ) {
        return true;
    }
    return value.length === parseInt(param);
}, $.validator.format( "Value must have an exact length of {0} characters" ) );

$.validator.addMethod( "inlist", function( value, element, param ) {
    if ( this.optional( element ) ) {
        return true;
    }
    return value.indexOf(param) >= 0;
}, $.validator.format( "{0} is not allowed. Please enter a set value" ) );

$.validator.addMethod( "alphanumericspaces", function( value, element ) {
    return this.optional( element ) || /^[\w\s]+$/i.test( value.trim() );
}, "Letters, numbers, underscores and spaces only please" );

$.validator.addMethod( "alphadash", function( value, element ) {
    return this.optional( element ) || /^[\w-]+$/i.test( value.trim() );
}, "Letters, numbers, underscores and dashes only please" );

$.validator.addMethod( "numericdigit", function( value, element ) {
    return this.optional( element ) || /^[\-+]?[0-9]*\.?[0-9]+$/.test( value );
}, "Only positive and negative numeric values allowed" );

$.validator.addMethod( "integerdigit", function( value, element ) {
    return this.optional( element ) || /^[\-+]?[0-9]+$/.test( value );
}, "Only whole positive and negative digits allowed" );

$.validator.addMethod( "decimal", function( value, element ) {
    return this.optional( element ) || /^[\-+]?[0-9]+\.[0-9]+$/.test( value );
}, "Please enter a decimal value" );

$.validator.addMethod( "isnatural", function( value, element ) {
    if ( this.optional( element ) ) {
        return true;
    }
    value = value.toString();
    var n1 = Math.abs(value),
        n2 = parseInt(value, 10);
    return !isNaN(n1) && n2 === n1 && n1.toString() === value;
}, "Please enter a natural number" );

$.validator.addMethod( "isnaturalnozero", function( value, element ) {
    if ( this.optional( element ) ) {
        return true;
    }
    value = value.toString();
    var n1 = Math.abs(value),
        n2 = parseInt(value, 10);
    return n1 !== 0 && n2 !== 0 && !isNaN(n1) && n2 === n1 && n1.toString() === value;
}, "Please enter a natural number lager than 0" );

$.validator.addMethod( "validemail", function( value, element ) {
    return this.optional( element ) || /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test( value );
}, "Please enter a valid e-mailaddress" );

$.validator.addMethod("validemails", function(value, element) {
    if (this.optional(element)) {
        return true;
    }

    var emails = value.split(/[;,]+/); // split element by , and ;
    valid = true;
    for (var i in emails) {
        value = emails[i];
        valid = valid &&
            $.validator.methods.validemail.call(this, $.trim(value), element);
    }
    return valid;
}, jQuery.validator.messages.validemail);

( function() {

    function base64encode(str) {

        if (/([^\u0000-\u00ff])/.test(str)){
            throw new Error("Can't base64 encode non-ASCII characters.");
        }

        var digits = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
            i = 0,
            cur, prev, byteNum,
            result=[];

        while(i < str.length){

            cur = str.charCodeAt(i);
            byteNum = i % 3;

            switch(byteNum){
                case 0: //first byte
                    result.push(digits.charAt(cur >> 2));
                    break;

                case 1: //second byte
                    result.push(digits.charAt((prev & 3) << 4 | (cur >> 4)));
                    break;

                case 2: //third byte
                    result.push(digits.charAt((prev & 0x0f) << 2 | (cur >> 6)));
                    result.push(digits.charAt(cur & 0x3f));
                    break;
            }

            prev = cur;
            i++;
        }

        if (byteNum == 0){
            result.push(digits.charAt((prev & 3) << 4));
            result.push("==");
        } else if (byteNum == 1){
            result.push(digits.charAt((prev & 0x0f) << 2));
            result.push("=");
        }

        return result.join("");
    }

    function base64decode(str){

        str = str.replace(/\s/g,"");

        if(!(/^[a-z0-9\+\/\s]+\={0,2}$/i.test(str)) || str.length % 4 > 0){
            throw new Error("Not a base64-encoded string.");
        }

        //local variables
        var digits = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
            cur, prev, digitNum,
            i=0,
            result = [];

        str = str.replace(/=/g, "");

        while(i < str.length){

            cur = digits.indexOf(str.charAt(i));
            digitNum = i % 4;

            switch(digitNum){

                //case 0: first digit - do nothing, not enough info to work with

                case 1: //second digit
                    result.push(String.fromCharCode(prev << 2 | cur >> 4));
                    break;

                case 2: //third digit
                    result.push(String.fromCharCode((prev & 0x0f) << 4 | cur >> 2));
                    break;

                case 3: //fourth digit
                    result.push(String.fromCharCode((prev & 3) << 6 | cur));
                    break;
            }

            prev = cur;
            i++;
        }

        return result.join("");
    }

    $.validator.addMethod( "base64", function( value, element ) {
        return this.optional( element ) || (base64encode(base64decode(value)) === value);
    }, "Not a base64 string" );

}() );