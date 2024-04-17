export default () => {
  return (
    <div className="m-10">
      <div class="text-lg">
        Preact's hydrate will clear uncontrolled property(e.g., `defaultValue="12"`), this is wrong :
      </div>
      <div>
        <input class="border" defaultValue="12" />
      </div>
    </div>
  );
};
