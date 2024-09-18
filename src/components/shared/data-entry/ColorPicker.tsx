import "../../../styles/components/shared/data-entry/ColorPicker.css";
import { useEffect, useState } from "react";
import {
  COLOR_PALETTES,
  getTextColorBasedOnBg,
  IColorPalette,
} from "../../../helpers/colorPalettes";
import { SVG_ICONS } from "../../../helpers/svgIcons";
import SVGIcon from "../ui/SVGIcon";
import ColorPickerItem from "./ColorPickerItem";

const ColorPicker = (props: { setColor: Function }) => {
  const [randomIndex, setRandomIndex] = useState<number>(0);
  const [randomColorPalette, setRandomColorPalette] =
    useState<IColorPalette | null>(null);

  useEffect(() => {
    getRandomColorPalette();
  }, []);

  useEffect(() => {
    setRandomColorPalette(COLOR_PALETTES[randomIndex]);
  }, [randomIndex]);

  const getRandomColorPalette = (): void => {
    setRandomIndex(Math.floor(Math.random() * COLOR_PALETTES.length));
  };

  const handleColorPick = (color: string): void => {
    const textColor = getTextColorBasedOnBg(color);
    props.setColor(color, textColor);
  };

  return (
    <div className="color-picker-container">
      <div className="selectable-colors-container">
        <div className="color-chooser-container">
          <label htmlFor="inputID" className="color-chooser-label-text" hidden>
            Elegir color:
          </label>
          <div className="select-color-container">
            <input
              id="inputID"
              type="color"
              className="color-chooser-input"
              onBlur={(e) => handleColorPick(e.target.value)}
            />
            <div className="icon-for-color-chooser">
              <SVGIcon icon={SVG_ICONS.PENCIL} />
            </div>
          </div>
        </div>
        {Array.from([0, 1, 2, 3, 4]).map((index) => (
          <ColorPickerItem
            key={index}
            bgColor={randomColorPalette?.colors[index]}
            setColor={handleColorPick}
          />
        ))}
        <button
          className="circular-btn flex centered"
          onClick={() => getRandomColorPalette()}
        >
          <SVGIcon icon={SVG_ICONS.RESET} />
        </button>
      </div>
    </div>
  );
};

export default ColorPicker;
