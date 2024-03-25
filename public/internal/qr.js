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
    const spinner = document.getElementById("loading-spinner");
    if (spinner) {
        spinner.style.display = "block";
    }

    try {
        const data = await postData("/api", { searchValue });
        console.log(data);
        document.getElementById("content-container").innerHTML = JSON.stringify(
            data.receivedData
        );
    } catch (error) {
        console.error("Error:", error);
    } finally {
        if (spinner) {
            spinner.style.display = "none";
        }
    }
}

window.onload = () => {
    if (value) {
        searchDocument(value);
    }
};
