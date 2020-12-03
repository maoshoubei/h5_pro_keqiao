export default class Record extends React.Component {

  constructor(props) {
    super(props)
  }

  getItem = (key, value) => {
    return (
      <div style={{
        backgroundColor: "#fff",
        textAlign: "left",
        padding: "0 15px 0",
        display: "flex",
        fontSize: 20,
        flexFlow: "column nowrap",
        justifyContent: "center",
        marginBottom: 10,
      }}>
        <div>{key}</div>
        <div>{value}</div>
      </div>
    )
  }

  render() {
    return (
      <div>
        {  (this.props.items) ? Object.keys(this.props.items).forEach(key => {
          var value = this.props.items[key];
          return this.getItem(key, value)
        }) : null}
      </div>
    )
  }

}