export const wrapInner = (parent, wrapper, attribute, attributevalue) => {
    if (typeof wrapper === "string") {
        wrapper = document.createElement(wrapper);
    }
    var div = parent.appendChild(wrapper)
        .setAttribute(attribute, attributevalue);

    while (parent.firstChild !== wrapper) {
        wrapper.appendChild(parent.firstChild);
    }
}


/**
 * showHide function taken from https://github.com/jquery/jquery/blob/e743cbd28553267f955f71ea7248377915613fd9/src/css/showHide.js
 */
export const showHide = ( elements, show ) => {
    var display, elem,
        values = [],
        index = 0,
        length = elements.length;

    // Determine new display value for elements that need to change
    for ( ; index < length; index++ ) {
        elem = elements[ index ];
        if ( !elem.style ) {
            continue;
        }

        display = elem.style.display;
        if ( show ) {

            // Since we force visibility upon cascade-hidden elements, an immediate (and slow)
            // check is required in this first loop unless we have a nonempty display value (either
            // inline or about-to-be-restored)
            if ( display === "none" ) {
                values[ index ] = dataPriv.get( elem, "display" ) || null;
                if ( !values[ index ] ) {
                    elem.style.display = "";
                }
            }
            if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
                values[ index ] = getDefaultDisplay( elem );
            }
        } else {
            if ( display !== "none" ) {
                values[ index ] = "none";

                // Remember what we're overwriting
                dataPriv.set( elem, "display", display );
            }
        }
    }

    // Set the display of the elements in a second loop to avoid constant reflow
    for ( index = 0; index < length; index++ ) {
        if ( values[ index ] != null ) {
            elements[ index ].style.display = values[ index ];
        }
    }

    return elements;
}

/**
 * Hidden & Visible functions taken from https://github.com/jquery/jquery/blob/e743cbd28553267f955f71ea7248377915613fd9/src/css/hiddenVisibleSelectors.js
 */
export const hidden = (elem) => {
    return !visible(elem);
}
export const visible = (elem) => {
    return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
}

