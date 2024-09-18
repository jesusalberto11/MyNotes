import { MARKDOWN_HELP } from "../../../helpers/markdownHelp";

const HelpDialogContent = () => {
  return (
    <div>
      <p>
        Más información en:{" "}
        <a
          href="https://www.markdownguide.org/cheat-sheet/"
          target="_blank"
          rel="”noreferrer”"
        >
          Markdown guide
        </a>
      </p>
      <table>
        <thead>
          <tr>
            <td>Elemento</td>
            <td>Sintaxis</td>
          </tr>
        </thead>
        <tbody>
          {MARKDOWN_HELP.map((item) => (
            <tr key={item.id}>
              <td>{item.element}</td>
              <td>{item.syntax}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HelpDialogContent;
