class Attendee { // Attendee class
    constructor(name, email) {
      this.name = name;
      this.email = email;
    }
  
    describe() {
      return `${this.name}, Email: ${this.email}`;
    }
  }
  
class Event { // Event class
    constructor(title, date) {
      this.title = title;
      this.date = date;
      this.attendees = [];
      
    }
  
    addAttendee(attendee) {
      if (attendee instanceof Attendee) {
        this.attendees.push(attendee); // pushes to attendees array
      } else {
        throw new Error(`You can only add an instance of Attendee. Argument is not an attendee: ${attendee}`);
      }
    }
  
    describe() {
      return `${this.title} is scheduled for ${this.date} with ${this.attendees.length} attendee(s).`;
    }
  }
  
class Menu { // Menu class
    constructor() {
      this.events = [];
      this.selectedEvent = null;
    }
  
    start() { // start of menu
      let selection = this.showMainMenuOptions();
      while (selection != 0) {
        switch (selection) { // switch case in loop
          case '1':
            this.createEvent();
            break;
          case '2':
            this.viewEvent();
            break;
          case '3':
            this.deleteEvent();
            break;
          case '4':
            this.displayEvents();
            break;
        }
        selection = this.showMainMenuOptions();
      }
      alert('Goodbye!'); // exit loop
    }
  
    showMainMenuOptions() {
      return prompt(`
  0) exit
  1) create a new event
  2) view an event
  3) delete an event
  4) display all events
  `); // prompt for user input to navigate main menu options
    }
  
    showEventMenuOptions(eventInfo) {
      return prompt(`
  0) back
  1) add an attendee
  2) delete an attendee
  -----------------
  ${eventInfo}
  `); // user input to navigate event menu options
    }
  
    displayEvents() {
      let eventString = '';
      for (let i = 0; i < this.events.length; i++) {
        eventString += i + ') ' + this.events[i].title + ' - ' + this.events[i].date + '\n';
      }
      alert(eventString);
    }
  
    createEvent() {
      let title = prompt('Enter title for new event:');
      let date = prompt('Enter date for new event (format: YYYY-MM-DD):');
      this.events.push(new Event(title, date)); // push new Event to events array
    }
  
    viewEvent() {
      let index = prompt('Enter the index of the event you want to view:'); // prompt to select an event
      if (index > -1 && index < this.events.length) {
        this.selectedEvent = this.events[index];
        let description = 'Event: ' + this.selectedEvent.title + '\nDate: ' + this.selectedEvent.date + '\n' + this.selectedEvent.describe() + '\n';
        
        for (let i = 0; i < this.selectedEvent.attendees.length; i++) {
          description += i + ') ' + this.selectedEvent.attendees[i].describe() + '\n'; // descriptions of event and attendees
        }
        
        let selection = this.showEventMenuOptions(description);
        switch (selection) {
          case '1':
            this.createAttendee();
            break;
          case '2':
            this.deleteAttendee();
            break;
        }
      }
    }
  
    deleteEvent() {
      let index = prompt('Enter the index of the event you wish to delete:'); 
      if (index > -1 && index < this.events.length) {
        this.events.splice(index, 1); // splice 1 element at the index
      }
    }
  
    createAttendee() {
      let name = prompt('Enter name for new attendee:');
      let email = prompt('Enter email for new attendee:');
      this.selectedEvent.addAttendee(new Attendee(name, email)); // addAttendee method pushes new Attendee to attendees array
    }
  
    deleteAttendee() {
      let index = prompt('Enter the index of the attendee you wish to delete:');
      if (index > -1 && index < this.selectedEvent.attendees.length) {
        this.selectedEvent.attendees.splice(index, 1); // splice 1 element at index, similar to deleteEvent
      }
    }
  }
  
  let menu = new Menu();
  menu.start();
  