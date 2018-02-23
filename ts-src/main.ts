import {User} from "./modal";
import HttpClient from "./HttpClient";

interface Person {
    age: number,
    name: string,
    say(): string
}

let mike = {
    age: 25,
    name: "Mike",
    say: function () {
        return "My name is " + this.name +
            " and I'm " + this.age + " years old!"
    }
}

function sayIt(person: Person) {
    return person.say();
}

console.log(sayIt(mike));

// document.getElementById("index")!.innerHTML = "Changed by TypeScript!";

var data = { "identity": { "deviceId": "5c723e5e-becf-4de7-8943-7c15a1b0f45a", "sessionId": "e9298a5d-dca6-49c1-b333-f4eb6e7a2909", "userId": "5a770a572ff9764dc8ff6a0d" }, "gender": "M", "country": "India" };

var httpClient = new HttpClient();

httpClient.postData("http://nestros.com:8080/event/push/profile", data).then(
    (ressponse) => {
        console.log(ressponse);
    }
);

var user: User = new User();
user = { name: "Amit Lamba", email: "amit@userndot.com" };
console.log(user);

window.onload = () => {
    var o = new HttpClient();
    o.show();
}