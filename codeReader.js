// Barcode khan

(function(root, $)
{
  root.barcodeOptions =
  {
    min: 2,
    speed: 30
  };

  var time = 0
  var keys = '';

  var timeout = 0;
  $(document.body).keydown(function(e)
  {
    if(timeout)
    {
      clearTimeout(timeout);
    }
    else
    {
      time = Date.now();
    }
    $focused = $(':focus');
    // if we are in barcode dont write something
    if($focused.is('.barcode'))
    {
      switch(e.key)
      {
        case 'Backspace':
        case 'Delete':
          e.preventDefault();
          $focused.val('');
          break;

        case 'Tab':
          // do nothing! be normal
          break;

        default:
          e.preventDefault();
          break;
      }
    }

    timeout = setTimeout(function()
    {
      if(keys.slice(-5) === 'Enter')
      {
        // remove enter from calc
        keys = keys.slice(0, -5);
        // get len of typed
        var len       = keys.length;
        // calc type speed in micor second
        var typeSpeed = (len / (Date.now() - time)) * 1000;

        // if barcode detected ended with enter
        if(typeSpeed > barcodeOptions.speed && len > barcodeOptions.min)
        {
          // change to english and after that to string
          var detectedCode = keys.toEnglish().toString();
          // prevent default
          e.preventDefault();
          // get focused element
          if($focused.is('.barcode'))
          {
            // replace val in barcode field
            $focused.val(detectedCode);
            console.log(typeSpeed);
          }
          else
          {
            console.log('barcode: ' + detectedCode);
          }
          console.log(detectedCode);
          $("body").trigger("barcode:detect", detectedCode);
        }
      }
      time    = 0;
      timeout = 0;
      keys    = '';
    }, 50);
    keys += e.key;
  });
})(window, jQuery);