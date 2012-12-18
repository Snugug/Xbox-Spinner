// Get Vendor Prefix
var prefix = getVendorPrefix();

// Show flourish/start animation on click
$('#button').on('click', function(e) {

    // Toggle 'Paused' class
    $(this).cls('paused', 'toggle');

    // If animation is paused, add flourish
    if ($(this).cls('paused', 'has')) {
        $(this).html('Start');

        // Loop over each item w/ID starting w/circle
        $('[id^=circle]').loop(function(e) {
            var rotate = getRotationDegrees($(e));
            if (rotate < 0) {
                rotate = 360 + rotate;
            }

            // Generate dynamic keyframe
            var keyframes = '@-' + prefix + '-keyframes end-' + rotate + ' { '+
                'from {' +
                    '-' + prefix + '-transform: rotate( ' + rotate + 'deg ); ' +
                    'border-top: 3px solid #a9f230; } '+
                'to {' +
                    '-' + prefix + '-transform: rotate( 0deg ); ' +
                    'border-top: 3px solid white; }'+
                '}';

            var keyframeClassName = 'end-' + rotate;

            var keyframeClass = '\n\n.' + keyframeClassName + '{-' + prefix + '-animation-name: end-' + rotate + ';}';

            var s = document.createElement( 'style' );
                s.innerHTML = keyframes;
                s.innerHTML += keyframeClass;
            document.getElementsByTagName( 'head' )[ 0 ].appendChild( s );

            $(e).cls(keyframeClassName);
      });
    }
    // If animation is restarted, remove ending class
    else {
        $(this).html('End');
        $('[id^=circle]').loop(function(e) {
            $(e).cls($(e).cls(), 'remove');
        });
    }
});


// Find CSS Rotation in Degrees
// From http://stackoverflow.com/questions/8270612/get-element-moz-transformrotate-value-in-jquery
// Works equally well with Chibi.js
function getRotationDegrees(obj) {
    var matrix = obj.css("-webkit-transform") ||
    obj.css("-moz-transform")    ||
    obj.css("-ms-transform")     ||
    obj.css("-o-transform")      ||
    obj.css("transform");
    if(matrix !== 'none') {
        var values = matrix.split('(')[1].split(')')[0].split(',');
        var a = values[0];
        var b = values[1];
        var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
    } else { var angle = 0; }
    return angle;
}

// Find Vendor Prefix
// From http://lea.verou.me/2009/02/find-the-vendor-prefix-of-the-current-browser/
function getVendorPrefix()
{
    if('result' in arguments.callee) return arguments.callee.result;

    var regex = /^(Moz|Webkit|Khtml|O|ms|Icab)(?=[A-Z])/;

    var someScript = document.getElementsByTagName('script')[0];

    for(var prop in someScript.style)
    {
        if(regex.test(prop))
        {
            // test is faster than match, so it's better to perform
            // that on the lot and match only when necessary
            return arguments.callee.result = prop.match(regex)[0];
        }

    }

    // Nothing found so far? Webkit does not enumerate over the CSS properties of the style object.
    // However (prop in style) returns the correct value, so we'll have to test for
    // the precence of a specific property
    if('WebkitOpacity' in someScript.style) return arguments.callee.result = 'Webkit';
    if('KhtmlOpacity' in someScript.style) return arguments.callee.result = 'Khtml';

    return arguments.callee.result = '';
}