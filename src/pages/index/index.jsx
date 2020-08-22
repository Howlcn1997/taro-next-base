import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
import React, { Component } from "react";
import Layout from "@/components/Layout";
import "./index.scss";

export default class Index extends Component {
  render() {
    return (
      <Layout
        isShowHeader
        title="首页"
        headerProps={{ showBack: true, showHome: true }}
      >
        <View>Hello world!</View>
        <View className="icon-check-circle"></View>
      </Layout>
    );
  }
}
