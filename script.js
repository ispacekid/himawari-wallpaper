$(document).ready(function() {
  function setWallpaper() {
    $("#status").text("Updating image...");
    // Get time 30 minutes ago in UTC+8 timezone
    var timezoneLocal = -(new Date().getTimezoneOffset() / 60),
      timezoneDest = 8,
      offset = timezoneDest - timezoneLocal;
    console.log("Local Timezone: " + timezoneLocal);
    console.log("Offset: " + offset);
    var delay = 30000 * 60;
    var date = new Date(new Date().getTime() + offset * 3600 * 1000 - delay);
    console.log("Date in UTC+8: " + date);
    // Format time
    var yyyy = date.getFullYear(),
      MM = ("0" + (date.getMonth() + 1)).slice(-2),
      dd = ("0" + date.getDate()).slice(-2),
      hh = ("0" + date.getHours()).slice(-2),
      mm = ("0" + (Math.floor(date.getMinutes() / 10) * 10)).slice(-2);
    console.log("Formatted Date in UTC+8: " + yyyy + "-" + MM + "-" + dd + " " + hh + ":" + mm);
    // Skip 10:40 AM (No image for this time)
    if (parseInt(hh) == 10 && parseInt(mm) == 40) {
      mm = (parseInt(mm) - 10).toString();
      console.log("Skipped 10:40 AM. Downloading image at " + hh + ":" + mm + ".");
    };
    // Fetch image from CWB and set as background image
    var url = "https://www.cwb.gov.tw/V7/observe/satellite/Data/ts1p/ts1p-" + yyyy + "-" + MM + "-" + dd + "-" + hh + "-" + mm + ".jpg";
    $("<img/>").attr("src", url).on("load", function() {
      $(this).remove();
      $("#wallpaper").css("background-image", "url(" + url + ")");
      $("#wallpaper").css("opacity", 1);
      $("#status").text(yyyy + "-" + MM + "-" + dd + " " + hh + ":" + mm + " UTC+8");
    });
    console.log("URL: " + url);
  }
  setWallpaper();
  setInterval(setWallpaper, 60000);
});
