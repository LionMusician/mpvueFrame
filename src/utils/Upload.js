
import MD5 from './MD5'
import Tips from './Tips'
import FM_CONFIG from './config'
import utils from './utils'
import store from './../store'
import Authorize from "./authorize"

//图片上传
export default class Upload{

  static minigramupload(self,index,data,count=1, _self = null) {
    wx.chooseImage({
      count: count, //最多可以选择的图片张数，默认9
      sizeType: ["compressed"], // 可以指定是原图还是压缩图，默认二者都有 "original" compressed
      sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
      success: (r)=> {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        Tips.loading('图片上传中...');
        const imgLength = r.tempFilePaths.length;
        const imgUpload = async (filePaths) => {
          var tempFilePaths = filePaths.splice(0,1)[0];
          var nonce = utils.uuid();
          data.appId = FM_CONFIG.appId;
          //data.timestamp = utils.mklog();
          if(!(data.timestamp==-1))
          {
            data.timestamp = await Authorize.getServerTime(self);
          }

          data.token = store.getters.TOKEN;
          // data.nonce = nonce;
          // console.log("data==>",data);
          var dataStr = `${Object.entries(utils.dic(data)).map(val => val.join('=')).join('&')}`;
          // console.log("dataStr==>",dataStr+FM_CONFIG.appSecret+nonce);
          let signData = JSON.stringify({
            appId:FM_CONFIG.appId,
            sign:MD5.hex_md5(dataStr+FM_CONFIG.appSecret),
            type:data.type,
            token:store.getters.TOKEN,
            timestamp:data.timestamp,
            // nonce:nonce
          });
          utils.log(`${utils.mklog()}【AJAX:-->】【M=content/file/upload】【图片路径：】${tempFilePaths}【P=${signData}】`);
          wx.uploadFile({
            url: `${FM_CONFIG.baseURL}/content/file/upload`,
            filePath: tempFilePaths,
            name: 'file',
            formData:{
              'signData': signData
            },
            success: (res)=>{
              // if(this.isSuccess(res)) {
                let data = JSON.parse(res.data);
                utils.log(`${utils.mklog()}【M=content/file/upload】【接口响应：】${res.data}`);;
                if(data.code == 0) {
                  if(self.uploadUrl.length<count + index) {
                    if(_self != null){
                      _self.$set(self.uploadUrl,Number(index)+imgLength-filePaths.length-1,data.result);
                      _self.$set(self.preview,Number(index)+imgLength-filePaths.length-1,tempFilePaths);
                    }else{
                      self.$set(self.uploadUrl,Number(index)+imgLength-filePaths.length-1,data.result);
                      self.$set(self.preview,Number(index)+imgLength-filePaths.length-1,tempFilePaths);
                    }
                    if(filePaths.length>0) {
                      imgUpload(r.tempFilePaths);
                    }else {
                      Tips.loaded();
                    }
                  } else{
                    Tips.loaded();
                  }
                }else {
                  Tips.toast(data.message);
                  Tips.loaded();
                }
              // } else {
              //  throw this.requestException(res);
              // }
            },
            fail:(res)=>{
              console.log(res);
            }
          })
        }
        imgUpload(r.tempFilePaths,data,self,index);
      }
    });
  }

}
