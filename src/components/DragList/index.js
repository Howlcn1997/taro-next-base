import Taro from "@tarojs/taro";
import React, { useState, useRef } from "react";
import { View, ScrollView } from "@tarojs/components";
import classNames from "classnames";
// import LoadIcon from "./js/loadIcon_canvas";
import LoadIcon from "./js/loadIcon_css";
import "./index.scss";

function DragList() {
  const {
    scrollIntoView,
    scrollTop,
    refresherEnabled,
    scrollWithAnimation,
    scrollAnchoring,
    enableFlex,
    enableBackToTop,
    refreshThreshold,
    pullingText,
    pulledText,
    refreshingText,
    refreshFinishedText,
    initBottomText,
    showLoadMore,
    onRefresh,
    onScrollToUpper,
    onScrollToLower,
    onScroll,
    onAbort,
    onRestore,
    loadMoreEnabled,
  } = this.props;

  // icon周长比例 0 ~ 1
  const [pullRate, setPullRate] = useState(0);
  // 当前下拉刷新状态  0 正在下拉  1 下拉完成  2 正在加载  3 加载完成
  const [pullLoading, setPullLoading] = useState(0);
  // 上拉加载底部显示文字
  const [bottomText, setBottomText] = useState(initBottomText);
  // 下拉加载使能 true:允许加载  false:禁止加载
  const pullEnable = useRef(true);
  // 上拉加载使能 true:允许加载  false:禁止加载
  const loadMoreEnable = useRef(true);

  // 下拉刷新控件被下拉
  function __onPulling(evt) {
    var p = Math.min(evt.detail.dy / refreshThreshold, 1);
    if (p >= 1) {
      setPullLoading(1);
    } else {
      pullLoading !== 0 && setPullLoading(0);
    }
    setPullRate(p);
  }

  // 下拉刷新被中止
  function __onAbort(event) {
    setPullRate(0);
    setPullLoading(0);
    onAbort(event);
  }

  // 下拉刷新被触发
  function __onRefresh(event) {
    if (!pullEnable.current) return;
    pullEnable.current = false;
    loadMoreEnable.current = true;
    setPullLoading(2);
    setPullRate(0.8);
    setBottomText(initBottomText);
    onRefresh(() => {
      setPullRate(0);
      setPullLoading(3);
      pullEnable.current = true;
    }, event);
  }

  // 下拉刷新被复位
  function __onRestore(event) {
    setPullRate(0);
    onRestore(event);
  }

  function __onScrollToUpper(event) {
    onScrollToUpper(event);
  }

  // 触底触发函数
  function __onScrollToLower(event) {
    if (!loadMoreEnabled || !loadMoreEnable.current) return;
    loadMoreEnable.current = false;
    onScrollToLower((text, __loadMoreEnable = true) => {
      loadMoreEnable.current = __loadMoreEnable;
      if (!!text) {
        setBottomText(text);
      }
    }, event);
  }
  function __onScroll(event) {
    onScroll(event);
  }

  return (
    <View className="drag-list">
      <ScrollView
        scrollY
        className="scrollView"
        refresherBackground="#fff"
        refresherDefaultStyle="none"
        scrollTop={scrollTop}
        refresherEnabled={refresherEnabled}
        scrollWithAnimation={scrollWithAnimation}
        scrollAnchoring={scrollAnchoring}
        enableBackToTop={enableBackToTop}
        scrollIntoView={scrollIntoView}
        refresherThreshold={refreshThreshold}
        refresherTriggered={pullLoading !== 3}
        onRefresherPulling={__onPulling}
        onRefresherAbort={__onAbort}
        onRefresherRefresh={__onRefresh}
        onRefresherRestore={__onRestore}
        onScrollToUpper={__onScrollToUpper}
        onScrollToLower={__onScrollToLower}
        onScroll={__onScroll}
      >
        <View
          className={classNames(
            "drag-list_inner",
            showLoadMore && "drag-list_inner_hasLoadMore"
          )}
        >
          <View className="drag-list_inner_top">
            <View className="drag-list_inner_top_load">
              <View className="drag-list_inner_top_load_icon">
                <View
                  className={classNames(
                    pullLoading === 2 && "drag-list_inner_top_load_icon_loading"
                  )}
                >
                  {/* <LoadIcon rate={pullRate} deg={20} /> */}
                  <LoadIcon deg={pullRate * 360} />
                </View>
                <View className="drag-list_inner_top_load_icon_text">
                  {
                    [
                      pullingText,
                      pulledText,
                      refreshingText,
                      refreshFinishedText,
                    ][pullLoading]
                  }
                </View>
              </View>
            </View>
          </View>
          <View
            className={classNames(
              "drag-list_inner_content",
              enableFlex && "drag-list_inner_content_flex"
            )}
          >
            {this.props.children}
          </View>
          {showLoadMore && (
            <View className="drag-list_inner_bottom">{bottomText}</View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

DragList.defaultProps = {
  // 点击设备顶部状态是否返回顶部
  enableBackToTop: true,
  // 是否控制滚动位置不随内容变化而抖动
  scrollAnchoring: false,
  // 是否开启下拉加载
  refresherEnabled: true,
  // 是否开启上拉加载
  loadMoreEnabled: true,
  // 是否显示上拉加载文案
  showLoadMore: true,
  // 在设置滚动条位置时使用动画过渡
  scrollWithAnimation: false,
  // 是否开启flex布局 [当content内部元素不够高却希望撑满content时，开启此项，并使得内部元素的flex为1]
  enableFlex: false,
  // 锚点定位 子元素需要有id属性
  scrollIntoView: "",
  // 下拉加载初始文字
  initBottomText: "加载更多...",
  // 设置竖向滚动条位置
  scrollTop: 0,
  // 下拉刷新触发距离
  refreshThreshold: 80,
  // 下拉中 文案
  pullingText: "下拉可以刷新",
  // 下拉完成 文案
  pulledText: "松开立即刷新",
  // 加载文案
  refreshingText: "正在刷新...",
  // 加载完成文案
  refreshFinishedText: "加载完成",
  // 下拉刷新触发 [调用回调函数结束动画]
  onRefresh: () => {},
  // 滚动触底触发 [回调函数中入参可设置触底文字]
  onScrollToLower: () => {},
  // 触顶后直接触发
  onScrollToUpper: () => {},
  // 滚动触发
  onScroll: () => {},
  // 下拉复位后触发
  onRestore: () => {},
  // 拉下中途终止触发
  onAbort: () => {},
};

export default DragList;
