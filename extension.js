const vscode = require('vscode')
const fs = require('fs')
const path = require('path')

const templates = require('./templates')

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  let disposable = vscode.commands.registerCommand(
    'extension.craCreateNewView',
    async () => {
      // Get the rootpath of the workspace
      // NOTE: this extension is designed for single folder workspaces
      const rootPath = vscode.workspace.workspaceFolders[0].uri.fsPath

      const viewName = await vscode.window.showInputBox({
        prompt: 'View name',
        placeHolder: 'Use PascalCase!',
        ignoreFocusOut: true
      })

      // Create View directory if it doesn't already exist
      if (!fs.existsSync(path.join(rootPath, `/src/View`))) {
        fs.mkdirSync(path.join(rootPath, `/src/View`))
      }

      // Check directory doesn't already exist
      if (fs.existsSync(path.join(rootPath, `/src/View/${viewName}`))) {
        // Show error message
        vscode.window.showErrorMessage('Directory already exists, exiting')
        // Return early?
        return
      }

      // Create new directory for View
      fs.mkdirSync(path.join(rootPath, `/src/View/${viewName}`))

      let viewIndex = templates.viewIndex.replace(/{{viewName}}/g, viewName)
      // Write new index.js
      fs.writeFileSync(
        path.join(rootPath, `/src/View/${viewName}/index.js`),
        viewIndex
      )

      let viewFile = templates.viewFile.replace(/{{viewName}}/g, viewName)
      // Write new ${viewName}.js
      fs.writeFileSync(
        path.join(rootPath, `/src/View/${viewName}/${viewName}.js`),
        viewFile
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
