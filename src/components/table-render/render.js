export default {
  functional: true,
  props: {
    row: Object, // 当前行的数据
    column: Object, // 当前列的数据
    rowIndex: Number, // 当前是第几行
    columnIndex: Number, // 当前是第几列
    render: Function // 具体的 render 函数内容
  },
  render: (h, ctx) => {
    const params = {
      row: ctx.props.row,
      column: ctx.props.column,
      rowIndex: ctx.props.rowIndex,
      columnIndex: ctx.props.columnIndex
    }

    return ctx.props.render(h, params)
  }
}
