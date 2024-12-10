const LargeRender = () => {
  const items = new Array(1000000)
    .fill(null)
    .map((_, index) => <div key={index}>Element {index}</div>);

  return <div>{items}</div>;
};

export default LargeRender;
