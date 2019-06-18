/**
 * UI
 */

const WIN = require('ui/window');
const LANG = require('../language/');
const LANG_T = antSword["language"]['toastr'];
const clipboard = require('electron').clipboard;

class UI {
  constructor() {
    // 创建一个窗口
    let self = this;
    self.win = new WIN({
      title: `${LANG['title']}`,
      width: 660,
      height: 450,
    });
    self.createMainLayout();
    // self.win.centerOnScreen();
    return {
      onGenerate: (func) => {
        self.bindToolbarClickHandler(func);
      },
      onAbout: () => {}
    }
  }

  /**
   * 创建界面
   */
  createMainLayout() {
    this.createToolbar();
    this.createEditor();
  }

  /**
   * 工具栏
   */
  createToolbar() {
    let self = this;
    let toolbar = self.win.win.attachToolbar();
    toolbar.loadStruct([
      { type: 'buttonSelect', text: LANG['toolbar']['new'], icon: 'plus-circle', id: 'new', openAll: true,
      options: [
        { id: 'asp',  icon: 'file-code-o', type: 'button', text: "ASP" }, 
        { id: 'aspx', icon: 'file-code-o', type: 'button', text: "ASPX"},
        { id: 'php',  icon: 'file-code-o', type: 'button', text: "PHP"},
      ]},
      { id: 'copy', type: 'button', text: LANG['toolbar']['copy'], icon: 'copy' },
      { id: 'clear', type: 'button', text: LANG['toolbar']['clear'], icon: 'remove' }
    ]);
    self.toolbar = toolbar;
  }

  createEditor(){
    let self = this;
    self.editor = null;
    // 初始化编辑器
    self.editor = ace.edit(self.win.win.cell.lastChild);
    self.editor.$blockScrolling = Infinity;
    self.editor.setTheme('ace/theme/tomorrow');
    self.editor.session.setMode(`ace/mode/php`);
    self.editor.session.setUseWrapMode(true);
    self.editor.session.setWrapLimitRange(null, null);

    self.editor.setOptions({
      fontSize: '14px',
      enableBasicAutocompletion: true,
      enableSnippets: true,
      enableLiveAutocompletion: true
    });
    // 编辑器快捷键
    self.editor.commands.addCommand({
      name: 'import',
      bindKey: {
        win: 'Ctrl-S',
        mac: 'Command-S'
      },
      exec: () => {
        self.toolbar.callEvent('onClick', ['import']);
      }
    });
    const inter = setInterval(self.editor.resize.bind(self.editor), 200);
      self.win.win.attachEvent('onClose', () => {
        clearInterval(inter);
        return true;
    });
  }

  /**
  * 监听按钮点击事件
  * @param  {Function} callback [description]
  * @return {[type]}            [description]
  */
  bindToolbarClickHandler(callback) {
    let self = this;
    self.toolbar.attachEvent('onClick', (id) => {
      switch(id){
      case "php":
        layer.prompt({
          value: "mr6",
          title: `<i class="fa fa-file-code-o"></i> ${LANG["prompt"]["create_pwd"]}`
        },(value, i, e) => {
          layer.close(i);
          callback({
            type: "php",
            pwd: value,
          }).then((data) => {
            if(data){
              self.editor.session.setMode(`ace/mode/php`);
              self.editor.session.setValue(`${data}`);
              toastr.success(LANG["message"]["gen_success"], LANG_T['success']);
            }
          });
        });
        break
      case "asp":
          layer.prompt({
          value: "mr6",
          title: `<i class="fa fa-file-code-o"></i> ${LANG["prompt"]["create_pwd"]}`
        },(value, i, e) => {
          layer.close(i);
          callback({
            type: "asp",
            pwd: value,
          }).then((data) => {
            if(data){
              self.editor.session.setMode(`ace/mode/php`);
              self.editor.session.setValue(`${data}`);
              toastr.success(LANG["message"]["gen_success"], LANG_T['success']);
            }
          });
        });
        break
      case "aspx":
                layer.prompt({
          value: "mr6",
          title: `<i class="fa fa-file-code-o"></i> ${LANG["prompt"]["create_pwd"]}`
        },(value, i, e) => {
          layer.close(i);
          callback({
            type: "aspx",
            pwd: value,
          }).then((data) => {
            if(data){
              self.editor.session.setMode(`ace/mode/php`);
              self.editor.session.setValue(`${data}`);
              toastr.success(LANG["message"]["gen_success"], LANG_T['success']);
            }
          });
        });
        break
      case "copy":
        let saveData = self.editor.session.getValue();
        if(!saveData){
          toastr.warning(LANG["message"]["edit_null_value"], LANG_T["warning"]);
          return
        }
        clipboard.writeText(saveData);
        // 检测是否复制成功
        let txt = clipboard.readText();
        if (txt) {
          toastr.success(LANG["message"]["copy_success"], LANG_T['success']);
        }else{
          toastr.error(LANG["message"]["copy_fail"], LANG_T['error']);
        }
        break
      case "clear":
        self.editor.session.setValue("");
        break
      }
    });
  }
  _randomStr(len){
    len = len || 8;
    let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let maxPos = chars.length;
    let pwd = '';
    for (var i = 0; i < len; i++) {
      pwd += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
  }
}

module.exports = UI;
