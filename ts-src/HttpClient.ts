export default class HttpClient {

    authorization: string = '';
    contentType: string = 'application/json';

    postData(url: string, data: any) {
        // Default options are marked with *
        return fetch(url, {
            body: JSON.stringify(data), // must match 'Content-Type' header
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            //   credentials: 'include', // include, *omit, same-origin
            headers: {
                'user-agent': 'Mozilla/4.0 MDN Example',
                'content-type': 'application/json',
                'Authorization': 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1ZGllbmNlIjoid2ViIiwidXNlcklkIjoiMiIsImNsaWVudElkIjoiMiIsInJvbGVzIjpbIlJPTEVfVVNFUiIsIlJPTEVfQURNSU4iXSwiY3JlYXRlZCI6MTUxOTI3NjUwNDExMiwiZXhwIjoxNTE5ODgxMzA0fQ.UR2YKJhHg6JTH-_j2_lW0qqZ0rdGo6KhNPgB6GmJjUIgp7FXRNArAuIYaDYxbAd_wPYhjrlzlJAT7ehywZxohA'
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