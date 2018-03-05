export default class HttpClient {

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

}