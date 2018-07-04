import React from "react"
import styles from "./Header.scss"
import icon from "../../assets/images/headerImg/backBlack.png"
import * as actions from '../../redux/actions';
import store from '../../redux/store';
export default class Header extends React.Component {
  goBack() {
    window.history.back()
  }
  componentDidMount() {
    console.log(store.getState().objs.titleHeaderObj && store.getState().objs.titleHeaderObj.headerHide)
  }
  render() {
    const { title } = this.props
    const ua = window.navigator.userAgent
    return (
      <div>
          {/MicroMessenger/i.test(ua) || /SuiXingPay-Mpos/i.test(ua) || /SuiXingPay-Cashier/i.test(ua) ? (
              ''
          ) : (
              <div className={styles.title}>
                  {store.getState().objs.titleHeaderObj && store.getState().objs.titleHeaderObj.headerHide ? (
                      <div className={styles.arrows}>
                        <div className={styles.left} onClick={() => this.goBack()} />
                      </div>
                  ) : null}
                <div className={styles.center}>{title}</div>
              </div>
          )}
      </div>
    )
  }
}
