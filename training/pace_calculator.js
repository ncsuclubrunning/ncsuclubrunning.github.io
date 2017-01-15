/**
 * A high-level function that takes the user's 5K time as input, calculates
 * workout paces, and generates and displays the results in a table.
 */
function showPaces() {
    // Get the user's 5K time input
    var timeInput = document.getElementById("time-input");
    var pacesOutput = document.getElementById("paces-output");

    pacesOutput.innerHTML = "";

    var time = timeInput.value;
    if (!isValidTime(time)) {
        if (time != "") {
            pacesOutput.innerHTML = "Invalid time.";
        }
        return;
    }

    // Calculate paces
    var timeInSeconds = timeStringToSeconds(time);
    var paces = calculatePaces(timeInSeconds);

    // Build a table of paces
    var pacesTable = buildPacesTable(paces);
    pacesOutput.appendChild(pacesTable);
}

/**
 * Constructs a table of paces from the given pace data.
 *
 * Assumes the paces argument is in the format:
 * [ {distance: "800", pace: "3:48"},
 *   {distance: "Mile", pace: "4:18"},
 *   ...
 *   {distance: "Marathon", pace: "5:35"} ]
 *
 * Returns a table:
 * <table>
 *     <tr>
 *         <th>800</th> <th>Mile</th> ... <th>Marathon</th>
 *     </tr>
 *     <tr>
 *         <td>3:48</td> <td>4:18</td> ... <td>5:35</td>
 *     </tr>
 * </table>
 *
 * @param paces the paces data from which to generate the table
 * @return a <table> with all of the pace data
 */
function buildPacesTable(paces) {
    var pacesTable = document.createElement("table");

    var distancesRow = document.createElement("tr");
    var pacesRow = document.createElement("tr");

    for (var i = 0; i < paces.length; i++) {
        var distanceEntry = document.createElement("th");
        var distanceText = document.createTextNode(paces[i].distance);
        distanceEntry.appendChild(distanceText);
        distancesRow.appendChild(distanceEntry);

        var paceEntry = document.createElement("td");
        var paceText = document.createTextNode(paces[i].pace);
        paceEntry.appendChild(paceText);
        pacesRow.appendChild(paceEntry);
    }

    pacesTable.appendChild(distancesRow);
    pacesTable.appendChild(pacesRow);

    return pacesTable;
}

/**
 * Calculates several paces based on 5K time. Returns a list of distances and paces.
 *
 * Returns a list of objects with distance and pace attributes:
 * [ {distance: "800", pace: "3:48"},
 *   {distance: "Mile", pace: "4:18"},
 *   ...
 *   {distance: "Marathon", pace: "5:35"} ]
 *
 * @param time the 5K time in seconds from which to generate paces
 * @return a list of distances and paces
 */
function calculatePaces(time) {
    // Mile pace during a 5K
    var _5kMilePace = time * (1609 / 5000);
    // Mile race pace
    var milePace = _5kMilePace * .89;

    var paces = [
        {distance: "5K",            pace: secondsToTimeString(time)},
        {distance: "800",           pace: secondsToTimeString(milePace / 1.13)},
        {distance: "Mile",          pace: secondsToTimeString(milePace / 1.00)},
        {distance: "3K",            pace: secondsToTimeString(milePace / 0.94)},
        {distance: "5K",            pace: secondsToTimeString(milePace / 0.89)},
        {distance: "6K",            pace: secondsToTimeString(milePace / 0.88)},
        {distance: "8K",            pace: secondsToTimeString(milePace / 0.87)},
        {distance: "10K",           pace: secondsToTimeString(milePace / 0.86)},
        {distance: "vLT",           pace: secondsToTimeString(milePace / 0.835)},
        {distance: "Half marathon", pace: secondsToTimeString(milePace / 0.81)},
        {distance: "Marathon",      pace: secondsToTimeString(milePace / 0.77)}
    ]

    return paces;
}

/**
 * Converts a string time to seconds. Returns an integer.
 *
 * timeStringToSeconds("15:32") => (15*60) + 32 = 932
 * timeStringToSeconds("1:02:58") => (1*60*60) + (2*60) + 58 = 3778
 * timeStringToSeconds("0:01") => 1
 *
 * @param time a time, either XX:XX or XX:XX:XX
 * @return the number of seconds the time represents
 */
function timeStringToSeconds(timeString) {
    var parts = timeString.split(":").reverse();
    var seconds = parseInt(parts[0]);
    var minutes = parseInt(parts[1]);

    var totalSeconds = 0;
    totalSeconds += seconds;
    totalSeconds += minutes * 60;

    if (parts.length == 3) {
        var hours = parseInt(parts[2]);
        totalSeconds += hours * 60 * 60;
    }

    return totalSeconds;
}

/**
 * Converts seconds to a time string.
 *
 * secondsToTimeString(58) => "0:58"
 * secondsToTimeString(257) => "4:17"
 * secondsToTimeString(642) => "10:42"
 * secondsToTimeString(3778) => "1:02:58"
 *
 * @param timeSeconds an integer number of seconds
 * @return a time string generated from the number of seconds
 */
function secondsToTimeString(timeSeconds) {
    timeSeconds = Math.round(timeSeconds);
    var seconds = timeSeconds % 60;
    timeSeconds = Math.floor(timeSeconds / 60);
    var minutes = timeSeconds % 60;
    timeSeconds = Math.floor(timeSeconds / 60);
    var hours = timeSeconds;

    var secondsPadded = (seconds < 10 ? "0" : "") + seconds;
    var minutesPadded = (minutes < 10 ? "0" : "") + minutes;

    if (hours > 0) {
        return hours + ":" + minutesPadded + ":" + secondsPadded;
    } else {
        return minutes + ":" + secondsPadded;
    }
}

/**
 * Returns whether the input string is a valid time.
 *
 * isValidTime("15:25") => true
 * isValidTime("1:02:58") => true
 * isValidTime("foobar") => false
 * isValidTime("XX:XX") => false
 * isValidTime("1:1:02") => false
 *
 * @param time a string to validate
 * @return true if the string is formatted like a time
 */
function isValidTime(time) {
    // Regex:
    // ^                 --- start string
    // ([0-9]:[0-5][0-9] --- H:MM
    // |                 --- OR
    // [0-5]?[0-9])      --- M or MM
    // :                 --- :
    // [0-5][0-9]        --- seconds
    // $                 --- end string
    return /^([0-9]:[0-5][0-9]|[0-5]?[0-9]):[0-5][0-9]$/.test(time);
}
