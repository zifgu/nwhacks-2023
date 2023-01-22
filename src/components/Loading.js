import "./Loading.css";

export function Loading() {
  return (
    <div className="container">
      <div className="loader-container">
        <div className="spinner"></div>
      </div>

      <div className="main-content">
        <h1>Hello World!</h1>
        <p>
          This is a demo Project to show how to add animated loading with React.
        </p>
        <div className="buttons">
          <button className="btn">
            <a href="#">Read Article</a>
          </button>
          <button className="btn get-quote">
            Generate Quote
          </button>
        </div>
        <div className="quote-section">
          <blockquote className="quote">
            If you do not express your own original ideas, if you do not listen
            to your own being, you will have betrayed yourself.
          </blockquote>
          - <span className="author">Rollo May</span>
        </div>
      </div>
    </div>
  );
}