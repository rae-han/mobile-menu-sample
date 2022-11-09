import React from 'react';

function TestComponent({ data }) {
  console.log(data)

  return (
    <div>
      { data && data.map((d, i) => (<div key={d.key}>{d.key}</div>))}
    </div>
  )
}

export default TestComponent;