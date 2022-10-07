require('@gouch/to-title-case')

import { Editor, MarkdownView, Notice, Plugin, TFile } from 'obsidian';

const CAPITALIZE_ALL_NAME: string = 'Capitalize All Titles';

export default class CapitalizeMyTitlesPlugin extends Plugin {

	onload() {

		this.addCommand({
			id: 'capitalize-all',
			name: CAPITALIZE_ALL_NAME,
			hotkeys: [{ modifiers: ["Mod", "Shift"], key: "c" }],
			editorCallback: async (editor: Editor, view: MarkdownView) => {
				capitalizeAllTitles(view.file);
			}
		});

	}
}

/**
 * Capitalizes all headers in a Markdown file.
 * 
 * @param file
 */
async function capitalizeAllTitles(file: TFile): Promise<void> {
	let content: string = await this.app.vault.read(file);
	content = content.replace(/(#{1,6})\s+(.+)/g, (match) => {
		return match.toTitleCase();
	});

	await this.app.vault.modify(file, content);
}