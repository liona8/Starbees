function readdata() {
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = spreadsheet.getSheetByName("sales");
    var lastRow = sheet.getLastRow();
    var lastColumn = sheet.getLastColumn();
    var numOfRow = lastRow - 1;

    var range = sheet.getRange(2, 1, numOfRow, lastColumn);
    var data = range.getValues();

    Logger.log(data);
    return data;
}

function rankfunction() {
    data = readdata();
    var rankColumn = 3;

    if (data.length === 0 || data[0].length < rankColumn) {
        Logger.log("Data is empty or rank column index is out of bounds.");
        return data;
    }

    var rankData = data.map(function(row, index) {
        return [row[rankColumn - 1], index];
    });

    rankData.sort(function(a, b) {
        return b[0] - a[0];
    });

    for (var i = 0; i < rankData.length; i++) {
        var originalIndex = rankData[i][1];
        data[originalIndex].push(i + 1);
    }

    data.sort(function(a, b) {
        return b[b.length - 2] - a[a.length - 2];
    });

    Logger.log("Ranked and re-sorted data: ");
    Logger.log(data);
    return data;
}

function getTasks(taskId) {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("task");
    var data = sheet.getDataRange().getValues();
    var tasks = [];

    for (var i = 1; i < data.length; i++) {
        if (data[i][0] == taskId && data[i][4] == 0) {
        tasks.push({
            task: data[i][1],
            description: data[i][2],
            status: data[i][3],
            no: data[i][5]
        });
        }
    }
    return tasks;
}

function addTask(tId, task, description) {
    var sheet = getSheet();
    var id = generateUniqueId();
    sheet.appendRow([tId, task, description, 'FALSE', 0, id]);
    return getTasks(tId);
}

function updateTaskStatus(taskId, taskNo, newStatus) {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("task");
    var data = sheet.getRange(2, 1, sheet.getLastRow() - 1, 6).getValues();
    for (var i = 0; i < data.length; i++) {
        if (data[i][0] == taskId && data[i][5] == taskNo) {
        sheet.getRange(i + 2, 4).setValue(newStatus);
        break;
        }
    }
    return getTasks(taskId);
}

function deleteTask(tId, id) {
    var sheet = getSheet();
    var data = sheet.getRange(2, 1, sheet.getLastRow() - 1, 6).getValues();

    for (var i = 0; i < data.length; i++) {
        if (data[i][0] == tId && data[i][5] == id) {
        sheet.getRange(i + 2, 5).setValue(1);
        break;
        }
    }
    return getTasks(tId);
}

function getSheet() {
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = spreadsheet.getSheetByName("task");
    if (!sheet) {
        sheet = spreadsheet.insertSheet("task");
        sheet.appendRow(['ID', 'Task', 'Description', 'Status', 'IsDeleted', 'No']);
    }
    return sheet;
    }

    function generateUniqueId() {
    var id = new Date().getTime().toString().slice(-5);
    return id;
}
