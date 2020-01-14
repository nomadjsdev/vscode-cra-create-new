const vscode = require('vscode')
const fs = require('fs')
const path = require('path')

const templates = require('./templates')

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  let disposable = vscode.commands.registerCommand(
    'extension.craCreateNew',
    async () => {
      // Get the rootpath of the workspace
      // NOTE: this extension is designed for single folder workspaces
      const rootPath = vscode.workspace.workspaceFolders[0].uri.fsPath

      let itemType = await vscode.window.showQuickPick(['View', 'Component'], {
        placeholder: 'Choose item type',
        canPickMany: false,
        ignoreFocusOut: true
      })

      if (itemType === undefined) {
        itemType = 'View'
      }

      const itemName = await vscode.window.showInputBox({
        prompt: 'Item name',
        ignoreFocusOut: true
      })

      // Check itemName directory doesn't already exist
      if (fs.existsSync(path.join(rootPath, `/src/${itemType}/${itemName}`))) {
        // Show error message
        vscode.window.showErrorMessage('Directory already exists, exiting')
        return
      }

      // Create itemType directory if it doesn't already exist
      if (!fs.existsSync(path.join(rootPath, `/src/${itemType}`))) {
        fs.mkdirSync(path.join(rootPath, `/src/${itemType}`))
      }

      // Create new directory for item
      fs.mkdirSync(path.join(rootPath, `/src/${itemType}/${itemName}`))

      let itemIndex = templates.itemIndex.replace(/{{itemName}}/g, itemName)
      // Write new index.js
      fs.writeFileSync(
        path.join(rootPath, `/src/${itemType}/${itemName}/index.js`),
        itemIndex
      )

      let itemFile = templates.itemFile.replace(/{{itemName}}/g, itemName)
      // Write new ${itemName}.js
      fs.writeFileSync(
        path.join(rootPath, `/src/${itemType}/${itemName}/${itemName}.js`),
        itemFile
      )

      vscode.window.showInformationMessage('Done!')
    }
  )

  context.subscriptions.push(disposable)
}

exports.activate = activate

function deactivate() {}

module.exports = {
  activate,
  deactivate
}
