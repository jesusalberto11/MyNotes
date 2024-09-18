const ColorPickerItem = (props: {
  bgColor: string | undefined;
  setColor: Function;
}) => {
  return (
    <div
      className="color-picker-item-container"
      style={{ backgroundColor: props?.bgColor }}
      onClick={() => props.setColor(props.bgColor)}
    ></div>
  );
};

export default ColorPickerItem;
