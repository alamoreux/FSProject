'use strict';

import * as vscode from 'vscode';
import { MemFS } from './fileSystemProvider';

const memFs = new MemFS();

const files = [
    {
        uri: vscode.Uri.parse(`memfs:/class/empty.txt`),
        content: new Uint8Array(0),
    },
    {
        uri: vscode.Uri.parse(`memfs:/class/empty.foo`),
        content: new Uint8Array(0),
    },
    {
        uri: vscode.Uri.parse(`memfs:/class/file.ts`),
        content: 'let a:number = true; console.log(a);',
    },
    {
        uri: vscode.Uri.parse(`memfs:/function/rnd.foo`),
        content: 'console.log("Allo")',
    },
];

const directories = [
	{
        name: "class",
    },
	{
        name: "function",
    },
];

export function activate(context: vscode.ExtensionContext) {

	console.log('MemFS says "Hello"');

	context.subscriptions.push(vscode.workspace.registerFileSystemProvider('memfs', memFs, { isCaseSensitive: true }));
	vscode.workspace.updateWorkspaceFolders(0, 0, { uri: vscode.Uri.parse('memfs:/'), name: "src" });

	directories.forEach(dir => {
    	memFs.createDirectory(vscode.Uri.parse(`memfs:/${dir.name}/`));
	});

	files.forEach(file => {
    	memFs.writeFile(file.uri, Buffer.from(file.content), { create: true, overwrite: true });
	});
}