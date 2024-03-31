import { postData } from "./utils.js";

const value = window.location.pathname.split("/qr/")[1];

function updateTable(tableClassName, jsonData) {
    const table = document.querySelector(`.${tableClassName}`);

    if (!table) {
        console.error(`Table with class ${tableClassName} not found`);
        return;
    }

    // Iterate over each row in the table (skipping the first row which contains headers)
    for (let i = 1; i < table.rows.length; i++) {
        const row = table.rows[i];
        const key = row.cells[0].textContent.trim(); // Assuming the first cell in each row contains the key
        if (key in jsonData) {
            // Update the cell with the corresponding value from the JSON data
            row.cells[1].textContent = jsonData[key];
        }
    }
}

async function searchDocument(searchValue) {
    const spinner = document.getElementById("spinner");
    if (spinner) {
        spinner.style.display = "block";
    }

    try {
        const data = await postData("/api", { searchValue });
        console.log(data.receivedData[0]); // TODO: Remove this line

        // document.getElementById("content-container").innerHTML = JSON.stringify(
        //     data.receivedData
        // );
        const tableRef1 = document.getElementById("contentTable1");
        const tableRef2 = document.getElementById("contentTable2");

        const arcflashData = {
            "Working Distance": "Value for Working Distance",
            "Incident Energy": "Value for Incident Energy",
            "Arc Flash Protection Boundary":
                "Value for Arc Flash Protection Boundary",
            "Available Fault Current": "Value for Available Fault Current",
        };

        const shockData = {
            "Shock Hazard When Cover is Removed": "Value for Shock Hazard",
            "Limited Approach": "Value for Limited Approach",
            "Restricted Approach": "Value for Restricted Approach",
            "Glove Class": "Value for Glove Class",
            "Glove V-rating": "Value for Glove V-rating",
        };

        addStudyDataToTable(tableRef1, arcflashData, "Arc Flash Protection");
        addStudyDataToTable(tableRef2, shockData, "Shock Protection");
    } catch (error) {
        console.error("Error:", error);
    } finally {
        if (spinner) {
            spinner.style.display = "none";
        }
    }
}

function addStudyDataToTable(tableRef, studyData, title) {
    let tr = document.createElement("tr");
    let th = document.createElement("th");
    th.className = "title";
    th.textContent = title;
    tr.appendChild(th);
    tableRef.appendChild(tr);

    Object.entries(studyData).forEach(([key, value]) => {
        tr = document.createElement("tr");

        let label = document.createElement("th");
        label.textContent = key;
        tr.appendChild(label);

        let input = document.createElement("td");
        input.textContent = value;
        tr.appendChild(input);

        tableRef.appendChild(tr);
    });
}

window.onload = () => {
    if (value) {
        searchDocument(value);
    }
};
