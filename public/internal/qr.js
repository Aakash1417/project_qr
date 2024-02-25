import { postData } from "./utils.js";

const value = window.location.pathname.split("/qr/")[1];

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
