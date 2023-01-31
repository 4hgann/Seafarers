import logoSrc from "../../assets/logo.png"

const Logo = ({ direction }) => {
  const style = direction ? { display: "flex" } : {}
  return (
    <div style={style}>
      <img src={logoSrc} style={{ height: "50px", margin: "auto 20px" }} />
      <h1 className="logo">
        <i>Seafarers</i>
      </h1>
    </div>
  )
}

export default Logo
