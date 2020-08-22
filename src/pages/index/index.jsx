import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
import React, { Component } from "react";
import Layout from "../../components/Layout";
import "./index.scss";

export default class Index extends Component {
  render() {
    return (
      <Layout isShowHeader title="首页" headerProps={{ backHidden: false }}>
        <View>Hello world!</View>
        {[
          { id: 1, name: "hahah " },
          { id: 1, name: "xxx " },
          { id: 1, name: "sss " },
          { id: 1, name: "aaaa " },
        ].map(({ id, name }) => (
          <View key={id}>{name}</View>
        ))}
        <View className="icon-check-circle"></View>
      </Layout>
    );
  }
}
