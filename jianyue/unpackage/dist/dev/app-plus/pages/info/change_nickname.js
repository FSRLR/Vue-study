
      !(function(){
        var uniAppViewReadyCallback = function(){
          setCssToHead([".",[1],"_input { height: 50px; border-bottom: 1px solid #eee; margin-bottom: 5px; }\n",],undefined,{path:"./pages/info/change_nickname.wxss"})();
document.dispatchEvent(new CustomEvent("generateFuncReady", { detail: { generateFunc: $gwx('./pages/info/change_nickname.wxml') } }));
        }
        if(window.__uniAppViewReady__){
          uniAppViewReadyCallback()
        }else{
          document.addEventListener('uniAppViewReady',uniAppViewReadyCallback)
        }
      })();
      