import CommonPage from "./commonPage.js";

class DragPage extends CommonPage {
    constructor() {
        super();

        // Locator for the resizer and the tab
        this.$resizer = () => $(`(//div[@class="rz-column-resizer"])[6]`)
        this.$tab = () => $(`//th[.//span[text()='Submitted Date']]`);
    }

    /**
     * Drag the tab horizontally until its width reaches the target value.
     * @param {number} targetWidth - Desired width (default: 200px).
     */
    async getTabWidth() {
        const tab = await this.$tab();
        const style = await tab.getAttribute('style');
        const widthMatch = style.match(/width:\s*(\d+)px/); // Extract width using regex
        return widthMatch ? parseInt(widthMatch[1], 10) : 0;
    }

    /**
     * Drag the tab horizontally until its width reaches the target value.
     * @param {number} targetWidth - Desired width (default: 200px).
     */
    async dragTabToWidth(targetWidth = 200) {
        const resizer = await this.$resizer();

        // Resize until the target width is reached
        while (await this.getTabWidth() < targetWidth) {
            await resizer.dragAndDrop({ x: 10, y: 0 }); // Move the resizer 10px to the right
        }

        console.log(`Tab resized to at least ${targetWidth}px.`);
    }
}

export default new DragPage();
