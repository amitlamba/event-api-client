import {EventUser, Identity, Und} from "./modal";
import HttpClient from "./HttpClient";
import {baseuri, eventuri, initializeuri, profileuri} from "./Constants";

_und = _und || {event: [], profile: [], account: [], onUserLogin: [], notifications: []};
// document.getElementById("index")!.innerHTML = "Changed by TypeScript!";

var httpClient = new HttpClient(_und.account[0].id);
var identity: Identity = {} as Identity;
var user: EventUser = {} as EventUser;

//Init with identity
if (localStorage && localStorage.getItem("id")) {
    identity = JSON.parse(<string> localStorage.getItem("id"));
} else {
    httpClient.postData(baseuri + initializeuri).then(
        (response) => {
            console.log(response);
            identity = response.data.value;
            localStorage.setItem("id", JSON.stringify(identity));
        }
    );
}

setInterval(repeat(), 5000);

function repeat() {
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
            httpClient.postData(baseuri + eventuri, event).then(
                (response) => {
                    console.log(response);
                }
            );
        }
    }
}

// console.log(user);
