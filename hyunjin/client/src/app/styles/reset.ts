const reset = `
  button {
    margin: 0;
    padding: 0;
    border: 0;
    background: none;
    font-size: 100%;
    vertical-align: baseline;
    font-family: inherit;
    font-weight: inherit;
    color: inherit;
    appearance: none;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  input {
    position: relative;
    margin: 0;
    font-size: inherit;
    font-family: inherit;
    font-weight: inherit;
    color: inherit;
    padding: 0;
    border: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  input:placeholder-shown {
    text-overflow: ellipsis;
  }

  a {
    color: inherit;
    text-decoration: inherit;
  }
`;

export const resetStyleSheet = new CSSStyleSheet();
resetStyleSheet.replaceSync(reset);
