#!/usr/bin/env node

import readlineSync from 'readline-sync'
import * as fs from 'fs';
import * as os from 'os';
import wordListPath from 'word-list'

let result: string[] = [];

function replaceAt(str, index, ch) {
    return str.replace(/./g, (c, i) => i == index ? ch : c);
}

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

console.log(" _______________________________________________________________")
console.log("|                                                               |")
console.log("|               Simple word enumerator for WORDLE               |")
console.log("|_______________________________________________________________|")
console.log("");

const wordArray = fs.readFileSync(wordListPath, 'utf8').split('\n');
var letterCount = readlineSync.question('Enter word letter count - useful when there is no pattern: (default is 5)') || 5;
let pattern = readlineSync.question('Enter known letters - leave empty for non (For example if last three letter are known in "HELLO" word. You can use the following pattern **LLO): ');
let hasKnownCharacters = readlineSync.question('Is there any known characters which you do not know the exact places (yes/no - default is no)? ');
let knownCharacterArray: string[];
let saveToFile = false;
if ((<string>hasKnownCharacters).toLowerCase() == 'y' || (<string>hasKnownCharacters).toLowerCase() == 'yes' || (<string>hasKnownCharacters).toLowerCase() == 'ye') {
    let characters = readlineSync.question("Enter characters comma seperated (like A, B, C):");
    knownCharacterArray = (<string>characters).split(',').map(item => item.trim());
}
let writeToFile = readlineSync.question('Write results to file in home directory? (yes/no - default is no)? ');
if ((<string>writeToFile).toLowerCase() == 'y' || (<string>writeToFile).toLowerCase() == 'yes' || (<string>writeToFile).toLowerCase() == 'ye') {
    saveToFile = true;
}

if (!pattern)
    pattern = '*'.repeat(letterCount);

console.log("Selected pattern is " + pattern);
console.log("");
var starCount = [...pattern].map(b => b == "*" ? 1 : 0).reduce((a, b) => a + b, 0);
const starIndexes = [...pattern].map((b, index) => b == "*" ? index : -1).filter(item => item != -1);
let resultItem = pattern;

let start = async function () {
    await print(starCount);
    result = result.filter(item => {
        if (wordArray.indexOf(item.toLowerCase()) == -1)
            return false;
        let thisItemHasKnownChars = true;
        if (knownCharacterArray) {
            knownCharacterArray.forEach(knownChar => {
                if (item.indexOf(knownChar) == -1) {
                    thisItemHasKnownChars = false;
                    thisItemHasKnownChars = false;
                }
            });
        }
        return thisItemHasKnownChars;
    });
    if (saveToFile) {
        let filePath = os.homedir() + "/result_" + new Date().getUTCMilliseconds() + ".txt";
        fs.writeFileSync(filePath, result.join("\r\n"))
        console.log("File saved successfully at " + filePath);
    }
    else {
        if (result.length == 0) {
            console.info("Sorry :( No words!")
            console.log("");
        }
        else {
            for (let index = 0; index < result.length; index++) {
                const element = result[index];
                console.log(element);
                console.log(" ");

                await new Promise(resolve => setTimeout(resolve, 100));
            }
        }
    }
    console.log("Done!");
}

start();


async function print(level) {
    for (let index = 0; index < [...letters].length; index++) {
        if (level == starCount)
            resultItem = pattern;
        let letter = [...letters][index];
        if (level > 1) {
            let replaceIndex = starCount - level;
            resultItem = replaceAt(resultItem, starIndexes[replaceIndex], letter);
            print(level - 1);
        }
        else if (level == 1) {
            let replaceIndex = starCount - level;
            result.push(replaceAt(resultItem, starIndexes[replaceIndex], letter));
        }
    }
}