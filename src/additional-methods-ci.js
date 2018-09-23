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