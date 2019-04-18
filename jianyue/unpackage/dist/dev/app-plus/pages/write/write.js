
      !(function(){
        var uniAppViewReadyCallback = function(){
          setCssToHead([".",[1],"add-picture{ height: ",[0,80],"; width: ",[0,80],"; padding-left: 5px; }\n.",[1],"picture{ margin: 0; list-style-type: none; background-color: #d9d9d9; border-bottom: 1px solid #fff; font-size: 0; }\n.",[1],"title{ height: 50px; font-size: 24px; }\n.",[1],"content{ font-size: 20px; }\n",],undefined,{path:"./pages/write/write.wxss"})();
document.dispatchEvent(new CustomEvent("generateFuncReady", { detail: { generateFunc: $gwx('./pages/write/write.wxml') } }));
        }
        if(window.__uniAppViewReady__){
          uniAppViewReadyCallback()
        }else{
          document.addEventListener('uniAppViewReady',uniAppViewReadyCallback)
        }
      })();
      