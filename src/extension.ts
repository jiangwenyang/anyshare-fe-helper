'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import NewComponent, { ComponentType, DeviceType, DeclareType } from './newComponent'


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "anyshare-fe-helper" is now active!');
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let newComponent = vscode.commands.registerCommand('extension.newComponent', () => {
        // The code you place here will be executed every time your command is executed

        // 组件类型选项列表
        let componentTypeOptions: Array<string> = [
            "组件类型 : ShareWebUtil",
            "组件类型 : ShareWebCore",
            "组件类型 : ShareWebUI",
            "组件类型 : ShareWebComponets",
            "组件类型 : ShareWebConsole",
        ];

        // 设备类型选项列表
        let deviceTypeOptions: Array<string> = [
            "设备类型 : desktop",
            "设备类型 : mobile",
            "设备类型 : client",
            "设备类型 : all",
        ];

        // 组件声明方式选项列表
        let declareTypeOptions: Array<string> = [
            "声明方式 : stateless(无状态组件)",
            "声明方式 : statefull(有状态组件)",
        ];

        vscode.window.showQuickPick(componentTypeOptions).then(componentType => {
            switch (componentType) {
                case componentTypeOptions[0]:
                    /* 创建ShareWebUtil */
                    vscode.window.showInputBox().then(componentName => {
                        const newShareWebUtil = new NewComponent(ComponentType.ShareWebUtil, componentName);
                        newShareWebUtil.createComponent()
                    })
                    break;
                case componentTypeOptions[1]:
                    /* 创建ShareWebCore */
                    vscode.window.showInputBox().then(componentName => {
                        const newShareWebCore = new NewComponent(ComponentType.ShareWebCore, componentName);
                        newShareWebCore.createComponent()
                    })
                    break;
                case componentTypeOptions[2]:
                    /* 创建ShareWebUI */
                    vscode.window.showQuickPick(deviceTypeOptions).then(deviceType => {
                        switch (deviceType) {
                            case deviceTypeOptions[0]:
                                /* desktop */
                                vscode.window.showQuickPick(declareTypeOptions).then(declareType => {
                                    switch (declareType) {
                                        case declareTypeOptions[0]:
                                            /* stateless */
                                            vscode.window.showInputBox().then(componentName => {
                                                const newShareWebUI = new NewComponent(ComponentType.ShareWebUI, componentName, DeviceType.Desktop, DeclareType.Stateless);
                                                newShareWebUI.createComponent()
                                            })
                                            break;
                                        case declareTypeOptions[1]:
                                            /* stateful */
                                            vscode.window.showInputBox().then(componentName => {
                                                const newShareWebUI = new NewComponent(ComponentType.ShareWebUI, componentName, DeviceType.Desktop, DeclareType.Stateful);
                                                newShareWebUI.createComponent()
                                            })
                                            break;
                                        default:
                                            break;
                                    }
                                })
                                break;
                            case deviceTypeOptions[1]:
                                /* mobile */
                                vscode.window.showQuickPick(declareTypeOptions).then(declareType => {
                                    switch (declareType) {
                                        case declareTypeOptions[0]:
                                            /* stateless */
                                            vscode.window.showInputBox().then(componentName => {
                                                const newShareWebUI = new NewComponent(ComponentType.ShareWebUI, componentName, DeviceType.Mobile, DeclareType.Stateless);
                                                newShareWebUI.createComponent()
                                            })
                                            break;
                                        case declareTypeOptions[1]:
                                            /* stateful */
                                            vscode.window.showInputBox().then(componentName => {
                                                const newShareWebUI = new NewComponent(ComponentType.ShareWebUI, componentName, DeviceType.Mobile, DeclareType.Stateful);
                                                newShareWebUI.createComponent()
                                            })
                                            break;
                                        default:
                                            break;
                                    }
                                })
                                break;
                            case deviceTypeOptions[2]:
                                /* client */
                                vscode.window.showQuickPick(declareTypeOptions).then(declareType => {
                                    switch (declareType) {
                                        case declareTypeOptions[0]:
                                            /* stateless */
                                            vscode.window.showInputBox().then(componentName => {
                                                const newShareWebUI = new NewComponent(ComponentType.ShareWebUI, componentName, DeviceType.Client, DeclareType.Stateless);
                                                newShareWebUI.createComponent()
                                            })
                                            break;
                                        case declareTypeOptions[1]:
                                            /* stateful */
                                            vscode.window.showInputBox().then(componentName => {
                                                const newShareWebUI = new NewComponent(ComponentType.ShareWebUI, componentName, DeviceType.Client, DeclareType.Stateful);
                                                newShareWebUI.createComponent()
                                            })
                                            break;
                                        default:
                                            break;
                                    }
                                })
                                break;
                            case deviceTypeOptions[3]:
                                /* all */
                                vscode.window.showQuickPick(declareTypeOptions).then(declareType => {
                                    switch (declareType) {
                                        case declareTypeOptions[0]:
                                            vscode.window.showInputBox().then(componentName => {
                                                const newShareWebUI = new NewComponent(ComponentType.ShareWebUI, componentName, DeviceType.All, DeclareType.Stateless);
                                                newShareWebUI.createComponent()
                                            })
                                            break;
                                        case declareTypeOptions[1]:
                                            vscode.window.showInputBox().then(componentName => {
                                                const newShareWebUI = new NewComponent(ComponentType.ShareWebUI, componentName, DeviceType.All, DeclareType.Stateful);
                                                newShareWebUI.createComponent()
                                            })
                                            break;
                                        default:
                                            break;
                                    }
                                })
                                break;
                            default:
                                break;
                        }
                    })
                    break;
                case componentTypeOptions[3]:
                    /* 创建ShareWebComponents */
                    vscode.window.showQuickPick(deviceTypeOptions).then(deviceType => {
                        switch (deviceType) {
                            case deviceTypeOptions[0]:
                                /* desktop */
                                vscode.window.showInputBox().then(componentName => {
                                    const newShareWebUI = new NewComponent(ComponentType.ShareWebComponents, componentName, DeviceType.Desktop);
                                    newShareWebUI.createComponent()
                                })
                                break;
                            case deviceTypeOptions[1]:
                                /* mobile */
                                vscode.window.showInputBox().then(componentName => {
                                    const newShareWebUI = new NewComponent(ComponentType.ShareWebComponents, componentName, DeviceType.Mobile);
                                    newShareWebUI.createComponent()
                                })
                                break;
                            case deviceTypeOptions[2]:
                                /* client */
                                vscode.window.showInputBox().then(componentName => {
                                    const newShareWebUI = new NewComponent(ComponentType.ShareWebComponents, componentName, DeviceType.Client);
                                    newShareWebUI.createComponent()
                                })
                                break;
                            case deviceTypeOptions[3]:
                                /* all */
                                vscode.window.showInputBox().then(componentName => {
                                    const newShareWebUI = new NewComponent(ComponentType.ShareWebComponents, componentName, DeviceType.All);
                                    newShareWebUI.createComponent()
                                })
                                break;
                            default:
                                break;
                        }
                    })
                    break;
                case componentTypeOptions[4]:
                    /* 创建ShareWebConsole */
                    vscode.window.showInputBox().then(componentName => {
                        const newShareWebUI = new NewComponent(ComponentType.ShareWebConsole, componentName);
                        newShareWebUI.createComponent()
                    })
                    break;
                default:
                    break;
            }
        })
    });

    context.subscriptions.push(newComponent);
}

// this method is called when your extension is deactivated
export function deactivate() {
}