interface SwitchProps {
  checked: boolean;
  onClick: () => void;
}

export const Switch = (props: SwitchProps) => {
  const { checked, onClick } = props;

  return (
    <label style={
      { 
        position: 'relative', 
        display: 'inline-block', 
        width: 60, 
        height: 34, 
        backgroundColor: checked ? "#2196f3" : "#ccc",
        alignItems: 'center',
        borderRadius: 17,
        WebkitTransition: "0.4s",
        transition: "0.4s",
      }
    }>
      <input style={
        { opacity: 0, width: 0, height: 0, backgroundColor: "#2196f3" }
      } type="checkbox" onClick={onClick}/>
      <span style={
        { 
          position: 'absolute',
          top: 4,
          left: checked ? 30 : 4,
          alignSelf: 'center',
          cursor: 'pointer', 
          backgroundColor: "#fff",
          WebkitTransition: "0.4s",
          transition: "0.4s",
          borderRadius: "50%",
          height: 26,
          width: 26
        }
      } />
    </label>
  )
}