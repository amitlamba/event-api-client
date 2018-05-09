import {EventUser, Identity, Und} from "./modal";
import HttpClient from "./HttpClient";
import {baseuri, eventuri, initializeuri, profileuri} from "./Constants";


// export class Sender {
//     storage: any[] = [];
//     push(obj: any) {
//         this.storage.push(obj);
//         repeat();
//     }
// }

declare var _und: any;

_und = _und || {event: [], profile: [], account: [], onUserLogin: [], notifications: []};
// document.getElementById("index")!.innerHTML = "Changed by TypeScript!";

var httpClient = new HttpClient(_und.account[0].id);
var identity: Identity = {} as Identity;
var user: EventUser = {} as EventUser;

function getIdentity() {
    httpClient.postData(baseuri + initializeuri).then(
        (response) => {
            console.log(response);
            identity = response.data.value;
            localStorage.setItem("id", JSON.stringify(identity));
        }
    );
}

//Init with identity
if (localStorage && localStorage.getItem("id") != null && JSON.parse(<string>localStorage.getItem("id")) != null) {
    identity = JSON.parse(<string> localStorage.getItem("id"));
} else {
    getIdentity();
}

setInterval(repeat(), 500);

function repeat() {
    try {
        if (identity) {
            while (_und.profile.length > 0) {
                var profile = _und.profile.shift();
                profile.identity = identity;
                httpClient.postData(baseuri + profileuri, profile).then(
                    (response) => {
                        console.log(response);
                        identity = response.data.value;
                        localStorage.setItem("id", JSON.stringify(identity));
                    }
                );
            }
            while (_und.event.length > 0) {
                var event = _und.event.shift();
                event.identity = identity;
                if (event.attributes) {
                    Object.keys(event.attributes).forEach(function (key) {
                        if (event.attributes[key] instanceof Date) {
                            console.log("Before date", key, event.attributes[key]);
                            event.attributes[key] = event.attributes[key].toISOString();
                        }
                        console.log(key, event.attributes[key]);
                    });
                }
                console.log(event);
                httpClient.postData(baseuri + eventuri, event).then(
                    (response) => {
                        console.log(response);
                    }
                );
            }
        } else {
            getIdentity();
        }
    } catch(e) {
        console.error("Error Occurred: ", e);
    }
}

function getURLParameter(name: any) {
    // return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
    if (name = (new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)')).exec(location.search))
        return decodeURIComponent(name[1]);
}

if (getURLParameter('utm_source') || getURLParameter('utm_medium') || getURLParameter('utm_campaign')
    || getURLParameter('utm_term') || getURLParameter('utm_content')) {
    _und.event.push({
        "name": "utm",
        "attributes": {
            "utm_source": getURLParameter('utm_source'),
            "utm_medium": getURLParameter('utm_medium'),
            "utm_campaign": getURLParameter('utm_campaign'),
            "utm_term": getURLParameter('utm_term'),
            "utm_content": getURLParameter('utm_content')
        }
    });
    console.log(getURLParameter('utm_source'), getURLParameter('utm_medium'), getURLParameter('utm_campaign')
        , getURLParameter('utm_term'), getURLParameter('utm_content'))
}