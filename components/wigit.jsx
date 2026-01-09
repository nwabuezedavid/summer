const WiitAlls = () => {
  return (
    <div>
      <div className="finlogix-container"></div>
      <script type="text/javascript" src="https://widget.finlogix.com/Widget.js"></script>
      <script type="text/javascript">
        {`
          Widget.init({
            widgetId: "fc8d2cfa-30ed-4c8c-9a4b-ac19999f7a2f",
            type: "Sentiment",
            language: "en",
            symbolPair: {
              symbolId: "19",
              symbolName: "EURUSD"
            },
            isShowPriceRelatedColumn: false,
            isAdaptive: true
          });
        `}
      </script>
    </div>
  );
};

export default WiitAlls;