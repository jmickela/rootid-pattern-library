/*
Ok. This script does a lot of stuff.

* It checks each input to see whether its label is before or after the input and attaches a class of "label-before" or "label-after" to the label so it can be appropriately styled. (Note: labels that wrap around an input are rendered as before, at least in Chrome...)

* It checks the width of all inputs and checks to see whether their width is 100% of the containing element. If so, it attaches a class of "full-width" to both the input and its label.

* It finds each input of type text, email, or password and each textarea and adds a "placeholder" class to input and the matching label. ("Matching" labels can either use the "for" attribute or can wrap around the input.)

* It finds each textarea and adds a "textarea-label" class to its matching label.

* Each time focus is on one of the placeholder inputs a "busy" class is added.

* Each time focus moves away from one of the placeholder inputs, the "busy" class is removed. Meanwhile, if there is text in the input, a "filled" class is added. If there is no content, the "filled" class is removed.
*/



$(document).ready(function() {
  // Find the inputs that need placeholder labels
  let $placeholderInputs = $(
    "form input[type='text'], form input[type='email'], form input[type='password'], form textarea"
  );

  // Add a "placeholder" class to each of those labels
  Array.prototype.forEach.call($placeholderInputs, input => {
    addPlaceholder(input);
  });

  // Find all the textareas
  let $textareas = $("form textarea");

  // Add a "textarea-label" class to each of those labels
  Array.prototype.forEach.call($textareas, textarea => {
    addTextarea(textarea);
  });

  // For each input...
  let $allInputs = $("form input, form textarea");
  Array.prototype.forEach.call($allInputs, input => {
    // check if the label is before or after the input, and add a class to the
    checkIfLabelFirst(input);
    tagFullWidth(input);
  });


  $placeholderInputs
    .on("focus", addBusy)
    .on("blur", removeBusy)
    .on("blur", toggleFilled);
});

$(".webform-submission-form input:not([type=checkbox]), .webform-submission-form textarea")
  .on("focus", addBusy)
  .on("blur", removeBusy)
  .on("blur", toggleFilled);



function addPlaceholder(target) {
  let $label = getLabel(target);
  if ($label !== undefined) {
    $(target).addClass("placeholder");
    $($label).addClass("placeholder");
  }
}

function addTextarea(target) {
  let $label = getLabel(target);
  if ($label !== undefined) {
    $($label).addClass("textarea-label");
  }
}


function toggleFilled(event) {
  let $label = getLabel(event.target);
  if ($label !== undefined) {
    if (event.target.value) {
      $($label).addClass("filled");
    } else {
      $($label).removeClass("filled");
    }
  }
}

function addBusy(event) {
  let $label = getLabel(event.target);
  if ($label !== undefined) {
    $($label).addClass("busy");
  }
}

function removeBusy(event) {
  let $label = getLabel(event.target);
  if ($label !== undefined) {
    $($label).removeClass("busy");
  }
}

function getLabel(target) {
  var $id = target.id;
  if ($id !== undefined && $id !== "") {
    var $label = $("label[for=" + $id + "]");
  }
  if ($label == undefined || $label.length <= 0) {
    var parentElem = $(target).parent(),
      parentTagName = parentElem.get(0).tagName.toLowerCase();

    if (parentTagName == "label") {
      $label = parentElem;
    }
  }
  return $label;
}

function checkIfLabelFirst(target) {
  let $label = getLabel(target);
  if ($label !== undefined) {
    if (typeof $label === 'object' ) {
      $label = $label[0];
    }
    if (compareDocumentPosition(target, $label) == 2) {
      $(target).addClass("label-before");
      $($label).addClass("label-before");
    } else if (compareDocumentPosition(target, $label) == 4) {
      $(target).addClass("label-after");
      $($label).addClass("label-after");
    }
  }
}

function checkIfWidth100(target) {
  let parent = $(target).parent()[0];
  let padding =
    parseInt($(parent).css("padding-left")) +
    parseInt($(parent).css("padding-right"));
  let percent = (
    (target.offsetWidth / (parent.offsetWidth - padding)) *
    100
  ).toFixed(0);

  if (percent == 100) {
    return true;
  } else {
    return false;
  }
}

function tagFullWidth(target) {
  if (checkIfWidth100(target)) {
    $(target).addClass("full-width");
    let $label = getLabel(target);
    if ($label !== undefined) {
      $($label).addClass("full-width");
    }
  }
}

// I got this code from stackoverflow so I could detect whether the label was before or after the input in the DOM. That way I can assign a class for targeted styling.

// https://stackoverflow.com/a/22174695/6412747

// function recursivelyWalk(nodes, cb) {
//   for (var i = 0, len = nodes.length; i < len; i++) {
//     var node = nodes[i];
//     var ret = cb(node);
//     if (ret) {
//       return ret;
//     }
//     if (node.childNodes && node.childNodes.length) {
//       var ret = recursivelyWalk(node.childNodes, cb);
//       if (ret) {
//         return ret;
//       }
//     }
//   }
// }

// function testNodeForComparePosition(node, other) {
//   if (node === other) {
//     return true;
//   }
// }

// var DOCUMENT_POSITION_DISCONNECTED = 1;
// var DOCUMENT_POSITION_PRECEDING = 2;
// var DOCUMENT_POSITION_FOLLOWING = 4;
// var DOCUMENT_POSITION_CONTAINS = 8;
// var DOCUMENT_POSITION_CONTAINED_BY = 16;

// // function compareDocumentPosition(thisNode, other) {
// //     function identifyWhichIsFirst(node) {
// //         if (node === other) {
// //             return "other";
// //         } else if (node === reference) {
// //             return "reference";
// //         }
// //     }

// function compareDocumentPosition(thisNode, other) {
//   function identifyWhichIsFirst(thisNode) {
//     if (thisNode === other) {
//       return "other";
//     } else if (thisNode === reference) {
//       return "reference";
//     }
//   }

//   var reference = thisNode,
//       referenceTop = thisNode,
//       otherTop = other;

//   if (this === other) {
//     console.log("They're the same!");
//     return 0;
//   }
//   while (referenceTop.parentNode) {
//     referenceTop = referenceTop.parentNode;
//   }
//   while (otherTop.parentNode) {
//     otherTop = otherTop.parentNode;
//   }

//   if (referenceTop !== otherTop) {
//     return DOCUMENT_POSITION_DISCONNECTED;
//   }

//   var children = reference.childNodes;
//   var ret = recursivelyWalk(
//     children,
//     function(p) {
//       (function() {
//         var localOther = other;
//         return testNodeForComparePosition(localOther, p);
//       })();
//     }
//   );
//   if (ret) {
//     return DOCUMENT_POSITION_CONTAINED_BY + DOCUMENT_POSITION_FOLLOWING;
//   }

//   var children = other.childNodes;
//   var ret = recursivelyWalk(
//     children,
//     function(p) {
//       (function() {
//         var localOther = reference;
//         return testNodeForComparePosition(localOther, p);
//       })();
//     }
//   );
//   if (ret) {
//     return DOCUMENT_POSITION_CONTAINS + DOCUMENT_POSITION_PRECEDING;
//   }

//   var ret = recursivelyWalk(
//     [referenceTop],
//     identifyWhichIsFirst
//   );
//   if (ret === "other") {
//     return DOCUMENT_POSITION_PRECEDING;
//   } else {
//     return DOCUMENT_POSITION_FOLLOWING;
//   }
// }



function recursivelyWalk(nodes, cb) {
  for (var i = 0, len = nodes.length; i < len; i++) {
    var node = nodes[i];
    var ret = cb(node);
    if (ret) {
      return ret;
    }
    if (node.childNodes && node.childNodes.length) {
      var ret = recursivelyWalk(node.childNodes, cb);
      if (ret) {
        return ret;
      }
    }
  }
}

function testNodeForComparePosition(node, other) {
  if (node === other) {
    return true;
  }
}

var DOCUMENT_POSITION_DISCONNECTED = 1;
var DOCUMENT_POSITION_PRECEDING = 2;
var DOCUMENT_POSITION_FOLLOWING = 4;
var DOCUMENT_POSITION_CONTAINS = 8;
var DOCUMENT_POSITION_CONTAINED_BY = 16;

function compareDocumentPosition(thisNode, other) {
  function identifyWhichIsFirst(node) {
    if (node === other) {
      return "other";
    } else if (node === reference) {
      return "reference";
    }
  }

  var reference = thisNode,
    referenceTop = thisNode,
    otherTop = other;

  if (this === other) {
    return 0;
  }
  while (referenceTop.parentNode) {
    referenceTop = referenceTop.parentNode;
  }
  while (otherTop.parentNode) {
    otherTop = otherTop.parentNode;
  }

  if (referenceTop !== otherTop) {
    return DOCUMENT_POSITION_DISCONNECTED;
  }

  var children = reference.childNodes;
  var ret = recursivelyWalk(children, function(p) {
    (function() {
      var localOther = other;
      return testNodeForComparePosition(localOther, p);
    })();
  });
  if (ret) {
    return DOCUMENT_POSITION_CONTAINED_BY + DOCUMENT_POSITION_FOLLOWING;
  }

  var children = other.childNodes;
  var ret = recursivelyWalk(children, function(p) {
    (function() {
      var localOther = reference;
      return testNodeForComparePosition(localOther, p);
    })();
  });
  if (ret) {
    return DOCUMENT_POSITION_CONTAINS + DOCUMENT_POSITION_PRECEDING;
  }

  var ret = recursivelyWalk([referenceTop], identifyWhichIsFirst);
  if (ret === "other") {
    return DOCUMENT_POSITION_PRECEDING;
  } else {
    return DOCUMENT_POSITION_FOLLOWING;
  }
}
