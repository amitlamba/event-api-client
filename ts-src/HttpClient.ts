export default class HttpClient {

    private authorization1: string = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhbWl0QHVzZXJuZG90LmNvbSIsImF1ZGllbmNlIjoid2ViIiwidXNlcklkIjoiOSIsImNsaWVudElkIjoiNSIsInJvbGVzIjpbIlJPTEVfQURNSU4iXSwiY3JlYXRlZCI6MTUxOTg4NTAzNTg5OCwiZXhwIjoxNTIwNDg5ODM1fQ.Jcif3QLmv9b_tfxAGQbIXE-Da2J9_drmBuQnMdlsffCWEaqw2nNuCGQEp22WxpMQwLr9RBarKAghEFDFJ8YzKg';
    contentType: string = 'application/json';

    constructor(private authorization: string) {

    }

    postData(url: string, data?: any) {
        // Default options are marked with *
        return fetch(url, {
            body: JSON.stringify(data), // must match 'Content-Type' header
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            //   credentials: 'include', // include, *omit, same-origin
            headers: {
                'user-agent': 'Mozilla/4.0 MDN Example',
                'content-type': 'application/json',
                'Authorization': this.authorization
            },
            method: 'POST', // *GET, PUT, DELETE, etc.
            mode: 'cors', // cors, no-cors, *same-origin
            redirect: 'follow', // *manual, error
            //   referrer: 'no-referrer', // *client
        })
            .then(response => response.json()) // parses response to JSON
    }

    show() {
        alert("Hello World 3!");
    }
}