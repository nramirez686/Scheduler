$(document).ready(function () {
  //creates a current hour variable sets the value using daysjs
  const currentHour = dayjs().hour();

  //function that applies the css class background depending on the time of day
  function applyTimeBlockClass(hour) {
    if (hour < currentHour) {
      this.removeClass("present future").addClass("past");
    } else if (hour === currentHour) {
      this.removeClass("past future").addClass("present");
    } else {
      this.removeClass("present past").addClass("future");
    }
  }

  //function that selects elems with time block class to determine the hour for each time block id using jquery and loops it
  //then calls the previous function and uses this to apply the correct css depending on hour
  function updateTimeBlockColors() {
    $(".time-block").each(function () {
      const hour = parseInt($(this).attr("id").split("-")[1], 10);
      applyTimeBlockClass.call($(this), hour);
    });
  }
  //calls function to update css
  updateTimeBlockColors();

  //this selects all save button elems and adds an event listener for the click then saves description to local storage
  $(".saveBtn").on("click", function (event) {
    event.preventDefault();
    //stores the description entered in the textarea when save is clicked
    const description = $(this).siblings(".description").val().trim();
    //stores the ID of the time block
    const timeBlockId = $(this).parent().attr("id");
    //saves the description to local storage by time block
    localStorage.setItem(timeBlockId, description);
    //calls function afain after description is saved to update css
    updateTimeBlockColors();
  });
  //created a variable called currentDate to display the date in the following format
  const currentDate = dayjs().format("dddd, MMMM D, YYYY");
  document.getElementById("currentDay").textContent = currentDate;
});
