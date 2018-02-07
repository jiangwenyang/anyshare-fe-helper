const fs = require('fs');
const path = require('path');
import * as vscode from 'vscode';
import Setting from './setting';

export enum ComponentType {
    ShareWebUtil = 'ShareWebUtil',
    ShareWebCore = 'ShareWebCore',
    ShareWebUI = 'ShareWebUI',
    ShareWebComponents = 'ShareWebComponents',
    ShareWebConsole = 'ShareWebConsole',
}

export enum DeviceType {
    Desktop = 'desktop', // 桌面端
    Mobile = 'mobile', // 移动端
    Client = 'client', // PC端
    All = 'all', // 全平台
}

export enum DeclareType {
    Stateless = 'stateless', // 无状态函数式组件    
    Stateful = 'stateful', // 含状态的类式组件
}

export default class NewComponent {
    private componentType: ComponentType // 组件类型
    private deviceType: DeviceType | undefined // 设备类型
    private declareType: DeclareType | undefined // 声明方式
    private componentName: string = '' // 组件名    


    private templateDir: string = '' // 组件template路径
    private componentDir: string = '' //  组件生成路径

    constructor(componentType: ComponentType, componentName: string, deviceType?: DeviceType, declareType?: DeclareType) {
        const setting = new Setting()

        this.componentType = componentType

        this.deviceType = deviceType

        this.declareType = declareType

        this.setComponentName(componentName)

        this.templateDir = setting.templateDir ? path.resolve(setting.templateDir, ComponentType[componentType]) : path.resolve(__dirname, '../template', ComponentType[componentType])

        this.componentDir = setting.ShareWebNewDir ? path.resolve(setting.ShareWebNewDir, ComponentType[componentType], 'src') : path.resolve(vscode.workspace.workspaceFolders[0].uri.fsPath, ComponentType[componentType], 'src')
    }


    /**
     * 将字符串首字母转为大写
     * @param {string} str 
     * @returns {string}
     */
    private firstAlphabetUpper(str) {
        return str.substring(0, 1).toUpperCase() + str.substring(1);
    }


    /**
     * 将字符串首字母转为小写
     * @param {string} str 
     * @returns {string}
     */
    private firstAlphabetLower(str) {
        return str.substring(0, 1).toLowerCase() + str.substring(1);
    }


    /**
     * 组件名转为PascalCase风格
     * @param {string} name 
     * @returns {string} componentName
     */
    private setComponentName(name) {
        if (name.includes('-')) {
            this.componentName = name
                .split('-')
                .map(item => {
                    return this.firstAlphabetUpper(item);
                })
                .join('');
        } else {
            this.componentName = this.firstAlphabetUpper(name);
        }
    }


    /**
     * 返回组件对应的模板对象，以模板文件名为键，模板内容字符串为值
     * @param {any} templateDir 
     * @returns {object}
     */
    private getTemplate() {
        try {
            const files = fs.readdirSync(this.templateDir);
            const results = {};
            if (files.length === 0) {
                vscode.window.showErrorMessage('当前模板目录下不存在任何模板文件，请创建模板文件！')
                return null;
            }
            for (let i = 0, len = files.length; i < len; i++) {
                results[files[i]] = fs.readFileSync(path.resolve(this.templateDir, files[i])).toString('utf-8').replace(/\$componentName\$/g, this.componentName)
            }
            return results;
        } catch (error) {
            vscode.window.showErrorMessage('无法找到模板路径,请检查你的路径配置！')
            return null;
        }

    }

    /**
     * 创建组件
     * @memberof NewComponent
     */
    public createComponent() {
        const templateList = this.getTemplate()
        if (!templateList) return; // 如果返回null，则未找到模板文件
        try {
            fs.mkdirSync(`${this.componentDir}/${this.componentName}`, 0o777);
        } catch (error) {
            if (vscode.workspace.getConfiguration('Anyshare').ShareWebNewDir) {
                vscode.window.showErrorMessage(`自定义ShareWebNew目录下无法找到${this.componentType}/src子目录，请检查配置！`)
            } else {
                vscode.window.showErrorMessage('当前工作目录不是ShareWebNew工作目录，请检查是否单独打开了ShareWebNew目录！')
            }
            return;
        }
        try {
            for (var fileName in templateList) {
                if (this.deviceType && this.deviceType !== DeviceType.All && fileName.search(/desktop|mobile|client/) !== -1 && fileName.indexOf(this.deviceType) === -1) continue;
                if (this.declareType && fileName.search(/stateless|stateful/) !== -1 && fileName.indexOf(this.declareType) === -1) continue;
                if ((this.componentType === ComponentType.ShareWebUtil || this.componentType === ComponentType.ShareWebCore) && (fileName.indexOf('.d.ts') === -1)) {
                    // 如果是ShareWebUtil或者ShareWebCore中的文件，则修改除d.ts外的文件名
                    fs.writeFileSync(`${this.componentDir}/${this.componentName}/${this.firstAlphabetLower(this.componentName)}.ts`, templateList[fileName]);
                } else if (fileName.indexOf(this.declareType) !== -1) {
                    // 如果定义了函数声明方式，则创建文件前去掉对应前缀
                    const fileNameTemp = fileName.replace(`${this.declareType}-`, '')
                    fs.writeFileSync(`${this.componentDir}/${this.componentName}/${fileNameTemp}`, templateList[fileName]);
                } else {
                    // 否则直接以原文件名进行创建
                    fs.writeFileSync(`${this.componentDir}/${this.componentName}/${fileName}`, templateList[fileName]);
                }
            }
            vscode.window.showInformationMessage(`create ${this.componentName} success!`)
        } catch (error) {
            vscode.window.showErrorMessage(`create fail:${this.componentName} already exists!`)
        }
    }
}
