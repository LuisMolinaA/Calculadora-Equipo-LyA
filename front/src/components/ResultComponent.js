import React from 'react';

const ResultComponent = ({ result, tokens }) => {
  return (
    <div className="result">
      <div className="result-value">{result}</div>
      <div className="tokens">
        {tokens && tokens.map((token, index) => (
          <span key={index} className="token">{token[1]}</span>
        ))}
      </div>
    </div>
  );
}

export default ResultComponent;
