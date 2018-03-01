
export class User {
    name: string = "";
    email: string = "";
}


// class EventUser {
//     var identity: Identity =  Identity()
//     var email: String? = null
//     var clientUserId: String? = null //this is id of the user client has provided
//     var undId: String? = null
//     var fbId: String? = null
//     var googleId: String? = null
//     var mobile: String? = null
//     var firstName: String? = null
//     var lastName: String? = null
//     var gender: String? = null
//     var dob: String? = null
//     var country: String? = null
//     var countryCode: String? = null
//     var clientId: Int = -1 //client id , user is associated with, this can come from collection
//     var additionalInfo: HashMap<String, Any> = hashMapOf()
//
//     //FIXME creation date can't keep changing
//     var creationDate: Long = LocalDateTime.now().toInstant(ZoneOffset.UTC).toEpochMilli()
//
//
//
// }

export interface EventUser {
    identity: Identity;
    email: string;
    clientUserId: string;
    undId: string;
    fbId: string;
    googleId: string;
    mobile: string;
    firstName: string;
    lastName: string;
    gender: string;
    dob: string;
    country: string;
    countryCode: string;
    clientId: number;
    additionalInfo: any;// a set of custom key value pairs
}

export interface Identity {
    //unique id assigned to a device, should always remain fixed, create new if not found
    deviceId: string;
    //if userId is not found assign a new session id, handle change if user login changes, logouts etc
    sessionId: string;
    // id of event user, this id is assigned when a user profile is identified.
    userId?: string;
    clientId?: number;
}

// class Event {
//     lateinit var name: String
//     var clientId: Int = -1
//     var identity: Identity = Identity()
//     var creationTime: Long = LocalDateTime.now().toInstant(ZoneOffset.UTC).toEpochMilli()
//     var ipAddress: String? = null
//     var city: String? = null
//     var state: String? = null
//     var country: String? = null
//     var latitude: String? = null
//     var longitude: String? = null
//     var agentString: String? = null
//     var userIdentified: Boolean = false
//     var lineItem: MutableList<LineItem> = mutableListOf()
//     var attributes: HashMap<String, Any> = hashMapOf()
// }
export interface Event {
    name: string;
    identity: Identity;
    ipAddress: string;
    city: string;
    state: string;
    country: string;
    latitude: string;
    longitude: string;
    agentString: string;
    lineItem: LineItem[];
    attributes: any;
}

/*
* class LineItem {
    var price: Int = 0
    var currency: String? = null
    var product: String? = null
    var categories: MutableList<String> = mutableListOf()
    var tags: MutableList<String> = mutableListOf()
    var quantity:Int=0
    var properties: HashMap<String, Any> = hashMapOf()
}
*/
export interface LineItem {
    price: number;
    currency: string;
    product: string;
    categories: string[];
    tags: string[];
    quantity: number;
    properties: any;
}

export interface Und {
    event: any[];
    profile: any[];
    account: any[];
    onUserLogin: any[];
    notifications: any[];
}