# 父组件怎么使用自组件

1、使用 web component 自身特性关联，需要观察 attribute、property  变换 （ 放弃这个方案，需要编译字符串模版，）

2、加入中间层 tag， 递归计算出html 模版，最后渲染。

对象
    templateTag -> templateResult (lit-html. html);
    nodePart.setValue(templateResult)
    instance 关联 templateResult 关联 nodePart

todo:
    实现 组件生命周期
    架构切分、整理代码
    更多测试用例
    lit-html 的版本迭代方案
    修改 lit-html 进入自己项目同步
    细节优化、性能优化
    开发文档