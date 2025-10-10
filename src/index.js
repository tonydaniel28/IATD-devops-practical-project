import readlineSync from "readline-sync";
import { isValidDateString, logSeparated, logWrapped, wrapString } from "./utilities.js";
import { createItemEntry, printInventoryTable } from "./inventoryDisplay.js";

const lineLength = 73;
const mainMenuOptions = ["View current inventory", "Log inventory change", "EXIT"];
const invChangeMenuOptions = ["Add/remove stock for existing item", "Add stock for new item"];
const testVariable = "hello";


let itemCategories = ["Food", "Clothing", "Electronics"];
let inventoryItems = [
    {name: "Peaches", category: "Food", amount: 55, restocked: "15/05/2024"},
    {name: "Apples", category: "Food", amount: 17, restocked: "07/01/2024"},
    {name: "Jackets", category: "Clothing", amount: 25, restocked: "22/09/2024"},
    {name: "Pants", category: "Clothing", amount: 103, restocked: "19/09/2024"},
    {name: "AMD Ryzen 5 7500f", category: "Electronics", amount: 4, restocked: "12/03/2023"},
    {name: "Cat. 5 Network Cable 20m", category: "Electronics", amount: 13, restocked: "10/10/2024"},
];

let input = "";

do {
    console.clear();
    logSeparated("MENU", lineLength);
    input = readlineSync.keyInSelect(mainMenuOptions, "Please select an action to continue", {cancel: false});

    switch (input) {
        case 0:
            console.clear();
            logSeparated("Current Inventory", lineLength);
            printInventoryTable(inventoryItems);
            readlineSync.keyInPause(wrapString("Press q to return to main menu..."), {limit: ["q"], guide: false});
            console.clear();
            break;
        case 1: {
            console.clear();
            logSeparated("Log Inventory Change", lineLength);
            const choice = readlineSync.keyInSelect(invChangeMenuOptions, "Please select an action to continue");
            console.clear();
            logSeparated("Add/Remove Stock for Existing Item", lineLength);
            switch (choice) {
                case 0: {
                    let itemName = "";
                    let itemIndex = -1;
                    do {
                        itemName = readlineSync.question(wrapString("Enter the name of the item to add/remove stock for: "));
                        for (let i = 0; i < inventoryItems.length; i++) {
                            if (inventoryItems[i].name.toLowerCase() === itemName.toLowerCase()) {
                                itemIndex = i;
                                break;
                            }
                        }
                        if (itemIndex < 0) {
                            logWrapped(`ERROR: Item of name ${itemName} not found. Please enter the name of an item already tracked by this system.`);
                        }
                    } while (itemIndex < 0);

                    logWrapped(`There are currently ${inventoryItems[itemIndex].amount} ${inventoryItems[itemIndex].name} in stock. Last stock change was on ${inventoryItems[itemIndex].restocked}`);
                    
                    const action = readlineSync.keyInSelect(["Add stock", "Remove stock"], "Please select an action to continue");
                    switch (action) {
                        case 0: {
                            const amount = readlineSync.questionInt(wrapString(`Enter the amount of ${inventoryItems[itemIndex].name} to add: `));
                            const date = enterStockChangeDate();

                            inventoryItems[itemIndex].amount += Number(amount);
                            inventoryItems[itemIndex].restocked = date;

                            console.clear();
                            readlineSync.keyInPause(wrapString(`${inventoryItems[itemIndex].name} successfully updated, press q to return to main menu...`), {limit: ["q"], guide: false});
                            break;
                        }
                        case 1: {
                            let amount = 1;
                            do {
                                amount = readlineSync.questionInt(wrapString(`Enter the amount of ${inventoryItems[itemIndex].name} to remove: `));
                                if (amount > inventoryItems[itemIndex].amount) logWrapped(`ERROR: There are only ${inventoryItems[itemIndex].amount} ${inventoryItems[itemIndex].name}, you cannot remove more than this.`);
                            } while (amount > inventoryItems[itemIndex].amount);
                            
                            const date = enterStockChangeDate();

                            inventoryItems[itemIndex].amount -= Number(amount);
                            inventoryItems[itemIndex].restocked = date;

                            console.clear();
                            readlineSync.keyInPause(wrapString(`$${inventoryItems[itemIndex].name} successfully updated, press q to return to main menu...`), {limit: ["q"], guide: false});
                            break;
                        }
                    }
                    break;
                }
                case 1: {
                    console.clear();
                    logSeparated("Add Stock for New Item", lineLength);

                    const itemName = readlineSync.question(wrapString("Enter the name of the new item to add: "));

                    let category = 0;
                    let cachedLength = 0;
                    do {
                        category = readlineSync.keyInSelect([...itemCategories, "Add New Category"], "Select an existing category or add a new one ", {cancel: false});
                        cachedLength = itemCategories.length;
                        if (category === itemCategories.length) {
                            let isValid = false;
                            do {
                                isValid = addCategory(readlineSync.question(wrapString("Enter the name of the category to add: ")));
                            } while (!isValid);
                        }
                    } while (category === cachedLength);

                    let amount = 1;
                    do {
                        amount = readlineSync.questionInt(wrapString("Enter the amount of stock to add: "));
                        if (amount < 1) logWrapped("ERROR: you must add at least one of this item.");
                    } while (amount < 1);

                    const date = enterStockChangeDate();

                    const item = {name: itemName, category: itemCategories[category], amount: amount, restocked: date};
                    inventoryItems.push(item);

                    logWrapped(`Successfully added item ${itemName} with the following details:`);
                    console.log(createItemEntry(item));
                    readlineSync.keyInPause(wrapString("Press q to return to main menu..."), {limit: ["q"], guide: false});
                    break;
                }
                case 2:
                    break;
            }
            console.clear();
            break;
        }
        case 2:
            break;
    }
} while (input !== 2);

console.clear();
logWrapped("EXITING...", lineLength);

function enterStockChangeDate() {
    let date = "";
    let isValid = false;
    do {
        date = readlineSync.question(wrapString("Enter the date of this stock change using the format DD/MM/YYYY: "));
        isValid = isValidDateString(date);
        if (!isValid) logWrapped("ERROR: The provided date does not use the correct format or is not a real date, please re-enter the date.");
    } while (!isValid);

    return date;
}

/**
 * Returns true and adds the specified category to the list of categories if it is not a blank/empty string or the name of an existing category. Returns false otherwise.
 * 
 * @param {string} category the name of the category to add
 */
function addCategory(category) {
    if (category.trim() === "") {
        logWrapped("ERROR: Category cannot be blank.");
        return false;
    }

    let existing = false;

    itemCategories.forEach(cat => {
        if (cat === category) {
            logWrapped("ERROR: Category already exists.");
            existing = true;
        }
    });

    if (existing) return false;

    itemCategories.push(category);
    logWrapped(`Category ${category} successfully added.`);
    return true;
}