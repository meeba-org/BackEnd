export const run = (token) => {
    let bsObj = {
        onFieldEventHandler: {
            // tagId returns: "ccn", "cvv", "exp"
            onFocus: function (tagId) {
            }, // Handle focus
            onBlur: function (tagId) {
            }, // Handle blur
            onError: function (tagId, errorCode /*, errorDescription*/) {
            }, // Handle a change in validation
            /*errorCode returns:
                "001" --> "Please enter a valid credit card number";
                "002" --> "Please enter the CVV/CVC of your card";
                "003" --> "Please enter your credit card's expiration date";
                "22013" --> "CC type is not supported by the merchant";
                "14040" --> " Token is expired";
                "14041" --> " Could not find token";
                "14042" --> " Token is not associated with a payment method, please verify your client integration or contact BlueSnap support";
                "400" --> "Session expired please refresh page to continue";
                "403", "404", "500" --> "Internal server error please try again later";
            */

            /* errorDescription is optional. Returns BlueSnap's standard error description */

            onType: function (tagId, cardType) {
            }, /* cardType will give card type, and only applies to ccn: CarteBleue, Visa, MasterCard, AmericanExpress, Discover, DinersClub, JCB, Solo, MaestroUK, ChinaUnionPay */
            onValid: function (tagId) {
            }, // Handle a change in validation
        },
        /* example:
            style: {
            Style elements
            (Selectors: "#ccn", "#cvv", "#year", "#month", "input", "::placeholder", ":focus", ".valid", ".invalid", "span", "select", "option")
    (Properties: "color", "font", "font-family", "font-size", "font-style", "font-weight", "line-height", "opacity", "outline", "text-shadow", "transition",
    "left", "margin-right", "width", "height", "background-color)
            "Selector": {
            "Property": "Value",
            "Property2": "Value2"
            },
            "Selector2": {
            "Property": "Value"
            }
        }, */
        style: {
            "#ccn": {
                height: "20px"
            },
            ":focus": {
                //style for all input elements on focus event
                "color": "orange"
            },
            "input": {
                //style for all input elements
                "color": "blue"
            },
            ".invalid": {
                //style for all input elements when invalid
                "color": "red"
            }
        },
        ccnPlaceHolder: "1234 5678 9012 3456", //for example
        cvvPlaceHolder: "123", //for example
        expPlaceHolder: "MM/YY", //for example
        expDropDownSelector: false //set to true for exp. date dropdown
    };

    //Run the following command after Document Object Model (DOM) is fully loaded
    bluesnap.hostedPaymentFieldsCreation(token, bsObj);
};
