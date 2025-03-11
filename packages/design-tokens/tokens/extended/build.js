import { promises as fs } from "fs"
import JSON5 from "json5"
import * as path from "path";
import { fileURLToPath } from "url";
import lodash from 'lodash';

const { merge } = lodash;
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const SOURCE_DIRECTORY = path.join(__dirname, "./tokens")
const OUTPUT_DIRECTORY = path.join(__dirname, "../")

const MAPPING = {
    "tokens.dark.json": "tokens.json"
}

const OUTPUT_FILE_PREFIX = "gen";

(async () => {
    try {
        // Read the files in the directory
        const files = await fs.readdir(SOURCE_DIRECTORY);

        // Map the files to full paths as JSON
        const jsons = files
            .map((file) => path.join(SOURCE_DIRECTORY, file))
            .filter((str) => str.includes(".json"));

        jsons.map((inputFile) => {
            const fileName = path.basename(inputFile);

            const mappedValue = getMappedValue(fileName);

            if (!mappedValue) {
                console.error(
                    "Error finding the file to extend. Please check the MAPPING object."
                );
                return;
            }

            const extendedFile = path.join(OUTPUT_DIRECTORY, mappedValue);

            const fileNameWithoutExtension = path.basename(
                inputFile,
                path.extname(inputFile)
            );

            const outputFile = path.join(
                OUTPUT_DIRECTORY,
                `${OUTPUT_FILE_PREFIX ? OUTPUT_FILE_PREFIX + "-" : ""}${fileNameWithoutExtension}.json5`
            );

            combineJsonFiles(extendedFile, inputFile, outputFile);
        });
    } catch (err) {
        console.error("Error scanning the directory:", err);
    }
})();

function getMappedValue(key) {
    return MAPPING[key] || undefined;
}

async function combineJsonFiles(extendedFile, inputFile, outputFile) {
    try {
        const data1 = JSON5.parse(await fs.readFile(extendedFile, "utf8"));
        const data2 = JSON5.parse(await fs.readFile(inputFile, "utf8"));

        const combinedData = merge({}, data1, data2);

        const comment = `/**
 * Do not edit directly, this file was auto-generated.
 * By ${inputFile}
 */\n\n`;

        // Write the combined data to a new JSON5 file
        await fs.writeFile(
            outputFile,
            `${comment}${JSON5.stringify(combinedData, {
                space: 2,
                quote: '"'
            })}\n`,
            "utf8"
        );

        console.log(`The file ${outputFile} was successfully created.`);
    } catch (error) {
        console.error(`Error processing the files`, error);
    }
}