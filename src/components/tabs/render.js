export default {
  name: 'RenderCell',
  functional: true,
  props: {
    render: Function // 具体的 render 函数内容
  },
  render: (h, ctx) => {
    return ctx.props.render(h)
  }
}
