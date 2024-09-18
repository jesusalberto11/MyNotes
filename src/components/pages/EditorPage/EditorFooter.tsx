interface props {
  title: string;
  textLength: number;
  lineCount: number;
}

const EditorFooter = (props: props) => {
  return (
    <div
      className="editor-footer w-full flex align-center justify-between"
      style={{ gap: "10px" }}
    >
      <div className="flex row" style={{ gap: "5px" }}>
        <div className="flex row" style={{ gap: "5px" }}>
          <p style={{ color: "#ffffff", fontWeight: "bold", fontSize: "12px" }}>
            {props.textLength}
          </p>
          <p
            className="source-sans-pro-font light"
            style={{ color: "#ffffff", fontSize: "12px", letterSpacing: "1px" }}
          >
            PALABRAS
          </p>
        </div>
        <div className="flex row" style={{ gap: "5px" }}>
          <p style={{ color: "#ffffff", fontWeight: "bold", fontSize: "12px" }}>
            {props.lineCount}
          </p>
          <p
            className="source-sans-pro-font light"
            style={{ color: "#ffffff", fontSize: "12px" }}
          >
            LINEAS
          </p>
        </div>
      </div>
      <p
        className="source-sans-pro-font light"
        style={{ color: "#ffffff", fontSize: "12px" }}
      >
        {props.title}
      </p>
    </div>
  );
};

export default EditorFooter;
