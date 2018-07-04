import fetch from 'sx-fetch'
import {Toast} from 'antd-mobile'
const fetchinit =(init)=>{
    fetch.axiosInstance.interceptors.request.use(cfg => {
            init.setState({'showLoading':"true"})

        return cfg;
    }, error => {
        return Promise.reject(error);
    });
    fetch.axiosInstance.interceptors.response.use(response => {
        init.setState({'showLoading':"false"})
        return response;
    }, error => {
        init.setState({'showLoading':"false"})
        return Promise.reject(error);
    });
    fetch.init({
        baseURL: '/ptm',
        onShowErrorTip: (err, errorTip) => {
            if(errorTip) Toast.info('请求超时，请稍后重试');
        },
        onShowSuccessTip: (response, successTip) => {
            switch (response.data.msgCode){
                case '0000':
                    return;
                case '2000':
                    //版本更新;
                    $.cookie('Version-Token', response.data.msgInfo, { expires: 8, path: '/'});
                    setTimeout(()=>{
                        window.location.reload();
                    },1000)
                case 'PTM0100':
                  var _protocol = (("https:" == document.location.protocol) ? "https://" : "http://")
                  window.location.replace(`${_protocol}${window.location.host}${sessionStorage.getItem('h5Channel')==='MPOS' ? '/login':'/loginOutside'}`)
                    return;
                case 'PTM9999':
                    Toast.info('系统异常',3)
                    return;
                default:
                    return;
            }
        },
        isMock: (url) => {
            return url.startsWith('/mock');
        }
    });
}

export default fetchinit
