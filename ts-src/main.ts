import {EventUser, Identity, Und} from "./modal";
import HttpClient from "./HttpClient";
import {baseuri, eventuri, initializeuri, profileuri} from "./Constants";

declare global {
    interface Window {
        UserNDotObject: string;
    }
}
// console.log(window);
// console.log(window['UserNDotObject']);
// console.log((<any>window)[window['UserNDotObject']]);
// console.log((<any>window)[window['UserNDotObject']].l);
// console.log((<any>window)[window['UserNDotObject']].q);
var queue = <Array<any>>((<any>window)[window['UserNDotObject']].q);
var httpClient: HttpClient;
// let trackGeolocation: boolean;
const REPEAT_TIME_INTERVAL = 5;

function trackGeolocation() {
    if ("geolocation" in navigator) {
        /* geolocation is available */
        console.log("Geolocation is available");
        navigator.geolocation.getCurrentPosition(function (position) {
                console.log(position.coords);
            },
            function (error) {
                console.error(error);
            });
//     let watch_id = navigator.geolocation.watchPosition(function (position) {
//         console.log(position.coords);
//     });
    } else {
        /* geolocation IS NOT available */
        console.log("Geolocation is not available");
    }
}

if (queue && queue.length > 0) {
    let creds = queue.shift();
    if (creds[0] == 'create')
        httpClient = new HttpClient(creds[1]);
    if(creds[2] && creds[2]['location']['active']) {
        trackGeolocation();
    }
}

// declare var _und: any;

// _und = _und || {event: [], profile: [], account: [], login: [], notifications: []};
// document.getElementById("index")!.innerHTML = "Changed by TypeScript!";

// var httpClient = new HttpClient(_und.account[0].id);
var identity: Identity = {} as Identity;
var user: EventUser = {} as EventUser;

function getURLParameter(name: any) {
    // return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
    if (name = (new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)')).exec(location.search))
        return decodeURIComponent(name[1]);
}

function getIdentity() {
    httpClient.postData(baseuri + initializeuri).then(
        (response) => {
            // console.log(response);
            identity = response.data.value;
            localStorage.setItem("id", JSON.stringify(identity));
        },
        (error) => {
            console.error(error);
        }
    );
}

function removeIdentity() {
    localStorage.removeItem("id");
}

function setUtmParams() {
    if (getURLParameter('utm_source') || getURLParameter('utm_medium') || getURLParameter('utm_campaign')
        || getURLParameter('utm_term') || getURLParameter('utm_content')) {
        let utmParams = {
            "utm_source": getURLParameter('utm_source'),
            "utm_medium": getURLParameter('utm_medium'),
            "utm_campaign": getURLParameter('utm_campaign'),
            "utm_term": getURLParameter('utm_term'),
            "utm_content": getURLParameter('utm_content')
        };
        // console.log("Saving UTM Params:" + utmParams);
        localStorage.setItem("UtmParams", JSON.stringify(utmParams));
    }
}

function removeUtmParams() {
    localStorage.removeItem("UtmParams");
}

//Init with identity
if (localStorage && localStorage.getItem("id") != null && JSON.parse(<string>localStorage.getItem("id")) != null) {
    identity = JSON.parse(<string> localStorage.getItem("id"));
} else {
    getIdentity();
}

function repeat() {
    // console.log("repeat() method called.");
    if (identity) {
        try {
            while (queue && queue.length > 0) {
                var action = queue.shift();
                switch (action[0]) {
                    case 'logout': {
                        removeIdentity();
                        break;
                    }
                    case 'profile': {
                        var profile = action[1];
                        profile.identity = identity;
                        httpClient.postData(baseuri + profileuri, profile).then(
                            (response) => {
                                // console.log(response);
                                identity = response.data.value;
                                localStorage.setItem("id", JSON.stringify(identity));
                            }
                        );
                        break;
                    }
                    case 'event': {
                        var event = action[1];
                        event.identity = identity;
                        if (localStorage.getItem("UtmParams")) {
                            let utmParams = JSON.parse(<string> localStorage.getItem("UtmParams"));
                            event.attributes["utm_source"] = utmParams.utm_source;
                            event.attributes["utm_medium"] = utmParams.utm_medium;
                            event.attributes["utm_campaign"] = utmParams.utm_campaign;
                            event.attributes["utm_term"] = utmParams.utm_term;
                            event.attributes["utm_content"] = utmParams.utm_content;
                        }
                        if (event.attributes) {
                            Object.keys(event.attributes).forEach(function (key) {
                                if (event.attributes[key] instanceof Date) {
                                    // console.log("Before date", key, event.attributes[key]);
                                    event.attributes[key] = event.attributes[key].toISOString();
                                }
                                // console.log(key, event.attributes[key]);
                            });
                        }
                        // console.log(event);
                        httpClient.postData(baseuri + eventuri, event).then(
                            (response) => {
                                // console.log(response);
                            }
                        );
                        if (localStorage.getItem("UtmParams")) {
                            removeUtmParams();
                        }
                        break;
                    }
                    case 'location': {
                        var details = action[1];
                        if(details['active'] === true) {
                            trackGeolocation();
                        }
                        break;
                    }
                }
            }
        } catch (e) {
            console.error("_und error occurred: ", e);
        }
        finally {
        }
        setTimeout(repeat, REPEAT_TIME_INTERVAL);
    }
    else {
        getIdentity();
        setTimeout(repeat, REPEAT_TIME_INTERVAL*200);
    }
}

setUtmParams();
repeat();

