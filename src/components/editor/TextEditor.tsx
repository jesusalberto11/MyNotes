import { useEffect, useState } from "react";
import {
  BtnBold,
  BtnItalic,
  BtnRedo,
  BtnUndo,
  BtnUnderline,
  BtnNumberedList,
  BtnBulletList,
  BtnLink,
  BtnClearFormatting,
  HtmlButton,
  Editor,
  EditorProvider,
  Toolbar,
  Separator,
  createButton,
} from "react-simple-wysiwyg";

const BtnAlignCenter = createButton("Align center", "≡", "justifyCenter");
const BtnAlignLeft = createButton("Align left", "<≡", "justifyLeft");
const BtnAlignRight = createButton("Align left", "≡>", "justifyRight");

const TextEditor = (props: { text: string; onChange: Function }) => {
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    if (props.text) {
      setValue(props.text);
    }
  }, []);

  function onChange(e: any) {
    setValue(e.target.value);

    props.onChange(e.target.value);
  }

  return (
    <EditorProvider>
      <Editor
        value={value}
        onChange={onChange}
        containerProps={{ style: { height: "100%" } }}
      >
        <Toolbar>
          <BtnUndo />
          <BtnRedo />
          <Separator />
          <BtnBold />
          <BtnItalic />
          <BtnUnderline />
          <Separator />
          <BtnNumberedList />
          <BtnBulletList />
          <Separator />
          <BtnLink />
          <BtnClearFormatting />
          <HtmlButton />
          <Separator />
          <BtnAlignLeft />
          <BtnAlignCenter />
          <BtnAlignRight />
        </Toolbar>
      </Editor>
    </EditorProvider>
  );
};

export default TextEditor;
