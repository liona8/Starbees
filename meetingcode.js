function createMeetEvent(title, startTime, endTime, description, attendees) {
  try {
    var calendar = CalendarApp.getDefaultCalendar();
    
    var event = calendar.createEvent(title, 
      new Date(startTime), 
      new Date(endTime), 
      {description: description, guests: attendees.join(','), sendInvites: true}
    );
    
    return true;
  } catch (e) {
    Logger.log('Error creating event: ' + e.message);
    return { error: e.message };
  }
}
  