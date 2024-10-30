import fs from 'fs';
import path from 'path';
 
const helpers = {
    writeToTempFile: async (filename, content) => {
        // Define the directory where the file will be saved
        const dir = path.join(process.cwd(), 'test', '.artifacts'); // Use process.cwd() for the current working directory
       
        // Ensure the directory exists
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
 
        // Define the full path for the file
        const filePath = path.join(dir, `${filename}.txt`); // You can change the file extension if needed
 
        // Write the content to the file
        try {
            await fs.promises.writeFile(filePath, content);
            console.log(`File written to ${filePath}`);
        } catch (err) {
            console.error('Error writing to file:', err);
        }
    }
};
 
export default helpers;