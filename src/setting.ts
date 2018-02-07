import * as vscode from 'vscode';

/**
 * 默认设置项
 * @export
 * @class Setting
 */
export default class Setting {
    public ShareWebNewDir = vscode.workspace.getConfiguration('Anyshare').ShareWebNewDir // ShareWebNew根路径
    public templateDir = vscode.workspace.getConfiguration('AnyShare').templateDir; // 模板路径
}