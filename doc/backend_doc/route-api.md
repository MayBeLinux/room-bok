## Introduction

This document allows to explain you, and to give you the different ```route``` in the backend project. Please update it when you have a new ```route```.

To add a new ```route``` please insert the (Method, URI, Data Send, Date Receive, Why). 

### Route

| Method | URI              | data send ?                    | data receive ?  | why ?                                       |
| ------ | ---------------- | ------------------------------ | --------------- | ------------------------------------------- |
|        | **INFORMATIONS** | -----------                    | -----------     | ------------------------------------------- |
| GET    | /api/buildings   | ```nothing```                  | ```json file``` | Receive the list of buildings               |
| GET    | /api/rooms       | ```nothing```                  | ```json file``` | Receive the list of rooms                   |
| GET    | /api/equipments  | ```nothing```                  | ```json file``` | Receive the list of equipments              |
| GET    | /api/floors      | ```nothing```                  | ```json file``` | Receive the list of floors                  |
|        |                  |                                |                 |                                             |
|        | **USERS**        | -----------                    | --------------  | ------------------------------------------- |
| GET    | /api/users/me    | ```nothing```                  | ```json file``` | To return the user connected                |
| GET    | /api/roles       | ```nothing```                  | ```json file``` | Return the list of the role possible        |
|        |                  |                                |                 |                                             |
|        | **INFORMATIONS** | -----------                    | -----------     | ------------------------------------------- |
| POST   | /api/buildings   | ```{ name }```                 | Code 201        | Create a new building                       |
| POST   | /api/rooms       | ```{ name_room, id_floor  }``` | Code 201        | Create a new rooms                          |
| POST   | /api/equipments  | ```{ name }```                 | Code 201        | Create a new equipment                      |
| POST   | /api/floors      | ```{ level, id_building }```   | Code 201        | Create a new floor                          |


