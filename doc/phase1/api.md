# API
All of our internal services (Trident, Javelin, Populous) will use Thrift with JSON/HTTP for communication, so our internal endpoints are written using the Thrift specification. 

###  Trident

``` thrift
namespace js trident

struct GAPFStatus {
    1: string faculty,
    2: bool submitted
}

struct GAPFStatusList {
    1: list<GAPFStatus> gapf_status
}

struct SubmitGAPFRequest {
    1: i32 faculty_id,
    2: map<string, string> document_info
}

service Trident {
    void submitGAPF(1: SubmitGAPFRequest request),
    map<string, string> getGAPFInfo(1: i32 faculty_id),
    GAPFStatus getGAPFStatus(1: i32 faculty_id),
    GAPFStatusList getAllGAPFStatus()
}
```

###  Javelin

``` thrift

include "populous.thrift"

namespace js javelin 

enum TicketState {
    GRANTED
    REQUEST
    PENDING
    REFUSED
    ACCEPTED
}

struct Note {
    1: string text;
    2: bool resolved;
}

struct Ticket {
    1: i32 ticketID;
    2: TicketState state;
    3: populous.User applicant;
    4: populous.User faculty;
    5: list<Note> notes;
}

service Javelin {
    list<Ticket> getAllTickets(),
    Ticket getTicket(1: i32 ticketID),
    Ticket createTicket()
    Ticket updateTicket(1: i32 ticketID, 2: TicketState state),
    Ticket assignStudent(1: i32 ticketID, 2: populous.User student),
    Ticket addNote(1: i32 ticketID, 2: Note note),
    Ticket updateNote(1: i32 ticketID, 2: i32 noteID, 3: Note note),
    Ticket deleteNote(1: i32 ticketID, 2: i32 noteID)
}
```

### Populous
``` thrift
namespace js populous 

enum UserType {
    APPLICANT
    FACULTY
}

struct UserInfo {
    1: required UserType userType;
    2: required string firstName;
    3: required string lastName;
    4: required string userId;
    5: optional map<string, string> additionalInfo;
}

struct User {
    1: UserInfo userInfo;
}

service Populous {
    void CreateUser(1: User user)
    User GetUser(1: UserType userType, 2: string userId)
    list<User> GetUsersType(1: UserType userType)
}
```

### Ouroboros
Ouroboros functions as an edge service. Because Ouroboros endpoints will be accessible from outside the internal network, we are using REST endpoints instead of Thrift. Ouroboros is meant to apply some middleware functionality to the endpoints, and then just call relevant internal services to return data without modification.

Here are the starting endpoints for Ouroboros: 

| Endpoint                                       | Description                                                       |
|------------------------------------------------|-------------------------------------------------------------------|
| GET /api/ticket                                | Get all ticket objects.                                           |
| GET /api/ticket/{ticket_id}                    | Get ticket with ticket_id.                                        |
| POST /api/ticket/                              | Create an empty ticket in initial state and return ticket object. |
| PUT /api/ticket/{ticket_id}/state              | Update state of ticket and return ticket object.                  |
| PUT /api/ticket/{ticket_id}/student            | Assign student to ticket and return ticket object.                |
| POST /api/ticket/{ticket_id}/notes             | Add a note to a ticket and return ticket object.                  |
| PUT /api/ticket/{ticket_id}/notes/{note_id}    | Update a note and return ticket object.                           |
| DELETE /api/ticket/{ticket_id}/notes/{note_id} | Delete a note and return ticket object.                           |
|                                                |                                                                   |
| PUT/api/user/create                            | Create a user with some information.                              |
| GET/api/user/{user_type}/{user_id}             | Get a user with specific type and ID.                             |
| GET/api/user/type/{type}                       | Get all users of a specific type.                                 |
|                                                |                                                                   |
| PUT/api/gapf/submit                            | Submit a GAPF.                                                    |
| GET/api/gapf/{faculty_id}                      | Get GAPF information about a specific faculty member.             |
| GET/api/gapf/status/{faculty_id}               | Get GAPF status of a specific faculty member.                     |
| GET/api/gapf/all                               | Get all GAPF status information.                                  |


Because we're opting to use JSON/HTTP for our Thrift specification instead of binary data, the format specified in each of the internal services will convert to JSON. This means that request and response data for network requests are defined in the Thrift files. The Thrift files serve as our main specification, and so the duplicate information has been left out from the REST endpoints. 

We've decided on these endpoints to cover the main functionality that we've included in our scope. As use-cases are added, endpoints can be updated through the Thrift files.
