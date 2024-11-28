We are creating a Book my show application here for web app - which is adaptable to screens due to the heavy use of tailwind css.
We will be very heavily using the flowbite components for which the list of components can be found in the flowbite-components-list.txt file - whenever you need something just ask first.
We want to create a web and mobile application to manage cinemas. Each cinema, located in a city, is defined by its code, name, and geographical position. A cinema contains a set of halls. Each hall, defined by its number and name, contains a set of seats. Each seat has a number and is geographically positioned.

Daily, several movie screenings are scheduled in the halls. Each screening takes place during a session, concerns a specific movie, and occurs in a hall at a specific screening date and a fixed price. Each session is defined by its number and start time. For each screening, a set of tickets is provided. Each ticket corresponds to a seat and is defined by the customer's name, the ticket price, and the payment code. Movies are categorized by genres.

The application consists of two parts:

The backend part - https://github.com/cinemamrboot/cinema-jwt
The frontend part - https://github.com/cinemamrboot/cinema-angular

__________________________________________

The functional requirements of the application are:

Cinema Management

Consultation, entry, addition, editing, updating, and deletion of cinemas.
Management of Halls and Seats

Movie Management

Projection Management

Ticket Sales Management

Backend Specifications
The backend is based on Spring and consists of the following layers:

DAO Layer:
Built on Spring Data, JPA, and Hibernate.
Service Layer:
Defined through an interface and its implementation.
Includes specific functionalities requiring particular calculations or processing.
Web Layer:
Implements RESTful APIs using either Spring Data REST or RestController.
Frontend Specifications
The frontend is developed using the Angular framework.

Security
Security is handled with Spring Security and JSON Web Tokens (JWT).

________________________________________________________
Use Case
Use Case: Login/Authentication
Use Case ID	UC001
Use Case Name	Login/Authentication
Actors	Admin, Client
Description	Admin and Clients need to authenticate to access their respective sections of the system.
Precondition	User has an account with valid credentials.
Postcondition	User is logged in and redirected to the appropriate interface.
Flow of Events	1. User enters username and password.
2. System checks credentials.
3. If valid, user is logged in and redirected to the appropriate interface.
4. If invalid, error message is displayed.
Alternative Flow	1a. User enters incorrect credentials.
1b. System prompts user to try again or reset password.
Exceptions	User enters invalid credentials.
System crashes due to invalid input.
Assumptions	System supports secure authentication for both admins and clients.

Use Case: Manage Cinemas
Use Case ID	UC002
Use Case Name	Manage Cinemas
Actors	Admin
Description	Admin can add, update, view, and delete cinemas.
Precondition	Admin is logged in.
Postcondition	New cinema information is added or existing cinema data is updated/deleted.
Flow of Events	1. Admin selects the "Manage Cinemas" option.
2. Admin chooses to add, update, or delete a cinema.
3. System prompts for required information.
4. Admin submits data.
5. System confirms action.
Alternative Flow	1a. Admin cancels action.
1b. No changes are made.
Exceptions	Admin is not logged in.
Admin enters invalid information.
Assumptions	Admin has the correct role to access cinema management.

Use Case: Manage Rooms and Seats
Use Case ID	UC003
Use Case Name	Manage Rooms and Seats
Actors	Admin
Description	Admin defines the structure of cinema rooms, including seat availability.
Precondition	Admin is logged in and has access to cinema management.
Postcondition	Rooms and seats are created, updated, or deleted.
Flow of Events	1. Admin selects the "Manage Rooms and Seats" option.
2. Admin enters room details and seat availability.
3. System validates and stores the information.
4. Confirmation is provided.
Alternative Flow	1a. Admin cancels action.
1b. No changes are made.
Exceptions	Admin is not logged in.
Invalid seat configuration.
Assumptions	Admin is authorized to modify room configurations.

Use Case: Manage Films
Use Case ID	UC004
Use Case Name	Manage Films
Actors	Admin
Description	Admin can add, update, view, and delete films, and categorize them.
Precondition	Admin is logged in.
Postcondition	Films are updated or categorized properly.
Flow of Events	1. Admin selects the "Manage Films" option.
2. Admin selects to add, update, or delete a film.
3. Admin enters film details.
4. System processes the information.
5. Admin receives confirmation.
Alternative Flow	1a. Admin cancels action.
1b. No changes are made.
Exceptions	Admin is not logged in.
Incorrect film details entered.
Assumptions	Admin has appropriate access to manage films in the system.

Use Case: Schedule Projections
Use Case ID	UC005
Use Case Name	Schedule Projections
Actors	Film Projection Manager
Description	Manager schedules film projections, selecting the film, room, date, and time.
Precondition	Admin has already entered films and rooms.
Postcondition	Film projections are scheduled and visible to clients.
Flow of Events	1. Manager selects the "Schedule Projections" option.
2. Manager selects a film, room, date, and time.
3. System confirms and schedules the projection.
4. A confirmation is displayed.
Alternative Flow	1a. Manager cancels action.
1b. No projection is scheduled.
Exceptions	Manager enters invalid projection details.
System crash during scheduling.
Assumptions	The manager has the required permissions to schedule projections.

Use Case: Book Tickets
Use Case ID	UC006
Use Case Name	Book Tickets
Actors	Client
Description	Clients can select a movie, choose a seat, and book tickets for a show.
Precondition	Client is logged in and projections are available.
Postcondition	Tickets are booked and a confirmation is generated.
Flow of Events	1. Client browses available films and projections.
2. Client selects a film, seat, and time.
3. Client enters payment details.
4. System confirms booking and generates a ticket.
Alternative Flow	1a. Client cancels booking.
1b. No booking is confirmed.
Exceptions	Client fails to select a valid seat.
Payment fails due to gateway issues.
Assumptions	Client must have a valid login and be able to make a payment through the system.

Use Case: Pay for Tickets
Use Case ID	UC007
Use Case Name	Pay for Tickets
Actors	Client, Payment Gateway
Description	Clients make a payment for their ticket bookings through the integrated payment gateway.
Precondition	Client has selected tickets.
Postcondition	Payment is processed, and a confirmation ticket is issued.
Flow of Events	1. Client enters payment information.
2. System processes payment via gateway.
3. Payment is confirmed, and ticket is generated.
4. Confirmation sent to client.
Alternative Flow	1a. Client cancels payment.
1b. Payment is not processed.
Exceptions	Payment gateway fails.
System crashes during payment.
Assumptions	Payment gateway is functional and integrated into the system.

Use Case: View Film Catalog
Use Case ID	UC008
Use Case Name	View Film Catalog
Actors	Client
Description	Clients can browse a catalog of available films, see showtimes, and make reservations.
Precondition	Client is logged in.
Postcondition	Film details, including categories and showtimes, are displayed to the client.
Flow of Events	1. Client selects the "Film Catalog" option.
2. System displays a list of films and showtimes.
3. Client can select a film to view details.
Alternative Flow	1a. Client exits the catalog.
1b. No selection is made.
Exceptions	System fails to load film catalog.
Client disconnects during browsing.
Assumptions	Client must be logged in to view the film catalog.

Use Case: View Projection Schedule
Use Case ID	UC009
Use Case Name	View Projection Schedule
Actors	Client
Description	Clients can view the schedule for upcoming film projections.
Precondition	Client is logged in.
Postcondition	A list of film projections with times and rooms is displayed.
Flow of Events	1. Client selects "Projection Schedule" option.
2. System displays a list of projections with times.
3. Client views the schedule.
Alternative Flow	1a. Client exits without viewing.
1b. No schedule viewed.
Exceptions	Schedule not available.
System crashes during display.
Assumptions	Client has proper access and login privileges.

Use Case: View/Manage Orders
Use Case ID	UC010
Use Case Name	View/Manage Orders
Actors	Client
Description	Clients can view their past ticket orders and modify or cancel them if needed.
Precondition	Client is logged in and has previously booked tickets.
Postcondition	Client can view or modify ticket orders.
Flow of Events	1. Client selects "View Orders".
2. System displays a list of past bookings.
3. Client selects a booking to cancel or modify.
Alternative Flow	1a. Client cancels action.
1b. No order is modified.
Exceptions	No previous orders.
System crashes while viewing orders.
Assumptions	Client must be logged in and have made at least one booking.


______________________
