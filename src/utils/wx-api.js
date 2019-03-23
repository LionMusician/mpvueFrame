/**
 * 微信相关API（跳转页面等）
 */

export default class wxApi {

    // 是否正在页面跳转
    static flag = false;
    // 延迟时间
    static delay = 1000;

    /**
    * 保留当前页面，跳转到应用内的某个页面
    */
    static navigateTo(url, parms) {
        if(!this.flag){
            this.flag = true;
            setTimeout(()=>{
                this.flag = false;
            }, this.delay);
            wx.navigateTo({
                url: parms ? `${url}?${parms}` : url
            });
        }
    }

    /**
    * 关闭当前页面，跳转到应用内的某个页面
    */
    static redirectTo(url, parms) {
        if(!this.flag){
            this.flag = true;
            setTimeout(()=>{
                this.flag = false;
            }, this.delay);
            wx.redirectTo({
                url: parms ? `${url}?${parms}` : url
            });
        }    
    }

    /**
    * 关闭所有页面，跳转到应用内的某个页面
    */
    static reLaunch(url, parms) {
        if(!this.flag){
            this.flag = true;
            setTimeout(()=>{
                this.flag = false;
            }, this.delay);
            wx.reLaunch({
                url: parms ? `${url}?${parms}` : url
            });
        }
    }

    /**
    * 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
    */
    static switchTab(url) {
        if(!this.flag){
            this.flag = true;
            setTimeout(()=>{
                this.flag = false;
            }, this.delay);
            wx.switchTab({
                url: `${url}`
            });
        }
    }

    /**
    * 关闭当前页面，返回上一页面或多级页面
    */
   static navigateBack(delta) {
       if(!this.flag){
            this.flag = true;
            setTimeout(()=>{
                this.flag = false;
            }, this.delay);
            wx.navigateBack({
                delta:parseInt(delta)
            });
        }
    }

    /**
    * 隐藏tabBar
    */
    static hideTabBar() {
        wx.hideTabBar({
            animation: false
        });
    }

    /**
    * 设置页面标题
    */
    static setNavigationBarTitle(title){
        wx.setNavigationBarTitle({
            title: title,
        });
    }

    /**
    * 页面滚动到指定位置
    */
    static pageScrollTo(scrollTop){
        wx.pageScrollTo({
            scrollTop: scrollTop,
        });
    }

    /**
    * 获取节点的下边界坐标，滚动到底部
    */
    static getRect(id){
        wx.createSelectorQuery().select('#'+id).boundingClientRect(function(rect){
            // 使页面滚动到底部
            // console.log(rect);
            wx.pageScrollTo({
                scrollTop: rect.bottom
            })
        }).exec()
    }

    /**
    * 存手机通讯录
    */
    static addPhoneContact(photoFilePath,nickName,mobilePhoneNumber,organization,title,workAddressState,workAddressCity,workAddressStreet,remark){
        wx.addPhoneContact({
            photoFilePath: photoFilePath,
            nickName: nickName,
            mobilePhoneNumber: mobilePhoneNumber,
            organization:organization,
            title:title,
            workAddressState:workAddressState,
            workAddressCity:workAddressCity,
            workAddressStreet:workAddressStreet,
            remark:remark
        });
    }
    
    /**
     * 图片预览
     */
    static previewImage(current,urls){
        wx.previewImage({
            current: current, // 当前显示图片的http链接
            urls: urls // 需要预览的图片http链接列表
          })
    }

    /**
     * 停止下拉刷新
     */
    static stopPullDownRefresh(){
        wx.stopPullDownRefresh();
    }

    /**
     * 设置缓存
     */
    static setStorageSync(key, data){
        wx.setStorageSync(key, data);
    }

    /**
     * 获取缓存
     */
    static getStorageSync(key){
        wx.getStorageSync(key);
    }

    /***
     * 获取当前位置
     */
    static getLocation(fn){
        wx.getLocation({
            success: (res)=>{
                fn(res);
            }
        })
    }

    /**
     * 打开地图选择位置
     */
    static chooseLocation(fn){
        wx.chooseLocation({
            success: (res)=> {
                fn(res);
            },
            fail:(msg)=> {
              if(msg.errMsg.indexOf('auth')!=-1) {
                setTimeout(() => {
                  wx.openSetting();
                });
              }
            }
          });
    }

    /**
     * 创建节点查询
     */
    static createSelectorQuery(){
        return wx.createSelectorQuery();
    }

    /**
     * 确认框
     */
    static showModal(title,content,fn){
        wx.showModal({
            title: title,
            content: content,
            success: function(res) {
              if (res.confirm) {
                fn();
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
        })
    }


    /**
     * 获取头像信息
     */

    static getUserInfo(fn){
        wx.getUserInfo({
            success:(res)=>{
                fn(res);
            }
        })
    }
    
}