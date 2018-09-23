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