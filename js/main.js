function a() {
    document.getElementById('files').addEventListener('change', handleFileSelect, false);
}



function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object

    for (var i = 0, f; f = files[i]; i++) {
        // json only
        if (!f.type.match('json.*')) {
            continue;
        }

        var reader = new FileReader();
        reader.onload = (function (theFile) {
            return function (e) {
                //console.log(e.target.result);
                var struct = JSON.parse(e.target.result);
                var txt = "<table class='tab' border='0'>";
                //console.log(struct.Rules[0].payRate);
                var due = struct.Rules[0].due;
                var done;
                var payRate = struct.Rules[0].payRate;
                var overtimeRate = struct.Rules[0].overtimeRate;

                for (j in struct.Employees) {
                    done = struct.Employees[j].hoursWorked;
                    txt += "<tr>" +
                        "<td>  " + struct.Employees[j].userId + "  </td>" +
                        "<td>  " + struct.Employees[j].comment + "  </td>" +
                        "<td>  " + struct.Employees[j].hoursWorked + " hours worked  </td>" +
                        "<td>  The employee " + overtimeText(due,done) + " made " + calc(due, done, payRate, overtimeRate) + " $ this week   </td>" +
                        "</tr>";
                }
                txt += "</table>";
                document.getElementById("tb").innerHTML = txt;
            };
        })(f);
        // Read in the file as a data URL.
        //reader.readAsDataURL(f);
        reader.readAsText(f);
    }
}

function calc(due, done, payRate, overtimeRate) {
    var overtime = done - due;
    var overtimeCond = (overtime > 0);
    var toPay = done * payRate;
    if (overtimeCond) {
        toPay += overtime * overtimeRate;
    }
    return toPay;
}

function overtimeText(due, done) {
    if ((done - due) > 0)
        return "worked overtime and";
    else
        return "";
}